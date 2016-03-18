import React from 'react';
import _ from 'lodash';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jinja2/jinja2';
import {v4} from 'node-uuid';

import PreviewForm from './DefinitionPreviewForm.jsx';


export default class AddDefinition extends React.Component {
  constructor(props) {
    super(props) //{addDefinition}
    this.state = {
      id: v4()
    };
  }

  receiveSubmit = (event) => {
    event.preventDefault();
    console.log("Submit:", event);
    this.props.addDefinition(this.state)
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
          <h1>Create new snippet definition</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <form onSubmit={this.receiveSubmit}>
            <div className="form-group">
              <label className="control-label">Description</label>
              <input value={definition.description} type="text" name="description" onChange={this.updateValue} placeholder="ie: Contact Form, Image Slider, Menu"/>
            </div>

            <div className="form-group">
              <label className="control-label">Template</label>
              <Codemirror value={definition.templateSource} onChange={this.updateTemplateSource} options={{
                  mode: 'jinja2',
                  lineNumbers: true
              }} />
            </div>

            <div className="cold-md-6 col-sm-12">
              <div className="form-group">
                <label className="control-label">Form</label>
                <span className="help-block">Write using <a href="https://json-schema.org/">json-schema</a>.</span>
                <Codemirror value={definition.schema} onChange={this.updateSchema} options={{
                    mode: 'javascript',
                    json: true,
                    lineNumbers: true
                }} />
              </div>
            </div>
            <div className="cold-md-6 col-sm-12">
              <div className="form-group">
                <label className="control-label">Form Preview</label>
                <PreviewForm schema={definition.schema}/>
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
