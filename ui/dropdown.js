import DropdownIcon from '@mdi/svg/svg/menu-down.svg';


class Dropdown {
  constructor(section) {
    //this.section = section;
    //this.container = document.createElement('div');
    this.container = section;
    this.items = [].slice.call(this.container.children);
    this.buildDropdown();
    //this.section.style.display = 'none';
    //this.section.parentNode.insertBefore(this.container, this.section);
    /*this.label.addEventListener('mousedown', (e) => {
      if(!this.label.hasAttribute("aria-expanded")) {
        // Bootstrap is present when aria-expanded is already set
        this.options.classList.toggle('show');
      }
    });*/
    //this.select.addEventListener('change', this.update.bind(this));
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
      //let item = this.buildItem(option);
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

      /*if (item.selected === true) {
        this.selectItem(item);
      }*/
    });
    this.container.appendChild(dropdownMenu);
    return dropdownMenu;
  }

  buildDropdown() {
    /*[].slice.call(this.section.attributes).forEach((item) => {
      this.container.setAttribute(item.name, item.value);
    });*/
    this.container.classList.add('dropdown');
    this.label = this.buildLabel();
    this.dropdownMenu = this.buildItems();
  }

  /*close() {
    this.options.classList.remove('show');
  }*/

  /*selectItem(item, trigger = false) {
    let selected = this.container.querySelector('.dropdown-item.active');
    if (item === selected) return;
    if (selected != null) {
      selected.classList.remove('active');
    }
    if (item == null) return;
    item.classList.add('active');
    this.select.selectedIndex = [].indexOf.call(item.parentNode.children, item);
    if (item.hasAttribute('data-value')) {
      this.label.setAttribute('data-value', item.getAttribute('data-value'));
    } else {
      this.label.removeAttribute('data-value');
    }
    if (item.hasAttribute('data-label')) {
      this.label.setAttribute('data-label', item.getAttribute('data-label'));
    } else {
      this.label.removeAttribute('data-label');
    }
    if (trigger) {
      if (typeof Event === 'function') {
        this.select.dispatchEvent(new Event('change'));
      } else if (typeof Event === 'object') {     // IE11
        let event = document.createEvent('Event');
        event.initEvent('change', true, true);
        this.select.dispatchEvent(event);
      }
      this.close();
    }
  }*/

  /*update() {
    let option;
    if (this.select.selectedIndex > -1) {
      let item = this.container.querySelector('.dropdown-menu').children[this.select.selectedIndex];
      option = this.select.options[this.select.selectedIndex];
      this.selectItem(item);
    } else {
      this.selectItem(null);
    }
    let isActive = option != null && option !== this.select.querySelector('option[selected]');
    this.label.classList.toggle('active', isActive);
  }*/
}


export default Dropdown;
