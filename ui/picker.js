import DropdownIcon from '@mdi/svg/svg/menu-down.svg';


class Picker {
  constructor(select) {
    this.select = select;
    this.container = document.createElement('div');
    this.buildPicker();
    this.select.style.display = 'none';
    this.select.parentNode.insertBefore(this.container, this.select);
    this.label.addEventListener('mousedown', (e) => {
      if(!this.label.hasAttribute("aria-expanded")) {
        // Bootstrap is present when aria-expanded is already set
        this.options.classList.toggle('show');
      }
    });
    this.select.addEventListener('change', this.update.bind(this));
  }

  buildItem(option) {
    let item = document.createElement('button');
    item.classList.add('dropdown-item');
    if (option.hasAttribute('value')) {
      item.setAttribute('data-value', option.getAttribute('value'));
    }
    if (option.textContent) {
      item.setAttribute('data-label', option.textContent);
    }
    item.addEventListener('click', (e) => {
      this.selectItem(item, true);
    });
    return item;
  }

  buildLabel() {
    let label = document.createElement('button');
    label.classList.add('dropdown-toggle', 'btn');
    label.setAttribute("data-toggle", "dropdown")
    label.innerHTML = DropdownIcon;
    this.container.appendChild(label);
    return label;
  }

  buildOptions() {
    let options = document.createElement('div');
    options.classList.add('dropdown-menu');
    [].slice.call(this.select.options).forEach((option) => {
      let item = this.buildItem(option);
      options.appendChild(item);
      if (option.selected === true) {
        this.selectItem(item);
      }
    });
    this.container.appendChild(options);
    return options;
  }

  buildPicker() {
    [].slice.call(this.select.attributes).forEach((item) => {
      this.container.setAttribute(item.name, item.value);
    });
    this.container.classList.add('dropdown');
    this.label = this.buildLabel();
    this.options = this.buildOptions();
  }

  close() {
    this.options.classList.remove('show');
  }

  selectItem(item, trigger = false) {
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
  }

  update() {
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
  }
}


export default Picker;
