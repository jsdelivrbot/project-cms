/* */ 
'use strict';
var helpers = require('./helpers');
var ValidatorResult = helpers.ValidatorResult;
var SchemaError = helpers.SchemaError;
var attribute = {};
attribute.ignoreProperties = {
  'id': true,
  'default': true,
  'description': true,
  'title': true,
  'exclusiveMinimum': true,
  'exclusiveMaximum': true,
  'additionalItems': true,
  '$schema': true,
  '$ref': true,
  'extends': true
};
var validators = attribute.validators = {};
validators.type = function validateType(instance, schema, options, ctx) {
  if (instance === undefined) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  var types = (schema.type instanceof Array) ? schema.type : [schema.type];
  if (!types.some(this.testType.bind(this, instance, schema, options, ctx))) {
    var list = types.map(function(v) {
      return v.id && ('<' + v.id + '>') || (v + '');
    });
    result.addError({
      name: 'type',
      argument: list,
      message: "is not of a type(s) " + list
    });
  }
  return result;
};
function testSchema(instance, options, ctx, schema) {
  return this.validateSchema(instance, schema, options, ctx).valid;
}
validators.anyOf = function validateAnyOf(instance, schema, options, ctx) {
  if (instance === undefined) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!(schema.anyOf instanceof Array)) {
    throw new SchemaError("anyOf must be an array");
  }
  if (!schema.anyOf.some(testSchema.bind(this, instance, options, ctx))) {
    var list = schema.anyOf.map(function(v, i) {
      return (v.id && ('<' + v.id + '>')) || (v.title && JSON.stringify(v.title)) || (v['$ref'] && ('<' + v['$ref'] + '>')) || '[subschema ' + i + ']';
    });
    result.addError({
      name: 'anyOf',
      argument: list,
      message: "is not any of " + list.join(',')
    });
  }
  return result;
};
validators.allOf = function validateAllOf(instance, schema, options, ctx) {
  if (instance === undefined) {
    return null;
  }
  if (!(schema.allOf instanceof Array)) {
    throw new SchemaError("allOf must be an array");
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  var self = this;
  schema.allOf.forEach(function(v, i) {
    var valid = self.validateSchema(instance, v, options, ctx);
    if (!valid.valid) {
      var msg = (v.id && ('<' + v.id + '>')) || (v.title && JSON.stringify(v.title)) || (v['$ref'] && ('<' + v['$ref'] + '>')) || '[subschema ' + i + ']';
      result.addError({
        name: 'allOf',
        argument: {
          id: msg,
          length: valid.errors.length,
          valid: valid
        },
        message: 'does not match allOf schema ' + msg + ' with ' + valid.errors.length + ' error[s]:'
      });
      result.importErrors(valid);
    }
  });
  return result;
};
validators.oneOf = function validateOneOf(instance, schema, options, ctx) {
  if (instance === undefined) {
    return null;
  }
  if (!(schema.oneOf instanceof Array)) {
    throw new SchemaError("oneOf must be an array");
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  var count = schema.oneOf.filter(testSchema.bind(this, instance, options, ctx)).length;
  var list = schema.oneOf.map(function(v, i) {
    return (v.id && ('<' + v.id + '>')) || (v.title && JSON.stringify(v.title)) || (v['$ref'] && ('<' + v['$ref'] + '>')) || '[subschema ' + i + ']';
  });
  if (count !== 1) {
    result.addError({
      name: 'oneOf',
      argument: list,
      message: "is not exactly one from " + list.join(',')
    });
  }
  return result;
};
validators.properties = function validateProperties(instance, schema, options, ctx) {
  if (instance === undefined || !(instance instanceof Object))
    return;
  var result = new ValidatorResult(instance, schema, options, ctx);
  var properties = schema.properties || {};
  for (var property in properties) {
    var prop = (instance || undefined) && instance[property];
    var res = this.validateSchema(prop, properties[property], options, ctx.makeChild(properties[property], property));
    if (res.instance !== result.instance[property])
      result.instance[property] = res.instance;
    result.importErrors(res);
  }
  return result;
};
function testAdditionalProperty(instance, schema, options, ctx, property, result) {
  if (schema.properties && schema.properties[property] !== undefined) {
    return;
  }
  if (schema.additionalProperties === false) {
    result.addError({
      name: 'additionalProperties',
      argument: property,
      message: "additionalProperty " + JSON.stringify(property) + " exists in instance when not allowed"
    });
  } else {
    var additionalProperties = schema.additionalProperties || {};
    var res = this.validateSchema(instance[property], additionalProperties, options, ctx.makeChild(additionalProperties, property));
    if (res.instance !== result.instance[property])
      result.instance[property] = res.instance;
    result.importErrors(res);
  }
}
validators.patternProperties = function validatePatternProperties(instance, schema, options, ctx) {
  if (instance === undefined)
    return;
  if (!this.types.object(instance))
    return;
  var result = new ValidatorResult(instance, schema, options, ctx);
  var patternProperties = schema.patternProperties || {};
  for (var property in instance) {
    var test = true;
    for (var pattern in patternProperties) {
      var expr = new RegExp(pattern);
      if (!expr.test(property)) {
        continue;
      }
      test = false;
      var res = this.validateSchema(instance[property], patternProperties[pattern], options, ctx.makeChild(patternProperties[pattern], property));
      if (res.instance !== result.instance[property])
        result.instance[property] = res.instance;
      result.importErrors(res);
    }
    if (test) {
      testAdditionalProperty.call(this, instance, schema, options, ctx, property, result);
    }
  }
  return result;
};
validators.additionalProperties = function validateAdditionalProperties(instance, schema, options, ctx) {
  if (instance === undefined)
    return;
  if (!this.types.object(instance))
    return;
  if (schema.patternProperties) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  for (var property in instance) {
    testAdditionalProperty.call(this, instance, schema, options, ctx, property, result);
  }
  return result;
};
validators.minProperties = function validateMinProperties(instance, schema, options, ctx) {
  if (!instance || typeof instance !== 'object') {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  var keys = Object.keys(instance);
  if (!(keys.length >= schema.minProperties)) {
    result.addError({
      name: 'minProperties',
      argument: schema.minProperties,
      message: "does not meet minimum property length of " + schema.minProperties
    });
  }
  return result;
};
validators.maxProperties = function validateMaxProperties(instance, schema, options, ctx) {
  if (!instance || typeof instance !== 'object') {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  var keys = Object.keys(instance);
  if (!(keys.length <= schema.maxProperties)) {
    result.addError({
      name: 'maxProperties',
      argument: schema.maxProperties,
      message: "does not meet maximum property length of " + schema.maxProperties
    });
  }
  return result;
};
validators.items = function validateItems(instance, schema, options, ctx) {
  if (!(instance instanceof Array)) {
    return null;
  }
  var self = this;
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (instance === undefined || !schema.items) {
    return result;
  }
  instance.every(function(value, i) {
    var items = (schema.items instanceof Array) ? (schema.items[i] || schema.additionalItems) : schema.items;
    if (items === undefined) {
      return true;
    }
    if (items === false) {
      result.addError({
        name: 'items',
        message: "additionalItems not permitted"
      });
      return false;
    }
    var res = self.validateSchema(value, items, options, ctx.makeChild(items, i));
    if (res.instance !== result.instance[i])
      result.instance[i] = res.instance;
    result.importErrors(res);
    return true;
  });
  return result;
};
validators.minimum = function validateMinimum(instance, schema, options, ctx) {
  if (typeof instance !== 'number') {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  var valid = true;
  if (schema.exclusiveMinimum && schema.exclusiveMinimum === true) {
    valid = instance > schema.minimum;
  } else {
    valid = instance >= schema.minimum;
  }
  if (!valid) {
    result.addError({
      name: 'minimum',
      argument: schema.minimum,
      message: "must have a minimum value of " + schema.minimum
    });
  }
  return result;
};
validators.maximum = function validateMaximum(instance, schema, options, ctx) {
  if (typeof instance !== 'number') {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  var valid;
  if (schema.exclusiveMaximum && schema.exclusiveMaximum === true) {
    valid = instance < schema.maximum;
  } else {
    valid = instance <= schema.maximum;
  }
  if (!valid) {
    result.addError({
      name: 'maximum',
      argument: schema.maximum,
      message: "must have a maximum value of " + schema.maximum
    });
  }
  return result;
};
validators.divisibleBy = function validateDivisibleBy(instance, schema, options, ctx) {
  if (typeof instance !== 'number') {
    return null;
  }
  if (schema.divisibleBy == 0) {
    throw new SchemaError("divisibleBy cannot be zero");
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (instance / schema.divisibleBy % 1) {
    result.addError({
      name: 'divisibleBy',
      argument: schema.divisibleBy,
      message: "is not divisible by (multiple of) " + JSON.stringify(schema.divisibleBy)
    });
  }
  return result;
};
validators.multipleOf = function validateMultipleOf(instance, schema, options, ctx) {
  if (typeof instance !== 'number') {
    return null;
  }
  if (schema.multipleOf == 0) {
    throw new SchemaError("multipleOf cannot be zero");
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (instance / schema.multipleOf % 1) {
    result.addError({
      name: 'multipleOf',
      argument: schema.multipleOf,
      message: "is not a multiple of (divisible by) " + JSON.stringify(schema.multipleOf)
    });
  }
  return result;
};
validators.required = function validateRequired(instance, schema, options, ctx) {
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (instance === undefined && schema.required === true) {
    result.addError({
      name: 'required',
      message: "is required"
    });
  } else if (instance && typeof instance === 'object' && Array.isArray(schema.required)) {
    schema.required.forEach(function(n) {
      if (instance[n] === undefined) {
        result.addError({
          name: 'required',
          argument: n,
          message: "requires property " + JSON.stringify(n)
        });
      }
    });
  }
  return result;
};
validators.pattern = function validatePattern(instance, schema, options, ctx) {
  if (typeof instance !== 'string') {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!instance.match(schema.pattern)) {
    result.addError({
      name: 'pattern',
      argument: schema.pattern,
      message: "does not match pattern " + JSON.stringify(schema.pattern)
    });
  }
  return result;
};
validators.format = function validateFormat(instance, schema, options, ctx) {
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!result.disableFormat && !helpers.isFormat(instance, schema.format, this)) {
    result.addError({
      name: 'format',
      argument: schema.format,
      message: "does not conform to the " + JSON.stringify(schema.format) + " format"
    });
  }
  return result;
};
validators.minLength = function validateMinLength(instance, schema, options, ctx) {
  if (!(typeof instance === 'string')) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!(instance.length >= schema.minLength)) {
    result.addError({
      name: 'minLength',
      argument: schema.minLength,
      message: "does not meet minimum length of " + schema.minLength
    });
  }
  return result;
};
validators.maxLength = function validateMaxLength(instance, schema, options, ctx) {
  if (!(typeof instance === 'string')) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!(instance.length <= schema.maxLength)) {
    result.addError({
      name: 'maxLength',
      argument: schema.maxLength,
      message: "does not meet maximum length of " + schema.maxLength
    });
  }
  return result;
};
validators.minItems = function validateMinItems(instance, schema, options, ctx) {
  if (!(instance instanceof Array)) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!(instance.length >= schema.minItems)) {
    result.addError({
      name: 'minItems',
      argument: schema.minItems,
      message: "does not meet minimum length of " + schema.minItems
    });
  }
  return result;
};
validators.maxItems = function validateMaxItems(instance, schema, options, ctx) {
  if (!(instance instanceof Array)) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!(instance.length <= schema.maxItems)) {
    result.addError({
      name: 'maxItems',
      argument: schema.maxItems,
      message: "does not meet maximum length of " + schema.maxItems
    });
  }
  return result;
};
validators.uniqueItems = function validateUniqueItems(instance, schema, options, ctx) {
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!(instance instanceof Array)) {
    return result;
  }
  function testArrays(v, i, a) {
    for (var j = i + 1; j < a.length; j++)
      if (helpers.deepCompareStrict(v, a[j])) {
        return false;
      }
    return true;
  }
  if (!instance.every(testArrays)) {
    result.addError({
      name: 'uniqueItems',
      message: "contains duplicate item"
    });
  }
  return result;
};
function testArrays(v, i, a) {
  var j,
      len = a.length;
  for (j = i + 1, len; j < len; j++) {
    if (helpers.deepCompareStrict(v, a[j])) {
      return false;
    }
  }
  return true;
}
validators.uniqueItems = function validateUniqueItems(instance, schema, options, ctx) {
  if (!(instance instanceof Array)) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!instance.every(testArrays)) {
    result.addError({
      name: 'uniqueItems',
      message: "contains duplicate item"
    });
  }
  return result;
};
validators.dependencies = function validateDependencies(instance, schema, options, ctx) {
  if (!instance || typeof instance != 'object') {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  for (var property in schema.dependencies) {
    if (instance[property] === undefined) {
      continue;
    }
    var dep = schema.dependencies[property];
    var childContext = ctx.makeChild(dep, property);
    if (typeof dep == 'string') {
      dep = [dep];
    }
    if (dep instanceof Array) {
      dep.forEach(function(prop) {
        if (instance[prop] === undefined) {
          result.addError({
            name: 'dependencies',
            argument: childContext.propertyPath,
            message: "property " + prop + " not found, required by " + childContext.propertyPath
          });
        }
      });
    } else {
      var res = this.validateSchema(instance, dep, options, childContext);
      if (result.instance !== res.instance)
        result.instance = res.instance;
      if (res && res.errors.length) {
        result.addError({
          name: 'dependencies',
          argument: childContext.propertyPath,
          message: "does not meet dependency required by " + childContext.propertyPath
        });
        result.importErrors(res);
      }
    }
  }
  return result;
};
validators['enum'] = function validateEnum(instance, schema, options, ctx) {
  if (!(schema['enum'] instanceof Array)) {
    throw new SchemaError("enum expects an array", schema);
  }
  if (instance === undefined) {
    return null;
  }
  var result = new ValidatorResult(instance, schema, options, ctx);
  if (!schema['enum'].some(helpers.deepCompareStrict.bind(null, instance))) {
    result.addError({
      name: 'enum',
      argument: schema['enum'],
      message: "is not one of enum values: " + schema['enum'].join(',')
    });
  }
  return result;
};
validators.not = validators.disallow = function validateNot(instance, schema, options, ctx) {
  var self = this;
  if (instance === undefined)
    return null;
  var result = new ValidatorResult(instance, schema, options, ctx);
  var notTypes = schema.not || schema.disallow;
  if (!notTypes)
    return null;
  if (!(notTypes instanceof Array))
    notTypes = [notTypes];
  notTypes.forEach(function(type) {
    if (self.testType(instance, schema, options, ctx, type)) {
      var schemaId = type && type.id && ('<' + type.id + '>') || type;
      result.addError({
        name: 'not',
        argument: schemaId,
        message: "is of prohibited type " + schemaId
      });
    }
  });
  return result;
};
module.exports = attribute;
