/* */ 
(function(process) {
  var utils = require('./utils');
  var TYPES = {
    WHITESPACE: 0,
    STRING: 1,
    FILTER: 2,
    FILTEREMPTY: 3,
    FUNCTION: 4,
    FUNCTIONEMPTY: 5,
    PARENOPEN: 6,
    PARENCLOSE: 7,
    COMMA: 8,
    VAR: 9,
    NUMBER: 10,
    OPERATOR: 11,
    BRACKETOPEN: 12,
    BRACKETCLOSE: 13,
    DOTKEY: 14,
    ARRAYOPEN: 15,
    CURLYOPEN: 17,
    CURLYCLOSE: 18,
    COLON: 19,
    COMPARATOR: 20,
    LOGIC: 21,
    NOT: 22,
    BOOL: 23,
    ASSIGNMENT: 24,
    METHODOPEN: 25,
    UNKNOWN: 100
  },
      rules = [{
        type: TYPES.WHITESPACE,
        regex: [/^\s+/]
      }, {
        type: TYPES.STRING,
        regex: [/^""/, /^".*?[^\\]"/, /^''/, /^'.*?[^\\]'/]
      }, {
        type: TYPES.FILTER,
        regex: [/^\|\s*(\w+)\(/],
        idx: 1
      }, {
        type: TYPES.FILTEREMPTY,
        regex: [/^\|\s*(\w+)/],
        idx: 1
      }, {
        type: TYPES.FUNCTIONEMPTY,
        regex: [/^\s*(\w+)\(\)/],
        idx: 1
      }, {
        type: TYPES.FUNCTION,
        regex: [/^\s*(\w+)\(/],
        idx: 1
      }, {
        type: TYPES.PARENOPEN,
        regex: [/^\(/]
      }, {
        type: TYPES.PARENCLOSE,
        regex: [/^\)/]
      }, {
        type: TYPES.COMMA,
        regex: [/^,/]
      }, {
        type: TYPES.LOGIC,
        regex: [/^(&&|\|\|)\s*/, /^(and|or)\s+/],
        idx: 1,
        replace: {
          'and': '&&',
          'or': '||'
        }
      }, {
        type: TYPES.COMPARATOR,
        regex: [/^(===|==|\!==|\!=|<=|<|>=|>|in\s|gte\s|gt\s|lte\s|lt\s)\s*/],
        idx: 1,
        replace: {
          'gte': '>=',
          'gt': '>',
          'lte': '<=',
          'lt': '<'
        }
      }, {
        type: TYPES.ASSIGNMENT,
        regex: [/^(=|\+=|-=|\*=|\/=)/]
      }, {
        type: TYPES.NOT,
        regex: [/^\!\s*/, /^not\s+/],
        replace: {'not': '!'}
      }, {
        type: TYPES.BOOL,
        regex: [/^(true|false)\s+/, /^(true|false)$/],
        idx: 1
      }, {
        type: TYPES.VAR,
        regex: [/^[a-zA-Z_$]\w*((\.\$?\w*)+)?/, /^[a-zA-Z_$]\w*/]
      }, {
        type: TYPES.BRACKETOPEN,
        regex: [/^\[/]
      }, {
        type: TYPES.BRACKETCLOSE,
        regex: [/^\]/]
      }, {
        type: TYPES.CURLYOPEN,
        regex: [/^\{/]
      }, {
        type: TYPES.COLON,
        regex: [/^\:/]
      }, {
        type: TYPES.CURLYCLOSE,
        regex: [/^\}/]
      }, {
        type: TYPES.DOTKEY,
        regex: [/^\.(\w+)/],
        idx: 1
      }, {
        type: TYPES.NUMBER,
        regex: [/^[+\-]?\d+(\.\d+)?/]
      }, {
        type: TYPES.OPERATOR,
        regex: [/^(\+|\-|\/|\*|%)/]
      }];
  exports.types = TYPES;
  function reader(str) {
    var matched;
    utils.some(rules, function(rule) {
      return utils.some(rule.regex, function(regex) {
        var match = str.match(regex),
            normalized;
        if (!match) {
          return;
        }
        normalized = match[rule.idx || 0].replace(/\s*$/, '');
        normalized = (rule.hasOwnProperty('replace') && rule.replace.hasOwnProperty(normalized)) ? rule.replace[normalized] : normalized;
        matched = {
          match: normalized,
          type: rule.type,
          length: match[0].length
        };
        return true;
      });
    });
    if (!matched) {
      matched = {
        match: str,
        type: TYPES.UNKNOWN,
        length: str.length
      };
    }
    return matched;
  }
  exports.read = function(str) {
    var offset = 0,
        tokens = [],
        substr,
        match;
    while (offset < str.length) {
      substr = str.substring(offset);
      match = reader(substr);
      offset += match.length;
      tokens.push(match);
    }
    return tokens;
  };
})(require('process'));
