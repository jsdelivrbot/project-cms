import _ from 'lodash';

import {readTable} from './reducers/tables';


export const DEFAULT_APPS_CONFIG = [
  {baseUrl: '/', type: 'builtin', location: './dashboard/index'},
  {baseUrl: '/engine', type: 'builtin', location: './engine/index'},
  {baseUrl: '/site', type: 'builtin', location: './site/index'},
  {baseUrl: '/pages', type: 'builtin', location: './pages/index'},
  {baseUrl: '/galleries', type: 'builtin', location: './galleries/index'},
  {baseUrl: '/templates', type: 'builtin', location: './templates/index'},
  {baseUrl: '/media', type: 'builtin', location: './media/index'},
  {baseUrl: '/media/links', type: 'builtin', location: './media/contrib/links/index'},
]

export function readAppsConfig() {
  return readTable('/engine').then(tableState => {
    if (!tableState || !tableState.appsConfig) return DEFAULT_APPS_CONFIG;
    return tableState.appsConfig;
  })
}

export function loadAppsConfig(appsConfig) {
  return Promise.all(_.map(appsConfig, config => {
    let {baseUrl, type, location} = config;
    switch (type) {
      case 'builtin':
        return System.import(location, __moduleName).then(mod =>
          _.assign(mod.default(baseUrl, config), {baseUrl})
        );
      //TODO support these
      case 'github':
      case 'npm':
      default:
        throw Error('Unrecognized app type: '+type)
    }
  }));
}

export default function appsLoader() {
  return readAppsConfig().then(loadAppsConfig);
}
