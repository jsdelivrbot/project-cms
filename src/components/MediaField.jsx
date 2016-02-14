import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux'

import {askForMedia} from '~/actions'


export function MediaField({allowedTypes, mediaItem, mediaApp, onSelect, ...props}) {
  function selectMedia(event) {
    event.preventDefault();
    askForMedia(allowedTypes, 1).then(onSelect);
  }

  if (mediaItem) {
    let renderMediaItem = mediaApp.renderMediaItem;

    return <button onClick={selectMedia} {...props}>
      {renderMediaItem(mediaItem, 'field') || renderMediaItem(mediaItem, 'preview')}
    </button>
  } else {
    return <button onClick={selectMedia} {...props}>Select</button>
  }
}

export default connect((state, props) => {
  let {mediaId} = props;
  let mediaItem, mediaType, mediaApp;
  if (mediaId) {
    mediaItem = state.getIn(['tables', '/media', mediaId]);
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
