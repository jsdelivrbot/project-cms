import _ from 'lodash';
import {v4} from 'node-uuid';

export function addMenu(baseUrl, menu) {
  let menuId = v4();

  menu = _.assign({
    id: menuId,
    snippet_type: baseUrl,
  }, menu);

  return {
    type: 'ADD_SNIPPET',
    menuId,
    menu,
    record_change: {
      new_object: menu,
      table_name: '/snippets',
      object_id: menuId
    },
    alert_message: `Added menu`,
    next_url: `${baseUrl}/${menuId}`
  };
}

export function editMenu(baseUrl, menuId, menu) {
  return {
    type: 'UPDATE_SNIPPET',
    menuId,
    record_change: {
      update_object: menu,
      table_name: '/snippets',
      object_id: menuId
    },
    alert_message: `Updated menu`
  };
}

export function removeMenu(baseUrl, menuId) {
  return {
    type: 'REMOVE_SNIPPET',
    menuId,
    record_change: {
      remove_object: menuId,
      table_name: '/snippets',
      object_id: menuId
    },
    alert_message: `Removed menu`,
    next_url: baseUrl
  };
}


export default {addMenu, editMenu, removeMenu}
