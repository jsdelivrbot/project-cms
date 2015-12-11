
export function addPage(path, page) {
  return {
    type: 'ADD_PAGE',
    path,
    page,
    new_object: page
  };
}

export function removePage(path) {
  return {
    type: 'REMOVE_PAGE',
    path,
    removed_object: path
  };
}

export function updatePage(path, page) {
  return {
    type: 'UPDATE_PAGE',
    path,
    page,
    updated_object: page
  };
}

export default {addPage, removePage, updatePage}
