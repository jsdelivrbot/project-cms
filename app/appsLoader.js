import _ from 'lodash';
import {Map, fromJS} from 'immutable';
import {combineReducers} from 'redux-immutablejs';

import {readTable, writeFixture, tablesReducer} from './reducers/tables';


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
          resolve(System.import(location, __moduleName));
        //TODO support these
        case 'github':
        case 'npm':
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
              let fixtureResponse = app.fixtures.initial(null, app.baseUrl);
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
  return readAppsConfig().then(loadAppsConfig);
}
