// Quill default
import Quill from 'quill/core';

import Keyboard from './modules/keyboard';

// Overrides
Quill.register({
  'modules/keyboard': Keyboard
}, true);

export default Quill;
