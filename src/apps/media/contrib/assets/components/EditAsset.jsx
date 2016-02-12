import React from 'react';
import _ from 'lodash';


export default class EditAsset extends React.Component {
  constructor(props) {
    super(props) //{updateAsset, asset, uploadFile}
    this.state = {
      asset: props.asset.toJS(),
      uploading: false
    };
  }

  receiveSubmit = (event) => {
    event.preventDefault();
    this.props.updateAsset(this.state.asset);
  }

  updateValue = (event) => {
    var changes = {
      asset: _.clone(this.state.asset)
    };
    changes.asset[event.target.name] = event.target.value;
    this.setState(changes);
  }

  updateFile = (event) => {
    let file = event.target.files[0];
    this.setState({uploading: true});
    this.props.uploadFile(file).then(({result}) => {
      let url = result.url;
      console.log("updated file to:", url);
      var changes = {
        uploading: false,
        asset: _.clone(this.state.asset)
      }
      changes.asset.url = url;
      this.setState(changes);
    }, error => {
      //TODO craft alert
      console.error(error);
      this.setState({uploading: false});
    });
  }

  render() {
    let {asset, uploading} = this.state;

    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <h1>Edit Asset</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <form onSubmit={this.receiveSubmit}>
            <div className="form-group">
              <label className="control-label">Asset</label>
              <span className="help-block">{asset.url}</span>
              <input type="file" name="file" className="form-control" required="required" onChange={this.updateValue}/>
            </div>
            <div className="form-group">
              <label className="control-label">Type</label>
              <span className="help-block">Type of asset embed</span>
              <select name="type" className="form-control" value={asset.type} required="required" onChange={this.updateValue}>
                <option>Select asset type</option>
                <option value="anchor">Anchor (generic)</option>
                <option value="css">CSS</option>
                <option value="javascript">Javascript</option>
                <option value="image">Image</option>
              </select>
            </div>
            <div className="form-group">
              <button type="submit" disabled={uploading} className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  }
}
