import _ from 'lodash';
import {v4} from 'node-uuid';

export function addPicture(baseUrl, picture) {
  let pictureId = v4();

  picture = _.assign({
    id: pictureId,
    media_type: baseUrl,
  }, picture);

  return {
    type: 'ADD_MEDIA',
    pictureId,
    picture,
    record_change: {
      new_object: picture,
      table_name: '/media',
      object_id: pictureId
    },
    next_url: `${baseUrl}/${pictureId}`
  };
}

export function updateAsset(baseUrl, pictureId, picture) {
  return {
    type: 'UPDATE_MEDIA',
    pictureId,
    picture,
    record_change: {
      update_object: picture,
      table_name: '/media',
      object_id: pictureId
    },
    next_url: `${baseUrl}/${assetId}`
  };
}

export function removePicture(baseUrl, pictureId) {
  return {
    type: 'REMOVE_MEDIA',
    pictureId,
    record_change: {
      remove_object: pictureId,
      table_name: '/media',
      object_id: pictureId
    },
    next_url: baseUrl
  };
}


export default {addPicture, updatePicture, removePicture}
