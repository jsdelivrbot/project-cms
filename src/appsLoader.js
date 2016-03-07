import _ from 'lodash';
import {Map, fromJS} from 'immutable';
import {combineReducers} from 'redux-immutablejs';

import {loadStorage, readTable, writeFixture, tablesReducer} from './reducers/tables';


export const DEFAULT_APPS_CONFIG = [
  {baseUrl: '/', type: 'builtin', location: './apps/dashboard/index'},
  {baseUrl: '/engine', type: 'builtin', location: './apps/engine/index'},
  {baseUrl: '/site', type: 'builtin', location: './apps/site/index'},
  {baseUrl: '/pages', type: 'builtin', location: './apps/pages/index'},
  {baseUrl: '/galleries', type: 'builtin', location: './apps/galleries/index'},
  {baseUrl: '/templates', type: 'builtin', location: './apps/templates/index'},
  {baseUrl: '/media', type: 'builtin', location: './apps/media/index'},
  {baseUrl: '/media/links', type: 'builtin', location: './apps/media/contrib/links/index'},
  {baseUrl: '/media/assets', type: 'builtin', location: './apps/media/contrib/assets/index'},
  {baseUrl: '/media/pictures', type: 'builtin', location: './apps/media/contrib/pictures/index'},
  {baseUrl: '/snippets', type: 'builtin', location: './apps/snippets/index'},
  {baseUrl: '/snippets/menus', type: 'builtin', location: './apps/snippets/contrib/menus/index'},
]

export function readAppsConfig() {
  //TODO detect & load storage service
  return readTable('/engine').then(tableState => {
    if (!tableState) return DEFAULT_APPS_CONFIG;
    let appsConfig = tableState.get('appsConfig');
    if (!appsConfig) return DEFAULT_APPS_CONFIG;
    return appsConfig.toJS();
  });
}

export function loadAppsConfig(appsConfig) {
  return Promise.all(_.map(appsConfig, config => {
    let {baseUrl, type, location} = config;
    return new Promise(function(resolve, reject) {
      switch (type) {
        case 'builtin':
          return resolve(System.import(location, __moduleName));
        case 'github':
          return resolve(System.import("ext-github:"+location, __moduleName));
        case 'npm':
          return resolve(System.import("ext-npm:"+location, __moduleName));
        default:
          reject(new Error('Unrecognized app type: '+type))
      }
    }).then(mod => {
      return _.assign(mod.default(baseUrl, config), {baseUrl});
    });
  }));
}

export function loadAppsTables(apps) {
  var tables = Map();

  return Promise.all(_.map(apps, app => {
    //if app defines tables, then load them or load its initial fixture
    if (app.tables) {
      let initialized = true;
      return Promise.all(app.tables.map(tableName => {
        return readTable(tableName).then(tableState => {
          if (!tableState) {
            initialized = false;
            return;
          }
          tables = tables.set(tableName, fromJS(tableState));
        });
      })).then(done => {
        if (!initialized) {
          if (app.fixtures && app.fixtures.initial){
            //or load state from fixtures
            if (_.isFunction(app.fixtures.initial)) {
              let fixtureResponse = app.fixtures.initial(app.baseUrl);
              if (_.isFunction(fixtureResponse.then)) {
                return fixtureResponse.then(tablesState => {
                  writeFixture(tablesState);
                  tables = tables.mergeDeep(tablesState);
                });
              } else {
                writeFixture(fixtureResponse);
                tables = tables.mergeDeep(fixtureResponse);
              }
            } else {
              writeFixture(app.fixtures.initial);
              tables = tables.mergeDeep(app.fixtures.initial);
            }
          } else {
            tables = tables.mergeDeep({[app.baseUrl]: {}});
          }
        }
      });
    }
  })).then(() => tables);
}

export function makeReducer(apps) {
  return combineReducers(_.reduce(apps, (col, app) => {
    if (app.reducer) {
      col[app.baseUrl] = app.reducer;
    }
    return col;
  }, {
    tables: tablesReducer
  }));
}

export function appsLoader() {
  return loadStorage().then(readAppsConfig).then(appsConfig => {
    return loadAppsConfig(appsConfig).catch(error => {
      alert("There was an error loading your apps, check the console for details");
      console.error('Error loading apps from config:');
      console.error(error);
      console.log("Loading default apps");
      return loadAppsConfig(DEFAULT_APPS_CONFIG);
    });
  });
}
