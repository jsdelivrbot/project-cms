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
  CodeMirror.registerHelper("fold", "indent", function(cm, start) {
    var tabSize = cm.getOption("tabSize"),
        firstLine = cm.getLine(start.line);
    if (!/\S/.test(firstLine))
      return;
    var getIndent = function(line) {
      return CodeMirror.countColumn(line, null, tabSize);
    };
    var myIndent = getIndent(firstLine);
    var lastLineInFold = null;
    for (var i = start.line + 1,
        end = cm.lastLine(); i <= end; ++i) {
      var curLine = cm.getLine(i);
      var curIndent = getIndent(curLine);
      if (curIndent > myIndent) {
        lastLineInFold = i;
      } else if (!/\S/.test(curLine)) {} else {
        break;
      }
    }
    if (lastLineInFold)
      return {
        from: CodeMirror.Pos(start.line, firstLine.length),
        to: CodeMirror.Pos(lastLineInFold, cm.getLine(lastLineInFold).length)
      };
  });
});
