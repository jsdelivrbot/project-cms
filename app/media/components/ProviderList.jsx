import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router';


function ProvidersNav({providers}) {
  function ProviderLink({baseUrl, title}) {
    return <li key={baseUrl}>
      <Link to={baseUrl} className="btn">{title}</Link>
    </li>
  }

  return <ul>
    {_.map(providers, ProviderLink)}
  </ul>
}


export default function ProviderList({providers, media}) {
  return <div className="container-fluid">
    <div className="row">
      <div className="col-md-6">
        <h1>Media Providers</h1>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <ProvidersNav providers={providers}/>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <h1>Media</h1>
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
          {}
        </tbody>
      </table>
    </div>
  </div>
}
