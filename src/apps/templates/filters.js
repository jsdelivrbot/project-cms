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

export function refFilter(getState, reference) {
  if (!reference) {
    return null;
  }
  if (_.isArray(reference)) {
    return _.map(reference, r => lookupReference(getState, r));
  }
  return lookupReference(getState, reference)
}

export function thumbnailFilter(dispatch, picture, options, callback) {
  //console.log("tf args", arguments);
  let key = options.key || `${options.width}x${options.height}`;
  //console.log("key:", key)
  if (picture.thumbnails && picture.thumbnails[key]) {
    callback(null, picture.thumbnails[key].url);
  } else {
    dispatch(makeThumbnail(picture, options)).then(({result}) => {
      console.log("thumbnailFilter result:", result);
      callback(null, result.url);
    }, error => {
      callback(error);
    });
  }
}
