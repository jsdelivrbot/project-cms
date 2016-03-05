import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router';


export default function TemplateSettingsList({baseUrl, templates}) {
  function TemplateSettingsRow(template) {
    const {path} = template.toJS()
    return <tr key={path}>
      <td><Link to={`${baseUrl}${path}`}>{path}</Link></td>
    </tr>
  }

  return <div className="container-fluid">
    <div className="row">
      <div className="col-md-6">
        <h1>Registered Templates</h1>
      </div>
      <div className="col-md-6">
        <Link type="button" className="btn btn-primary" to={`${baseUrl}/add`}>Register Template</Link>
      </div>
    </div>
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Path</th>
          </tr>
        </thead>
        <tbody>
          {templates.map(TemplateSettingsRow).toArray()}
        </tbody>
      </table>
    </div>
  </div>
}
