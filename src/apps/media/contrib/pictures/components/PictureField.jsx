import React from 'react';

export default function PictureField({media_item}) {
  //TODO lookup if we have a thumbnail
  //TODO pictures app should define a modal for editing crop sizes or selecting a new item
  return <img src={media_item.get('url')} alt={media_item.get('name')} width={50}/>
}
