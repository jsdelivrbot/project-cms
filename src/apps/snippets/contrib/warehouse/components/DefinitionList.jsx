import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router';


function DefinitionRow({baseUrl, definition}) {
  return <tr>
    <td><Link to={baseUrl+"/edit-definition/"+definition.get('id')}>
      {definition.get('id')}
    </Link></td>
    <td>{definition.get('description')}</td>
  </tr>
}


export default function DefinitionList({definitions, baseUrl}) {
  return <div className="container-fluid">
    <div className="row">
      <div className="col-md-6">
        <h1>Definitions</h1>
      </div>
      <div className="col-md-12">
        <Link to={baseUrl+"/add-definition"} className="btn btn-primary">Add Definition</Link>
      </div>
    </div>
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {definitions.map((definition, id) => <DefinitionRow baseUrl={baseUrl} definition={definition} key={id}/>).toArray()}
        </tbody>
      </table>
    </div>
  </div>
}
