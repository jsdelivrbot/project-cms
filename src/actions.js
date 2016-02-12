export function uploadFile(file) {
  return {
    type: 'UPLOAD_FILE',
    file
  }
}

export function uploadFiles(files) {
  return {
    type: 'UPLOAD_FILES',
    files
  }
}

export function askForMedia(mediaTypes, quantityLimits=1) {
  return {
    type: 'ASK_FOR_MEDIA',
    mediaTypes,
    quantityLimits
  };
}
