import React from 'react';
import _ from 'lodash';
import Codemirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/markdown/markdown';

import RenderPreview from './RenderPreview.jsx';


export default class EditGallery extends React.Component {
  constructor(props) {
    super(props) //{updateGallery, gallery, path, render}
    this.state = props.gallery.toJS();

    this.updateContent = _.partial(this.updateCode, 'content');
    this.updateHead = _.partial(this.updateCode, 'head');
    this.updateCSS = _.partial(this.updateCode, 'css');
    this.updateJavascript = _.partial(this.updateCode, 'javascript');
  }

  receiveSubmit = (event) => {
    event.preventDefault();
    console.log("Submit:", event);
    this.props.updateGallery(this.props.path, this.state)
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

  deleteGallery = (event) => {
    this.props.removeGallery(this.props.path);
  }

  renderTemplateOptions() {
    return this.props.templates.map((template, path) => {
      return <option key={path} value={path}>{path}</option>
    }).toArray();
  }

  render() {
    let gallery = this.state;
    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <h1>Editing Gallery: {gallery.title}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <form onSubmit={this.receiveSubmit}>
            <div className="form-group">
              <label className="control-label">Title</label>
              <input name="title" className="form-control" value={gallery.title} required="required" onChange={this.updateValue}/>
            </div>
            <div className="form-group">
              <label className="control-label">Template</label>
              <select name="template" className="form-control" value={gallery.template} onChange={this.updateValue}>
                {this.renderTemplateOptions()}
              </select>
            </div>
            <div className="form-group">
              <label className="control-label">Content</label>
              <span className="help-block">Write using <a href="https://help.github.com/articles/markdown-basics/">markdown</a>.</span>
              <Codemirror value={gallery.content} onChange={this.updateContent} options={{
                  mode: 'markdown',
                  lineNumbers: true
              }} />
            </div>

            <div className="form-group">
              <button className="btn btn-default" type="button" data-toggle="collapse" data-target="#galleryAdvanced" aria-expanded="false" aria-controls="collapseExample">
                Advanced
              </button>
            </div>

            <div className="collapse" id="galleryAdvanced">
              <div className="well">
                <div className="form-group">
                  <label className="control-label">Head</label>
                  <span className="help-block">Put extra tags to be inserted into the &lt;head&gt; of the HTML document</span>
                  <Codemirror value={gallery.head} onChange={this.updateHead} options={{
                      mode: 'htmlmixed'
                  }} />
                </div>
                <div className="form-group">
                  <label className="control-label">Javascript</label>
                  <span className="help-block">Specify custom Javascript code to be executed on this gallery, automatically wrapped in a javascript tag</span>
                  <Codemirror value={gallery.javascript} onChange={this.updateJavascript} options={{
                      mode: 'javascript'
                  }} />
                </div>
                <div className="form-group">
                  <label className="control-label">CSS</label>
                  <span className="help-block">Specify custom CSS for this gallery, automatically wrapped in a style tag</span>
                  <Codemirror value={gallery.css} onChange={this.updateCSS} options={{
                      mode: 'css'
                  }} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-3">
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
              <div className="col-sm-3">
                <button type="button" className="btn btn-danger" onClick={this.deleteGallery}>Delete</button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-6 col-sm-12">
          <h3 key="title">Preview</h3>
          <RenderPreview gallery={gallery} render={this.props.render} key="preview"/>
        </div>
      </div>
    </div>
  }
}
