import React from 'react';
import _ from 'lodash';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jinja2/jinja2';

import PreviewForm from './DefinitionPreviewForm.jsx';


export default class EditDefinition extends React.Component {
  constructor(props) {
    super(props) //{updaeDefinition}
    this.state = props.definition.toJS();
    this.state.templateSource = props.templateSource;
  }

  receiveSubmit = (event) => {
    event.preventDefault();
    console.log("Submit:", event);
    this.props.updateDefinition(this.state.id, this.state)
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

  updateUiSchema = (code) => {
    this.setState({
      uiSchema: code
    });
  }

  updateTemplateSource = (code) => {
    this.setState({
      templateSource: code
    });
  }

  render() {
    let definition = this.state;
    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <h1>Edit snippet definition</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <form onSubmit={this.receiveSubmit}>
            <div className="form-group">
              <label className="control-label">Description</label>
              <input value={definition.description} type="text" name="description" onChange={this.updateValue} placeholder="ie: Contact Form, Image Slider, Menu" className="form-control"/>
            </div>

            <div className="form-group">
              <label className="control-label">Template</label>
              <Codemirror value={definition.templateSource} onChange={this.updateTemplateSource} options={{
                  mode: 'jinja2',
                  lineNumbers: true
              }} />
            </div>

            <div className="form-group">
              <label className="control-label">Form</label>
              <span className="help-block">Write using <a href="https://json-schema.org/">json-schema</a>.</span>
              <Codemirror value={definition.schema} onChange={this.updateSchema} options={{
                  mode: 'javascript',
                  json: true,
                  lineNumbers: true
              }} />
            </div>

            <div className="form-group">
              <label className="control-label">UI Schema</label>
              <span className="help-block">UI Definitions: <a href="https://mozilla-services.github.io/react-jsonschema-form/">ui-schema</a>.</span>
              <Codemirror value={definition.uiSchema} onChange={this.updateUiSchema} options={{
                  mode: 'javascript',
                  json: true,
                  lineNumbers: true
              }} />
            </div>

            <div className="form-group">
              <label className="control-label">Form Preview</label>
              <PreviewForm schema={definition.schema} uiSchema={definition.uiSchema}/>
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
