import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router';


export default function PageList({baseUrl, pages}) {
  function PageRow(page) {
    const {title, id, path} = page.toJS()
    return <tr key={path}>
      <td><Link to={`${baseUrl}/${id}`}>{title}</Link></td>
      <td>{path}</td>
    </tr>
  }

  return <div className="container-fluid">
    <div className="row">
      <div className="col-md-6">
        <h1>Pages</h1>
      </div>
      <div className="col-md-6">
        <Link type="button" className="btn btn-primary" to={`${baseUrl}/add`}>Add Page</Link>
      </div>
    </div>
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Path</th>
          </tr>
        </thead>
        <tbody>
          {pages.map(PageRow).toArray()}
        </tbody>
      </table>
    </div>
  </div>
}
