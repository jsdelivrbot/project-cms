import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router';


function ProvidersNav({providers}) {
  function ProviderLink({baseUrl, title, actions}) {
    return <Link to={baseUrl+"/add"} className="btn btn-default" key={baseUrl}>Add {title}</Link>
  }

  return <div className="btn-group">
    {_.map(providers, ProviderLink)}
  </div>
}

function SnippetRow({providers, snippet}) {
  let snippet_type = snippet.get('snippet_type');
  let provider = _.find(providers, {baseUrl: snippet_type});
  if (!provider || !provider.itemInterface) {
    console.log("Unrecognized provider:", snippet_type, provider);
    return <tr/>
  }
  return <tr>
    <td><Link to={provider.itemInterface.detailLink(snippet)}>
      {provider.itemInterface.preview(snippet)}
    </Link></td>
    <td>{provider.title}</td>
  </tr>
}


export default function ProviderList({providers, snippets}) {
  return <div className="container-fluid">
    <div className="row">
      <div className="col-md-6">
        <h1>Snippet Providers</h1>
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
          {snippets.map((snippet, id) => <SnippetRow providers={providers} snippet={snippet} key={id}/>).toArray()}
        </tbody>
      </table>
    </div>
  </div>
}
