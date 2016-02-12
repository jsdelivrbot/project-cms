
export function addPage(baseUrl, path, page) {
  return {
    type: 'ADD_PAGE',
    path,
    page,
    record_change: {
      new_object: page,
      table_name: baseUrl,
      object_id: path,
    },
    next_url: `${baseUrl}${path}`
  };
}

export function removePage(baseUrl, path) {
  return {
    type: 'REMOVE_PAGE',
    path,
    record_change: {
      remove_object: path,
      table_name: baseUrl,
      object_id: path
    },
    next_url: `${baseUrl}`
  };
}

export function updatePage(baseUrl, path, page) {
  return {
    type: 'UPDATE_PAGE',
    path,
    page,
    record_change: {
      update_object: page,
      table_name: baseUrl,
      object_id: path
    }
  };
}

export default {addPage, removePage, updatePage}
