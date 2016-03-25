export function uploadFile(file, onProgress) {
  return {
    type: 'UPLOAD_FILE',
    file,
    onProgress
  }
}

export function replaceFile(file, path, onProgress) {
  file.path = path;
  return {
    type: 'REPLACE_FILE',
    file,
    onProgress
  }
}

export function uploadFiles(files, onProgress) {
  return {
    type: 'UPLOAD_FILES',
    files,
    onProgress
  }
}

export function askForMedia(mediaTypes, quantityLimit=1) {
  return {
    type: 'ASK_FOR_MEDIA',
    mediaTypes,
    quantityLimit
  };
}

export function makeThumbnail(picture, options) {
  return {
    type: 'MAKE_THUMBNAIL',
    picture,
    options
  };
}
