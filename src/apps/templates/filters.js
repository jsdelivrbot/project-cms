import Remarkable from 'remarkable';
import nunjucks from 'nunjucks/browser/nunjucks.js';
import _ from 'lodash';

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
    return _.map(reference, r => getState().getIn(['tables', r.table, r.id]));
  }
  return getState().getIn(['tables', reference.table, reference.id]);
}
