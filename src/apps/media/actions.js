//intended to work with the ASK_FOR middleware

export function respondWithMedia(result) {
  return {
    type: 'RESPOND_WITH_MEDIA',
    result,
  }
}

export default {respondWithMedia}
