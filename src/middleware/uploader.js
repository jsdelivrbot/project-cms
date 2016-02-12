
export default function uploaderMiddleware() {
  var uploader = null;

  return (next) => (action) => {
    const { type } = action;
    switch (type) {
      case 'UPLOAD_FILE':
        action.promise = uploader([action.file]).then(urls => urls[0]);
        break;
      case 'UPLOAD_FILES':
        action.promise = uploader(action.files);
        break;
      case 'SET_UPLOADER':
        uploader = action.uploader;
        break;
    }
    return next(action);
  }
}
