
export function addTemplate(path, template) {
  return {
    type: 'ADD_TEMPLATE',
    path,
    template
  };
}

export function removeTemplate(path) {
  return {
    type: 'REMOVE_TEMPLATE',
    path
  };
}

export function updateTemplate(path, template) {
  return {
    type: 'UPDATE_TEMPLATE',
    path,
    template
  };
}

export default {addTemplate, removeTemplate, updateTemplate}
