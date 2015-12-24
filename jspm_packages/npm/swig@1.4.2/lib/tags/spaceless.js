/* */ 
var utils = require('../utils');
exports.compile = function(compiler, args, content, parents, options, blockName) {
  function stripWhitespace(tokens) {
    return utils.map(tokens, function(token) {
      if (token.content || typeof token !== 'string') {
        token.content = stripWhitespace(token.content);
        return token;
      }
      return token.replace(/^\s+/, '').replace(/>\s+</g, '><').replace(/\s+$/, '');
    });
  }
  return compiler(stripWhitespace(content), parents, options, blockName);
};
exports.parse = function(str, line, parser) {
  parser.on('*', function(token) {
    throw new Error('Unexpected token "' + token.match + '" on line ' + line + '.');
  });
  return true;
};
exports.ends = true;
