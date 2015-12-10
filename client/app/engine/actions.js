export function setRenderer(renderer) {
  //assert renderer is function
  return {
    type: 'SET_RENDERER',
    renderer
  };
}

export function setPublisher(publisher) {
  //assert publisher is function
  return {
    type: 'SET_PUBLISHER',
    publisher
  };
}

export function pushContent(path, content, mimetype) {
  return {
    type: 'PUSH_CONTENT',
    path,
    content,
    mimetype,
    promise: new Promise(function(resolve, reject) {
      setTimeout(resolve, 3000);
    })
  };
}

export default {setRenderer, setPublisher, pushContent}
