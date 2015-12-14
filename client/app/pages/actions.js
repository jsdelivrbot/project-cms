
export function addPage(baseUrl, path, page) {
  return {
    type: 'ADD_PAGE',
    path,
    page,
    new_object: page,
    baseUrl,
    object_id: path,
    next_url: `${baseUrl}${path}`
  };
}

export function removePage(baseUrl, path) {
  return {
    type: 'REMOVE_PAGE',
    path,
    remove_object: path,
    baseUrl,
    object_id: path,
    next_url: `${baseUrl}`
  };
}

export function updatePage(baseUrl, path, page) {
  return {
    type: 'UPDATE_PAGE',
    path,
    page,
    update_object: page,
    baseUrl,
    object_id: path
  };
}

export default {addPage, removePage, updatePage}
