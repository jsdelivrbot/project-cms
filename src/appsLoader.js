import _ from 'lodash';
import {Map, fromJS} from 'immutable';
import {combineReducers} from 'redux-immutablejs';

import {getStorage, loadStorage, setStorageConfig, readTable, writeFixture, tablesReducer} from './reducers/tables';


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
      //initialized if we have any data in its namespace
      let initialized = false;
      return Promise.all(app.tables.map(tableName => {
        return readTable(tableName).then(tableState => {
          if (tableState) {
            tables = tables.set(tableName, fromJS(tableState));
            if (_.startsWith(tableName, app.baseUrl)) {
              initialized = true;
            }
            return;
          }
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
  sendLoadingMessage("Connecting storage");
  return loadStorage().then(storage => {
    sendLoadingMessage("Loading configuration");
    return readAppsConfig();
  }).then(appsConfig => {
    sendLoadingMessage("Importing apps...")
    return loadAppsConfig(appsConfig).catch(error => {
      alert("There was an error loading your apps, check the console for details");
      console.error('Error loading apps from config:');
      console.error(error);
      console.log("Loading default apps");
      return loadAppsConfig(DEFAULT_APPS_CONFIG);
    });
  });
}

export function setStorage(config) {
  let old_storage = getStorage();
  setStorageConfig(config);

  return loadStorage().then(new_storage => {
    //only trigger transfer if storage backend actually changes
    if (new_storage.identifier() !== old_storage.identifier()) {
      //TODO transfer data
      //old_storage.dump(new_storage.batch_record)
      //batch_record({table: {key: value}})
    }
    return new_storage;
  });
}

export function sendLoadingMessage(text) {
  console.log(text);
  window.postMessage(JSON.stringify({
    type:"APPLICATION_STATE",
    text

  }), "http://"+window.location.hostname+":"+window.location.port);
}
