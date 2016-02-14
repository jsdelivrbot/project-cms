
export default function uploaderMiddleware({getState}) {
  function uploader(files) {
    return getState().getIn(['/engine', 'uploader'])(files);
  }

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
    }
    return next(action);
  }
}
