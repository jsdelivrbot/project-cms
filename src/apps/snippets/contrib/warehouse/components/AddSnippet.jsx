import React from 'react';
import _ from 'lodash';


export default class AddSnippet extends React.Component {
  constructor(props) {
    super(props) //{addSnippet, snippetDefinition}
    this.state = {};
  }

  receiveSubmit = (event) => {
    event.preventDefault();
    this.props.addSnippet(this.state);
  }

  updateValue = (event) => {
    var changes = {};
    changes[event.target.name] = event.target.value;
    this.setState(changes);
  }

  updateForm = (state) => {
    this.setState(state.formData);
  }

  render() {
    let snippet = this.state;
    let {snippetDefinition, Form} = this.props;

    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <h1>Add Snippet</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <form onSubmit={this.receiveSubmit}>
            <div className="form-group">
              <label className="control-label">key</label>
              <input name="key" className="form-control" value={snippet.key} required="required" onChange={this.updateValue}
                placeholder="snippet-name"/>
            </div>

            <Form formData={snippet} onChange={this.updateForm} schema={snippetDefinition.get('schema')}/>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  }
}
