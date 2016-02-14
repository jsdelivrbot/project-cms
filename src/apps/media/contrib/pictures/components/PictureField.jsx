import React from 'react';

export default function PictureField({mediaItem, onSelectMedia}) {
  //TODO lookup if we have a thumbnail
  //TODO pictures app should define a modal for editing crop sizes or selecting a new item
  //console.log("PictureField", mediaItem, onSelectMedia);
  return <div>
    <button onClick={onSelectMedia}>
      <img src={mediaItem.get('url')} alt={mediaItem.get('name')} width={50}/>
    </button>
  </div>
}
