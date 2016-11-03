import React from 'react';
import _ from 'lodash';


export default class AppsConfig extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)
    this.state = props.appsConfig.toJS();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.appsConfig !== this.props.appsConfig) {
      this.setState(nextProps.appsConfig.toJS());
    }
  }

  receiveSubmit = (event) => {
    event.preventDefault();
    console.log("Submit:", event);
    let apps = _.filter(this.state.apps, config => {
      return config.baseUrl && config.location && config.type;
    });
    this.props.setAppsConfig(_.assign(this.state, {apps}), this.context.store);
  }

  updateAppValue = (index, event) => {
    var changes = {
      apps: _.clone(this.state.apps)
    };
    changes.apps[index][event.target.name] = event.target.value;
    this.setState(changes);
  }

  addApp = (event) => {
    var changes = {
      apps: _.clone(this.state.apps)
    };
    changes.apps.push({
      type: 'builtin'
    });
    this.setState(changes);
  }

  removeApp = (index, event) => {
    event.preventDefault();
    var changes = {
      apps: _.clone(this.state.apps)
    };
    changes.apps.splice(index, 1);
    this.setState(changes);
  }

  renderAppField = (app, index) => {
    var update = _.partial(this.updateAppValue, index);
    var remove = _.partial(this.removeApp, index);
    return <div className="row well" key={index}>
      <div className="form-group col-sm-3">
        <label>Base Url</label>
        <input name="baseUrl" value={app.baseUrl} onChange={update}
          type="text" className="form-control" placeholder="/app-name"/>
      </div>
      <div className="form-group col-sm-3">
        <label>Module Type</label>
        <select name="type" className="form-control" value={app.type} onChange={update}>
          <option>Select</option>
          <option value="builtin">Built-in</option>
          <option value="github">Github</option>
          <option value="npm">NPM</option>
        </select>
      </div>
      <div className="form-group col-sm-5">
        <label>Location</label>
        <input name="location" value={app.location} onChange={update}
          type="text" className="form-control" placeholder="path"/>
      </div>
      <div className="form-group col-sm-``">
        <button onClick={remove} className="btn btn-danger">X</button>
      </div>
    </div>
  }

  render() {
    let {apps} = this.state;
    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <h1>Applications</h1>
        </div>
      </div>

      <form onSubmit={this.receiveSubmit}>
        {_.map(apps, this.renderAppField)}
        <div className="row" key="ctrl-row">
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
