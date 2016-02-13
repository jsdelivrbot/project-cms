import React from 'react';
import _ from 'lodash';


export default class AddAsset extends React.Component {
  constructor(props) {
    super(props) //{addAsset, uploadFile}
    this.state = {
      asset: {},
      uploading: false,
      uploaded: false
    };
  }

  receiveSubmit = (event) => {
    event.preventDefault();
    this.props.addAsset(this.state.asset);
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
      let {url, path} = result;
      let asset = _.assign({}, this.state.asset, {
        name: file.name,
        url,
        path,
      });

      var changes = {
        uploading: false,
        uploaded: true,
        asset
      };
      this.setState(changes);
    }, error => {
      //TODO craft alert
      console.error(error);
      this.setState({uploading: false});
    });
  }

  render() {
    let {asset, uploading, uploaded} = this.state;

    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <h1>Add Asset</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <form onSubmit={this.receiveSubmit}>
            <div className="form-group">
              <label className="control-label">Asset</label>
              <input type="file" name="file" className="form-control" required="required" onChange={this.updateFile}/>
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
              <button type="submit" disabled={!uploaded || uploading} className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  }
}
