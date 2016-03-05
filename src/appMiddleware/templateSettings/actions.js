
export function addTemplateSettings(baseUrl, path, tpl) {
  return {
    type: 'ADD_TEMPLATE_SETTINGS',
    path,
    tpl,
    record_change: {
      new_object: tpl,
      table_name: baseUrl,
      object_id: path,
    },
    alert_message: `Registered template ${path}`,
    next_url: `${baseUrl}/${path}`
  };
}

export function removeTemplateSettings(baseUrl, path) {
  return {
    type: 'REMOVE_TEMPLATE_SETTINGS',
    path,
    record_change: {
      remove_object: path,
      table_name: baseUrl,
      object_id: path
    },
    alert_message: `De-registered template`,
    next_url: `${baseUrl}`
  };
}

export function updateTemplateSettings(baseUrl, path, tpl) {
  return {
    type: 'UPDATE_TEMPLATE_SETTINGS',
    path,
    tpl,
    record_change: {
      update_object: tpl,
      table_name: baseUrl,
      object_id: path
    },
    alert_message: `Updated template ${path}`,
  };
}

export default {addTemplateSettings, removeTemplateSettings, updateTemplateSettings}
