/* */ 
var utils = require('../utils');
exports.compile = function(compiler, args) {
  var ctx = args.pop(),
      out = '_ctx.' + ctx + ' = {};\n  var _output = "";\n',
      replacements = utils.map(args, function(arg) {
        return {
          ex: new RegExp('_ctx.' + arg.name, 'g'),
          re: '_ctx.' + ctx + '.' + arg.name
        };
      });
  utils.each(args, function(arg) {
    var c = arg.compiled;
    utils.each(replacements, function(re) {
      c = c.replace(re.ex, re.re);
    });
    out += c;
  });
  return out;
};
exports.parse = function(str, line, parser, types, stack, opts, swig) {
  var compiler = require('../parser').compile,
      parseOpts = {resolveFrom: opts.filename},
      compileOpts = utils.extend({}, opts, parseOpts),
      tokens,
      ctx;
  parser.on(types.STRING, function(token) {
    var self = this;
    if (!tokens) {
      tokens = swig.parseFile(token.match.replace(/^("|')|("|')$/g, ''), parseOpts).tokens;
      utils.each(tokens, function(token) {
        var out = '',
            macroName;
        if (!token || token.name !== 'macro' || !token.compile) {
          return;
        }
        macroName = token.args[0];
        out += token.compile(compiler, token.args, token.content, [], compileOpts) + '\n';
        self.out.push({
          compiled: out,
          name: macroName
        });
      });
      return;
    }
    throw new Error('Unexpected string ' + token.match + ' on line ' + line + '.');
  });
  parser.on(types.VAR, function(token) {
    var self = this;
    if (!tokens || ctx) {
      throw new Error('Unexpected variable "' + token.match + '" on line ' + line + '.');
    }
    if (token.match === 'as') {
      return;
    }
    ctx = token.match;
    self.out.push(ctx);
    return false;
  });
  return true;
};
exports.block = true;
