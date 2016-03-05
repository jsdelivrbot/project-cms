import _ from 'lodash';
import levelup from 'levelup';
import localstorage from 'localstorage-down';
import sublevel from 'level-sublevel';


export class LocalStorage {
  constructor() {
    this.top = sublevel(levelup('cms', { db: localstorage, valueEncoding : 'json' }));
    this.tables = {};
  }

  getTable = (baseUrl) => {
    if (!this.tables[baseUrl]) this.tables[baseUrl] = this.top.sublevel(baseUrl);
    return this.tables[baseUrl];
  }

  putObject = (table_name, object_id, new_object) => {
    const table = this.getTable(table_name);
    table.put(object_id, new_object);
  };

  deleteObject = (table_name, object_id) => {
    const table = this.getTable(table_name);
    table.del(object_id);
  };

  readTable = (table_name) => {
    return new Promise((resolve, reject) => {
      var key_values;

      this.getTable(table_name).createReadStream()
        .on('data', function(data) {
          if (typeof data.value !== 'undefined') {
            if (!key_values) key_values = {};
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
    return Promise.all(_.map(this.tables, (table, table_name) => {
      return this.purgeTable(table_name);
    })).then(new Promise(function(resolve, reject) {
      localstorage.destroy('cms', resolve);
    }));
  }
}

export default function serviceFactory() {
  return new LocalStorage()
};
