import extend from 'extend';
import DefaultKeyboard, { SHORTKEY, normalize } from 'quill/modules/keyboard'

class Keyboard extends DefaultKeyboard {

  addBinding(keyBinding, context = {}, handler = {}, prepend = false) {
    super.addBinding(keyBinding, context, handler);
    if (prepend) {
      let binding = normalize(keyBinding);
      if (binding == null) {
        return;
      }

      const keys = Array.isArray(binding.key) ? binding.key : [binding.key];
      keys.forEach(key => {
        const singleBinding = extend({}, binding, { key }, context, handler);
        this.bindings[singleBinding.key].unshift(this.bindings[singleBinding.key].pop());
      });
    }
  }

}

export { Keyboard as default, SHORTKEY, normalize };
