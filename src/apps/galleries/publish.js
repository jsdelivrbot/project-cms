import _ from 'lodash';

export default function publish(baseUrl, state, pushContent) {
  let renderer = state.getIn(['/engine', 'renderer']);
  let mimetype = 'text/html';

  var promises = state.getIn(['tables', baseUrl]).map((immutableGallery, path) => {
    let gallery = immutableGallery.toJS();
    var context = {
      gallery
    };
    return renderer(gallery.template, context).then(renderedPage => {
      return pushContent(path, renderedPage, mimetype);
    });
  }).toArray();

  return Promise.all(_.filter(promises));
}
