class TextComplete {
  constructor(target, items) {
    this.target = target;
    this.container = target;
    this.items = items;
    this.buildPicker();
    //this.setTrigger(this.trigger)
    this.open();
  }

  buildPicker() {
    this.trigger = document.createElement('div');
    this.setTrigger(this.trigger);
    this.container.classList.add('dropdown');

    //this.target.parentNode.replaceChild(this.container, this.target);
    this.container.appendChild(this.trigger);

    this.buildMenu();
    this.buildItems();
  }

  buildMenu() {
    this.menu = document.createElement('div');
    this.menu.classList.add('dropdown-menu');
    this.container.appendChild(this.menu);
    return this.menu;
  }

  buildItems() {
    [].slice.call(this.items).forEach((item) => {
      let menuItem = this.buildItem(item);
      this.menu.appendChild(menuItem);
    });
  }

  buildItem(item) {
    let menuItem = document.createElement('button');
    menuItem.classList.add('dropdown-item');
    
    if (item.value) {
      menuItem.setAttribute('data-value', item.value);
    }
    if (item.text) {
      menuItem.innerHTML = item.text;
    }
    menuItem.addEventListener('click', (e) => {
      e.preventDefault();
      //this.selectItem(item, true);
      console.log("selected", item)
    });
    return menuItem;
  }

  setTrigger(trigger) {
    trigger.classList.add('dropdown-toggle', 'btn');
    trigger.setAttribute('data-toggle', 'dropdown')
    trigger.setAttribute('data-reference', 'parent')
    return trigger;
  }

  open() {
    this.container.classList.add('show');
    this.menu.classList.add('show');
  }

  close() {
    this.container.classList.remove('show');
    this.menu.classList.remove('show');
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
        this.target.dispatchEvent(new Event('change'));
      } else if (typeof Event === 'object') { // IE11
        let event = document.createEvent('Event');
        event.initEvent('change', true, true);
        this.target.dispatchEvent(event);
      }
      this.close();
    }
  }

  update(items) {
    this.items = items;
    this.buildItems();
  }
}


export default TextComplete;
