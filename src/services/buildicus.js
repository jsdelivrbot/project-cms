import _ from 'lodash';
import levelup from 'levelup';
import querystring from 'querystring';
import {AbstractLevelDOWN, AbstractIterator} from 'abstract-leveldown';


export class BuildicusIterator extends AbstractIterator {
  constructor(db, options) {
    super(db);
    this._items = [];
    this._cursor = 0;
  }

  _next(cb) {
    const item = this._items[this._cursor];

    if (item) {
      process.nextTick(() => cb(item.key, item.value));
      delete this._items[this._cursor];
      this._cursor++;
      return;
    }

    if (item === null) {
      process.nextTick(cb);
    }

    this.db._call_store({ method: 'GET' }).then(responseData => {
      this._items = responseData;
      this._items.push(null);
      this._next(cb);
    }).catch(error => {
      console.error(error);
      this._ended = true; //now what?
    });
  }
}


export class BuildicusDOWN extends AbstractLevelDOWN {
  constructor(location) {
    this._tableName = location;
    super(location);
  }

  _generate_headers() {
    return new Headers({
      //TODO Authorization header
      "Content-Type": "application/json",
    });
  }

  _call_store({method, body, params}) {
    let url = `/datastore/${this._tableName}`;
    let headers = this._generate_headers();

    if (body) body = JSON.stringify(body);
    if (params) {
      url += "?" + querystring.stringify(params);
    }

    return fetch(url, {
      method: method,
      headers: headers,
      body: body
    }).then(response => {
      if (!response.ok) return Promise.reject(response.statusText);
      return response.json();
    });
  }

  _open(options, callback) {
    process.nextTick(function () { callback(null, this) }.bind(this))
  }

  _put(key, value, options, callback) {
    let body = [{
      key, value
    }];

    let request = this._call_store({
      method: 'PUT',
      body,
    }).then(responseData => {
      callback(null, responseData);
    }).catch(error => {
      callback(error);
    });
  }

  _get(key, options, callback) {
    let params = {key};
    this._call_store({
      method: 'GET',
      params,
    }).then(responseData => {
      callback(null, responseData[0].value);
    }.catch(error => {
      callback(error);
    });
  }

  _del(key, options, callback) {
    let params = {key};
    this._call_store({
      method: 'DELETE',
      params,
    }).then(responseData => {
      callback(null, null);
    }.catch(error => {
      callback(error);
    });
  }

  _iterator(options) {
    return new BuildicusIterator(this, options);
  }
}

export class BuildicusStorage {
  constructor() {
    //pass
  }

  identifier() {
    return "buildicus:cms";
  }

  getTable = (baseUrl) => {
    return BuildicusDOWN(baseUrl);
  }

  destroy = () => {
    return new Promise(function(resolve, reject) {
      return reject('Not implemented');
    });
  }
}

export function datastoreFactory() {
  return new BuildicusStorage();
};
