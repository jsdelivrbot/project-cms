import _ from 'lodash';

export default function publish(baseUrl, state, pushContent) {
  let renderer = state.getIn(['/engine', 'renderer']);
  let mimetype = 'text/html';
  let site = state.getIn(['tables', '/site', 'site']).toJS();

  var promises = state.getIn(['tables', baseUrl]).map((immutableGallery, path) => {
    let gallery = immutableGallery.toJS();
    var context = {
      site,
      gallery
    };
    var renderedPage = renderer(gallery.template, context);
    return pushContent(path, renderedPage, mimetype);
  }).toArray();

  return Promise.all(_.filter(promises));
}
