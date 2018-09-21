import Picker from './picker';


class IconPicker extends Picker {
  constructor(select, icons) {
    super(select);
    this.container.classList.add('ql-icon-picker');
    [].forEach.call(this.container.querySelectorAll('.dropdown-item'), (item) => {
      item.innerHTML = icons[item.getAttribute('data-value') || ''];
    });
    this.defaultItem = this.container.querySelector('.dropdown-item.active');
    this.selectItem(this.defaultItem);
  }

  selectItem(item, trigger) {
    super.selectItem(item, trigger);
    item = item || this.defaultItem;
    this.label.innerHTML = item.innerHTML;
  }
}


export default IconPicker;
