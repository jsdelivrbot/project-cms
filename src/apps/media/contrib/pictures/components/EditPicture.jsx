import React from 'react';
import _ from 'lodash';
import Cropper from 'react-cropper';

import {dataURLToBlob} from '~/middleware/thumbnailer';


//TODO click thumbnail -> modal to crop
//ASK_FOR_CROP ?
//Cropper Dashboard Plugin?
//Cant it just be embedded?
function Uploading({percent}) {
  return <progress value={percent} max={100}>{percent} %</progress>
}

export class Thumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cropping: false,
      uploading: false
    };
  }

  startNewCrop = (event) => {
    event.preventDefault();
    this.setState({cropping: true});
  }

  cancelCrop = (event) => {
    event.preventDefault();
    this.setState({cropping: false});
  }

  doCrop = (event) => {
    event.preventDefault();
    //TODO upload replace or request thumbnail?
    let canvasDataUrl = this.refs.cropper.getCroppedCanvas().toDataURL();
    let {thumbnail} = this.props;
    this.setState({
      uploading: true,
      percentUploaded: 0
    });
    this.props.replaceFile(dataURLToBlob(canvasDataUrl), thumbnail.path, this.onProgress).then(result => {
      this.setState({
        uploading: false,
        cropping: false,
      });
    }, error => {
      console.error("Error while attempting to replace file:")
      console.error(error);
      this.setState({
        uploading: false,
        error: error
      });
    });
  }

  onProgress = (event) => {
    this.setState({
      percentUploaded: Math.round(event.loaded / event.total * 100)
    });
  }

  resetError = (event) => {
    event.preventDefault();
    this.setState({
      error: null
    });
  }

  render() {
    let {thumbnail, original} = this.props;
    let aspectRatio = thumbnail.width/thumbnail.height;
    let {cropping, uploading, percentUploaded, error} = this.state;
    if (error) {
      return <pre onClick={this.resetError}>Error: <code>{error.toString()}</code></pre>
    }
    if (uploading) {
      return <Uploading percent={percentUploaded}/>
    }
    if (cropping) {
      return <div>
        <Cropper aspectRatio={aspectRatio} src={original} width={thumbnail.width} ref="cropper"/>
        <button type="button" className="btn btn-primary" onClick={this.doCrop}>Crop</button>
        <button type="button" className="btn btn-default" onClick={this.cancelCrop}>Cancel</button>
      </div>
    }
    return <img src={thumbnail.url} width={thumbnail.width} onClick={this.startNewCrop}/>
  }
}

export default class EditPicture extends React.Component {
  constructor(props) {
    super(props) //{updatePicture, picture, uploadFile}
    this.state = {
      picture: props.picture.toJS(),
      uploading: false
    };
  }

  receiveSubmit = (event) => {
    event.preventDefault();
    this.props.updatePicture(this.state.picture);
  }

  updateValue = (event) => {
    var changes = {
      picture: _.clone(this.state.picture)
    };
    changes.picture[event.target.name] = event.target.value;
    this.setState(changes);
  }

  updateFile = (event) => {
    //TODO only replaceFile on submit? or just uploadFile?
    let file = event.target.files[0];
    this.setState({uploading: true});
    this.props.replaceFile(file, this.state.picture.path).then(({result}) => {
      let {url, path} = result;
      let picture = _.assign({}, this.state.picture, {
        name: file.name,
        url,
        path,
      });

      console.log("updated file to:", url);
      var changes = {
        uploading: false,
        uploaded: true,
        picture
      };
      this.setState(changes);
    }, error => {
      //TODO craft alert
      console.error(error);
      this.setState({uploading: false});
    });
  }

  render() {
    let {replaceFile} = this.props;
    let {picture, uploading} = this.state;

    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <h1>Edit Picture</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <form onSubmit={this.receiveSubmit}>
            <div className="form-group">
              <label className="control-label">Source</label>
              <img src={picture.url} width="50"/>
              <input type="file" name="source" className="form-control" required="required" onChange={this.updateFile}/>
            </div>
            <h2>Thumbnails</h2>
            {_.map(picture.thumbnails, (thumbnail, key) => (
              <div className="form-group" key={key}>
                <label className="control-label">{key}</label>
                <Thumbnail thumbnail={thumbnail} original={picture.url} replaceFile={replaceFile}/>
              </div>
            ))}
            <div className="form-group">
              <button type="submit" disabled={uploading} className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  }
}
