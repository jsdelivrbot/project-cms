/* */ 
var utils = require('./utils'),
    lexer = require('./lexer');
var _t = lexer.types,
    _reserved = ['break', 'case', 'catch', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'finally', 'for', 'function', 'if', 'in', 'instanceof', 'new', 'return', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with'];
function escapeRegExp(str) {
  return str.replace(/[\-\/\\\^$*+?.()|\[\]{}]/g, '\\$&');
}
function TokenParser(tokens, filters, autoescape, line, filename) {
  this.out = [];
  this.state = [];
  this.filterApplyIdx = [];
  this._parsers = {};
  this.line = line;
  this.filename = filename;
  this.filters = filters;
  this.escape = autoescape;
  this.parse = function() {
    var self = this;
    if (self._parsers.start) {
      self._parsers.start.call(self);
    }
    utils.each(tokens, function(token, i) {
      var prevToken = tokens[i - 1];
      self.isLast = (i === tokens.length - 1);
      if (prevToken) {
        while (prevToken.type === _t.WHITESPACE) {
          i -= 1;
          prevToken = tokens[i - 1];
        }
      }
      self.prevToken = prevToken;
      self.parseToken(token);
    });
    if (self._parsers.end) {
      self._parsers.end.call(self);
    }
    if (self.escape) {
      self.filterApplyIdx = [0];
      if (typeof self.escape === 'string') {
        self.parseToken({
          type: _t.FILTER,
          match: 'e'
        });
        self.parseToken({
          type: _t.COMMA,
          match: ','
        });
        self.parseToken({
          type: _t.STRING,
          match: String(autoescape)
        });
        self.parseToken({
          type: _t.PARENCLOSE,
          match: ')'
        });
      } else {
        self.parseToken({
          type: _t.FILTEREMPTY,
          match: 'e'
        });
      }
    }
    return self.out;
  };
}
TokenParser.prototype = {
  on: function(type, fn) {
    this._parsers[type] = fn;
  },
  parseToken: function(token) {
    var self = this,
        fn = self._parsers[token.type] || self._parsers['*'],
        match = token.match,
        prevToken = self.prevToken,
        prevTokenType = prevToken ? prevToken.type : null,
        lastState = (self.state.length) ? self.state[self.state.length - 1] : null,
        temp;
    if (fn && typeof fn === 'function') {
      if (!fn.call(this, token)) {
        return;
      }
    }
    if (lastState && prevToken && lastState === _t.FILTER && prevTokenType === _t.FILTER && token.type !== _t.PARENCLOSE && token.type !== _t.COMMA && token.type !== _t.OPERATOR && token.type !== _t.FILTER && token.type !== _t.FILTEREMPTY) {
      self.out.push(', ');
    }
    if (lastState && lastState === _t.METHODOPEN) {
      self.state.pop();
      if (token.type !== _t.PARENCLOSE) {
        self.out.push(', ');
      }
    }
    switch (token.type) {
      case _t.WHITESPACE:
        break;
      case _t.STRING:
        self.filterApplyIdx.push(self.out.length);
        self.out.push(match.replace(/\\/g, '\\\\'));
        break;
      case _t.NUMBER:
      case _t.BOOL:
        self.filterApplyIdx.push(self.out.length);
        self.out.push(match);
        break;
      case _t.FILTER:
        if (!self.filters.hasOwnProperty(match) || typeof self.filters[match] !== "function") {
          utils.throwError('Invalid filter "' + match + '"', self.line, self.filename);
        }
        self.escape = self.filters[match].safe ? false : self.escape;
        self.out.splice(self.filterApplyIdx[self.filterApplyIdx.length - 1], 0, '_filters["' + match + '"](');
        self.state.push(token.type);
        break;
      case _t.FILTEREMPTY:
        if (!self.filters.hasOwnProperty(match) || typeof self.filters[match] !== "function") {
          utils.throwError('Invalid filter "' + match + '"', self.line, self.filename);
        }
        self.escape = self.filters[match].safe ? false : self.escape;
        self.out.splice(self.filterApplyIdx[self.filterApplyIdx.length - 1], 0, '_filters["' + match + '"](');
        self.out.push(')');
        break;
      case _t.FUNCTION:
      case _t.FUNCTIONEMPTY:
        self.out.push('((typeof _ctx.' + match + ' !== "undefined") ? _ctx.' + match + ' : ((typeof ' + match + ' !== "undefined") ? ' + match + ' : _fn))(');
        self.escape = false;
        if (token.type === _t.FUNCTIONEMPTY) {
          self.out[self.out.length - 1] = self.out[self.out.length - 1] + ')';
        } else {
          self.state.push(token.type);
        }
        self.filterApplyIdx.push(self.out.length - 1);
        break;
      case _t.PARENOPEN:
        self.state.push(token.type);
        if (self.filterApplyIdx.length) {
          self.out.splice(self.filterApplyIdx[self.filterApplyIdx.length - 1], 0, '(');
          if (prevToken && prevTokenType === _t.VAR) {
            temp = prevToken.match.split('.').slice(0, -1);
            self.out.push(' || _fn).call(' + self.checkMatch(temp));
            self.state.push(_t.METHODOPEN);
            self.escape = false;
          } else {
            self.out.push(' || _fn)(');
          }
          self.filterApplyIdx.push(self.out.length - 3);
        } else {
          self.out.push('(');
          self.filterApplyIdx.push(self.out.length - 1);
        }
        break;
      case _t.PARENCLOSE:
        temp = self.state.pop();
        if (temp !== _t.PARENOPEN && temp !== _t.FUNCTION && temp !== _t.FILTER) {
          utils.throwError('Mismatched nesting state', self.line, self.filename);
        }
        self.out.push(')');
        self.filterApplyIdx.pop();
        if (temp !== _t.FILTER) {
          self.filterApplyIdx.pop();
        }
        break;
      case _t.COMMA:
        if (lastState !== _t.FUNCTION && lastState !== _t.FILTER && lastState !== _t.ARRAYOPEN && lastState !== _t.CURLYOPEN && lastState !== _t.PARENOPEN && lastState !== _t.COLON) {
          utils.throwError('Unexpected comma', self.line, self.filename);
        }
        if (lastState === _t.COLON) {
          self.state.pop();
        }
        self.out.push(', ');
        self.filterApplyIdx.pop();
        break;
      case _t.LOGIC:
      case _t.COMPARATOR:
        if (!prevToken || prevTokenType === _t.COMMA || prevTokenType === token.type || prevTokenType === _t.BRACKETOPEN || prevTokenType === _t.CURLYOPEN || prevTokenType === _t.PARENOPEN || prevTokenType === _t.FUNCTION) {
          utils.throwError('Unexpected logic', self.line, self.filename);
        }
        self.out.push(token.match);
        break;
      case _t.NOT:
        self.out.push(token.match);
        break;
      case _t.VAR:
        self.parseVar(token, match, lastState);
        break;
      case _t.BRACKETOPEN:
        if (!prevToken || (prevTokenType !== _t.VAR && prevTokenType !== _t.BRACKETCLOSE && prevTokenType !== _t.PARENCLOSE)) {
          self.state.push(_t.ARRAYOPEN);
          self.filterApplyIdx.push(self.out.length);
        } else {
          self.state.push(token.type);
        }
        self.out.push('[');
        break;
      case _t.BRACKETCLOSE:
        temp = self.state.pop();
        if (temp !== _t.BRACKETOPEN && temp !== _t.ARRAYOPEN) {
          utils.throwError('Unexpected closing square bracket', self.line, self.filename);
        }
        self.out.push(']');
        self.filterApplyIdx.pop();
        break;
      case _t.CURLYOPEN:
        self.state.push(token.type);
        self.out.push('{');
        self.filterApplyIdx.push(self.out.length - 1);
        break;
      case _t.COLON:
        if (lastState !== _t.CURLYOPEN) {
          utils.throwError('Unexpected colon', self.line, self.filename);
        }
        self.state.push(token.type);
        self.out.push(':');
        self.filterApplyIdx.pop();
        break;
      case _t.CURLYCLOSE:
        if (lastState === _t.COLON) {
          self.state.pop();
        }
        if (self.state.pop() !== _t.CURLYOPEN) {
          utils.throwError('Unexpected closing curly brace', self.line, self.filename);
        }
        self.out.push('}');
        self.filterApplyIdx.pop();
        break;
      case _t.DOTKEY:
        if (!prevToken || (prevTokenType !== _t.VAR && prevTokenType !== _t.BRACKETCLOSE && prevTokenType !== _t.DOTKEY && prevTokenType !== _t.PARENCLOSE && prevTokenType !== _t.FUNCTIONEMPTY && prevTokenType !== _t.FILTEREMPTY && prevTokenType !== _t.CURLYCLOSE)) {
          utils.throwError('Unexpected key "' + match + '"', self.line, self.filename);
        }
        self.out.push('.' + match);
        break;
      case _t.OPERATOR:
        self.out.push(' ' + match + ' ');
        self.filterApplyIdx.pop();
        break;
    }
  },
  parseVar: function(token, match, lastState) {
    var self = this;
    match = match.split('.');
    if (_reserved.indexOf(match[0]) !== -1) {
      utils.throwError('Reserved keyword "' + match[0] + '" attempted to be used as a variable', self.line, self.filename);
    }
    self.filterApplyIdx.push(self.out.length);
    if (lastState === _t.CURLYOPEN) {
      if (match.length > 1) {
        utils.throwError('Unexpected dot', self.line, self.filename);
      }
      self.out.push(match[0]);
      return;
    }
    self.out.push(self.checkMatch(match));
  },
  checkMatch: function(match) {
    var temp = match[0],
        result;
    function checkDot(ctx) {
      var c = ctx + temp,
          m = match,
          build = '';
      build = '(typeof ' + c + ' !== "undefined" && ' + c + ' !== null';
      utils.each(m, function(v, i) {
        if (i === 0) {
          return;
        }
        build += ' && ' + c + '.' + v + ' !== undefined && ' + c + '.' + v + ' !== null';
        c += '.' + v;
      });
      build += ')';
      return build;
    }
    function buildDot(ctx) {
      return '(' + checkDot(ctx) + ' ? ' + ctx + match.join('.') + ' : "")';
    }
    result = '(' + checkDot('_ctx.') + ' ? ' + buildDot('_ctx.') + ' : ' + buildDot('') + ')';
    return '(' + result + ' !== null ? ' + result + ' : ' + '"" )';
  }
};
exports.parse = function(swig, source, opts, tags, filters) {
  source = source.replace(/\r\n/g, '\n');
  var escape = opts.autoescape,
      tagOpen = opts.tagControls[0],
      tagClose = opts.tagControls[1],
      varOpen = opts.varControls[0],
      varClose = opts.varControls[1],
      escapedTagOpen = escapeRegExp(tagOpen),
      escapedTagClose = escapeRegExp(tagClose),
      escapedVarOpen = escapeRegExp(varOpen),
      escapedVarClose = escapeRegExp(varClose),
      tagStrip = new RegExp('^' + escapedTagOpen + '-?\\s*-?|-?\\s*-?' + escapedTagClose + '$', 'g'),
      tagStripBefore = new RegExp('^' + escapedTagOpen + '-'),
      tagStripAfter = new RegExp('-' + escapedTagClose + '$'),
      varStrip = new RegExp('^' + escapedVarOpen + '-?\\s*-?|-?\\s*-?' + escapedVarClose + '$', 'g'),
      varStripBefore = new RegExp('^' + escapedVarOpen + '-'),
      varStripAfter = new RegExp('-' + escapedVarClose + '$'),
      cmtOpen = opts.cmtControls[0],
      cmtClose = opts.cmtControls[1],
      anyChar = '[\\s\\S]*?',
      splitter = new RegExp('(' + escapedTagOpen + anyChar + escapedTagClose + '|' + escapedVarOpen + anyChar + escapedVarClose + '|' + escapeRegExp(cmtOpen) + anyChar + escapeRegExp(cmtClose) + ')'),
      line = 1,
      stack = [],
      parent = null,
      tokens = [],
      blocks = {},
      inRaw = false,
      stripNext;
  function parseVariable(str, line) {
    var tokens = lexer.read(utils.strip(str)),
        parser,
        out;
    parser = new TokenParser(tokens, filters, escape, line, opts.filename);
    out = parser.parse().join('');
    if (parser.state.length) {
      utils.throwError('Unable to parse "' + str + '"', line, opts.filename);
    }
    return {compile: function() {
        return '_output += ' + out + ';\n';
      }};
  }
  exports.parseVariable = parseVariable;
  function parseTag(str, line) {
    var tokens,
        parser,
        chunks,
        tagName,
        tag,
        args,
        last;
    if (utils.startsWith(str, 'end')) {
      last = stack[stack.length - 1];
      if (last && last.name === str.split(/\s+/)[0].replace(/^end/, '') && last.ends) {
        switch (last.name) {
          case 'autoescape':
            escape = opts.autoescape;
            break;
          case 'raw':
            inRaw = false;
            break;
        }
        stack.pop();
        return;
      }
      if (!inRaw) {
        utils.throwError('Unexpected end of tag "' + str.replace(/^end/, '') + '"', line, opts.filename);
      }
    }
    if (inRaw) {
      return;
    }
    chunks = str.split(/\s+(.+)?/);
    tagName = chunks.shift();
    if (!tags.hasOwnProperty(tagName)) {
      utils.throwError('Unexpected tag "' + str + '"', line, opts.filename);
    }
    tokens = lexer.read(utils.strip(chunks.join(' ')));
    parser = new TokenParser(tokens, filters, false, line, opts.filename);
    tag = tags[tagName];
    if (!tag.parse(chunks[1], line, parser, _t, stack, opts, swig)) {
      utils.throwError('Unexpected tag "' + tagName + '"', line, opts.filename);
    }
    parser.parse();
    args = parser.out;
    switch (tagName) {
      case 'autoescape':
        escape = (args[0] !== 'false') ? args[0] : false;
        break;
      case 'raw':
        inRaw = true;
        break;
    }
    return {
      block: !!tags[tagName].block,
      compile: tag.compile,
      args: args,
      content: [],
      ends: tag.ends,
      name: tagName
    };
  }
  function stripPrevToken(token) {
    if (typeof token === 'string') {
      token = token.replace(/\s*$/, '');
    }
    return token;
  }
  utils.each(source.split(splitter), function(chunk) {
    var token,
        lines,
        stripPrev,
        prevToken,
        prevChildToken;
    if (!chunk) {
      return;
    }
    if (!inRaw && utils.startsWith(chunk, varOpen) && utils.endsWith(chunk, varClose)) {
      stripPrev = varStripBefore.test(chunk);
      stripNext = varStripAfter.test(chunk);
      token = parseVariable(chunk.replace(varStrip, ''), line);
    } else if (utils.startsWith(chunk, tagOpen) && utils.endsWith(chunk, tagClose)) {
      stripPrev = tagStripBefore.test(chunk);
      stripNext = tagStripAfter.test(chunk);
      token = parseTag(chunk.replace(tagStrip, ''), line);
      if (token) {
        if (token.name === 'extends') {
          parent = token.args.join('').replace(/^\'|\'$/g, '').replace(/^\"|\"$/g, '');
        } else if (token.block && !stack.length) {
          blocks[token.args.join('')] = token;
        }
      }
      if (inRaw && !token) {
        token = chunk;
      }
    } else if (inRaw || (!utils.startsWith(chunk, cmtOpen) && !utils.endsWith(chunk, cmtClose))) {
      token = (stripNext) ? chunk.replace(/^\s*/, '') : chunk;
      stripNext = false;
    } else if (utils.startsWith(chunk, cmtOpen) && utils.endsWith(chunk, cmtClose)) {
      return;
    }
    if (stripPrev && tokens.length) {
      prevToken = tokens.pop();
      if (typeof prevToken === 'string') {
        prevToken = stripPrevToken(prevToken);
      } else if (prevToken.content && prevToken.content.length) {
        prevChildToken = stripPrevToken(prevToken.content.pop());
        prevToken.content.push(prevChildToken);
      }
      tokens.push(prevToken);
    }
    if (!token) {
      return;
    }
    if (stack.length) {
      stack[stack.length - 1].content.push(token);
    } else {
      tokens.push(token);
    }
    if (token.name && token.ends) {
      stack.push(token);
    }
    lines = chunk.match(/\n/g);
    line += (lines) ? lines.length : 0;
  });
  return {
    name: opts.filename,
    parent: parent,
    tokens: tokens,
    blocks: blocks
  };
};
exports.compile = function(template, parents, options, blockName) {
  var out = '',
      tokens = utils.isArray(template) ? template : template.tokens;
  utils.each(tokens, function(token) {
    var o;
    if (typeof token === 'string') {
      out += '_output += "' + token.replace(/\\/g, '\\\\').replace(/\n|\r/g, '\\n').replace(/"/g, '\\"') + '";\n';
      return;
    }
    o = token.compile(exports.compile, token.args ? token.args.slice(0) : [], token.content ? token.content.slice(0) : [], parents, options, blockName);
    out += o || '';
  });
  return out;
};
