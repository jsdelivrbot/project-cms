import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router';


export default function GalleryList({baseUrl, galleries}) {
  function GalleryRow({title, path}) {
    return <tr key={path}>
      <td><Link to={`${baseUrl}${path}`}>{title}</Link></td>
      <td>{path}</td>
    </tr>
  }

  return <div className="container-fluid">
    <div className="row">
      <div className="col-md-6">
        <h1>Galleries</h1>
      </div>
      <div className="col-md-6">
        <Link type="button" className="btn btn-primary" to={`${baseUrl}/add`}>Add Gallery</Link>
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
          {_.map(galleries, GalleryRow)}
        </tbody>
      </table>
    </div>
  </div>
}
