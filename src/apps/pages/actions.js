import {v4} from 'node-uuid';


export function addPage(baseUrl, page) {
  let id = v4();

  return {
    type: 'ADD_PAGE',
    id,
    page,
    record_change: {
      new_object: page,
      table_name: baseUrl,
      object_id: id,
    },
    alert_message: `Added page ${page.title}`,
    next_url: `${baseUrl}/${id}`
  };
}

export function removePage(baseUrl, id) {
  return {
    type: 'REMOVE_PAGE',
    id,
    record_change: {
      remove_object: id,
      table_name: baseUrl,
      object_id: id
    },
    alert_message: `Removed page`,
    next_url: `${baseUrl}`
  };
}

export function updatePage(baseUrl, id, page) {
  return {
    type: 'UPDATE_PAGE',
    id,
    page,
    record_change: {
      update_object: page,
      table_name: baseUrl,
      object_id: id
    },
    alert_message: `Updated page ${page.title}`,
  };
}

export default {addPage, removePage, updatePage}
