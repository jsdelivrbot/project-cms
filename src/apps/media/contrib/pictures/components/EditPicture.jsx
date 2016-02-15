import React from 'react';
import _ from 'lodash';


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
                <img src={thumbnail.url} width="50"/>
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
