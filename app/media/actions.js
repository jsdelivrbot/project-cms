//intended to work with the ASK_FOR middleware

export function askForMedia(mediaTypes, quantityLimits=1) {
  return {
    type: 'ASK_FOR_MEDIA',
    mediaTypes,
    quantityLimits
  };
}

export function respondWithMedia(result) {
  $("#media-modal-picker").modal('hide');

  return {
    type: 'RESPOND_WITH_MEDIA',
    result,
  }
}

export default {askForMedia, respondWithMedia}
