import Remarkable from 'remarkable';
import _ from 'lodash';

let md = new Remarkable({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
});

export function markdownFilter(input) {
  return md.render(input);
}
markdownFilter.safe = true;
