
export function addTemplate(path, template) {
  return {
    type: 'ADD_TEMPLATE',
    path,
    template,
    new_object: template
  };
}

export function removeTemplate(path) {
  return {
    type: 'REMOVE_TEMPLATE',
    path,
    removed_object: path
  };
}

export function updateTemplate(path, template) {
  return {
    type: 'UPDATE_TEMPLATE',
    path,
    template,
    updated_object: template
  };
}

export default {addTemplate, removeTemplate, updateTemplate}
