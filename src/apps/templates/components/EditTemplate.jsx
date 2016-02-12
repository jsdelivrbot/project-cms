import React from 'react';
import _ from 'lodash';
import Codemirror from 'react-codemirror';

import 'codemirror/mode/jinja2/jinja2';


export default class EditTemplate extends React.Component {
  constructor(props) {
    super(props) //{updateTemplate, template, path}
    this.state = props.template.toJS();
  }

  receiveSubmit = (event) => {
    event.preventDefault();
    this.props.updateTemplate(this.props.path, this.state);
  }

  updateContent = (code) => {
    this.setState({content: code});
  }

  deleteTemplate = (event) => {
    this.props.removeTemplate(this.props.path);
  }

  render() {
    let path = this.props.path;
    let template = this.state;

    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <h1>Editing Template: {path}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <form onSubmit={this.receiveSubmit}>
            <div className="form-group">
              <label className="control-label">Template</label>
              <span className="help-block">Write the HTML layout using <a href="https://mozilla.github.io/nunjucks/">nunjucks</a></span>
              <Codemirror value={template.content} onChange={this.updateContent} options={{
                  mode: 'jinja2',
                  lineNumbers: true
              }} />
            </div>
            <div className="form-group">
              <div className="col-sm-6">
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
              <div className="col-sm-6">
                <button type="button" className="btn btn-danger" onClick={this.deleteTemplate}>Delete</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  }
}
