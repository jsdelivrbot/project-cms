import _ from 'lodash';
import {v4} from 'node-uuid';

export function addAsset(baseUrl, asset) {
  let assetId = v4();

  asset = _.assign({
    id: assetId,
    media_type: baseUrl,
  }, asset);

  return {
    type: 'ADD_MEDIA',
    assetId,
    asset,
    record_change: {
      new_object: asset,
      table_name: '/media',
      object_id: assetId
    },
    alert_message: `Added Asset`,
    next_url: `${baseUrl}/${assetId}`
  };
}

export function updateAsset(baseUrl, assetId, asset) {
  return {
    type: 'UPDATE_MEDIA',
    assetId,
    asset,
    record_change: {
      update_object: asset,
      table_name: '/media',
      object_id: assetId
    },
    alert_message: `Updated Asset`,
    next_url: `${baseUrl}/${assetId}`
  };
}

export function removeAsset(baseUrl, assetId) {
  return {
    type: 'REMOVE_MEDIA',
    assetId,
    record_change: {
      remove_object: assetId,
      table_name: '/media',
      object_id: assetId
    },
    alert_message: `Removed Asset`,
    next_url: baseUrl
  };
}

export function pushFiles(media_type, uploaded_files) {
  console.log("pushFiles", uploaded_files)
  let media_items = fromJS(_.map(uploaded_files, file => {
    let type = 'anchor';
    switch(file.type) {
      case 'text/css':
        type = 'css';
        break;
      case 'text/javascript':
      case 'application/x-javascript':
      case 'application/javascript':
        type = 'javascript';
        break;
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
        type = 'image';
        break;
    }
    return {
      id: v4(),
      media_type,
      name: file.name,
      url: file.url,
      path: file.path,
      type
    }
  }));
  return {
    type: 'PUSH_FILES',
    media_items,
    uploaded_files,
    record_changes: media_items.map(asset => {
      return {
        new_object: asset,
        table_name: '/media',
        object_id: asset.get('id')
      };
    }).toArray()
  };
}


export default {addAsset, updateAsset, removeAsset, pushFiles}
