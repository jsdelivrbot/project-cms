
export default function uploaderMiddleware({getState}) {
  //TODO just fetch uploader from engine
  var uploader = null;

  return (next) => (action) => {
    const { type } = action;
    switch (type) {
      case 'REPLACE_FILE':
      case 'UPLOAD_FILE':
        action.promise = uploader([action.file]).then(r => r[0]);
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
