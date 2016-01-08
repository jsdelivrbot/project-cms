import React from 'react';
import _ from 'lodash';


export default class AddLink extends React.Component {
  constructor(props) {
    super(props) //{addLink}
    this.state = {};
  }

  receiveSubmit = (event) => {
    event.preventDefault();
    this.props.addLink(this.state);
  }

  updateValue = (event) => {
    var changes = {};
    changes[event.target.name] = event.target.value;
    this.setState(changes);
  }

  render() {
    let link = this.state;

    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <h1>Add Link</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <form onSubmit={this.receiveSubmit}>
            <div className="form-group">
              <label className="control-label">Path</label>
              <span className="help-block">Url Link to the asset</span>
              <input name="path" className="form-control" value={link.path} required="required" onChange={this.updateValue}
                placeholder="https://domain.com/path.html"/>
            </div>
            <div className="form-group">
              <label className="control-label">Type</label>
              <span className="help-block">Type of link embed</span>
              <select name="type" className="form-control" value={link.type} required="required" onChange={this.updateValue}>
                <option>Select link type</option>
                <option value="anchor">Anchor (generic)</option>
                <option value="css">CSS</option>
                <option value="javascript">Javascript</option>
                <option value="image">Image</option>
              </select>
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
