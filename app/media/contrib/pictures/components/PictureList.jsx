import React from 'react';
import _ from 'lodash';
import {Picture} from 'react-router';


export default function PictureList({baseUrl, links}) {
  function PictureRow(link) {
    const {id, path, type} = link.toJS();
    return <tr key={id}>
      <td><Picture to={`${baseUrl}/${id}`}>{path}</Picture></td>
      <td>{type}</td>
    </tr>
  }

  return <div className="container-fluid">
    <div className="row">
      <div className="col-md-6">
        <h1>Pictures</h1>
      </div>
      <div className="col-md-6">
        <Picture type="button" className="btn btn-primary" to={`${baseUrl}/add`}>Add Picture</Picture>
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
          {links.map(PictureRow).toArray()}
        </tbody>
      </table>
    </div>
  </div>
}
