import Emitter from 'quill/core/emitter';
import Keyboard from 'quill/modules/keyboard';
import Tooltip from '../ui/tooltip';

class EditTooltip extends Tooltip {
  constructor(quill, boundsContainer) {
    super(quill, boundsContainer);
    this.textbox = this.root.querySelector('input[type="text"]');
    this.listen();
  }

  listen() {
    this.textbox.addEventListener('keydown', (event) => {
      if (Keyboard.match(event, 'enter')) {
        this.save();
        event.preventDefault();
      } else if (Keyboard.match(event, 'escape')) {
        this.cancel();
        event.preventDefault();
      }
    });
  }

  cancel() {
    this.hide();
  }

  edit(mode = 'link', preview = null) {
    this.root.classList.remove('ql-hidden');
    this.root.classList.add('ql-editing');
    if (preview != null) {
      this.textbox.value = preview;
    } else if (mode !== this.root.getAttribute('data-mode')) {
      this.textbox.value = '';
    }
    this.position(this.quill.getBounds(this.quill.selection.savedRange));
    this.textbox.select();
    this.textbox.setAttribute('placeholder', this.textbox.getAttribute(`data-${mode}`) || '');
    this.root.setAttribute('data-mode', mode);
  }

  restoreFocus() {
    let scrollTop = this.quill.scrollingContainer.scrollTop;
    this.quill.focus();
    this.quill.scrollingContainer.scrollTop = scrollTop;
  }

  save() {
    let value = this.textbox.value;
    switch(this.root.getAttribute('data-mode')) {
      case 'link': {
        let scrollTop = this.quill.root.scrollTop;
        if (this.linkRange) {
          this.quill.formatText(this.linkRange, 'link', value, Emitter.sources.USER);
          delete this.linkRange;
        } else {
          this.restoreFocus();
          this.quill.format('link', value, Emitter.sources.USER);
        }
        this.quill.root.scrollTop = scrollTop;
        break;
      }
      case 'video': {
        value = extractVideoUrl(value);
      } // eslint-disable-next-line no-fallthrough
      case 'formula': {
        if (!value) break;
        let range = this.quill.getSelection(true);
        if (range != null) {
          let index = range.index + range.length;
          this.quill.insertEmbed(index, this.root.getAttribute('data-mode'), value, Emitter.sources.USER);
          if (this.root.getAttribute('data-mode') === 'formula') {
            this.quill.insertText(index + 1, ' ', Emitter.sources.USER);
          }
          this.quill.setSelection(index + 2, Emitter.sources.USER);
        }
        break;
      }
      default:
    }
    this.textbox.value = '';
    this.hide();
  }
}


function extractVideoUrl(url) {
  let match = url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) ||
      url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return (match[1] || 'https') + '://www.youtube.com/embed/' + match[2] + '?showinfo=0';
  }
  if (match = url.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) {  // eslint-disable-line no-cond-assign
    return (match[1] || 'https') + '://player.vimeo.com/video/' + match[2] + '/';
  }
  return url;
}


export { EditTooltip as default };
