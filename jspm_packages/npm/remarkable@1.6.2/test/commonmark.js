/* */ 
'use strict';
var path = require('path');
var utils = require('./utils');
var Remarked = require('../index');
describe('CommonMark', function() {
  var md = new Remarked('commonmark');
  utils.addTests(path.join(__dirname, 'fixtures/commonmark/good.txt'), md);
});
