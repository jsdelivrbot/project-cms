
export function updateSite(site) {
  return {
    type: 'UPDATE_SITE',
    site,
    updated_object: site
  };
}

export default {updateSite}
