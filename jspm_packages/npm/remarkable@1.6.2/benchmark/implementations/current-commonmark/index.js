/* */ 
'use strict';
var Remarkable = require('../../../index');
var md = new Remarkable('commonmark');
exports.run = function(data) {
  return md.render(data);
};
