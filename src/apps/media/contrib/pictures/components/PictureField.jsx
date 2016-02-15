import React from 'react';

import Thumbnail from './Thumbnail.jsx';


export default function PictureField({mediaItem, onSelectMedia}) {
  //TODO pictures app should define a modal for editing crop sizes or selecting a new item
  //console.log("PictureField", mediaItem, onSelectMedia);
  return <div>
    <button onClick={onSelectMedia}>
      <Thumbnail mediaItem={mediaItem} width={50} height={50}/>
    </button>
  </div>
}
