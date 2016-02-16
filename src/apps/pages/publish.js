import _ from 'lodash';

export default function publish(baseUrl, state, pushContent) {
  let renderer = state.getIn(['/engine', 'renderer']);
  let mimetype = 'text/html';

  var promises = state.getIn(['tables', baseUrl]).map((immutablePage) => {
    let page = immutablePage.toJS();
    let path = page.path;
    var context = {
      page
    };
    return renderer(page.template, context).then(renderedPage => {
      return pushContent(path, renderedPage, mimetype);
    });
  }).toArray();

  return Promise.all(_.filter(promises));
}
