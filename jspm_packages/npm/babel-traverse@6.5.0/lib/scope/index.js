/* */ 
"use strict";
var _classCallCheck = require('babel-runtime/helpers/class-call-check')["default"];
var _Symbol = require('babel-runtime/core-js/symbol')["default"];
var _getIterator = require('babel-runtime/core-js/get-iterator')["default"];
var _Object$create = require('babel-runtime/core-js/object/create')["default"];
var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')["default"];
var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')["default"];
exports.__esModule = true;
var _lodashCollectionIncludes = require('lodash/collection/includes');
var _lodashCollectionIncludes2 = _interopRequireDefault(_lodashCollectionIncludes);
var _repeating = require('repeating');
var _repeating2 = _interopRequireDefault(_repeating);
var _libRenamer = require('./lib/renamer');
var _libRenamer2 = _interopRequireDefault(_libRenamer);
var _index = require('../index');
var _index2 = _interopRequireDefault(_index);
var _lodashObjectDefaults = require('lodash/object/defaults');
var _lodashObjectDefaults2 = _interopRequireDefault(_lodashObjectDefaults);
var _babelMessages = require('babel-messages');
var messages = _interopRequireWildcard(_babelMessages);
var _binding = require('./binding');
var _binding2 = _interopRequireDefault(_binding);
var _globals = require('globals');
var _globals2 = _interopRequireDefault(_globals);
var _babelTypes = require('babel-types');
var t = _interopRequireWildcard(_babelTypes);
var CACHE_SINGLE_KEY = _Symbol();
var CACHE_MULTIPLE_KEY = _Symbol();
function getCache(node, parentScope, self) {
  var singleCache = node[CACHE_SINGLE_KEY];
  if (singleCache) {
    if (matchesParent(singleCache, parentScope)) {
      return singleCache;
    }
  } else if (!node[CACHE_MULTIPLE_KEY]) {
    node[CACHE_SINGLE_KEY] = self;
    return;
  }
  return getCacheMultiple(node, parentScope, self, singleCache);
}
function matchesParent(scope, parentScope) {
  if (scope.parent === parentScope) {
    return true;
  }
}
function getCacheMultiple(node, parentScope, self, singleCache) {
  var scopes = node[CACHE_MULTIPLE_KEY] = node[CACHE_MULTIPLE_KEY] || [];
  if (singleCache) {
    scopes.push(singleCache);
    node[CACHE_SINGLE_KEY] = null;
  }
  for (var _iterator = scopes,
      _isArray = Array.isArray(_iterator),
      _i = 0,
      _iterator = _isArray ? _iterator : _getIterator(_iterator); ; ) {
    var _ref;
    if (_isArray) {
      if (_i >= _iterator.length)
        break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done)
        break;
      _ref = _i.value;
    }
    var scope = _ref;
    if (matchesParent(scope, parentScope))
      return scope;
  }
  scopes.push(self);
}
var collectorVisitor = {
  For: function For(path) {
    for (var _iterator2 = (t.FOR_INIT_KEYS),
        _isArray2 = Array.isArray(_iterator2),
        _i2 = 0,
        _iterator2 = _isArray2 ? _iterator2 : _getIterator(_iterator2); ; ) {
      var _ref2;
      if (_isArray2) {
        if (_i2 >= _iterator2.length)
          break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done)
          break;
        _ref2 = _i2.value;
      }
      var key = _ref2;
      var declar = path.get(key);
      if (declar.isVar())
        path.scope.getFunctionParent().registerBinding("var", declar);
    }
  },
  Declaration: function Declaration(path) {
    if (path.isBlockScoped())
      return;
    if (path.isExportDeclaration() && path.get("declaration").isDeclaration())
      return;
    path.scope.getFunctionParent().registerDeclaration(path);
  },
  ReferencedIdentifier: function ReferencedIdentifier(path, state) {
    state.references.push(path);
  },
  ForXStatement: function ForXStatement(path, state) {
    var left = path.get("left");
    if (left.isPattern() || left.isIdentifier()) {
      state.constantViolations.push(left);
    }
  },
  ExportDeclaration: {exit: function exit(_ref20) {
      var node = _ref20.node;
      var scope = _ref20.scope;
      var declar = node.declaration;
      if (t.isClassDeclaration(declar) || t.isFunctionDeclaration(declar)) {
        var _id = declar.id;
        if (!_id)
          return;
        var binding = scope.getBinding(_id.name);
        if (binding)
          binding.reference();
      } else if (t.isVariableDeclaration(declar)) {
        for (var _iterator3 = (declar.declarations),
            _isArray3 = Array.isArray(_iterator3),
            _i3 = 0,
            _iterator3 = _isArray3 ? _iterator3 : _getIterator(_iterator3); ; ) {
          var _ref3;
          if (_isArray3) {
            if (_i3 >= _iterator3.length)
              break;
            _ref3 = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();
            if (_i3.done)
              break;
            _ref3 = _i3.value;
          }
          var decl = _ref3;
          var ids = t.getBindingIdentifiers(decl);
          for (var _name in ids) {
            var binding = scope.getBinding(_name);
            if (binding)
              binding.reference();
          }
        }
      }
    }},
  LabeledStatement: function LabeledStatement(path) {
    path.scope.getProgramParent().addGlobal(path.node);
    path.scope.getBlockParent().registerDeclaration(path);
  },
  AssignmentExpression: function AssignmentExpression(path, state) {
    state.assignments.push(path);
  },
  UpdateExpression: function UpdateExpression(path, state) {
    state.constantViolations.push(path.get("argument"));
  },
  UnaryExpression: function UnaryExpression(path, state) {
    if (path.node.operator === "delete") {
      state.constantViolations.push(path.get("argument"));
    }
  },
  BlockScoped: function BlockScoped(path) {
    var scope = path.scope;
    if (scope.path === path)
      scope = scope.parent;
    scope.getBlockParent().registerDeclaration(path);
  },
  ClassDeclaration: function ClassDeclaration(path) {
    var id = path.node.id;
    if (!id)
      return;
    var name = id.name;
    path.scope.bindings[name] = path.scope.getBinding(name);
  },
  Block: function Block(path) {
    var paths = path.get("body");
    for (var _iterator4 = (paths),
        _isArray4 = Array.isArray(_iterator4),
        _i4 = 0,
        _iterator4 = _isArray4 ? _iterator4 : _getIterator(_iterator4); ; ) {
      var _ref4;
      if (_isArray4) {
        if (_i4 >= _iterator4.length)
          break;
        _ref4 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done)
          break;
        _ref4 = _i4.value;
      }
      var bodyPath = _ref4;
      if (bodyPath.isFunctionDeclaration()) {
        path.scope.getBlockParent().registerDeclaration(bodyPath);
      }
    }
  }
};
var uid = 0;
var Scope = (function() {
  function Scope(path, parentScope) {
    _classCallCheck(this, Scope);
    if (parentScope && parentScope.block === path.node) {
      return parentScope;
    }
    var cached = getCache(path.node, parentScope, this);
    if (cached)
      return cached;
    this.uid = uid++;
    this.parent = parentScope;
    this.hub = path.hub;
    this.parentBlock = path.parent;
    this.block = path.node;
    this.path = path;
  }
  Scope.prototype.traverse = function traverse(node, opts, state) {
    _index2["default"](node, opts, this, state, this.path);
  };
  Scope.prototype.generateDeclaredUidIdentifier = function generateDeclaredUidIdentifier() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? "temp" : arguments[0];
    var id = this.generateUidIdentifier(name);
    this.push({id: id});
    return id;
  };
  Scope.prototype.generateUidIdentifier = function generateUidIdentifier() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? "temp" : arguments[0];
    return t.identifier(this.generateUid(name));
  };
  Scope.prototype.generateUid = function generateUid() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? "temp" : arguments[0];
    name = t.toIdentifier(name).replace(/^_+/, "").replace(/[0-9]+$/g, "");
    var uid = undefined;
    var i = 0;
    do {
      uid = this._generateUid(name, i);
      i++;
    } while (this.hasBinding(uid) || this.hasGlobal(uid) || this.hasReference(uid));
    var program = this.getProgramParent();
    program.references[uid] = true;
    program.uids[uid] = true;
    return uid;
  };
  Scope.prototype._generateUid = function _generateUid(name, i) {
    var id = name;
    if (i > 1)
      id += i;
    return "_" + id;
  };
  Scope.prototype.generateUidIdentifierBasedOnNode = function generateUidIdentifierBasedOnNode(parent, defaultName) {
    var node = parent;
    if (t.isAssignmentExpression(parent)) {
      node = parent.left;
    } else if (t.isVariableDeclarator(parent)) {
      node = parent.id;
    } else if (t.isObjectProperty(node) || t.isObjectMethod(node)) {
      node = node.key;
    }
    var parts = [];
    var add = function add(node) {
      if (t.isModuleDeclaration(node)) {
        if (node.source) {
          add(node.source);
        } else if (node.specifiers && node.specifiers.length) {
          for (var _iterator5 = (node.specifiers),
              _isArray5 = Array.isArray(_iterator5),
              _i5 = 0,
              _iterator5 = _isArray5 ? _iterator5 : _getIterator(_iterator5); ; ) {
            var _ref5;
            if (_isArray5) {
              if (_i5 >= _iterator5.length)
                break;
              _ref5 = _iterator5[_i5++];
            } else {
              _i5 = _iterator5.next();
              if (_i5.done)
                break;
              _ref5 = _i5.value;
            }
            var specifier = _ref5;
            add(specifier);
          }
        } else if (node.declaration) {
          add(node.declaration);
        }
      } else if (t.isModuleSpecifier(node)) {
        add(node.local);
      } else if (t.isMemberExpression(node)) {
        add(node.object);
        add(node.property);
      } else if (t.isIdentifier(node)) {
        parts.push(node.name);
      } else if (t.isLiteral(node)) {
        parts.push(node.value);
      } else if (t.isCallExpression(node)) {
        add(node.callee);
      } else if (t.isObjectExpression(node) || t.isObjectPattern(node)) {
        for (var _iterator6 = (node.properties),
            _isArray6 = Array.isArray(_iterator6),
            _i6 = 0,
            _iterator6 = _isArray6 ? _iterator6 : _getIterator(_iterator6); ; ) {
          var _ref6;
          if (_isArray6) {
            if (_i6 >= _iterator6.length)
              break;
            _ref6 = _iterator6[_i6++];
          } else {
            _i6 = _iterator6.next();
            if (_i6.done)
              break;
            _ref6 = _i6.value;
          }
          var prop = _ref6;
          add(prop.key || prop.argument);
        }
      }
    };
    add(node);
    var id = parts.join("$");
    id = id.replace(/^_/, "") || defaultName || "ref";
    return this.generateUidIdentifier(id.slice(0, 20));
  };
  Scope.prototype.isStatic = function isStatic(node) {
    if (t.isThisExpression(node) || t.isSuper(node)) {
      return true;
    }
    if (t.isIdentifier(node)) {
      var binding = this.getBinding(node.name);
      if (binding) {
        return binding.constant;
      } else {
        return this.hasBinding(node.name);
      }
    }
    return false;
  };
  Scope.prototype.maybeGenerateMemoised = function maybeGenerateMemoised(node, dontPush) {
    if (this.isStatic(node)) {
      return null;
    } else {
      var _id2 = this.generateUidIdentifierBasedOnNode(node);
      if (!dontPush)
        this.push({id: _id2});
      return _id2;
    }
  };
  Scope.prototype.checkBlockScopedCollisions = function checkBlockScopedCollisions(local, kind, name, id) {
    if (kind === "param")
      return;
    if (kind === "hoisted" && local.kind === "let")
      return;
    var duplicate = false;
    if (!duplicate)
      duplicate = kind === "let" || local.kind === "let" || local.kind === "const" || local.kind === "module";
    if (!duplicate)
      duplicate = local.kind === "param" && (kind === "let" || kind === "const");
    if (duplicate) {
      throw this.hub.file.buildCodeFrameError(id, messages.get("scopeDuplicateDeclaration", name), TypeError);
    }
  };
  Scope.prototype.rename = function rename(oldName, newName, block) {
    var binding = this.getBinding(oldName);
    if (binding) {
      newName = newName || this.generateUidIdentifier(oldName).name;
      return new _libRenamer2["default"](binding, oldName, newName).rename(block);
    }
  };
  Scope.prototype._renameFromMap = function _renameFromMap(map, oldName, newName, value) {
    if (map[oldName]) {
      map[newName] = value;
      map[oldName] = null;
    }
  };
  Scope.prototype.dump = function dump() {
    var sep = _repeating2["default"]("-", 60);
    console.log(sep);
    var scope = this;
    do {
      console.log("#", scope.block.type);
      for (var _name2 in scope.bindings) {
        var binding = scope.bindings[_name2];
        console.log(" -", _name2, {
          constant: binding.constant,
          references: binding.references,
          violations: binding.constantViolations.length,
          kind: binding.kind
        });
      }
    } while (scope = scope.parent);
    console.log(sep);
  };
  Scope.prototype.toArray = function toArray(node, i) {
    var file = this.hub.file;
    if (t.isIdentifier(node)) {
      var binding = this.getBinding(node.name);
      if (binding && binding.constant && binding.path.isGenericType("Array"))
        return node;
    }
    if (t.isArrayExpression(node)) {
      return node;
    }
    if (t.isIdentifier(node, {name: "arguments"})) {
      return t.callExpression(t.memberExpression(t.memberExpression(t.memberExpression(t.identifier("Array"), t.identifier("prototype")), t.identifier("slice")), t.identifier("call")), [node]);
    }
    var helperName = "toArray";
    var args = [node];
    if (i === true) {
      helperName = "toConsumableArray";
    } else if (i) {
      args.push(t.numericLiteral(i));
      helperName = "slicedToArray";
    }
    return t.callExpression(file.addHelper(helperName), args);
  };
  Scope.prototype.registerDeclaration = function registerDeclaration(path) {
    if (path.isLabeledStatement()) {
      this.registerBinding("label", path);
    } else if (path.isFunctionDeclaration()) {
      this.registerBinding("hoisted", path.get("id"), path);
    } else if (path.isVariableDeclaration()) {
      var declarations = path.get("declarations");
      for (var _iterator7 = (declarations),
          _isArray7 = Array.isArray(_iterator7),
          _i7 = 0,
          _iterator7 = _isArray7 ? _iterator7 : _getIterator(_iterator7); ; ) {
        var _ref7;
        if (_isArray7) {
          if (_i7 >= _iterator7.length)
            break;
          _ref7 = _iterator7[_i7++];
        } else {
          _i7 = _iterator7.next();
          if (_i7.done)
            break;
          _ref7 = _i7.value;
        }
        var declar = _ref7;
        this.registerBinding(path.node.kind, declar);
      }
    } else if (path.isClassDeclaration()) {
      this.registerBinding("let", path);
    } else if (path.isImportDeclaration()) {
      var specifiers = path.get("specifiers");
      for (var _iterator8 = (specifiers),
          _isArray8 = Array.isArray(_iterator8),
          _i8 = 0,
          _iterator8 = _isArray8 ? _iterator8 : _getIterator(_iterator8); ; ) {
        var _ref8;
        if (_isArray8) {
          if (_i8 >= _iterator8.length)
            break;
          _ref8 = _iterator8[_i8++];
        } else {
          _i8 = _iterator8.next();
          if (_i8.done)
            break;
          _ref8 = _i8.value;
        }
        var specifier = _ref8;
        this.registerBinding("module", specifier);
      }
    } else if (path.isExportDeclaration()) {
      var declar = path.get("declaration");
      if (declar.isClassDeclaration() || declar.isFunctionDeclaration() || declar.isVariableDeclaration()) {
        this.registerDeclaration(declar);
      }
    } else {
      this.registerBinding("unknown", path);
    }
  };
  Scope.prototype.buildUndefinedNode = function buildUndefinedNode() {
    if (this.hasBinding("undefined")) {
      return t.unaryExpression("void", t.numericLiteral(0), true);
    } else {
      return t.identifier("undefined");
    }
  };
  Scope.prototype.registerConstantViolation = function registerConstantViolation(path) {
    var ids = path.getBindingIdentifiers();
    for (var _name3 in ids) {
      var binding = this.getBinding(_name3);
      if (binding)
        binding.reassign(path);
    }
  };
  Scope.prototype.registerBinding = function registerBinding(kind, path) {
    var bindingPath = arguments.length <= 2 || arguments[2] === undefined ? path : arguments[2];
    return (function() {
      if (!kind)
        throw new ReferenceError("no `kind`");
      if (path.isVariableDeclaration()) {
        var declarators = path.get("declarations");
        for (var _iterator9 = declarators,
            _isArray9 = Array.isArray(_iterator9),
            _i9 = 0,
            _iterator9 = _isArray9 ? _iterator9 : _getIterator(_iterator9); ; ) {
          var _ref9;
          if (_isArray9) {
            if (_i9 >= _iterator9.length)
              break;
            _ref9 = _iterator9[_i9++];
          } else {
            _i9 = _iterator9.next();
            if (_i9.done)
              break;
            _ref9 = _i9.value;
          }
          var declar = _ref9;
          this.registerBinding(kind, declar);
        }
        return;
      }
      var parent = this.getProgramParent();
      var ids = path.getBindingIdentifiers(true);
      for (var _name4 in ids) {
        for (var _iterator10 = (ids[_name4]),
            _isArray10 = Array.isArray(_iterator10),
            _i10 = 0,
            _iterator10 = _isArray10 ? _iterator10 : _getIterator(_iterator10); ; ) {
          var _ref10;
          if (_isArray10) {
            if (_i10 >= _iterator10.length)
              break;
            _ref10 = _iterator10[_i10++];
          } else {
            _i10 = _iterator10.next();
            if (_i10.done)
              break;
            _ref10 = _i10.value;
          }
          var _id3 = _ref10;
          var local = this.getOwnBinding(_name4);
          if (local) {
            if (local.identifier === _id3)
              continue;
            this.checkBlockScopedCollisions(local, kind, _name4, _id3);
          }
          parent.references[_name4] = true;
          this.bindings[_name4] = new _binding2["default"]({
            identifier: _id3,
            existing: local,
            scope: this,
            path: bindingPath,
            kind: kind
          });
        }
      }
    }).apply(this, arguments);
  };
  Scope.prototype.addGlobal = function addGlobal(node) {
    this.globals[node.name] = node;
  };
  Scope.prototype.hasUid = function hasUid(name) {
    var scope = this;
    do {
      if (scope.uids[name])
        return true;
    } while (scope = scope.parent);
    return false;
  };
  Scope.prototype.hasGlobal = function hasGlobal(name) {
    var scope = this;
    do {
      if (scope.globals[name])
        return true;
    } while (scope = scope.parent);
    return false;
  };
  Scope.prototype.hasReference = function hasReference(name) {
    var scope = this;
    do {
      if (scope.references[name])
        return true;
    } while (scope = scope.parent);
    return false;
  };
  Scope.prototype.isPure = function isPure(node, constantsOnly) {
    if (t.isIdentifier(node)) {
      var binding = this.getBinding(node.name);
      if (!binding)
        return false;
      if (constantsOnly)
        return binding.constant;
      return true;
    } else if (t.isClass(node)) {
      if (node.superClass && !this.isPure(node.superClass, constantsOnly))
        return false;
      return this.isPure(node.body, constantsOnly);
    } else if (t.isClassBody(node)) {
      for (var _iterator11 = node.body,
          _isArray11 = Array.isArray(_iterator11),
          _i11 = 0,
          _iterator11 = _isArray11 ? _iterator11 : _getIterator(_iterator11); ; ) {
        var _ref11;
        if (_isArray11) {
          if (_i11 >= _iterator11.length)
            break;
          _ref11 = _iterator11[_i11++];
        } else {
          _i11 = _iterator11.next();
          if (_i11.done)
            break;
          _ref11 = _i11.value;
        }
        var method = _ref11;
        if (!this.isPure(method, constantsOnly))
          return false;
      }
      return true;
    } else if (t.isBinary(node)) {
      return this.isPure(node.left, constantsOnly) && this.isPure(node.right, constantsOnly);
    } else if (t.isArrayExpression(node)) {
      for (var _iterator12 = (node.elements),
          _isArray12 = Array.isArray(_iterator12),
          _i12 = 0,
          _iterator12 = _isArray12 ? _iterator12 : _getIterator(_iterator12); ; ) {
        var _ref12;
        if (_isArray12) {
          if (_i12 >= _iterator12.length)
            break;
          _ref12 = _iterator12[_i12++];
        } else {
          _i12 = _iterator12.next();
          if (_i12.done)
            break;
          _ref12 = _i12.value;
        }
        var elem = _ref12;
        if (!this.isPure(elem, constantsOnly))
          return false;
      }
      return true;
    } else if (t.isObjectExpression(node)) {
      for (var _iterator13 = (node.properties),
          _isArray13 = Array.isArray(_iterator13),
          _i13 = 0,
          _iterator13 = _isArray13 ? _iterator13 : _getIterator(_iterator13); ; ) {
        var _ref13;
        if (_isArray13) {
          if (_i13 >= _iterator13.length)
            break;
          _ref13 = _iterator13[_i13++];
        } else {
          _i13 = _iterator13.next();
          if (_i13.done)
            break;
          _ref13 = _i13.value;
        }
        var prop = _ref13;
        if (!this.isPure(prop, constantsOnly))
          return false;
      }
      return true;
    } else if (t.isClassMethod(node)) {
      if (node.computed && !this.isPure(node.key, constantsOnly))
        return false;
      if (node.kind === "get" || node.kind === "set")
        return false;
      return true;
    } else if (t.isClassProperty(node) || t.isObjectProperty(node)) {
      if (node.computed && !this.isPure(node.key, constantsOnly))
        return false;
      return this.isPure(node.value, constantsOnly);
    } else if (t.isUnaryExpression(node)) {
      return this.isPure(node.argument, constantsOnly);
    } else {
      return t.isPureish(node);
    }
  };
  Scope.prototype.setData = function setData(key, val) {
    return this.data[key] = val;
  };
  Scope.prototype.getData = function getData(key) {
    var scope = this;
    do {
      var data = scope.data[key];
      if (data != null)
        return data;
    } while (scope = scope.parent);
  };
  Scope.prototype.removeData = function removeData(key) {
    var scope = this;
    do {
      var data = scope.data[key];
      if (data != null)
        scope.data[key] = null;
    } while (scope = scope.parent);
  };
  Scope.prototype.init = function init() {
    if (!this.references)
      this.crawl();
  };
  Scope.prototype.crawl = function crawl() {
    var path = this.path;
    this.references = _Object$create(null);
    this.bindings = _Object$create(null);
    this.globals = _Object$create(null);
    this.uids = _Object$create(null);
    this.data = _Object$create(null);
    if (path.isLoop()) {
      for (var _iterator14 = (t.FOR_INIT_KEYS),
          _isArray14 = Array.isArray(_iterator14),
          _i14 = 0,
          _iterator14 = _isArray14 ? _iterator14 : _getIterator(_iterator14); ; ) {
        var _ref14;
        if (_isArray14) {
          if (_i14 >= _iterator14.length)
            break;
          _ref14 = _iterator14[_i14++];
        } else {
          _i14 = _iterator14.next();
          if (_i14.done)
            break;
          _ref14 = _i14.value;
        }
        var key = _ref14;
        var node = path.get(key);
        if (node.isBlockScoped())
          this.registerBinding(node.node.kind, node);
      }
    }
    if (path.isFunctionExpression() && path.has("id")) {
      if (!path.get("id").node[t.NOT_LOCAL_BINDING]) {
        this.registerBinding("local", path.get("id"), path);
      }
    }
    if (path.isClassExpression() && path.has("id")) {
      if (!path.get("id").node[t.NOT_LOCAL_BINDING]) {
        this.registerBinding("local", path);
      }
    }
    if (path.isFunction()) {
      var params = path.get("params");
      for (var _iterator15 = params,
          _isArray15 = Array.isArray(_iterator15),
          _i15 = 0,
          _iterator15 = _isArray15 ? _iterator15 : _getIterator(_iterator15); ; ) {
        var _ref15;
        if (_isArray15) {
          if (_i15 >= _iterator15.length)
            break;
          _ref15 = _iterator15[_i15++];
        } else {
          _i15 = _iterator15.next();
          if (_i15.done)
            break;
          _ref15 = _i15.value;
        }
        var param = _ref15;
        this.registerBinding("param", param);
      }
    }
    if (path.isCatchClause()) {
      this.registerBinding("let", path);
    }
    var parent = this.getProgramParent();
    if (parent.crawling)
      return;
    var state = {
      references: [],
      constantViolations: [],
      assignments: []
    };
    this.crawling = true;
    path.traverse(collectorVisitor, state);
    this.crawling = false;
    for (var _iterator16 = state.assignments,
        _isArray16 = Array.isArray(_iterator16),
        _i16 = 0,
        _iterator16 = _isArray16 ? _iterator16 : _getIterator(_iterator16); ; ) {
      var _ref16;
      if (_isArray16) {
        if (_i16 >= _iterator16.length)
          break;
        _ref16 = _iterator16[_i16++];
      } else {
        _i16 = _iterator16.next();
        if (_i16.done)
          break;
        _ref16 = _i16.value;
      }
      var _path = _ref16;
      var ids = _path.getBindingIdentifiers();
      var programParent = undefined;
      for (var _name5 in ids) {
        if (_path.scope.getBinding(_name5))
          continue;
        programParent = programParent || _path.scope.getProgramParent();
        programParent.addGlobal(ids[_name5]);
      }
      _path.scope.registerConstantViolation(_path);
    }
    for (var _iterator17 = state.references,
        _isArray17 = Array.isArray(_iterator17),
        _i17 = 0,
        _iterator17 = _isArray17 ? _iterator17 : _getIterator(_iterator17); ; ) {
      var _ref17;
      if (_isArray17) {
        if (_i17 >= _iterator17.length)
          break;
        _ref17 = _iterator17[_i17++];
      } else {
        _i17 = _iterator17.next();
        if (_i17.done)
          break;
        _ref17 = _i17.value;
      }
      var ref = _ref17;
      var binding = ref.scope.getBinding(ref.node.name);
      if (binding) {
        binding.reference(ref);
      } else {
        ref.scope.getProgramParent().addGlobal(ref.node);
      }
    }
    for (var _iterator18 = state.constantViolations,
        _isArray18 = Array.isArray(_iterator18),
        _i18 = 0,
        _iterator18 = _isArray18 ? _iterator18 : _getIterator(_iterator18); ; ) {
      var _ref18;
      if (_isArray18) {
        if (_i18 >= _iterator18.length)
          break;
        _ref18 = _iterator18[_i18++];
      } else {
        _i18 = _iterator18.next();
        if (_i18.done)
          break;
        _ref18 = _i18.value;
      }
      var _path2 = _ref18;
      _path2.scope.registerConstantViolation(_path2);
    }
  };
  Scope.prototype.push = function push(opts) {
    var path = this.path;
    if (!path.isBlockStatement() && !path.isProgram()) {
      path = this.getBlockParent().path;
    }
    if (path.isSwitchStatement()) {
      path = this.getFunctionParent().path;
    }
    if (path.isLoop() || path.isCatchClause() || path.isFunction()) {
      t.ensureBlock(path.node);
      path = path.get("body");
    }
    var unique = opts.unique;
    var kind = opts.kind || "var";
    var blockHoist = opts._blockHoist == null ? 2 : opts._blockHoist;
    var dataKey = "declaration:" + kind + ":" + blockHoist;
    var declarPath = !unique && path.getData(dataKey);
    if (!declarPath) {
      var declar = t.variableDeclaration(kind, []);
      declar._generated = true;
      declar._blockHoist = blockHoist;
      var _path$unshiftContainer = path.unshiftContainer("body", [declar]);
      declarPath = _path$unshiftContainer[0];
      if (!unique)
        path.setData(dataKey, declarPath);
    }
    var declarator = t.variableDeclarator(opts.id, opts.init);
    declarPath.node.declarations.push(declarator);
    this.registerBinding(kind, declarPath.get("declarations").pop());
  };
  Scope.prototype.getProgramParent = function getProgramParent() {
    var scope = this;
    do {
      if (scope.path.isProgram()) {
        return scope;
      }
    } while (scope = scope.parent);
    throw new Error("We couldn't find a Function or Program...");
  };
  Scope.prototype.getFunctionParent = function getFunctionParent() {
    var scope = this;
    do {
      if (scope.path.isFunctionParent()) {
        return scope;
      }
    } while (scope = scope.parent);
    throw new Error("We couldn't find a Function or Program...");
  };
  Scope.prototype.getBlockParent = function getBlockParent() {
    var scope = this;
    do {
      if (scope.path.isBlockParent()) {
        return scope;
      }
    } while (scope = scope.parent);
    throw new Error("We couldn't find a BlockStatement, For, Switch, Function, Loop or Program...");
  };
  Scope.prototype.getAllBindings = function getAllBindings() {
    var ids = _Object$create(null);
    var scope = this;
    do {
      _lodashObjectDefaults2["default"](ids, scope.bindings);
      scope = scope.parent;
    } while (scope);
    return ids;
  };
  Scope.prototype.getAllBindingsOfKind = function getAllBindingsOfKind() {
    var ids = _Object$create(null);
    for (var _iterator19 = (arguments),
        _isArray19 = Array.isArray(_iterator19),
        _i19 = 0,
        _iterator19 = _isArray19 ? _iterator19 : _getIterator(_iterator19); ; ) {
      var _ref19;
      if (_isArray19) {
        if (_i19 >= _iterator19.length)
          break;
        _ref19 = _iterator19[_i19++];
      } else {
        _i19 = _iterator19.next();
        if (_i19.done)
          break;
        _ref19 = _i19.value;
      }
      var kind = _ref19;
      var scope = this;
      do {
        for (var _name6 in scope.bindings) {
          var binding = scope.bindings[_name6];
          if (binding.kind === kind)
            ids[_name6] = binding;
        }
        scope = scope.parent;
      } while (scope);
    }
    return ids;
  };
  Scope.prototype.bindingIdentifierEquals = function bindingIdentifierEquals(name, node) {
    return this.getBindingIdentifier(name) === node;
  };
  Scope.prototype.getBinding = function getBinding(name) {
    var scope = this;
    do {
      var binding = scope.getOwnBinding(name);
      if (binding)
        return binding;
    } while (scope = scope.parent);
  };
  Scope.prototype.getOwnBinding = function getOwnBinding(name) {
    return this.bindings[name];
  };
  Scope.prototype.getBindingIdentifier = function getBindingIdentifier(name) {
    var info = this.getBinding(name);
    return info && info.identifier;
  };
  Scope.prototype.getOwnBindingIdentifier = function getOwnBindingIdentifier(name) {
    var binding = this.bindings[name];
    return binding && binding.identifier;
  };
  Scope.prototype.hasOwnBinding = function hasOwnBinding(name) {
    return !!this.getOwnBinding(name);
  };
  Scope.prototype.hasBinding = function hasBinding(name, noGlobals) {
    if (!name)
      return false;
    if (this.hasOwnBinding(name))
      return true;
    if (this.parentHasBinding(name, noGlobals))
      return true;
    if (this.hasUid(name))
      return true;
    if (!noGlobals && _lodashCollectionIncludes2["default"](Scope.globals, name))
      return true;
    if (!noGlobals && _lodashCollectionIncludes2["default"](Scope.contextVariables, name))
      return true;
    return false;
  };
  Scope.prototype.parentHasBinding = function parentHasBinding(name, noGlobals) {
    return this.parent && this.parent.hasBinding(name, noGlobals);
  };
  Scope.prototype.moveBindingTo = function moveBindingTo(name, scope) {
    var info = this.getBinding(name);
    if (info) {
      info.scope.removeOwnBinding(name);
      info.scope = scope;
      scope.bindings[name] = info;
    }
  };
  Scope.prototype.removeOwnBinding = function removeOwnBinding(name) {
    delete this.bindings[name];
  };
  Scope.prototype.removeBinding = function removeBinding(name) {
    var info = this.getBinding(name);
    if (info) {
      info.scope.removeOwnBinding(name);
    }
    var scope = this;
    do {
      if (scope.uids[name]) {
        scope.uids[name] = false;
      }
    } while (scope = scope.parent);
  };
  return Scope;
})();
exports["default"] = Scope;
module.exports = exports["default"];
