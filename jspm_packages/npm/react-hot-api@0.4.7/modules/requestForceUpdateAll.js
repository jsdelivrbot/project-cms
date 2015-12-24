/* */ 
var deepForceUpdate = require('./deepForceUpdate');
var isRequestPending = false;
module.exports = function requestForceUpdateAll(getRootInstances, React) {
  if (isRequestPending) {
    return;
  }
  function forceUpdateAll() {
    isRequestPending = false;
    var rootInstances = getRootInstances(),
        rootInstance;
    for (var key in rootInstances) {
      if (rootInstances.hasOwnProperty(key)) {
        rootInstance = rootInstances[key];
        rootInstance = rootInstance._reactInternalInstance || rootInstance;
        deepForceUpdate(rootInstance, React);
      }
    }
  }
  setTimeout(forceUpdateAll);
};
