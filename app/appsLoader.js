import _ from 'lodash';

/*
Given a (baseUrl -> modulePath) dictionary, return a promise to factory
loaded modules (modules must export a default function that is an app factory)
*/
export default function(appConfig) {
  return Promise.all(_.map(appConfig, (modulePath, baseUrl) => {
    return System.import(modulePath, __moduleName).then(mod => _.assign(mod.default(baseUrl), {baseUrl}));
  }))
}
