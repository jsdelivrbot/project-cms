import _ from 'lodash';

export default function publish(baseUrl, state, pushContent) {
  let renderer = state.getIn(['/engine', 'renderer']);
  let mimetype = 'text/html';
  let site = state.get('/site').toJS();

  var promises = state.get(baseUrl).map((immutablePage, path) => {
    let page = immutablePage.toJS();
    var context = {
      site,
      page
    };
    var renderedPage = renderer(page.template, context);
    return pushContent(path, renderedPage, mimetype);
  }).toArray();

  return Promise.all(_.filter(promises));
}
