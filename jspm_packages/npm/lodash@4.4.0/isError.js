/* */ 
var isObjectLike = require('./isObjectLike');
var errorTag = '[object Error]';
var objectProto = Object.prototype;
var objectToString = objectProto.toString;
function isError(value) {
  if (!isObjectLike(value)) {
    return false;
  }
  var Ctor = value.constructor;
  return (objectToString.call(value) == errorTag) || (typeof Ctor == 'function' && objectToString.call(Ctor.prototype) == errorTag);
}
module.exports = isError;
