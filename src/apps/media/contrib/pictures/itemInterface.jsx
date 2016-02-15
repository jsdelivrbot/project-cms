import React from 'react';

import PictureField from './components/PictureField.jsx';
import Thumbnail from './components/Thumbnail.jsx';

//CONSIDER: maybe we want picture tag instead?
export function embedCode(mediaItem) {
  const url = mediaItem.get('url');
  const name = mediaItem.get('name');
  return `<img src="${url}" alt="${name}"/>`;
}

export function detailLink(mediaItem) {
  return mediaItem.get('media_type') + "/" + mediaItem.get('id');
}

export function preview(mediaItem) {
  return <Thumbnail mediaItem={mediaItem} width={50} height={50}/>
}

export default {
  embedCode,
  detailLink,
  preview,
  Field: PictureField
};
