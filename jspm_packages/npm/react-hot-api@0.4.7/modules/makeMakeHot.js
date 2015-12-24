/* */ 
'use strict';
var makePatchReactClass = require('./makePatchReactClass');
module.exports = function makeMakeHot(getRootInstances, React) {
  if (typeof getRootInstances !== 'function') {
    throw new Error('Expected getRootInstances to be a function.');
  }
  var patchers = {};
  return function makeHot(NextClass, persistentId) {
    persistentId = persistentId || NextClass.displayName || NextClass.name;
    if (!persistentId) {
      console.error('Hot reload is disabled for one of your types. To enable it, pass a ' + 'string uniquely identifying this class within this current module ' + 'as a second parameter to makeHot.');
      return NextClass;
    }
    if (!patchers[persistentId]) {
      patchers[persistentId] = makePatchReactClass(getRootInstances, React);
    }
    var patchReactClass = patchers[persistentId];
    return patchReactClass(NextClass);
  };
};
