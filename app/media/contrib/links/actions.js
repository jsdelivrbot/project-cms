import _ from 'lodash';
import {v4} from 'node-uuid';

export function addLink(baseUrl, link) {
  let linkId = v4();

  link = _.assign({
    id: linkId,
    media_type: baseUrl,
  }, link);

  return {
    type: 'ADD_MEDIA',
    linkId,
    link,
    record_change: {
      new_object: link,
      table_name: '/media',
      object_id: linkId
    },
    next_url: `${baseUrl}/${linkId}`
  };
}

export function removeLink(baseUrl, linkId) {
  return {
    type: 'REMOVE_MEDIA',
    linkId,
    record_change: {
      remove_object: linkId,
      table_name: '/media',
      object_id: linkId
    },
    next_url: baseUrl
  };
}


export default {addLink, removeLink}
