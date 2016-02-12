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

function MediaRow({providers, media_item}) {
  let media_type = media_item.get('media_type');
  let provider = _.find(providers, {baseUrl: media_type});
  if (!provider || !provider.renderMediaItem) {
    return <tr/>
  }
  return <tr>
    <td><Link to={provider.renderMediaItem(media_item, "detail_link")}>
      {provider.renderMediaItem(media_item, "preview")}
    </Link></td>
    <td>{provider.title}</td>
  </tr>
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
            <th>Item</th>
            <th>Provider</th>
          </tr>
        </thead>
        <tbody>
          {media.map((media_item, id) => <MediaRow providers={providers} media_item={media_item} key={id}/>).toArray()}
        </tbody>
      </table>
    </div>
  </div>
}
