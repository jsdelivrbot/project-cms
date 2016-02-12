import React from 'react';
import _ from 'lodash';
import Codemirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';


export class PictureList extends React.Component {
  constructor(props) {
    super(props); //{askForMedia, value, onChange}
    let value = props.value || props.defaultValue || [];
    this.state = {
      value,
      count: value.length
    }
  }

  signalChange(value) {
    if (!value) value = this.state.value;

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  removeRow = (event) => {

  }

  addPictures = (event) => {
    event.preventDefault();
    this.props.askForMedia(['pictures'], 20).then(media_item => {
      if (!media_item) return;

      var value = this.state.value;
      if (_.isArray(media_item)) {
        value = value.concat(media_item);
      } else {
        value.push(media_item);
      }
      this.setState({value});
      this.signalChange(value);
    });
  }

  selectPicture = (event) => {
    let index = parseInt(event.target.dataset.index);
    this.props.askForMedia(['pictures'], 1).then(media_item => {
      if (!media_item) return;

      var value = this.state.value;
      value[index] = media_item
      this.setState({value});
      this.signalChange(value);
    });
  }

  renderPictureRow(picture, index) {
    //TODO what is the shape of picture?
    console.log("renderPictureRow:", picture);
    return <div className="form-group" key={index}>
      <label className="control-label" key="label">Picture</label>
      { picture
        ? <img src={picture} onClick={this.selectPicture} key="picture" data-index={index}/>
      : <button className="btn btn-default" onClick={this.selectPicture} key="picture" data-index={index}>Select</button>
      }
    </div>
  }

  render() {
    return <div>
      {_.map(this.state.value, this.renderPictureRow, this)}

      <div className="form-group" key="add">
        <button type="button" className="btn btn-default" onClick={this.addPictures}>Add Pictures</button>
      </div>
    </div>
  }
}

export default class AddGallery extends React.Component {
  constructor(props) {
    super(props) //{addGallery, askForMedia, render}
    this.state = {
      pictures: []
    };

    this.updateHead = _.partial(this.updateCode, 'head');
    this.updateCSS = _.partial(this.updateCode, 'css');
    this.updateJavascript = _.partial(this.updateCode, 'javascript');
  }

  receiveSubmit = (event) => {
    event.preventDefault();
    console.log("Submit:", event);
    this.props.addGallery(this.state.path, this.state)
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

  updatePictures = (pictures) => {
    this.setState({pictures});
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
          <h1>Add Gallery</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <form onSubmit={this.receiveSubmit}>
            <div className="form-group" key="path">
              <label className="control-label">Path</label>
              <span className="help-block">Must start with a / ; may contain alphanumerics, dashes, slashes and periods only</span>
              <input name="path" className="form-control" value={gallery.path} required="required" onChange={this.updateValue}
                pattern="^\/[a-z0-9-\/\.]+$" placeholder="/path.html"/>
            </div>
            <div className="form-group" key="title">
              <label className="control-label">Title</label>
              <input name="title" className="form-control" value={gallery.title} required="required" onChange={this.updateValue}/>
            </div>
            <div className="form-group" key="template">
              <label className="control-label">Template</label>
              <select name="template" className="form-control" value={gallery.template} onChange={this.updateValue}>
                {this.renderTemplateOptions()}
              </select>
            </div>
            <PictureList onChange={this.updatePictures} value={gallery.pictures} askForMedia={this.props.askForMedia} key="pictures"/>

            <div className="form-group" key="adv-button">
              <button className="btn btn-default" type="button" data-toggle="collapse" data-target="#galleryAdvanced" aria-expanded="false" aria-controls="collapseExample">
                Advanced
              </button>
            </div>

            <div className="collapse" id="galleryAdvanced" key="adv">
              <div className="well">
                <div className="form-group" key="head">
                  <label className="control-label">Head</label>
                  <span className="help-block">Put extra tags to be inserted into the &lt;head&gt; of the HTML document</span>
                  <Codemirror value={gallery.head} onChange={this.updateHead} options={{
                      mode: 'htmlmixed'
                  }} />
                </div>
                <div className="form-group" key="javascript">
                  <label className="control-label">Javascript</label>
                  <span className="help-block">Specify custom Javascript code to be executed on this gallery, automatically wrapped in a javascript tag</span>
                  <Codemirror value={gallery.javascript} onChange={this.updateJavascript} options={{
                      mode: 'javascript'
                  }} />
                </div>
                <div className="form-group" key="css">
                  <label className="control-label">CSS</label>
                  <span className="help-block">Specify custom CSS for this gallery, automatically wrapped in a style tag</span>
                  <Codemirror value={gallery.css} onChange={this.updateCSS} options={{
                      mode: 'css'
                  }} />
                </div>
              </div>
            </div>

            <div className="form-group" key="submit">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  }
}
