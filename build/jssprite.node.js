var fs = require('fs');

var content = fs.readFileSync('./dist/sprite.svg', 'utf-8');
var svgContent = content.toString().replace(/[\\$'"]/g, "\\$&").replace(/[\r\n]/g, "");
var jsContent = "var sprite = document.createElement(\"SECTION\"); document.documentElement.append(sprite); sprite.innerHTML = \"" + svgContent + "\";";
fs.writeFileSync('./dist/sprite.svg.js', jsContent, 'utf-8');

console.log('Generated sprite.svg.js');
