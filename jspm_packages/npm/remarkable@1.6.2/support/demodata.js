/* */ 
var fs = require('fs');
var path = require('path');
console.log(JSON.stringify({self: {demo: {
      code: fs.readFileSync(path.join(__dirname, '../demo/example.js'), 'utf8'),
      source: fs.readFileSync(path.join(__dirname, '../demo/example.md'), 'utf8')
    }}}, null, 2));
