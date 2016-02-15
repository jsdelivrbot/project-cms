/* */ 
'use strict';
var path = require('path');
var utils = require('./utils');
var Remarkable = require('../index');
describe('remarkable', function() {
  var md = new Remarkable('full', {
    html: true,
    langPrefix: '',
    typographer: true,
    linkify: true
  });
  utils.addTests(path.join(__dirname, 'fixtures/remarkable'), md);
});
