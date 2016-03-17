import React from 'react';
import _ from 'lodash';


export default class AddTemplateSettings extends React.Component {
  constructor(props) {
    super(props) //{addTemplateSettings}
    this.state = {};
  }

  receiveSubmit = (event) => {
    event.preventDefault();
    console.log("Submit:", event);
    this.props.addTemplateSettings(this.state.path, this.state)
  }

  updateValue = (event) => {
    var changes = {};
    changes[event.target.name] = event.target.value;
    this.setState(changes);
  }

  renderTemplateOptions() {
    return this.props.availableTemplates.map((template, path) => {
      return <option key={path} value={path}>{path}</option>
    }).toArray();
  }

  render() {
    let template = this.state;
    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <h1>Register Template</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <form onSubmit={this.receiveSubmit}>
            <div className="form-group">
              <label className="control-label">Template</label>
              <select name="path" className="form-control" value={template.path} onChange={this.updateValue}>
                {this.renderTemplateOptions()}
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
