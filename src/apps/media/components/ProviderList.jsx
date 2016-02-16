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
  if (!provider || !provider.itemInterface) {
    return <tr/>
  }
  return <tr>
    <td><Link to={provider.itemInterface.detailLink(media_item)}>
      {provider.itemInterface.preview(media_item)}
    </Link></td>
    <td>{provider.title}</td>
  </tr>
}


export default class ProviderList extends React.Component {
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
    event.preventDefault();
    this._uploader = media_type;
    this.refs.uploadfield.click();
  };

  renderUploadOptions() {
    return <div className="btn-group">
    {
      _.reduce(this.props.providers, (col, provider) => {
        if (provider.actions.pushFiles) {
          col.push(<button key={provider.baseUrl} className="btn btn-primary" onClick={_.partial(this.setUploader, provider.baseUrl)}>Upload {provider.title}</button>)
        }
        return col;
      }, [])
    }
    </div>
  }

  render()  {
    let {providers, media} = this.props;
    return <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <h1>Media Providers</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <ProvidersNav providers={providers}/>
        </div>
        <div className="col-md-6">
          {this.renderUploadOptions()}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h1>Media</h1>
        </div>
        <div className="col-md-6">
          <input type="file" style={{visibility: 'hidden'}} ref="uploadfield" key="uploadfield" multiple onChange={this.uploadFiles}/>
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
}
