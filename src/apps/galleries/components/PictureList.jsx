import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux'

import {askForMedia} from '~/actions'
import MediaField from '~/components/MediaField.jsx';


export class PictureList extends React.Component {
  static allowedTypes = ['/media/pictures'];

  constructor(props) {
    super(props); //{value, onChange}
    let value = props.value || props.defaultValue || [];
    this.state = {
      value
    };
  }

  signalChange(value) {
    if (!value) value = this.state.value;

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  removePicture = (event) => {
    event.preventDefault();
    let index = parseInt(event.target.dataset.index);

    var value = this.state.value.slice();
    value.splice(index, 1);
    console.log("removePicture", index, value)
    this.setState({value});
    this.signalChange(value);
  }

  addPictures = (event) => {
    event.preventDefault();
    this.props.askForMedia(this.allowedTypes, 20).then(media_item => {
      if (!media_item) return;

      var value = this.state.value.slice();
      if (_.isArray(media_item)) {
        _.each(media_item, mi => {
          value.push(mi.id)
        });
      } else {
        value.push(media_item.id);
      }
      this.setState({value});
      this.signalChange(value);
    });
  }

  setPicture = (index, media_item) => {
    if (!media_item) return;

    var value = this.state.value.slice();
    value[index] = media_item.id
    this.setState({value});
    this.signalChange(value);
  }

  renderPictureRow = (pictureId, index) => {
    let setPicture = _.partial(this.setPicture, index);
    return <div className="form-group" key={index}>
      <MediaField mediaId={pictureId} allowedTypes={this.allowedTypes} onChange={setPicture} key="picture"/>
      <button className="btn btn-default" onClick={this.removePicture} key="remove" data-index={index}>Remove</button>
    </div>
  }

  render() {
    return <div>
      {_.map(this.state.value, this.renderPictureRow)}

      <div className="form-group" key="add">
        <button type="button" className="btn btn-default" onClick={this.addPictures}>Add Pictures</button>
      </div>
    </div>
  }
}

export default connect(null, {
  askForMedia
})(PictureList);
