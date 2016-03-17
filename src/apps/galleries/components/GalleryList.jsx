import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router';


export default function GalleryList({baseUrl, galleries}) {
  function GalleryRow(gallery) {
    let {id, path, title} = gallery.toJS();
    return <tr key={path}>
      <td><Link to={`${baseUrl}/${id}`}>{title}</Link></td>
      <td>{path}</td>
    </tr>
  }

  return <div className="container-fluid">
    <div className="row">
      <div className="col-md-6">
        <h1>Galleries</h1>
      </div>
      <div className="col-md-3">
        <Link type="button" className="btn btn-primary" to={`${baseUrl}/templates`}>Manage Templates</Link>
      </div>
      <div className="col-md-3">
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
          {galleries.map(GalleryRow).toArray()}
        </tbody>
      </table>
    </div>
  </div>
}
