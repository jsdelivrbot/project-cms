import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router';


export default function LinkList({baseUrl, links}) {
  console.log("LINKS:", links);
  
  function LinkRow({id, path, type}) {
    return <tr key={id}>
      <td><Link to={`${baseUrl}/${id}`}>{path}</Link></td>
      <td>{type}</td>
    </tr>
  }

  return <div className="container-fluid">
    <div className="row">
      <div className="col-md-6">
        <h1>Links</h1>
      </div>
      <div className="col-md-6">
        <Link type="button" className="btn btn-primary" to={`${baseUrl}/add`}>Add Link</Link>
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
          {_.map(links, LinkRow)}
        </tbody>
      </table>
    </div>
  </div>
}
