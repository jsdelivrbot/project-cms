import levelup from 'levelup';
import localstorage from 'localstorage-down';
import sublevel from 'level-sublevel';
import _ from 'lodash';
import {Map, fromJS} from 'immutable';

/*
detect record_change
 * new_object, update_object, remove_object
 * object_id
 * table_name

object_id is the key
*/


var top = sublevel(levelup('cms', { db: localstorage, valueEncoding : 'json' }));
var tables = {};

function toJS(obj) {
  if (_.isFunction(obj.toJS)) return obj.toJS();
  return obj;
}

function toImmut(obj) {
  if (_.isFunction(obj.toJS)) return obj;
  return fromJS(obj);
}

export function getTable(baseUrl) {
  if (!tables[baseUrl]) tables[baseUrl] = top.sublevel(baseUrl);
  return tables[baseUrl];
}

//{tables: persistenceReducer}
const INITIAL_STATE = Map();

export function persistenceReducer(state=INITIAL_STATE, action) {
  const {record_change} = action;
  if (!record_change) {
    return state;
  }

  const { new_object, update_object, remove_object, table_name, object_id } = record_change;
  const table = getTable(table_name);
  if (new_object) {
    console.log("New object:", table_name, object_id)
    table.put(object_id, toJS(new_object));
    return state.setIn([table_name, object_id], toImmut(new_object));
  } else if (update_object) {
    console.log("Update object:", table_name, object_id)
    table.put(object_id, toJS(update_object));
    return state.setIn([table_name, object_id], toImmut(update_object));
  } else if (remove_object) {
    table.del(object_id);
    return state.deleteIn([table_name, object_id]);
  }
  console.warn("Received invalid record_change action:", action);
  return state;
}

export function readTable(tableName) {
  return new Promise(function(resolve, reject) {
    var key_values;

    getTable(tableName).createReadStream()
      .on('data', function(data) {
        if (typeof data.value !== 'undefined') {
          if (!key_values) key_values = Map();
          key_values = key_values.set(data.key, fromJS(data.value));
        }
      })
      .on('end', function () {
        resolve(key_values);
      });
  });
}

export function writeFixture(fixtureData) {
  console.log("writeFixture", fixtureData);
  _.each(fixtureData, function(rows, tableName) {
    var table = getTable(tableName);
    _.each(rows, function(value, key) {
      table.put(key, value);
    });
  });
}

export function destroy(callback) {
  return Promise.all(_.map(tables, (table, table_name) => {
    return purgeTable(table_name);
  })).then(x => {
    return localstorage.destroy('cms', callback);
  });
}

export function purgeTable(table_name) {
  return new Promise(function(resolve, reject) {
    var table = getTable(table_name);
    var ops = [];
    table.createKeyStream()
      .on('data', function(key) {
        ops.push({ type: 'del', key });
      })
      .on('end', function () {
        var batchJob = table.batch(ops, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
  });
}
