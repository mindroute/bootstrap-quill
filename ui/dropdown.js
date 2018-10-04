import DropdownIcon from '@mdi/svg/svg/menu-down.svg';


class Dropdown {
  constructor(section) {
    this.container = section;
    this.items = [].slice.call(this.container.children);
    this.buildDropdown();
  }

  buildLabel() {
    let label = document.createElement('button');
    label.classList.add('dropdown-toggle', 'btn');
    label.setAttribute("data-toggle", "dropdown")
    label.innerHTML = DropdownIcon;
    this.container.appendChild(label);
    return label;
  }

  buildItems() {
    let dropdownMenu = document.createElement('div');
    dropdownMenu.classList.add('dropdown-menu');
    console.log("build dropdown items", this.items);
    this.items.forEach((item, index, items) => {
      if (item.classList.contains('btn-group')) {
        [].slice.call(item.children).forEach((subItem) => {
          subItem.classList.add('dropdown-item');
          dropdownMenu.appendChild(subItem);
          item.remove();
        });
        if (index < items.length - 1) {
          let separator = document.createElement('div');
          separator.classList.add('dropdown-divider');
          dropdownMenu.appendChild(separator);
        }
      } else {
        item.classList.add('dropdown-item');
        dropdownMenu.appendChild(item);
      }

    });
    this.container.appendChild(dropdownMenu);
    return dropdownMenu;
  }

  buildDropdown() {
    this.container.classList.add('dropdown');
    this.label = this.buildLabel();
    this.dropdownMenu = this.buildItems();
  }
}


export default Dropdown;
