import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import _ from 'lodash';


function MediaRow({providers, media_item, onSelect, selectMultiple, selected}) {
  const provider = _.find(providers, {baseUrl: media_item.get('media_type')});
  if (!provider || !provider.renderMediaItem) {
    return <tr/>
  }

  function send(event) {
    onSelect(media_item);
  }

  let selectedStatus = selectMultiple ?
    <td key="selected" onClick={send}>
      {selected ? <span className="glyphicon glyphicon-ok"/> : null}
    </td>
    : null;

  return <tr>
    { selectedStatus }
    <td key="preview"><button onClick={send}>
      {provider.renderMediaItem(media_item, "preview")}
    </button></td>
    <td key="provider">{provider.title}</td>
  </tr>
}

//TODO do something with mediaTypes
export default class ModalPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      selection: new Set()
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

  onSelectMultiple = (media_item) => {
    let selection = this.state.selection;
    if (selection.has(media_item)) {
      selection.delete(media_item);
    } else {
      selection.add(media_item);
    }
    this.forceUpdate();
    //this.setState({selection});
  };

  onSelect = (media_item) => {
    this.props.respondWithMedia(this.translateMediaItem(media_item));
  };

  onSubmitSelection = (event) => {
    event.preventDefault();
    let selection = this.state.selection;
    let items = [];
    for (let media_item of selection.values()) {
      items.push(this.translateMediaItem(media_item));
    }
    this.props.respondWithMedia(items);
  };

  translateMediaItem(media_item) {
    //const provider = _.find(providers, {baseUrl: media_item.get('media_type')});
    return media_item.toJS();
  }

  render() {
    let {providers, media, mediaTypes, quantityLimit} = this.props;
    let {selection, visible} = this.state;
    const selectMultiple = quantityLimit > 1;
    const modalFade = visible ? "in" : "";

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
                    <th key="provider">Provider</th>
                  </tr>
                </thead>
                <tbody>
                  {media.map((media_item, id) =>
                    <MediaRow providers={providers} media_item={media_item}
                      onSelect={selectMultiple ? this.onSelectMultiple : this.onSelect}
                      selected={selection.has(media_item)}
                      selectMultiple={selectMultiple} key={id}/>).toArray()}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
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
