import React from 'react';
import {connect} from 'react-redux'

import {makeThumbnail} from '~/actions';


export class Thumbnail extends React.Component {
  componentWillMount() {
    let key = this.thumbnailKey();
    let {mediaItem, width, height} = this.props;
    if (!mediaItem.getIn(['thumbnails', key])) {
      this.props.makeThumbnail(mediaItem.toJS(), {width, height});
    }
  }
  thumbnailKey() {
    return this.props.thumbnailKey || `${this.props.width}x${this.props.height}`;
  }

  render() {
    let {mediaItem, width, height} = this.props;
    let key = this.thumbnailKey();
    let thumbnail = mediaItem.getIn(['thumbnails', key]);
    if (thumbnail) {
      return <img src={thumbnail.get('url')} alt={mediaItem.get('name')} width={width}/>
    }
    return <img src={mediaItem.get('url')} alt={mediaItem.get('name')} width={width}/>
  }
}

export default connect(null, {
  makeThumbnail,
})(Thumbnail);
