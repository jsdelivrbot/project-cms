
export default function uploaderMiddleware({getState}) {
  function uploader(...args) {
    return getState().getIn(['/engine', 'uploader'])(...args);
  }

  return (next) => (action) => {
    const { type } = action;
    switch (type) {
      case 'REPLACE_FILE':
      case 'UPLOAD_FILE':
        action.promise = uploader([action.file], action.onProgress).then(r => r[0]);
        break;
      case 'UPLOAD_FILES':
        action.promise = uploader(action.files, action.onProgress);
        break;
    }
    return next(action);
  }
}
