import Remarkable from 'remarkable';
import nunjucks from 'nunjucks/browser/nunjucks.js';
import _ from 'lodash';

import {makeThumbnail} from '~/actions';

let md = new Remarkable({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
});

export function markdownFilter(input) {
  return nunjucks.runtime.markSafe(md.render(input));
}

export function lookupReference(getState, reference) {
  return getState().getIn(['tables', reference.table, reference.id]).toJS();
}

export function refFilter(store, reference) {
  if (!reference) {
    return null;
  }
  const getState = store.getState;
  if (_.isArray(reference)) {
    return _.map(reference, r => lookupReference(getState, r));
  }
  return lookupReference(getState, reference)
}

export function thumbnailFilter(store, picture, options, callback) {
  const dispatch = store.dispath;
  //console.log("tf args", arguments);
  let key = options.key || `${options.width}x${options.height}`;
  //console.log("key:", key)
  if (picture.thumbnails && picture.thumbnails[key]) {
    callback(null, picture.thumbnails[key].url);
  } else {
    dispatch(makeThumbnail(picture, options)).then(({result}) => {
      console.log("thumbnailFilter result:", result);
      //CONSIDER: uploader may not give back a fixed url, run through urlFilter
      urlFilter(store, result, callback);
    }, error => {
      callback(error);
    });
  }
}

export function urlFilter(store, target, callback) {
  if (_.isString(target)) {
    //TODO handle special protocols like ftp:// by uploading asset (if possible)
    if (target[0] == '/' || target.indexOf("://") != -1) {
      callback(null, target);
    } else {
      //TODO should we just return if it is a string?
      callback(new Error("unrecognized url string"))
    }
  } else {
    if (target.url) {
      callback(null, target.url);
    } else {
      //ask uploader to resolve
      //like: target.path => url
      let state = store.getState();
      let uploader = state.getIn(['/engine', 'uploader']);
      let url = null;
      if (uploader.resolve) {
        try {
          //detect if we need to present a published url or not
          let publishing = state.getIn(['/engine', 'publishing']);
          let environment = publishing ? 'publish' : 'preview';
          url = uploader.resolve(environment, target);
        } catch (error) {
          callback(error);
          return;
        }
      }
      if (url) {
        callback(null, url);
      } else {
        callback(new Error("unrecognized url target"));
      }
    }
  }
}
