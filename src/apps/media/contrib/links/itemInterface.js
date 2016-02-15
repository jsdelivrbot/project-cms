
export function embedCode(mediaItem) {
  const path = mediaItem.get('path');
  switch(mediaItem.get('type')) {
    case "anchor":
      return `<a href="${path}">${path}</a>`
    case "css":
      return `<link ref="stylesheet" href="${path}"/>`
    case "javascript":
      return `<script src="${path}"></script>`
    case "image":
      return `<img src="${path}"/>`
  }
}

export function detailLink(mediaItem) {
  return mediaItem.get('media_type') + "/" + mediaItem.get('id');
}

export function preview(mediaItem) {
  return mediaItem.get('path');
}

export default {
  embedCode,
  detailLink,
  preview,
};
