/* */ 
'use strict';
var Remarkable = require('../../../index');
var md = new Remarkable({
  html: true,
  linkify: true,
  typographer: true
});
exports.run = function(data) {
  return md.render(data);
};
