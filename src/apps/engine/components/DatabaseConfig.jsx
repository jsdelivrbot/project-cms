import React from 'react';
import _ from 'lodash';


export default class DatabaseConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.databaseConfig ? props.databaseConfig.toJS() : {};
  }

  receiveSubmit = (event) => {
    event.preventDefault();
    console.log("Submit:", event);
    //TODO merge with form (event.target...)
    this.state.module = event.target['module'].value;
    this.props.setDatabaseConfig(this.state);
  }

  updateValue = (event) => {
    var changes = {};
    changes[event.target.name] = event.target.value;
    this.setState(changes);
  }

  renderBackendConfig(backend) {
    switch(backend) {
      case "browser":
        return <BrowserConfig/>
      case "dynamodb":
        return <DynamoConfig updateValue={this.updateValue} {...this.state} />
    }
    return null;
  }

  render() {
    let database = this.state;
    let origin = window.location.hostname;

    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <h1>Database Config</h1>
        </div>
      </div>

      <form onSubmit={this.receiveSubmit}>
        <div className="row">
          <div className="form-group col-sm-12">
            <label>Backend</label>
            <select name="backend" value={database.backend} onChange={this.updateValue} className="form-control">
              <option>Select Database Backend</option>
              <option value="browser">Browser</option>
              <option value="dynamodb">DynamoDB</option>
            </select>
          </div>
        </div>
        {this.renderBackendConfig(database.backend)}
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

export function BrowserConfig() {
  return <input type="hidden" name="module" value="~/services/localdb"/>
}

export function DynamoConfig({key, secret, table, updateValue}) {
  return (
    <div className="row">
      <input type="hidden" name="module" value="~/services/dynamodb"/>
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
      <div className="form-group col-sm-12">
        <label>DynamoDB Table</label>
        <span className="help-block">Ensure that you have permissions to read & write</span>
        <input name="table" value={table} onChange={updateValue}
          type="text" className="form-control" placeholder="tableName"/>
      </div>
    </div>
  )
}
