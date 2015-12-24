/* */ 
'use strict';
var bindAutoBindMethods = require('./bindAutoBindMethods');
var traverseRenderedChildren = require('./traverseRenderedChildren');
function setPendingForceUpdate(internalInstance) {
  if (internalInstance._pendingForceUpdate === false) {
    internalInstance._pendingForceUpdate = true;
  }
}
function forceUpdateIfPending(internalInstance, React) {
  if (internalInstance._pendingForceUpdate === true) {
    var instance = internalInstance._instance || internalInstance;
    if (instance.forceUpdate) {
      instance.forceUpdate();
    } else if (React && React.Component) {
      React.Component.prototype.forceUpdate.call(instance);
    }
  }
}
function deepForceUpdate(internalInstance, React) {
  traverseRenderedChildren(internalInstance, bindAutoBindMethods);
  traverseRenderedChildren(internalInstance, setPendingForceUpdate);
  traverseRenderedChildren(internalInstance, forceUpdateIfPending, React);
}
module.exports = deepForceUpdate;
