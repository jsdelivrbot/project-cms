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
