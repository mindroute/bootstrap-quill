import extend from 'extend';
import Delta from 'quill-delta';
import Emitter from 'quill/core/emitter';
import Theme from 'quill/core/theme';
import ColorPicker from '../ui/picker-color';
import IconPicker from '../ui/picker-icon';
import Picker from '../ui/picker';
import Dropdown from '../ui/dropdown';
import EditTooltip from '../ui/tooltip-edit';

const ALIGNS = [ false, 'center', 'right', 'justify' ];

const COLORS = [
  "#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff",
  "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff",
  "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff",
  "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2",
  "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"
];

const FONTS = [ false, 'serif', 'monospace' ];

const HEADERS = [ '1', '2', '3', false ];

const SIZES = [ 'small', false, 'large', 'huge' ];


class BaseTheme extends Theme {
  constructor(quill, options) {
    super(quill, options);
    let listener = (e) => {
      if (!document.body.contains(quill.root)) {
        return document.body.removeEventListener('click', listener);
      }
      if (this.tooltip != null && !this.tooltip.root.contains(e.target) &&
          document.activeElement !== this.tooltip.textbox && !this.quill.hasFocus()) {
        this.tooltip.hide();
      }
      if (this.pickers != null) {
        this.pickers.forEach(function(picker) {
          if (!picker.container.contains(e.target)) {
            picker.close();
          }
        });
      }
    };
    this.quill.container.classList.add('ql-theme')
    quill.emitter.listenDOM('click', document.body, listener);
  }

  addModule(name) {
    let module = super.addModule(name);
    if (name === 'toolbar' && this.extendToolbar) {
      this.extendToolbar(module);
    }
    return module;
  }

  buildButtons(buttons, icons) {
    buttons.forEach((button) => {
      let className = button.getAttribute('class') || '';
      className.split(/\s+/).forEach((name) => {
        if (!name.startsWith('ql-')) return;
        name = name.slice('ql-'.length);
        if (icons[name] == null) return;
        if (name === 'direction') {
          button.innerHTML = icons[name][''] + icons[name]['rtl'];
        } else if (typeof icons[name] === 'string') {
          button.innerHTML = icons[name];
        } else {
          let value = button.value || '';
          if (value != null && icons[name][value]) {
            button.innerHTML = icons[name][value];
          }
        }
      });
    });
  }

  buildPickers(selects, icons) {
    this.pickers = selects.map((select) => {
      if (select.classList.contains('ql-align')) {
        if (select.querySelector('option') == null) {
          fillSelect(select, ALIGNS);
        }
        return new IconPicker(select, icons.align);
      } else if (select.classList.contains('ql-background') || select.classList.contains('ql-color')) {
        let format = select.classList.contains('ql-background') ? 'background' : 'color';
        if (select.querySelector('option') == null) {
          fillSelect(select, COLORS, format === 'background' ? '#ffffff' : '#000000');
        }
        return new ColorPicker(select, icons[format]);
      } else {
        if (select.querySelector('option') == null) {
          if (select.classList.contains('ql-font')) {
            fillSelect(select, FONTS);
          } else if (select.classList.contains('ql-header')) {
            fillSelect(select, HEADERS);
          } else if (select.classList.contains('ql-size')) {
            fillSelect(select, SIZES);
          }
        }
        return new Picker(select);
      }
    });
    let update = () => {
      this.pickers.forEach(function(picker) {
        picker.update();
      });
    };
    this.quill.on(Emitter.events.EDITOR_CHANGE, update);
  }

  buildSections(sections, icons) {
    sections.forEach((section) => {
      return new Dropdown(section);
    });
  }
}

BaseTheme.DEFAULTS = extend(true, {}, Theme.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        formula: function() {
          this.quill.theme.tooltip.edit('formula');
        },
        image: function() {
          let fileInput = this.container.querySelector('input.ql-image[type=file]');
          if (fileInput == null) {
            fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
            fileInput.classList.add('ql-image');
            fileInput.addEventListener('change', () => {
              if (fileInput.files != null && fileInput.files[0] != null) {
                let reader = new FileReader();
                reader.onload = (e) => {
                  let range = this.quill.getSelection(true);
                  this.quill.updateContents(new Delta()
                    .retain(range.index)
                    .delete(range.length)
                    .insert({ image: e.target.result })
                  , Emitter.sources.USER);
                  this.quill.setSelection(range.index + 1, Emitter.sources.SILENT);
                  fileInput.value = "";
                }
                reader.readAsDataURL(fileInput.files[0]);
              }
            });
            this.container.appendChild(fileInput);
          }
          fileInput.click();
        },
        video: function() {
          this.quill.theme.tooltip.edit('video');
        },
      }
    }
  }
});


function fillSelect(select, values, defaultValue = false) {
  values.forEach(function(value) {
    let option = document.createElement('option');
    if (value === defaultValue) {
      option.setAttribute('selected', 'selected');
    } else {
      option.setAttribute('value', value);
    }
    select.appendChild(option);
  });
}


export { EditTooltip, BaseTheme as default };
