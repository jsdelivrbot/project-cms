import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux'

import {askForMedia} from '~/actions'


export function MediaField({allowedTypes, mediaItem, mediaApp, onSelect, askForMedia, ...props}) {
  function selectMedia(event) {
    console.log("selectMedia")
    event.preventDefault();
    askForMedia(allowedTypes, 1).then(onSelect);
  }

  if (mediaItem) {
    let Field = mediaApp.itemInterface.Field;

    return <Field onSelectMedia={selectMedia} mediaItem={mediaItem} {...props}/>
  } else {
    return <button onClick={selectMedia} {...props}>Select</button>
  }
}

export default connect((state, props) => {
  let {mediaRef} = props;
  let mediaItem, mediaType, mediaApp;
  if (mediaRef) {
    mediaItem = state.getIn(['tables', mediaRef.table, mediaRef.id]);
    mediaType = mediaItem.get('media_type');
    mediaApp = _.find(state.getIn(['/engine', 'apps']), {baseUrl: mediaType});
  }
  return {
    mediaItem,
    mediaType,
    mediaApp,
  }
}, {
  askForMedia
})(MediaField);
