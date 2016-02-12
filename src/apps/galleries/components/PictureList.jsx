import React from 'react';
import _ from 'lodash';


export default class PictureList extends React.Component {
  constructor(props) {
    super(props); //{askForMedia, value, onChange}
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
    this.props.askForMedia(['pictures'], 20).then(media_item => {
      if (!media_item) return;

      var value = this.state.value.slice();
      if (_.isArray(media_item)) {
        value = value.concat(media_item);
      } else {
        value.push(media_item);
      }
      this.setState({value});
      this.signalChange(value);
    });
  }

  selectPicture = (event) => {
    let index = parseInt(event.target.dataset.index);
    this.props.askForMedia(['pictures'], 1).then(media_item => {
      if (!media_item) return;

      var value = this.state.value.slice();
      value[index] = media_item
      this.setState({value});
      this.signalChange(value);
    });
  }

  renderPictureRow = (picture, index) => {
    //TODO what is the shape of picture?
    console.log("renderPictureRow:", picture);
    return <div className="form-group" key={index}>
      <label className="control-label" key="label">Picture</label>
      <img src={picture.url} onClick={this.selectPicture} key="picture" data-index={index}/>
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
