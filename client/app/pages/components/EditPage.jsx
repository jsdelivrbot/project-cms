import React from 'react';
import _ from 'lodash';

import RenderPreview from './RenderPreview.jsx';


export default class EditPage extends React.Component {
  constructor(props) {
    super(props) //{updatePage, page, path, render}
    this.state = _.clone(props.page);
  }

  receiveSubmit = (event) => {
    event.preventDefault();
    console.log("Submit:", event);
    this.props.updatePage(this.props.path, this.state)
  }

  updateValue = (event) => {
    var changes = {};
    changes[event.target.name] = event.target.value;
    this.setState(changes);
  }

  renderTemplateOptions() {
    return this.props.templates.map((template, path) => {
      return <option key={path} value={path}>{path}</option>
    }).toArray();
  }

  render() {
    let page = this.state;
    return <div className="container-fluid">
      <div className="row">
        <h1>Editing Page: {page.title}</h1>
      </div>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={this.receiveSubmit}>
            <div className="form-group">
              <label className="control-label">Title</label>
              <input name="title" className="form-control" value={page.title} required="required" onChange={this.updateValue}/>
            </div>
            <div className="form-group">
              <label className="control-label">Template</label>
              <select name="template" className="form-control" value={page.template} onChange={this.updateValue}>
                {this.renderTemplateOptions()}
              </select>
            </div>
            <div className="form-group">
              <label className="control-label">Content (markdown)</label>
              <textarea name="content" className="form-control" value={page.content} required="required" onChange={this.updateValue}/>
            </div>

            <div className="form-group">
              <button className="btn btn-default" type="button" data-toggle="collapse" data-target="#pageAdvanced" aria-expanded="false" aria-controls="collapseExample">
                Advanced
              </button>
            </div>

            <div className="collapse" id="pageAdvanced">
              <div className="well">
                <div className="form-group">
                  <label className="control-label">Head</label>
                  <textarea name="head" className="form-control" value={page.head} required="required" onChange={this.updateValue}/>
                </div>
                <div className="form-group">
                  <label className="control-label">Javascript</label>
                  <textarea name="javascript" className="form-control" value={page.javascript} required="required" onChange={this.updateValue}/>
                </div>
                <div className="form-group">
                  <label className="control-label">CSS</label>
                  <textarea name="css" className="form-control" value={page.css} required="required" onChange={this.updateValue}/>
                </div>
              </div>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <h3 key="title">Preview</h3>
          <RenderPreview page={page} render={this.props.render} key="preview"/>
        </div>
      </div>
    </div>
  }
}
