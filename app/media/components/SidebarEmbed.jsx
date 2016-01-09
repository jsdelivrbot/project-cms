import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router';


function MediaRow({providers, media_item}) {
  let provider = _.find(providers, {baseUrl: media_item.media_type});
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

export default function SidebarEmbed({providers, media}) {
  return <div/>
  return <div className="table-responsive">
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Item</th>
          <th>Provider</th>
        </tr>
      </thead>
      <tbody>
        {media.map((media_item, id) => <MediaRow providers={providers} media_item={media_item.toJS()} key={id}/>).toArray()}
      </tbody>
    </table>
  </div>
}
