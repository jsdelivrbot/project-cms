import React from 'react';
import _ from 'lodash';


export default class EditAsset extends React.Component {
  constructor(props) {
    super(props) //{updateAsset, asset}
    this.state = props.asset.toJS();
  }

  receiveSubmit = (event) => {
    event.preventDefault();
    this.props.updateAsset(this.state);
  }

  updateValue = (event) => {
    var changes = {};
    changes[event.target.name] = event.target.value;
    this.setState(changes);
  }

  render() {
    let asset = this.state;

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
              <input type="file" name="file" className="form-control" value={asset.file} required="required" onChange={this.updateValue}/>
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
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  }
}
