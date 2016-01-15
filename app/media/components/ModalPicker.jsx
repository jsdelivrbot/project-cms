import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import _ from 'lodash';
import {Link} from 'react-router';


function MediaRow({providers, media_item, onSelect, selectMultiple}) {
  let provider = _.find(providers, {baseUrl: media_item.media_type});
  if (!provider || !provider.renderMediaItem) {
    return <tr/>
  }

  function send(event) {
    onSelect(media_item);
  }

  return <tr>
    <td><a onClick={send}>
      {provider.renderMediaItem(media_item, "preview")}
    </a></td>
    <td>{provider.title}</td>
  </tr>
}

//TODO do something with mediaTypes
export default class ModalPicker extends React.Component {
  //props = {providers, media, respondWithMedia, mediaTypes, quantityLimit}

  shouldComponentUpdate(nextProps, nextState) {
    console.log("refresh selection?", shallowCompare(this, nextProps, nextState), nextProps);
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    let {providers, media, respondWithMedia, mediaTypes, quantityLimit} = this.props;
    const selectMultiple = quantityLimit > 1;
    console.log("refresh selection");
    let selection = new Set();

    function dismiss() {
      respondWithMedia(null);
      selection.clear();
    }

    function onSelect(media_item) {
      if (selectMultiple) {
        respondWithMedia(media_item);
      } else {
        if (selection.has(media_item)) {
          selection.delete(media_item);
        } else {
          selection.add(media_item);
        }
      }
    }

    function submitSelection() {
      respondWithMedia(selection.values());
      selection.clear();
    }

    return <div className="modal fade" id="media-modal-picker" tabIndex="-1" role="dialog" aria-labelledby="media-modal-picker-label">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" aria-label="Close" onClick={dismiss}><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="media-modal-picker-label">Media Picker</h4>
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
                    <MediaRow providers={providers} media_item={media_item.toJS()} onSelect={onSelect} selectMultiple={selectMultiple} key={id}/>).toArray()
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            { selectMultiple
              ? <button type="button" className="btn btn-default" onClick={submitSelection} key="submit">Submit</button>
              : null
            }
            <button type="button" className="btn btn-default" onClick={dismiss} key="dismiss">Close</button>
          </div>
        </div>
      </div>
    </div>
  }
}
