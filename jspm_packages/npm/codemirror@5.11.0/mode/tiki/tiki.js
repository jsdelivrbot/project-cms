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
  CodeMirror.defineMode('tiki', function(config) {
    function inBlock(style, terminator, returnTokenizer) {
      return function(stream, state) {
        while (!stream.eol()) {
          if (stream.match(terminator)) {
            state.tokenize = inText;
            break;
          }
          stream.next();
        }
        if (returnTokenizer)
          state.tokenize = returnTokenizer;
        return style;
      };
    }
    function inLine(style) {
      return function(stream, state) {
        while (!stream.eol()) {
          stream.next();
        }
        state.tokenize = inText;
        return style;
      };
    }
    function inText(stream, state) {
      function chain(parser) {
        state.tokenize = parser;
        return parser(stream, state);
      }
      var sol = stream.sol();
      var ch = stream.next();
      switch (ch) {
        case "{":
          stream.eat("/");
          stream.eatSpace();
          stream.eatWhile(/[^\s\u00a0=\"\'\/?(}]/);
          state.tokenize = inPlugin;
          return "tag";
        case "_":
          if (stream.eat("_"))
            return chain(inBlock("strong", "__", inText));
          break;
        case "'":
          if (stream.eat("'"))
            return chain(inBlock("em", "''", inText));
          break;
        case "(":
          if (stream.eat("("))
            return chain(inBlock("variable-2", "))", inText));
          break;
        case "[":
          return chain(inBlock("variable-3", "]", inText));
          break;
        case "|":
          if (stream.eat("|"))
            return chain(inBlock("comment", "||"));
          break;
        case "-":
          if (stream.eat("=")) {
            return chain(inBlock("header string", "=-", inText));
          } else if (stream.eat("-")) {
            return chain(inBlock("error tw-deleted", "--", inText));
          }
          break;
        case "=":
          if (stream.match("=="))
            return chain(inBlock("tw-underline", "===", inText));
          break;
        case ":":
          if (stream.eat(":"))
            return chain(inBlock("comment", "::"));
          break;
        case "^":
          return chain(inBlock("tw-box", "^"));
          break;
        case "~":
          if (stream.match("np~"))
            return chain(inBlock("meta", "~/np~"));
          break;
      }
      if (sol) {
        switch (ch) {
          case "!":
            if (stream.match('!!!!!')) {
              return chain(inLine("header string"));
            } else if (stream.match('!!!!')) {
              return chain(inLine("header string"));
            } else if (stream.match('!!!')) {
              return chain(inLine("header string"));
            } else if (stream.match('!!')) {
              return chain(inLine("header string"));
            } else {
              return chain(inLine("header string"));
            }
            break;
          case "*":
          case "#":
          case "+":
            return chain(inLine("tw-listitem bracket"));
            break;
        }
      }
      return null;
    }
    var indentUnit = config.indentUnit;
    var pluginName,
        type;
    function inPlugin(stream, state) {
      var ch = stream.next();
      var peek = stream.peek();
      if (ch == "}") {
        state.tokenize = inText;
        return "tag";
      } else if (ch == "(" || ch == ")") {
        return "bracket";
      } else if (ch == "=") {
        type = "equals";
        if (peek == ">") {
          ch = stream.next();
          peek = stream.peek();
        }
        if (!/[\'\"]/.test(peek)) {
          state.tokenize = inAttributeNoQuote();
        }
        return "operator";
      } else if (/[\'\"]/.test(ch)) {
        state.tokenize = inAttribute(ch);
        return state.tokenize(stream, state);
      } else {
        stream.eatWhile(/[^\s\u00a0=\"\'\/?]/);
        return "keyword";
      }
    }
    function inAttribute(quote) {
      return function(stream, state) {
        while (!stream.eol()) {
          if (stream.next() == quote) {
            state.tokenize = inPlugin;
            break;
          }
        }
        return "string";
      };
    }
    function inAttributeNoQuote() {
      return function(stream, state) {
        while (!stream.eol()) {
          var ch = stream.next();
          var peek = stream.peek();
          if (ch == " " || ch == "," || /[ )}]/.test(peek)) {
            state.tokenize = inPlugin;
            break;
          }
        }
        return "string";
      };
    }
    var curState,
        setStyle;
    function pass() {
      for (var i = arguments.length - 1; i >= 0; i--)
        curState.cc.push(arguments[i]);
    }
    function cont() {
      pass.apply(null, arguments);
      return true;
    }
    function pushContext(pluginName, startOfLine) {
      var noIndent = curState.context && curState.context.noIndent;
      curState.context = {
        prev: curState.context,
        pluginName: pluginName,
        indent: curState.indented,
        startOfLine: startOfLine,
        noIndent: noIndent
      };
    }
    function popContext() {
      if (curState.context)
        curState.context = curState.context.prev;
    }
    function element(type) {
      if (type == "openPlugin") {
        curState.pluginName = pluginName;
        return cont(attributes, endplugin(curState.startOfLine));
      } else if (type == "closePlugin") {
        var err = false;
        if (curState.context) {
          err = curState.context.pluginName != pluginName;
          popContext();
        } else {
          err = true;
        }
        if (err)
          setStyle = "error";
        return cont(endcloseplugin(err));
      } else if (type == "string") {
        if (!curState.context || curState.context.name != "!cdata")
          pushContext("!cdata");
        if (curState.tokenize == inText)
          popContext();
        return cont();
      } else
        return cont();
    }
    function endplugin(startOfLine) {
      return function(type) {
        if (type == "selfclosePlugin" || type == "endPlugin")
          return cont();
        if (type == "endPlugin") {
          pushContext(curState.pluginName, startOfLine);
          return cont();
        }
        return cont();
      };
    }
    function endcloseplugin(err) {
      return function(type) {
        if (err)
          setStyle = "error";
        if (type == "endPlugin")
          return cont();
        return pass();
      };
    }
    function attributes(type) {
      if (type == "keyword") {
        setStyle = "attribute";
        return cont(attributes);
      }
      if (type == "equals")
        return cont(attvalue, attributes);
      return pass();
    }
    function attvalue(type) {
      if (type == "keyword") {
        setStyle = "string";
        return cont();
      }
      if (type == "string")
        return cont(attvaluemaybe);
      return pass();
    }
    function attvaluemaybe(type) {
      if (type == "string")
        return cont(attvaluemaybe);
      else
        return pass();
    }
    return {
      startState: function() {
        return {
          tokenize: inText,
          cc: [],
          indented: 0,
          startOfLine: true,
          pluginName: null,
          context: null
        };
      },
      token: function(stream, state) {
        if (stream.sol()) {
          state.startOfLine = true;
          state.indented = stream.indentation();
        }
        if (stream.eatSpace())
          return null;
        setStyle = type = pluginName = null;
        var style = state.tokenize(stream, state);
        if ((style || type) && style != "comment") {
          curState = state;
          while (true) {
            var comb = state.cc.pop() || element;
            if (comb(type || style))
              break;
          }
        }
        state.startOfLine = false;
        return setStyle || style;
      },
      indent: function(state, textAfter) {
        var context = state.context;
        if (context && context.noIndent)
          return 0;
        if (context && /^{\//.test(textAfter))
          context = context.prev;
        while (context && !context.startOfLine)
          context = context.prev;
        if (context)
          return context.indent + indentUnit;
        else
          return 0;
      },
      electricChars: "/"
    };
  });
  CodeMirror.defineMIME("text/tiki", "tiki");
});
