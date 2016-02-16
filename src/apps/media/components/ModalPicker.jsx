import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import _ from 'lodash';

function Uploading({percent}) {
  return <progress value={percent} max={100}>{percent} %</progress>
}

function MediaRow({providers, mediaItem, onSelect, selectMultiple, selected}) {
  const provider = _.find(providers, {baseUrl: mediaItem.get('media_type')});
  if (!provider || !provider.itemInterface) {
    return <tr/>
  }

  function send(event) {
    event.preventDefault();
    onSelect(mediaItem);
  }

  let selectedStatus = selectMultiple ?
    <td key="selected" onClick={send}>
      {selected ? <span className="glyphicon glyphicon-ok"/> : null}
    </td>
    : null;

  return <tr>
    { selectedStatus }
    <td key="preview"><button onClick={send}>
      {provider.itemInterface.preview(mediaItem)}
    </button></td>
  </tr>
}

//TODO do something with mediaTypes
export default class ModalPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      selection: new Set(),
      uploading: false
    };
  }
  //props = {providers, media, respondWithMedia, mediaTypes, quantityLimit, visible}

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.visible !== nextProps.visible) {
      if (nextProps.visible) {
        $("#media-modal-picker").modal('show');
      } else {
        $("#media-modal-picker").modal('hide');
      }

      this.setState({
        selection: new Set(),
        visible: nextProps.visible,
      });
    }
  }

  onDismiss = (event) => {
    event.preventDefault();
    this.props.respondWithMedia(null);
  };

  onSelectMultiple = (mediaItem) => {
    let selection = this.state.selection;
    let id = mediaItem.get('id');
    if (selection.has(id)) {
      selection.delete(id);
    } else {
      selection.add(id);
    }
    this.forceUpdate();
    //this.setState({selection});
  };

  onSelect = (mediaItem) => {
    this.props.respondWithMedia(this.translateMediaItem(mediaItem));
  };

  onSubmitSelection = (event) => {
    event.preventDefault();
    let selection = this.state.selection;
    let items = [];
    for (let id of selection.values()) {
      let mediaItem = this.props.media.get(id);
      items.push(this.translateMediaItem(mediaItem));
    }
    this.props.respondWithMedia(items);
  };

  translateMediaItem(media_item) {
    //return a reference that can be looked up
    return {
      mediaType: media_item.get('media_type'),
      table: '/media',
      id: media_item.get('id'),
    };
  }

  onUploadProgress = (event) => {
    this.setState({
      percentUploaded: Math.round(event.loaded / event.total * 100)
    });
  };

  uploadFiles = (event) => {
    let provider = _.find(this.props.providers, {baseUrl: this._uploader});
    this.props.uploadFiles(event.target.files, this.onUploadProgress).then(({result}) => {
      return this.props.dispatch(provider.actions.pushFiles(this._uploader, result));
    }).then(({media_items}) => {
      let selection = this.state.selection;
      media_items.forEach(media_item => selection.add(media_item.get('id')));
      this.setState({uploading: false, selection});
    }).catch(error => {
      console.error(error);
      this.setState({uploading: false});
    })
    this.setState({uploading: true, percentUploaded: 0});
  };

  setUploader = (media_type, event) => {
    this._uploader = media_type;
    this.refs.uploadfield.click();
  };

  render() {
    let {providers, media, mediaTypes, quantityLimit} = this.props;
    let {selection, visible, uploading, percentUploaded} = this.state;
    let upload_options = [];
    const selectMultiple = quantityLimit > 1;
    const modalFade = visible ? "in" : "";

    if (mediaTypes) {
      media = media.filter(x => mediaTypes.indexOf(x.get('media_type')) !== -1);

      _.each(mediaTypes, media_type => {
        let provider = _.find(providers, {baseUrl: media_type});
        if (provider.actions.pushFiles) {
          upload_options.push(<button key={media_type} type="button" className="btn btn-default" onClick={_.partial(this.setUploader, media_type)}>Upload {provider.title}</button>);
        }
      });
    } else {
      _.each(providers, provider => {
        if (provider.actions.pushFiles) {
          let media_type = provider.baseUrl;
          upload_options.push(<button key={media_type} type="button" className="btn btn-default" onClick={_.partial(this.setUploader, media_type)}>Upload {provider.title}</button>);
        }
      });
    }


    return <div className={`modal fade ${modalFade}`} id="media-modal-picker" tabIndex="-1" role="dialog" aria-labelledby="media-modal-picker-label">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" aria-label="Close" onClick={this.onDismiss}><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="media-modal-picker-label">Media Picker</h4>
          </div>
          <div className="modal-body">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    {selectMultiple ? <th key="selected">Selected</th> : null}
                    <th key="item">Item</th>
                  </tr>
                </thead>
                <tbody>
                  {media.map((mediaItem, id) =>
                    <MediaRow providers={providers} mediaItem={mediaItem}
                      onSelect={selectMultiple ? this.onSelectMultiple : this.onSelect}
                      selected={selection.has(id)}
                      selectMultiple={selectMultiple} key={id}/>).toArray()}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <input type="file" style={{visibility: 'hidden'}} ref="uploadfield" key="uploadfield" multiple onChange={this.uploadFiles}/>
            {uploading ? <Uploading key="uploading" percent={percentUploaded}/> : upload_options}
            { selectMultiple
              ? <button type="button" className="btn btn-default" onClick={this.onSubmitSelection} key="submit">Submit</button>
              : null
            }
            <button type="button" className="btn btn-default" onClick={this.onDismiss} key="dismiss">Close</button>
          </div>
        </div>
      </div>
    </div>
  }
}
