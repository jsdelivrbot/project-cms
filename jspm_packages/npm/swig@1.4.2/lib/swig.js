/* */ 
var utils = require('./utils'),
    _tags = require('./tags/index'),
    _filters = require('./filters'),
    parser = require('./parser'),
    dateformatter = require('./dateformatter'),
    loaders = require('./loaders/index');
exports.version = "1.4.2";
var defaultOptions = {
  autoescape: true,
  varControls: ['{{', '}}'],
  tagControls: ['{%', '%}'],
  cmtControls: ['{#', '#}'],
  locals: {},
  cache: 'memory',
  loader: loaders.fs()
},
    defaultInstance;
function efn() {
  return '';
}
function validateOptions(options) {
  if (!options) {
    return;
  }
  utils.each(['varControls', 'tagControls', 'cmtControls'], function(key) {
    if (!options.hasOwnProperty(key)) {
      return;
    }
    if (!utils.isArray(options[key]) || options[key].length !== 2) {
      throw new Error('Option "' + key + '" must be an array containing 2 different control strings.');
    }
    if (options[key][0] === options[key][1]) {
      throw new Error('Option "' + key + '" open and close controls must not be the same.');
    }
    utils.each(options[key], function(a, i) {
      if (a.length < 2) {
        throw new Error('Option "' + key + '" ' + ((i) ? 'open ' : 'close ') + 'control must be at least 2 characters. Saw "' + a + '" instead.');
      }
    });
  });
  if (options.hasOwnProperty('cache')) {
    if (options.cache && options.cache !== 'memory') {
      if (!options.cache.get || !options.cache.set) {
        throw new Error('Invalid cache option ' + JSON.stringify(options.cache) + ' found. Expected "memory" or { get: function (key) { ... }, set: function (key, value) { ... } }.');
      }
    }
  }
  if (options.hasOwnProperty('loader')) {
    if (options.loader) {
      if (!options.loader.load || !options.loader.resolve) {
        throw new Error('Invalid loader option ' + JSON.stringify(options.loader) + ' found. Expected { load: function (pathname, cb) { ... }, resolve: function (to, from) { ... } }.');
      }
    }
  }
}
exports.setDefaults = function(options) {
  validateOptions(options);
  defaultInstance.options = utils.extend(defaultInstance.options, options);
};
exports.setDefaultTZOffset = function(offset) {
  dateformatter.tzOffset = offset;
};
exports.Swig = function(opts) {
  validateOptions(opts);
  this.options = utils.extend({}, defaultOptions, opts || {});
  this.cache = {};
  this.extensions = {};
  var self = this,
      tags = _tags,
      filters = _filters;
  function getLocals(options) {
    if (!options || !options.locals) {
      return self.options.locals;
    }
    return utils.extend({}, self.options.locals, options.locals);
  }
  function shouldCache(options) {
    options = options || {};
    return (options.hasOwnProperty('cache') && !options.cache) || !self.options.cache;
  }
  function cacheGet(key, options) {
    if (shouldCache(options)) {
      return;
    }
    if (self.options.cache === 'memory') {
      return self.cache[key];
    }
    return self.options.cache.get(key);
  }
  function cacheSet(key, options, val) {
    if (shouldCache(options)) {
      return;
    }
    if (self.options.cache === 'memory') {
      self.cache[key] = val;
      return;
    }
    self.options.cache.set(key, val);
  }
  this.invalidateCache = function() {
    if (self.options.cache === 'memory') {
      self.cache = {};
    }
  };
  this.setFilter = function(name, method) {
    if (typeof method !== "function") {
      throw new Error('Filter "' + name + '" is not a valid function.');
    }
    filters[name] = method;
  };
  this.setTag = function(name, parse, compile, ends, blockLevel) {
    if (typeof parse !== 'function') {
      throw new Error('Tag "' + name + '" parse method is not a valid function.');
    }
    if (typeof compile !== 'function') {
      throw new Error('Tag "' + name + '" compile method is not a valid function.');
    }
    tags[name] = {
      parse: parse,
      compile: compile,
      ends: ends || false,
      block: !!blockLevel
    };
  };
  this.setExtension = function(name, object) {
    self.extensions[name] = object;
  };
  this.parse = function(source, options) {
    validateOptions(options);
    var locals = getLocals(options),
        opts = {},
        k;
    for (k in options) {
      if (options.hasOwnProperty(k) && k !== 'locals') {
        opts[k] = options[k];
      }
    }
    options = utils.extend({}, self.options, opts);
    options.locals = locals;
    return parser.parse(this, source, options, tags, filters);
  };
  this.parseFile = function(pathname, options) {
    var src;
    if (!options) {
      options = {};
    }
    pathname = self.options.loader.resolve(pathname, options.resolveFrom);
    src = self.options.loader.load(pathname);
    if (!options.filename) {
      options = utils.extend({filename: pathname}, options);
    }
    return self.parse(src, options);
  };
  function remapBlocks(blocks, tokens) {
    return utils.map(tokens, function(token) {
      var args = token.args ? token.args.join('') : '';
      if (token.name === 'block' && blocks[args]) {
        token = blocks[args];
      }
      if (token.content && token.content.length) {
        token.content = remapBlocks(blocks, token.content);
      }
      return token;
    });
  }
  function importNonBlocks(blocks, tokens) {
    var temp = [];
    utils.each(blocks, function(block) {
      temp.push(block);
    });
    utils.each(temp.reverse(), function(block) {
      if (block.name !== 'block') {
        tokens.unshift(block);
      }
    });
  }
  function getParents(tokens, options) {
    var parentName = tokens.parent,
        parentFiles = [],
        parents = [],
        parentFile,
        parent,
        l;
    while (parentName) {
      if (!options || !options.filename) {
        throw new Error('Cannot extend "' + parentName + '" because current template has no filename.');
      }
      parentFile = parentFile || options.filename;
      parentFile = self.options.loader.resolve(parentName, parentFile);
      parent = cacheGet(parentFile, options) || self.parseFile(parentFile, utils.extend({}, options, {filename: parentFile}));
      parentName = parent.parent;
      if (parentFiles.indexOf(parentFile) !== -1) {
        throw new Error('Illegal circular extends of "' + parentFile + '".');
      }
      parentFiles.push(parentFile);
      parents.push(parent);
    }
    l = parents.length;
    for (l = parents.length - 2; l >= 0; l -= 1) {
      parents[l].tokens = remapBlocks(parents[l].blocks, parents[l + 1].tokens);
      importNonBlocks(parents[l].blocks, parents[l].tokens);
    }
    return parents;
  }
  this.precompile = function(source, options) {
    var tokens = self.parse(source, options),
        parents = getParents(tokens, options),
        tpl,
        err;
    if (parents.length) {
      tokens.tokens = remapBlocks(tokens.blocks, parents[0].tokens);
      importNonBlocks(tokens.blocks, tokens.tokens);
    }
    try {
      tpl = new Function('_swig', '_ctx', '_filters', '_utils', '_fn', '  var _ext = _swig.extensions,\n' + '    _output = "";\n' + parser.compile(tokens, parents, options) + '\n' + '  return _output;\n');
    } catch (e) {
      utils.throwError(e, null, options.filename);
    }
    return {
      tpl: tpl,
      tokens: tokens
    };
  };
  this.render = function(source, options) {
    return self.compile(source, options)();
  };
  this.renderFile = function(pathName, locals, cb) {
    if (cb) {
      self.compileFile(pathName, {}, function(err, fn) {
        var result;
        if (err) {
          cb(err);
          return;
        }
        try {
          result = fn(locals);
        } catch (err2) {
          cb(err2);
          return;
        }
        cb(null, result);
      });
      return;
    }
    return self.compileFile(pathName)(locals);
  };
  this.compile = function(source, options) {
    var key = options ? options.filename : null,
        cached = key ? cacheGet(key, options) : null,
        context,
        contextLength,
        pre;
    if (cached) {
      return cached;
    }
    context = getLocals(options);
    contextLength = utils.keys(context).length;
    pre = this.precompile(source, options);
    function compiled(locals) {
      var lcls;
      if (locals && contextLength) {
        lcls = utils.extend({}, context, locals);
      } else if (locals && !contextLength) {
        lcls = locals;
      } else if (!locals && contextLength) {
        lcls = context;
      } else {
        lcls = {};
      }
      return pre.tpl(self, lcls, filters, utils, efn);
    }
    utils.extend(compiled, pre.tokens);
    if (key) {
      cacheSet(key, options, compiled);
    }
    return compiled;
  };
  this.compileFile = function(pathname, options, cb) {
    var src,
        cached;
    if (!options) {
      options = {};
    }
    pathname = self.options.loader.resolve(pathname, options.resolveFrom);
    if (!options.filename) {
      options = utils.extend({filename: pathname}, options);
    }
    cached = cacheGet(pathname, options);
    if (cached) {
      if (cb) {
        cb(null, cached);
        return;
      }
      return cached;
    }
    if (cb) {
      self.options.loader.load(pathname, function(err, src) {
        if (err) {
          cb(err);
          return;
        }
        var compiled;
        try {
          compiled = self.compile(src, options);
        } catch (err2) {
          cb(err2);
          return;
        }
        cb(err, compiled);
      });
      return;
    }
    src = self.options.loader.load(pathname);
    return self.compile(src, options);
  };
  this.run = function(tpl, locals, filepath) {
    var context = getLocals({locals: locals});
    if (filepath) {
      cacheSet(filepath, {}, tpl);
    }
    return tpl(self, context, filters, utils, efn);
  };
};
defaultInstance = new exports.Swig();
exports.setFilter = defaultInstance.setFilter;
exports.setTag = defaultInstance.setTag;
exports.setExtension = defaultInstance.setExtension;
exports.parseFile = defaultInstance.parseFile;
exports.precompile = defaultInstance.precompile;
exports.compile = defaultInstance.compile;
exports.compileFile = defaultInstance.compileFile;
exports.render = defaultInstance.render;
exports.renderFile = defaultInstance.renderFile;
exports.run = defaultInstance.run;
exports.invalidateCache = defaultInstance.invalidateCache;
exports.loaders = loaders;
