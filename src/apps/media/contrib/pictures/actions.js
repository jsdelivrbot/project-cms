import _ from 'lodash';
import {v4} from 'node-uuid';
import {fromJS} from 'immutable';


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
    next_url: `${baseUrl}/${pictureId}`,
    alert_message: `Added Picture ${picture.name}`,
  };
}

export function updatePicture(baseUrl, pictureId, picture) {
  return {
    type: 'UPDATE_MEDIA',
    pictureId,
    picture,
    record_change: {
      update_object: picture,
      table_name: '/media',
      object_id: pictureId
    },
    alert_message: `Updated Picture ${picture.name}`,
    next_url: `${baseUrl}/${pictureId}`
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
    alert_message: `Removed Picture`,
    next_url: baseUrl
  };
}


export function pushFiles(media_type, uploaded_files) {
  console.log("pushFiles", uploaded_files)
  let media_items = fromJS(_.map(uploaded_files, file => {
    return {
      id: v4(),
      media_type,
      name: file.name,
      url: file.url,
      path: file.path
    }
  }));
  return {
    type: 'PUSH_FILES',
    media_items,
    uploaded_files,
    record_changes: media_items.map(picture => {
      return {
        new_object: picture,
        table_name: '/media',
        object_id: picture.get('id')
      };
    }).toArray()
  };
}

export default {addPicture, updatePicture, removePicture, pushFiles}
