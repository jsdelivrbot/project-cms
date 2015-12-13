
export function addTemplate(baseUrl, path, template) {
  return {
    type: 'ADD_TEMPLATE',
    path,
    template,
    new_object: template,
    baseUrl,
    object_id: path
  };
}

export function removeTemplate(baseUrl, path) {
  return {
    type: 'REMOVE_TEMPLATE',
    path,
    remove_object: path,
    baseUrl,
    object_id: path
  };
}

export function updateTemplate(baseUrl, path, template) {
  return {
    type: 'UPDATE_TEMPLATE',
    path,
    template,
    update_object: template,
    baseUrl,
    object_id: path
  };
}

export default {addTemplate, removeTemplate, updateTemplate}
