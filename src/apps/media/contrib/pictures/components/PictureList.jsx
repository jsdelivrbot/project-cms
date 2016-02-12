import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router';


export default function PictureList({baseUrl, pictures}) {
  function PictureRow(picture) {
    const {id, path, type} = picture.toJS();
    return <tr key={id}>
      <td><Link to={`${baseUrl}/${id}`}>{path}</Link></td>
      <td>{type}</td>
    </tr>
  }

  return <div className="container-fluid">
    <div className="row">
      <div className="col-md-6">
        <h1>Pictures</h1>
      </div>
      <div className="col-md-6">
        <Link type="button" className="btn btn-primary" to={`${baseUrl}/add`}>Add Picture</Link>
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
          {pictures.map(PictureRow).toArray()}
        </tbody>
      </table>
    </div>
  </div>
}
