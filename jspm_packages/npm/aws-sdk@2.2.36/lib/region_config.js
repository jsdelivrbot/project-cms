/* */ 
var util = require('./util');
var regionConfig = require('./region_config.json!systemjs-json');
function generateRegionPrefix(region) {
  if (!region)
    return null;
  var parts = region.split('-');
  if (parts.length < 3)
    return null;
  return parts.slice(0, parts.length - 2).join('-') + '-*';
}
function derivedKeys(service) {
  var region = service.config.region;
  var regionPrefix = generateRegionPrefix(region);
  var endpointPrefix = service.api.endpointPrefix;
  return [[region, endpointPrefix], [regionPrefix, endpointPrefix], [region, '*'], [regionPrefix, '*'], ['*', endpointPrefix], ['*', '*']].map(function(item) {
    return item[0] && item[1] ? item.join('/') : null;
  });
}
function applyConfig(service, config) {
  util.each(config, function(key, value) {
    if (key === 'globalEndpoint')
      return;
    if (service.config[key] === undefined || service.config[key] === null) {
      service.config[key] = value;
    }
  });
}
function configureEndpoint(service) {
  var keys = derivedKeys(service);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!key)
      continue;
    if (regionConfig.rules.hasOwnProperty(key)) {
      var config = regionConfig.rules[key];
      if (typeof config === 'string') {
        config = regionConfig.patterns[config];
      }
      service.isGlobalEndpoint = !!config.globalEndpoint;
      if (!config.signatureVersion)
        config.signatureVersion = 'v4';
      applyConfig(service, config);
      return;
    }
  }
}
module.exports = configureEndpoint;
