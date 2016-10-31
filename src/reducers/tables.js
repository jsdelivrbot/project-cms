import _ from 'lodash';
import {Map, fromJS} from 'immutable';


export class LevelupMultiplexer {
  constructor(backend) {
    this.backend = backend;
    this.tables = {};
  }

  identifier() {
    return this.backend.identifier();
  }

  getTable = (table_name) => {
    if (!this.tables[table_name]) this.tables[table_name] = this.backend.getTable(table_name);
    //console.log("table:", this.tables[table_name], table_name);
    return this.tables[table_name];
  }

  promiseTableCall(funcName, tableName, ...args) {
    const table = this.getTable(tableName);
    return new Promise(function(resolve, reject) {
      table[funcName].call(table, ...args, function(err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      })
    });
  }

  putObject = (table_name, object_id, new_object) => {
    return this.promiseTableCall('put', table_name, object_id, new_object);
  };

  deleteObject = (table_name, object_id) => {
    return this.promiseTableCall('del', table_name, object_id);
  };

  replicateToStorage = (storage) => {
    return new Promise(function(resolve, reject) {
      _.each(this.tables, function(table_name, table) {
        //TODO bulk data transfer
        table.createReadStream()
          .on('data', function(data) {
            if (typeof data.value !== 'undefined') {
              storage.putObject(table_name, data.key, data.value);
            }
          })
          .on('end', function () {
            resolve(key_values);
          });
      });
    });
  };

  readTable = (table_name) => {
    return new Promise((resolve, reject) => {
      var key_values;

      this.getTable(table_name).createReadStream()
        .on('data', function(data) {
          if (typeof data.value !== 'undefined') {
            if (!key_values) key_values = {};
            //all objects have an id attribute
            if (!data.value.id) data.value.id = data.key;
            key_values[data.key] = data.value;
          }
        })
        .on('end', function () {
          resolve(key_values);
        });
    });
  };

  purgeTable = (table_name) => {
    return new Promise((resolve, reject) => {
      const table = this.getTable(table_name);
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
  };

  destroy = () => {
    return this.backend.destroy();
  }
}


var storage = null;


export function getStorage() {
  return storage;
}

export function setStorage(config) {
  let old_storage = getStorage();

  return loadStorage(config).then(new_storage => {
    storage = new_storage;
    //only trigger transfer if storage backend actually changes
    if (old_storage && new_storage.identifier() !== old_storage.identifier()) {
      return old_storage.replicateToStorage(new_storage).then(x => {
        return new_storage;
      });
    }
    return new_storage;
  });
}


export function loadStorage(storage_config) {
  let module_path = '~/services/localdb';
  if (storage_config) {
    module_path = storage_config.module;
  }
  return factory_promise = System.import(module_path, __moduleName).then(module => {
    return module.datastoreFactory(storage_config);
  }).then(backend => {
    storage = new LevelupMultiplexer(backend);
    return storage;
  });
}

function toJS(obj) {
  if (_.isFunction(obj.toJS)) return obj.toJS();
  return obj;
}

function toImmut(obj) {
  if (_.isFunction(obj.toJS)) return obj;
  return fromJS(obj);
}

function setAttribute(obj, key, value) {
  if (_.isFunction(obj.toJS)) return obj.set(key, value);
  obj[key] = value;
  return obj;
}


const INITIAL_STATE = Map();

export function tablesReducer(state=INITIAL_STATE, action) {
  /*
  detect record_change(s)
   * new_object, update_object, remove_object
   * object_id
   * table_name

  object_id is the key
  */
  if (action.type === "SET_STORAGE_SERVICE") {
    setStorage(action.config);
  }
  const {record_change, record_changes} = action;
  if (record_change) {
    return recordChange(state, record_change);
  } else if (record_changes) {
    _.each(record_changes, rc => {
      state = recordChange(state, rc);
    });
  }
  return state
}

export function recordChange(state, record_change) {
  let { new_object, update_object, remove_object, table_name, object_id } = record_change;
  if (new_object) {
    console.log("New object:", table_name, object_id);
    //all objects have an id attribute
    new_object = setAttribute(new_object, 'id', object_id);
    storage.putObject(table_name, object_id, toJS(new_object));
    return state.setIn([table_name, object_id], toImmut(new_object));
  } else if (update_object) {
    console.log("Update object:", table_name, object_id);
    storage.putObject(table_name, object_id, toJS(update_object));
    return state.setIn([table_name, object_id], toImmut(update_object));
  } else if (remove_object) {
    storage.deleteObject(table_name, object_id)
    return state.deleteIn([table_name, object_id]);
  }
  console.warn("Received invalid record_change:", record_change);
  return state;
}

export function writeFixture(fixtureData) {
  console.log("writeFixture", fixtureData);
  _.each(fixtureData, function(rows, tableName) {
    _.each(rows, function(value, key) {
      storage.putObject(tableName, key, toJS(value))
    });
  });
}

export function readTable(table_name) {
  return storage.readTable(table_name).then(table_data => {
    if (!table_data) return null;
    return fromJS(table_data);
  });
}

export function destroy() {
  return storage.destroy();
}

export default tablesReducer;
