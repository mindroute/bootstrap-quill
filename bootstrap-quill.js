// Quill default
import Quill from './core';

import { AlignClass, AlignStyle } from 'quill/formats/align';
import { DirectionAttribute, DirectionClass, DirectionStyle } from 'quill/formats/direction';
import Indent from 'quill/formats/indent';

import Blockquote from 'quill/formats/blockquote';
import Header from 'quill/formats/header';
import List from 'quill/formats/list';

import { BackgroundClass, BackgroundStyle } from 'quill/formats/background';
import { ColorClass, ColorStyle } from 'quill/formats/color';
import { FontClass, FontStyle } from 'quill/formats/font';
import { SizeClass, SizeStyle } from 'quill/formats/size';

import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
import Link from 'quill/formats/link';
import Script from 'quill/formats/script';
import Strike from 'quill/formats/strike';
import Underline from 'quill/formats/underline';

import Formula from 'quill/formats/formula';
import Image from 'quill/formats/image';
import Video from 'quill/formats/video';

import CodeBlock, { Code as InlineCode } from 'quill/formats/code';

import Syntax from 'quill/modules/syntax';
import Table from 'quill/modules/table';


// CUSTOM

import Form from 'quill-form/src/quill-form';
import Autoformat, { AutoformatHelperAttribute } from 'quill-autoformat/src/modules/autoformat';
import Hashtag from 'quill-autoformat/src/formats/hashtag';
import Mention from 'quill-autoformat/src/formats/mention';

import Toolbar from './ui/toolbar';
import Icons from './ui/mdi';
import Picker from './ui/picker';
import ColorPicker from './ui/picker-color';
import IconPicker from './ui/picker-icon';
import Tooltip from './ui/tooltip';

import SnowTheme from './themes/snow';
import BubbleTheme from './themes/bubble';

// Attributors
Quill.register({
  'attributors/attribute/direction': DirectionAttribute,

  'attributors/class/align': AlignClass,
  'attributors/class/background': BackgroundClass,
  'attributors/class/color': ColorClass,
  'attributors/class/direction': DirectionClass,
  'attributors/class/font': FontClass,
  'attributors/class/size': SizeClass,

  'attributors/style/align': AlignStyle,
  'attributors/style/background': BackgroundStyle,
  'attributors/style/color': ColorStyle,
  'attributors/style/direction': DirectionStyle,
  'attributors/style/font': FontStyle,
  'attributors/style/size': SizeStyle
}, true);


// Formats
Quill.register({
  'formats/align': AlignClass,
  'formats/direction': DirectionClass,
  'formats/indent': Indent,

  'formats/background': BackgroundStyle,
  'formats/color': ColorStyle,
  'formats/font': FontClass,
  'formats/size': SizeClass,

  'formats/blockquote': Blockquote,
  'formats/code-block': CodeBlock,
  'formats/header': Header,
  'formats/list': List,

  'formats/bold': Bold,
  'formats/code': InlineCode,
  'formats/italic': Italic,
  'formats/link': Link,
  'formats/script': Script,
  'formats/strike': Strike,
  'formats/underline': Underline,

  'formats/formula': Formula,
  'formats/image': Image,
  'formats/video': Video,

  'modules/syntax': Syntax,
  'modules/table': Table,

  'formats/hashtag': Hashtag,
  'formats/mention': Mention,
}, true);

// UI
Quill.register({
  'modules/toolbar': Toolbar,

  'modules/form': Form,
  'modules/autoformat': Autoformat,
  'formats/autoformat-helper': AutoformatHelperAttribute,

  'themes/snow': SnowTheme,
  'themes/bubble': BubbleTheme,

  'ui/icons': Icons,
  'ui/picker': Picker,
  'ui/icon-picker': IconPicker,
  'ui/color-picker': ColorPicker,
  'ui/tooltip': Tooltip
}, true);

window.Quill = Quill;
export default Quill;
