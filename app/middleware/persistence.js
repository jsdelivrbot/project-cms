import levelup from 'levelup';
import localstorage from 'localstorage-down';
import sublevel from 'level-sublevel';
import _ from 'lodash';
import {Map} from 'immutable';

/*
detect
 * new_object, update_object, remove_object
 * object_id
 * baseUrl

baseUrl determines the sublevel
object_id is the key

but for say /site the object is the sublevel, object_id will be $ or _ or self
*/


var top = sublevel(levelup('cms', { db: localstorage, valueEncoding : 'json' }));
var tables = {};

export function getTable(baseUrl) {
  if (!tables[baseUrl]) tables[baseUrl] = top.sublevel(baseUrl);
  return tables[baseUrl];
}

export default function persistenceMiddleware() {
  return (next) => (action) => {
    const { new_object, update_object, remove_object, baseUrl, object_id } = action;
    if (!baseUrl || !object_id) {
      return next(action);
    }
    const table = getTable(baseUrl);
    if (new_object) {
      console.log("New object:", baseUrl, object_id)
      table.put(object_id, new_object);
    } else if (update_object) {
      console.log("Update object:", baseUrl, object_id)
      table.put(object_id, update_object);
    } else if (remove_object) {
      table.del(object_id);
    }
    //TODO seperate middleware
    if (action.next_url) {
      //TODO react router method instead
      window.location.hash = action.next_url;
    }
    next(action);
  };
}

export function readTable(baseUrl) {
  return new Promise(function(resolve, reject) {
    var key_values;

    getTable(baseUrl).createReadStream()
      .on('data', function(data) {
        if (typeof data.value !== 'undefined') {
          if (!key_values) key_values = Map();
          key_values = key_values.set(data.key, data.value);
        }
      })
      .on('end', function () {
        resolve(key_values);
      });
  });
}

export function destroy(callback) {
  return Promise.all(_.map(tables, (table, baseUrl) => {
    return purgeTable(baseUrl);
  })).then(x => {
    return localstorage.destroy('cms', callback);
  });
}

export function purgeTable(baseUrl) {
  return new Promise(function(resolve, reject) {
    var table = getTable(baseUrl);
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
