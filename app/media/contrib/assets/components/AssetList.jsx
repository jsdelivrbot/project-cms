import React from 'react';
import _ from 'lodash';
import {Asset} from 'react-router';


export default function AssetList({baseUrl, links}) {
  function AssetRow(link) {
    const {id, path, type} = link.toJS();
    return <tr key={id}>
      <td><Asset to={`${baseUrl}/${id}`}>{path}</Asset></td>
      <td>{type}</td>
    </tr>
  }

  return <div className="container-fluid">
    <div className="row">
      <div className="col-md-6">
        <h1>Assets</h1>
      </div>
      <div className="col-md-6">
        <Asset type="button" className="btn btn-primary" to={`${baseUrl}/add`}>Add Asset</Asset>
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
          {links.map(AssetRow).toArray()}
        </tbody>
      </table>
    </div>
  </div>
}
