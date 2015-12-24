import React from 'react';
import _ from 'lodash';


export default class EditSite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appsConfig: _.clone(props.appsConfig)
    };

  }

  receiveSubmit = (event) => {
    event.preventDefault();
    console.log("Submit:", event);
    this.props.setAppsConfig(this.state.appsConfig)
  }

  updateValue = (event) => {
    var changes = {};
    changes[event.target.name] = event.target.value;
    this.setState(changes);
  }

  updateAppValue = (index, event) => {
    var changes = {
      appsConfig: _.clone(this.state.appsConfig)
    };
    changes.appsConfig[index][event.target.name] = event.target.value;
    this.setState(changes);
  }

  addApp = (event) => {
    var changes = {
      appsConfig: _.clone(this.state.appsConfig)
    };
    changes.appsConfig.push({});
    this.setState(changes);
  }

  renderAppField = (app, index) => {
    var update = _.partial(this.updateAppValue, index);
    return <div className="row well" key={index}>
      <div className="form-group col-sm-3">
        <label>Base Url</label>
        <input name="baseUrl" value={app.baseUrl} onChange={update}
          type="text" className="form-control" placeholder="/app-name"/>
      </div>
      <div className="form-group col-sm-3">
        <label>Module Type</label>
        <select name="type" className="form-control" value={app.type} onChange={update}>
          <option value="builtin">Built-in</option>
          <option value="github">Github</option>
          <option value="npm">NPM</option>
        </select>
      </div>
      <div className="form-group col-sm-6">
        <label>Location</label>
        <input name="location" value={app.location} onChange={update}
          type="text" className="form-control" placeholder="path"/>
      </div>
    </div>
  }

  render() {
    let apps = this.state.appsConfig;
    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <h1>Applications</h1>
        </div>
      </div>

      <form onSubmit={this.receiveSubmit}>
        {_.map(apps, this.renderAppField)}
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group" key="add">
              <button type="button" className="btn btn-defualt" onClick={this.addApp}>Add</button>
            </div>
          </div>
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
