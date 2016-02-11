import React from 'react';
import _ from 'lodash';


export default class EditPicture extends React.Component {
  constructor(props) {
    super(props) //{updatePicture, picture}
    this.state = props.picture.toJS();
  }

  receiveSubmit = (event) => {
    event.preventDefault();
    this.props.updatePicture(this.state);
  }

  updateValue = (event) => {
    var changes = {};
    changes[event.target.name] = event.target.value;
    this.setState(changes);
  }

  render() {
    let picture = this.state;

    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <h1>Edit Picture</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <form onSubmit={this.receiveSubmit}>
            <div className="form-group">
              <label className="control-label">Source</label>
              <input type="file" name="source" className="form-control" value={picture.source} required="required" onChange={this.updateValue}/>
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
