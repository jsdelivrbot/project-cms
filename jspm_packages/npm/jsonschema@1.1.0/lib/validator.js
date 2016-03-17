/* */ 
'use strict';
var urilib = require('url');
var attribute = require('./attribute');
var helpers = require('./helpers');
var ValidatorResult = helpers.ValidatorResult;
var SchemaError = helpers.SchemaError;
var SchemaContext = helpers.SchemaContext;
var Validator = function Validator() {
  this.customFormats = Object.create(Validator.prototype.customFormats);
  this.schemas = {};
  this.unresolvedRefs = [];
  this.types = Object.create(types);
  this.attributes = Object.create(attribute.validators);
};
Validator.prototype.customFormats = {};
Validator.prototype.schemas = null;
Validator.prototype.types = null;
Validator.prototype.attributes = null;
Validator.prototype.unresolvedRefs = null;
Validator.prototype.addSchema = function addSchema(schema, uri) {
  if (!schema) {
    return null;
  }
  var ourUri = uri || schema.id;
  this.addSubSchema(ourUri, schema);
  if (ourUri) {
    this.schemas[ourUri] = schema;
  }
  return this.schemas[ourUri];
};
Validator.prototype.addSubSchema = function addSubSchema(baseuri, schema) {
  if (!schema || typeof schema != 'object')
    return;
  if (schema.$ref) {
    var resolvedUri = urilib.resolve(baseuri, schema.$ref);
    if (this.schemas[resolvedUri] === undefined) {
      this.schemas[resolvedUri] = null;
      this.unresolvedRefs.push(resolvedUri);
    }
    return;
  }
  var ourUri = schema.id && urilib.resolve(baseuri, schema.id);
  var ourBase = ourUri || baseuri;
  if (ourUri) {
    if (this.schemas[ourUri]) {
      if (!helpers.deepCompareStrict(this.schemas[ourUri], schema)) {
        throw new Error('Schema <' + schema + '> already exists with different definition');
      }
      return this.schemas[ourUri];
    }
    this.schemas[ourUri] = schema;
    var documentUri = ourUri.replace(/^([^#]*)#$/, '$1');
    this.schemas[documentUri] = schema;
  }
  this.addSubSchemaArray(ourBase, ((schema.items instanceof Array) ? schema.items : [schema.items]));
  this.addSubSchemaArray(ourBase, ((schema.extends instanceof Array) ? schema.extends : [schema.extends]));
  this.addSubSchema(ourBase, schema.additionalItems);
  this.addSubSchemaObject(ourBase, schema.properties);
  this.addSubSchema(ourBase, schema.additionalProperties);
  this.addSubSchemaObject(ourBase, schema.definitions);
  this.addSubSchemaObject(ourBase, schema.patternProperties);
  this.addSubSchemaObject(ourBase, schema.dependencies);
  this.addSubSchemaArray(ourBase, schema.disallow);
  this.addSubSchemaArray(ourBase, schema.allOf);
  this.addSubSchemaArray(ourBase, schema.anyOf);
  this.addSubSchemaArray(ourBase, schema.oneOf);
  this.addSubSchema(ourBase, schema.not);
  return this.schemas[ourUri];
};
Validator.prototype.addSubSchemaArray = function addSubSchemaArray(baseuri, schemas) {
  if (!(schemas instanceof Array))
    return;
  for (var i = 0; i < schemas.length; i++) {
    this.addSubSchema(baseuri, schemas[i]);
  }
};
Validator.prototype.addSubSchemaObject = function addSubSchemaArray(baseuri, schemas) {
  if (!schemas || typeof schemas != 'object')
    return;
  for (var p in schemas) {
    this.addSubSchema(baseuri, schemas[p]);
  }
};
Validator.prototype.setSchemas = function setSchemas(schemas) {
  this.schemas = schemas;
};
Validator.prototype.getSchema = function getSchema(urn) {
  return this.schemas[urn];
};
Validator.prototype.validate = function validate(instance, schema, options, ctx) {
  if (!options) {
    options = {};
  }
  var propertyName = options.propertyName || 'instance';
  var base = urilib.resolve(options.base || '/', schema.id || '');
  if (!ctx) {
    ctx = new SchemaContext(schema, options, propertyName, base, Object.create(this.schemas));
    if (!ctx.schemas[base]) {
      ctx.schemas[base] = schema;
    }
  }
  if (schema) {
    var result = this.validateSchema(instance, schema, options, ctx);
    if (!result) {
      throw new Error('Result undefined');
    }
    return result;
  }
  throw new SchemaError('no schema specified', schema);
};
Validator.prototype.validateSchema = function validateSchema(instance, schema, options, ctx) {
  var self = this;
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!schema) {
    throw new Error("schema is undefined");
  }
  function shouldResolve(schema) {
    var ref = (typeof schema === 'string') ? schema : schema.$ref;
    if (typeof ref == 'string')
      return ref;
    return false;
  }
  function resolve(schema, ctx) {
    var ref;
    if (ref = shouldResolve(schema)) {
      return self.resolve(schema, ref, ctx).subschema;
    }
    return schema;
  }
  if (schema['extends']) {
    if (schema['extends'] instanceof Array) {
      schema['extends'].forEach(function(s) {
        schema = helpers.deepMerge(schema, resolve(s, ctx));
      });
    } else {
      schema = helpers.deepMerge(schema, resolve(schema['extends'], ctx));
    }
  }
  var switchSchema;
  if (switchSchema = shouldResolve(schema)) {
    var resolved = this.resolve(schema, switchSchema, ctx);
    var subctx = new SchemaContext(resolved.subschema, options, ctx.propertyPath, resolved.switchSchema, ctx.schemas);
    return this.validateSchema(instance, resolved.subschema, options, subctx);
  }
  var skipAttributes = options && options.skipAttributes || [];
  for (var key in schema) {
    if (!attribute.ignoreProperties[key] && skipAttributes.indexOf(key) < 0) {
      var validatorErr = null;
      var validator = self.attributes[key];
      if (validator) {
        validatorErr = validator.call(self, instance, schema, options, ctx);
      } else if (options.allowUnknownAttributes === false) {
        throw new SchemaError("Unsupported attribute: " + key, schema);
      }
      if (validatorErr) {
        result.importErrors(validatorErr);
      }
    }
  }
  if (typeof options.rewrite == 'function') {
    var value = options.rewrite.call(this, instance, schema, options, ctx);
    result.instance = value;
  }
  return result;
};
Validator.prototype.resolve = function resolve(schema, switchSchema, ctx) {
  switchSchema = ctx.resolve(switchSchema);
  if (ctx.schemas[switchSchema]) {
    return {
      subschema: ctx.schemas[switchSchema],
      switchSchema: switchSchema
    };
  }
  var parsed = urilib.parse(switchSchema);
  var fragment = parsed && parsed.hash;
  var document = fragment && fragment.length && switchSchema.substr(0, switchSchema.length - fragment.length);
  if (!document || !ctx.schemas[document]) {
    throw new SchemaError("no such schema <" + switchSchema + ">", schema);
  }
  var subschema = helpers.objectGetPath(ctx.schemas[document], fragment.substr(1));
  if (subschema === undefined) {
    throw new SchemaError("no such schema " + fragment + " located in <" + document + ">", schema);
  }
  return {
    subschema: subschema,
    switchSchema: switchSchema
  };
};
Validator.prototype.testType = function validateType(instance, schema, options, ctx, type) {
  if (typeof this.types[type] == 'function') {
    return this.types[type].call(this, instance);
  }
  if (type && typeof type == 'object') {
    var res = this.validateSchema(instance, type, options, ctx);
    return res === undefined || !(res && res.errors.length);
  }
  return true;
};
var types = Validator.prototype.types = {};
types.string = function testString(instance) {
  return typeof instance == 'string';
};
types.number = function testNumber(instance) {
  return typeof instance == 'number' && isFinite(instance);
};
types.integer = function testInteger(instance) {
  return (typeof instance == 'number') && instance % 1 === 0;
};
types.boolean = function testBoolean(instance) {
  return typeof instance == 'boolean';
};
types.array = function testArray(instance) {
  return instance instanceof Array;
};
types['null'] = function testNull(instance) {
  return instance === null;
};
types.date = function testDate(instance) {
  return instance instanceof Date;
};
types.any = function testAny(instance) {
  return true;
};
types.object = function testObject(instance) {
  return instance && (typeof instance) === 'object' && !(instance instanceof Array) && !(instance instanceof Date);
};
module.exports = Validator;
