
export function updateSite(baseUrl, site) {
  return {
    type: 'UPDATE_SITE',
    site,
    record_change: {
      update_object: site,
      table_name: baseUrl,
      object_id: 'site'
    }
  };
}

export default {updateSite}
