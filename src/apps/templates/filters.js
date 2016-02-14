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

export function refFilter(getState, reference) {
  if (_.isArray(reference)) {
    return _.map(reference, r => getState().getIn(['tables', r.table, r.id]).toJS());
  }
  return getState().getIn(['tables', reference.table, reference.id]).toJS();
}

export function thumbnailFilter(dispatch, picture, options, callback) {
  //console.log("tf args", arguments);
  let key = options.key || `${options.width}x${options.height}`;
  //console.log("key:", key)
  if (picture.thumbnails && picture.thumbnails[key]) {
    callback(null, picture.thumbnails[key].url);
  } else {
    dispatch(makeThumbnail(picture, options)).then(thumbnail => {
      console.log("thumbnailFilter result:", thumbnail);
      callback(null, thumbnail.url);
    }, error => {
      callback(error);
    });
  }
}
