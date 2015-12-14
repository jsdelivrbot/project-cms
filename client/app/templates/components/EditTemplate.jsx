import React from 'react';
import _ from 'lodash';
import Codemirror from 'react-codemirror';

import 'codemirror/mode/jinja2/jinja2';


export default class EditTemplate extends React.Component {
  constructor(props) {
    super(props) //{updateTemplate, template, path}
    this.state = _.clone(props.template);
  }

  receiveSubmit = (event) => {
    event.preventDefault();
    this.props.updateTemplate(this.props.path, this.state);
  }

  updateContent = (code) => {
    this.setState({content: code});
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
              <span className="help-block">Write the HTML layout using <a href="https://paularmstrong.github.io/swig/">swig</a></span>
              <Codemirror value={template.content} onChange={this.updateContent} options={{
                  mode: 'jinja2',
                  lineNumbers: true
              }} />
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
