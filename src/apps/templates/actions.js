
export function addTemplate(baseUrl, path, template) {
  return {
    type: 'ADD_TEMPLATE',
    path,
    template,
    record_change: {
      new_object: template,
      table_name: baseUrl,
      object_id: path,
    },
    next_url: `${baseUrl}${path}`
  };
}

export function removeTemplate(baseUrl, path) {
  return {
    type: 'REMOVE_TEMPLATE',
    path,
    record_change: {
      remove_object: path,
      table_name: baseUrl,
      object_id: path
    },
    next_url: `${baseUrl}`
  };
}

export function updateTemplate(baseUrl, path, template) {
  return {
    type: 'UPDATE_TEMPLATE',
    path,
    template,
    record_change: {
      update_object: template,
      table_name: baseUrl,
      object_id: path
    }
  };
}

export default {addTemplate, removeTemplate, updateTemplate}
