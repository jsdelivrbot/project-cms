import React from 'react';
import _ from 'lodash';


export default class AwsConfig extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.awsConfig.toJS();
  }

  receiveSubmit = (event) => {
    event.preventDefault();
    console.log("Submit:", event);
    this.props.setAwsConfig(this.state);
  }

  updateValue = (event) => {
    var changes = {};
    changes[event.target.name] = event.target.value;
    this.setState(changes);
  }

  render() {
    let aws = this.state;
    let origin = window.location.hostname;

    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <h1>AWS Config</h1>
          <p>By adding AWS credentials you are enabling publishing directly to S3. Please ensure that the keys used only have access to the S3 bucket specified.</p>
        </div>
      </div>

      <form onSubmit={this.receiveSubmit}>
        <div className="row">
          <div className="form-group col-sm-6">
            <label>Access Key</label>
            <input name="key" value={aws.key} onChange={this.updateValue}
              type="text" className="form-control" placeholder="XXXXX"/>
          </div>
          <div className="form-group col-sm-6">
            <label>Secret Key</label>
            <input name="secret" value={aws.secret} onChange={this.updateValue}
              type="text" className="form-control" placeholder="XXXXX"/>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-sm-6">
            <label>S3 Bucket</label>
            <span className="help-block">Ensure that you have cross-origin set to allow requests from {origin}</span>
            <input name="bucket" value={aws.bucket} onChange={this.updateValue}
              type="text" className="form-control" placeholder="bucket-name"/>
          </div>
        </div>
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
