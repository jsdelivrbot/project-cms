import _ from 'lodash';
import levelup from 'levelup';
import localstorage from 'localstorage-down';
import sublevel from 'level-sublevel';


export class LocalStorage {
  constructor() {
    this.top = sublevel(levelup('cms', { db: localstorage, valueEncoding : 'json' }));
    this.tables = {};
  }

  identifier() {
    return "localstorage:cms";
  }

  getTable = (baseUrl) => {
    if (!this.tables[baseUrl]) this.tables[baseUrl] = this.top.sublevel(baseUrl);
    return this.tables[baseUrl];
  }

  destroy = () => {
    return new Promise(function(resolve, reject) {
      return localstorage.destroy('cms', resolve);
    });
  }
}

export default function serviceFactory() {
  return new LocalStorage();
};
