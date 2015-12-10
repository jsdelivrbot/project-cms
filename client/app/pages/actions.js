
export function addPage(path, page) {
  return {
    type: 'ADD_PAGE',
    path,
    page
  };
}

export function removePage(path) {
  return {
    type: 'REMOVE_PAGE',
    path
  };
}

export function updatePage(path, page) {
  return {
    type: 'UPDATE_PAGE',
    path,
    page
  };
}

export default {addPage, removePage, updatePage}
