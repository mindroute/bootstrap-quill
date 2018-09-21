import { BlockEmbed } from 'quill/blots/block';

class Divider extends BlockEmbed { }
Divider.blotName = 'divider';
Divider.tagName = 'hr';

export default Divider;
