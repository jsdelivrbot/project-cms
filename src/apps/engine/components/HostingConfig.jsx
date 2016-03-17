import React from 'react';
import _ from 'lodash';


export default class HostingConfig extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.hostingConfig ? props.hostingConfig.toJS() : {};
  }

  receiveSubmit = (event) => {
    event.preventDefault();
    console.log("Submit:", event);
    //TODO merge with form (event.target...)
    this.state.module = event.target['module'].value;
    this.props.setHostingConfig(this.state);
  }

  updateValue = (event) => {
    var changes = {};
    changes[event.target.name] = event.target.value;
    this.setState(changes);
  }

  renderBackendConfig(backend) {
    switch(backend) {
      case "s3":
        return <S3Config updateValue={this.updateValue} value={this.state} />
    }
    return null;
  }

  render() {
    let hosting = this.state;

    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <h1>Hosting Config</h1>
        </div>
      </div>

      <form onSubmit={this.receiveSubmit}>
        <div className="row">
          <div className="form-group col-sm-12">
            <label>Backend</label>
            <select name="backend" value={hosting.backend} onChange={this.updateValue} className="form-control">
              <option>Select Hosting Backend</option>
              <option value="s3">AWS S3</option>
            </select>
          </div>
        </div>
        {this.renderBackendConfig(hosting.backend)}
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group" key="submit">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  }
}

export function S3Config({value, updateValue}) {
  let origin = window.location.hostname;
  let {key, secret, bucket, prefix} = value;

  return (
    <div className="row">
      <input type="hidden" name="module" value="~/services/s3"/>
      <div className="form-group col-sm-6">
        <label>Access Key</label>
        <input name="key" value={key} onChange={updateValue}
          type="text" className="form-control" placeholder="XXXXX"/>
      </div>
      <div className="form-group col-sm-6">
        <label>Secret Key</label>
        <input name="secret" value={secret} onChange={updateValue}
          type="text" className="form-control" placeholder="XXXXX"/>
      </div>
      <div className="form-group col-sm-6">
        <label>S3 Bucket</label>
        <span className="help-block">Ensure that you have cross-origin set to allow requests from {origin}</span>
        <input name="bucket" value={bucket} onChange={updateValue}
          type="text" className="form-control" placeholder="bucket-name"/>
      </div>
      <div className="form-group col-sm-6">
        <label>Subfolder</label>
        <span className="help-block">(Optional) Set a subfolder for uploads. No trailing slash.</span>
        <input name="prefix" value={prefix} onChange={updateValue}
          type="text" className="form-control" placeholder="prefix"/>
      </div>
    </div>
  )
}
