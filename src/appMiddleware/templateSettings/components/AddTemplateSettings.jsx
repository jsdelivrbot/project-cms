import React from 'react';
import _ from 'lodash';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';

import PreviewForm from './PreviewForm.jsx';


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

  //for use with codemirror
  updateSchema = (code) => {
    this.setState({
      schema: code
    });
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
                <option>Select Template</option>
                {this.renderTemplateOptions()}
              </select>
            </div>

            <div className="cold-md-6 col-sm-12">
              <div className="form-group">
                <label className="control-label">Fields</label>
                <span className="help-block">Write using <a href="https://json-schema.org/">json-schema</a>.</span>
                <Codemirror value={template.schema} onChange={this.updateSchema} options={{
                    mode: 'javascript',
                    json: true,
                    lineNumbers: true
                }} />
              </div>
            </div>
            <div className="cold-md-6 col-sm-12">
              <div className="form-group">
                <label className="control-label">UI Schema for Fields</label>
                <span className="help-block">Write using <a href="https://mozilla-services.github.io/react-jsonschema-form/">ui-schema</a>.</span>
                <Codemirror value={template.uiSchema} onChange={this.updateUiSchema} options={{
                    mode: 'javascript',
                    json: true,
                    lineNumbers: true
                }} />
              </div>
            </div>
            <div className="cold-md-6 col-sm-12">
              <div className="form-group">
                <label className="control-label">Fields Preview</label>
                <PreviewForm schema={template.schema}/>
              </div>
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
