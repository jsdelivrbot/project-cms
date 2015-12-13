
export function updateSite(baseUrl, site) {
  return {
    type: 'UPDATE_SITE',
    site,
    update_object: site,
    baseUrl,
    object_id: 'site'
  };
}

export default {updateSite}
