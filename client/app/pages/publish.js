import Remarkable from 'remarkable';

let md = new Remarkable();


export default function publish(baseUrl, state, pushContent) {
  let renderer = state.getIn(['engine', 'renderer']);
  let mimetype = 'text/html';

  var promises = state.get(baseUrl).map((page, path) => {
    var content = md.render(page.content);
    var context = {
      content,
      page
    };
    var renderedPage = renderer(page.template, context);
    return pushContent(path, renderedPage, mimetype);
  }).toArray();

  return Promise.all(promises);
}
