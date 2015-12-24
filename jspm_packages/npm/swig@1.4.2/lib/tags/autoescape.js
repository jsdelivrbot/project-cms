/* */ 
var utils = require('../utils'),
    strings = ['html', 'js'];
exports.compile = function(compiler, args, content, parents, options, blockName) {
  return compiler(content, parents, options, blockName);
};
exports.parse = function(str, line, parser, types, stack, opts) {
  var matched;
  parser.on('*', function(token) {
    if (!matched && (token.type === types.BOOL || (token.type === types.STRING && strings.indexOf(token.match) === -1))) {
      this.out.push(token.match);
      matched = true;
      return;
    }
    utils.throwError('Unexpected token "' + token.match + '" in autoescape tag', line, opts.filename);
  });
  return true;
};
exports.ends = true;
