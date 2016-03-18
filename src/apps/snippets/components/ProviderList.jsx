import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router';


function AddSnippet({link, title}) {
  return <li key={link}>
    <Link to={link}>{title}</Link>
  </li>
}

function AddButton({addLinks}) {
  return <div className="btn-group">
    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
      Add Snippet <span className="caret"/>
    </button>
    <ul className="dropdown-menu">
      {_.map(addLinks, AddSnippet)}
    </ul>
  </div>
}

function ServiceLinks({serviceLinks}) {
  function ServiceLink({link, title}) {
    return <Link to={link} className="btn btn-default" key={link}>{title}</Link>
  }

  return <div className="btn-group">
    {_.map(serviceLinks, ServiceLink)}
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
      {snippet.get('key')}
    </Link></td>
    <td>{provider.title}</td>
  </tr>
}


export default function ProviderList({providers, snippets, addLinks, serviceLinks}) {
  return <div className="container-fluid">
    <div className="row">
      <div className="col-md-12">
        <h1>Snippets</h1>
      </div>
      <div className="col-md-6">
        <AddButton addLinks={addLinks}/>
      </div>
      <div className="col-md-6">
        <ServiceLinks serviceLinks={serviceLinks}/>
      </div>
    </div>
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Key</th>
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
