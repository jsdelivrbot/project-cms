import _ from 'lodash';
import levelup from 'levelup';
import localstorage from 'localstorage-down';
import sublevel from 'level-sublevel';


export class LocalStorage {
  constructor() {
    this.top = sublevel(levelup('cms', { db: localstorage, valueEncoding : 'json' }));
  }

  identifier() {
    return "localstorage:cms";
  }

  getTable = (baseUrl) => {
    return this.top.sublevel(baseUrl);
  }

  destroy = () => {
    return new Promise(function(resolve, reject) {
      return localstorage.destroy('cms', resolve);
    });
  }
}

export function datastoreFactory() {
  return new LocalStorage();
};
