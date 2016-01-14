import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router';

/*
<button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
  Launch demo modal
</button>
*/

function MediaRow({providers, media_item, respondWithMedia}) {
  let provider = _.find(providers, {baseUrl: media_item.media_type});
  if (!provider || !provider.renderMediaItem) {
    return <tr/>
  }

  function send(event) {
    respondWithMedia(media_item);
  }

  return <tr>
    <td><a onClick={send}>
      {provider.renderMediaItem(media_item, "preview")}
    </a></td>
    <td>{provider.title}</td>
  </tr>
}

//TODO selecting an item needs to send a return value to whoever opened the dialog
//TODO caller needs to be able to set embed type filter (ie img tag) so the user may only select images
export default function ModalPicker({providers, media, respondWithMedia}) {
  function dismiss() {
    respondWithMedia(null);
  }

  return <div className="modal fade" id="media-modal-picker" tabIndex="-1" role="dialog" aria-labelledby="media-modal-picker-label">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" aria-label="Close" onClick={dismiss}><span aria-hidden="true">&times;</span></button>
          <h4 className="modal-title" id="myModalLabel">Modal title</h4>
        </div>
        <div className="modal-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Provider</th>
                </tr>
              </thead>
              <tbody>
                {media.map((media_item, id) =>
                  <MediaRow providers={providers} media_item={media_item.toJS()} respondWithMedia={respondWithMedia} key={id}/>).toArray()
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" onClick={dismiss}>Close</button>
        </div>
      </div>
    </div>
  </div>
}
