import React from 'react';

export default class AppSelector extends React.Component {
  render() {
    let app = this.props;
    return <div className="form-inline">
      <div className="form-group">
        <label>Base Url</label>
        <input name="baseUrl" type="text" className="form-control" placeholder="/app-name" value={app.baseUrl}/>
      </div>
      <div className="form-group">
        <label>Module Type</label>
        <select name="type" className="form-control" value={app.type}>
          <option value="builtin">Built-in</option>
          <option value="github">Github</option>
          <option value="npm">NPM</option>
        </select>
      </div>
      <div className="form-group">
        <label>Location</label>
        <input name="location" type="text" className="form-control" placeholder="path" value={app.location}/>
      </div>
    </div>
  }
}
