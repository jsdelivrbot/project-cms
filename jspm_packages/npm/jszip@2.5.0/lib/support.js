/* */ 
(function(Buffer) {
  'use strict';
  exports.base64 = true;
  exports.array = true;
  exports.string = true;
  exports.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
  exports.nodebuffer = typeof Buffer !== "undefined";
  exports.uint8array = typeof Uint8Array !== "undefined";
  if (typeof ArrayBuffer === "undefined") {
    exports.blob = false;
  } else {
    var buffer = new ArrayBuffer(0);
    try {
      exports.blob = new Blob([buffer], {type: "application/zip"}).size === 0;
    } catch (e) {
      try {
        var Builder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
        var builder = new Builder();
        builder.append(buffer);
        exports.blob = builder.getBlob('application/zip').size === 0;
      } catch (e) {
        exports.blob = false;
      }
    }
  }
})(require('buffer').Buffer);
