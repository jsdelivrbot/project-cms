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
    next_url: baseUrl
  };
}

//move into ~/actions.js?
export function makeThumbnail(picture, options) {
  //CONSIDER: must trigger a record change and an uploadFile action
  //I guess we would also do resizing here
  //but don't I need to read picture.url first?
  //so middleware that looks for 'MAKE_THUMBNAIL' and then issues 'UPLOAD_FILE'
  //but doesn't the middleware need state? argh....
  return {
    type: 'MAKE_THUMBNAIL',
    picture,
    options,
  };
}

export default {addPicture, updatePicture, removePicture, makeThumbnail}
