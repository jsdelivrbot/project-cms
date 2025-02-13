/* */ 
"format cjs";
(function(mod) {
  if (typeof exports == "object" && typeof module == "object")
    mod(require('../../lib/codemirror'));
  else if (typeof define == "function" && define.amd)
    define(["../../lib/codemirror"], mod);
  else
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";
  CodeMirror.registerHelper("lint", "yaml", function(text) {
    var found = [];
    try {
      jsyaml.load(text);
    } catch (e) {
      var loc = e.mark;
      found.push({
        from: CodeMirror.Pos(loc.line, loc.column),
        to: CodeMirror.Pos(loc.line, loc.column),
        message: e.message
      });
    }
    return found;
  });
});
