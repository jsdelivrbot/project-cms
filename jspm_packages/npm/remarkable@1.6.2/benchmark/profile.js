/* */ 
'use strict';
var fs = require('fs');
var path = require('path');
var Remarkable = require('../index');
var md = new Remarkable({
  html: true,
  linkify: false,
  typographer: false
});
var data = fs.readFileSync(path.join(__dirname, '../test/fixtures/commonmark/spec.txt'), 'utf8');
for (var i = 0; i < 20; i++) {
  md.render(data);
}
