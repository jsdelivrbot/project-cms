import Remarkable from 'remarkable';
import _ from 'lodash';

let md = new Remarkable();


export default function publish(baseUrl, state, pushContent) {
  let renderer = state.getIn(['/engine', 'renderer']);
  let mimetype = 'text/html';
  let site = state.get('/site').toJS();

  var promises = state.get(baseUrl).map((page, path) => {
    var content = md.render(page.content);
    var context = {
      site,
      content,
      page
    };
    var renderedPage = renderer(page.template, context);
    return pushContent(path, renderedPage, mimetype);
  }).toArray();

  return Promise.all(_.filter(promises));
}
