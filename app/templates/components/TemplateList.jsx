import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router';


export default function TemplateList({baseUrl, templates}) {
  function TemplateRow({path, type}) {
    return <tr key={path}>
      <td><Link to={`${baseUrl}${path}`}>{path}</Link></td>
      <td>{type}</td>
    </tr>
  }

  return <div className="container-fluid">
    <div className="row">
      <div className="col-md-6">
        <h1>Templates</h1>
      </div>
      <div className="col-md-6">
        <Link type="button" className="btn btn-primary" to={`${baseUrl}/add`}>Add Template</Link>
      </div>
    </div>
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Path</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {_.map(templates, TemplateRow)}
        </tbody>
      </table>
    </div>
  </div>
}
