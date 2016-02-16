import {v4} from 'node-uuid';


export function addGallery(baseUrl, gallery) {
  let id = v4();

  return {
    type: 'ADD_GALLERY',
    id,
    gallery,
    record_change: {
      new_object: gallery,
      table_name: baseUrl,
      object_id: id,
    },
    alert_message: `Added gallery ${gallery.title}`,
    next_url: `${baseUrl}/${id}`
  };
}

export function removeGallery(baseUrl, id) {
  return {
    type: 'REMOVE_GALLERY',
    path,
    record_change: {
      remove_object: id,
      table_name: baseUrl,
      object_id: id
    },
    alert_message: `Removed gallery`,
    next_url: `${baseUrl}`
  };
}

export function updateGallery(baseUrl, id, gallery) {
  return {
    type: 'UPDATE_GALLERY',
    id,
    gallery,
    record_change: {
      update_object: gallery,
      table_name: baseUrl,
      object_id: id
    },
    alert_message: `Updated gallery ${gallery.title}`,
  };
}

export default {addGallery, removeGallery, updateGallery}
