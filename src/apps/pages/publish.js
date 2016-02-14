import _ from 'lodash';

export default function publish(baseUrl, state, pushContent) {
  let renderer = state.getIn(['/engine', 'renderer']);
  let mimetype = 'text/html';
  let site = state.getIn(['tables', '/site', 'site']).toJS();

  var promises = state.getIn(['tables', baseUrl]).map((immutablePage, path) => {
    let page = immutablePage.toJS();
    var context = {
      site,
      page
    };
    return renderer(page.template, context).then(renderedPage => {
      return pushContent(path, renderedPage, mimetype);
    });
  }).toArray();

  return Promise.all(_.filter(promises));
}
