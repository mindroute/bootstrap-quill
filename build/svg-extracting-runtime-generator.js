const { generateExport, generateSpritePlaceholder, stringify } = require('svg-sprite-loader/lib/utils');

module.exports = function runtimeGenerator({ symbol, loaderContext }) {
  //return generateExport(`"<svg><use xlink:href=\\"#${symbol.id}\\" /></svg>"`);
  //console.log(symbol.viewBox);
  if(symbol.viewBox) {
    return `module.exports = "<svg class=\\"i\\" viewbox=\\"${symbol.viewBox}\\"><use href=\\"#${symbol.id}\\" /></svg>"`;
  } else {
    return `module.exports = "<svg class=\\"i\\" viewbox=\\"0 0 18 18\\"><use href=\\"#${symbol.id}\\" /></svg>"`;
  }
};
