//intended to work with the ASK_FOR middleware

export function askForMedia(media_types, quantityLimits=1) {
  return {
    type: 'ASK_FOR_MEDIA',
    media_types,
    quantityLimits
  };
}

export function respondWithMedia(media_item) {
  $("#media-modal-picker").modal('hide');

  return {
    type: 'RESPOND_WITH_MEDIA',
    result: media_item,
  }
}

export default {askForMedia, respondWithMedia}
