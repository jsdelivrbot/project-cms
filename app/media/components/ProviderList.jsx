import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router';


export default function ProviderList({baseUrl, providers}) {
  function Provider({baseUrl, title}) {
    return <tr key={baseUrl}>
      <td><Link to={baseUrl}>{title}</Link></td>
      <td>{baseUrl}</td>
    </tr>
  }

  return <div className="container-fluid">
    <div className="row">
      <div className="col-md-6">
        <h1>Media Providers</h1>
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
          {_.map(providers, Provider)}
        </tbody>
      </table>
    </div>
  </div>
}
