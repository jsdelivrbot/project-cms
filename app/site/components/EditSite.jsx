import React from 'react';
import _ from 'lodash';
import Codemirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';


export default class EditSite extends React.Component {
  constructor(props) {
    super(props) //{updateSite, site}
    this.state = _.clone(props.site);

    this.updateHead = _.partial(this.updateCode, 'head');
    this.updateCSS = _.partial(this.updateCode, 'css');
    this.updateJavascript = _.partial(this.updateCode, 'javascript');
  }

  receiveSubmit = (event) => {
    event.preventDefault();
    console.log("Submit:", event);
    this.props.updateSite(this.state)
  }

  updateValue = (event) => {
    var changes = {};
    changes[event.target.name] = event.target.value;
    this.setState(changes);
  }

  //for use with codemirror
  updateCode = (name, code) => {
    var changes = {};
    changes[name] = code;
    this.setState(changes);
  }

  render() {
    let site = this.state;
    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <h1>Edit Site Settings</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <form onSubmit={this.receiveSubmit}>
            <div className="form-group">
              <label className="control-label">Site Name</label>
              <input name="name" className="form-control" value={site.name} required="required" onChange={this.updateValue}/>
            </div>
            <div className="form-group">
              <label className="control-label">Head</label>
              <span className="help-block">Put extra tags to be inserted into the &lt;head&gt; of the HTML document</span>
              <Codemirror value={site.head} onChange={this.updateHead} options={{
                  mode: 'htmlmixed',
                  lineNumbers: true
              }} />
            </div>
            <div className="form-group">
              <label className="control-label">Javascript</label>
              <span className="help-block">Specify custom Javascript code to be executed on this page, automatically wrapped in a javascript tag</span>
              <Codemirror value={site.javascript} onChange={this.updateJavascript} options={{
                  mode: 'javascript',
                  lineNumbers: true
              }} />
            </div>
            <div className="form-group">
              <label className="control-label">CSS</label>
              <span className="help-block">Specify custom CSS for this page, automatically wrapped in a style tag</span>
              <Codemirror value={site.css} onChange={this.updateCSS} options={{
                  mode: 'css',
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
