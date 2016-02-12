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
    next_url: baseUrl
  };
}


export default {addAsset, updateAsset, removeAsset}
