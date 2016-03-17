import React from 'react';
import _ from 'lodash';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';

import PreviewForm from './PreviewForm.jsx';


export default class EditTemplateSettings extends React.Component {
  constructor(props) {
    super(props) //{updateTemplateSettings, template}
    this.state = props.template.toJS();
  }

  receiveSubmit = (event) => {
    event.preventDefault();
    console.log("Submit:", event);
    this.props.updateTemplateSettings(this.props.path, this.state)
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

  render() {
    let template = this.state;
    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <h1>Edit Template Settings</h1>
        </div>
      </div>
      <div className="row">
        <div className="cold-md-6 col-sm-12">
          <div className="form-group">
            <label className="control-label">Additional Fields</label>
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
            <label className="control-label">Fields Preview</label>
            <PreviewForm schema={template.schema}/>
          </div>
        </div>

        <div className="col-md-6 col-sm-12">
          <form onSubmit={this.receiveSubmit}>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  }
}
