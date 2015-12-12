import React from 'react';
import _ from 'lodash';

import AppSelector from './AppSelector.jsx';


export default class EditSite extends React.Component {
  constructor(props) {
    super(props) //{updateSettings, settings}
    this.state = _.clone(props.settings);

  }

  receiveSubmit = (event) => {
    event.preventDefault();
    console.log("Submit:", event);
    this.props.updateSettings(this.state)
  }

  updateValue = (event) => {
    var changes = {};
    changes[event.target.name] = event.target.value;
    this.setState(changes);
  }

  renderAppSelections() {
    return _.map(this.state.apps, appDef => {
      return <AppSelector {...appDef}/>
    });
  }

  render() {
    let settings = this.state;
    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <h1>Edit Engine Settings</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <form onSubmit={this.receiveSubmit}>
            <div className="form-group">
              <label className="control-label">Apps</label>
              {this.renderAppSelections()}
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
