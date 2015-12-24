/* */ 
'use strict';
var replaceEntities = require('../common/utils').replaceEntities;
module.exports = function normalizeLink(url) {
  var normalized = replaceEntities(url);
  try {
    normalized = decodeURI(normalized);
  } catch (err) {}
  return encodeURI(normalized);
};
