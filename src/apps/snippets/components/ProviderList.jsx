import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router';


function ProvidersNav({providers}) {
  function ProviderLink({baseUrl, title}) {
    return <Link to={baseUrl} className="btn btn-default" key={baseUrl}>{title}</Link>
  }

  return <div className="btn-group">
    {_.map(providers, ProviderLink)}
  </div>
}

function SnippetRow({providers, snippit}) {
  let snippit_type = snippit.get('snippit_type');
  let provider = _.find(providers, {baseUrl: snippit_type});
  if (!provider || !provider.itemInterface) {
    return <tr/>
  }
  return <tr>
    <td><Link to={provider.itemInterface.detailLink(snippit)}>
      {provider.itemInterface.preview(snippit)}
    </Link></td>
    <td>{provider.title}</td>
  </tr>
}


export default function ProviderList({providers, snippit}) {
  return <div className="container-fluid">
    <div className="row">
      <div className="col-md-6">
        <h1>Snippit Providers</h1>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <ProvidersNav providers={providers}/>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <h1>Snippets</h1>
      </div>
    </div>
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Item</th>
            <th>Provider</th>
          </tr>
        </thead>
        <tbody>
          {snippit.map((snippit, id) => <SnippetRow providers={providers} snippit={snippit} key={id}/>).toArray()}
        </tbody>
      </table>
    </div>
  </div>
}
