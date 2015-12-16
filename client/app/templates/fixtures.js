import _ from 'lodash';

export function initial(store, baseUrl) {
  return Promise.all([
    System.import('./includedTemplates/base.html!text', __moduleName),
    System.import('./includedTemplates/header.html!text', __moduleName),
    System.import('./includedTemplates/footer.html!text', __moduleName),
  ]).then(([baseTemplate, headerTemplate, footerTemplate]) => {
    return {
      [baseUrl]: {
        '/base.html': {path: '/base.html', content: baseTemplate, type:'layout'},
        '/header.html': {path: '/header.html', content: headerTemplate, type:'partial'},
        '/footer.html': {path: '/footer.html', content: footerTemplate, type:'partial'},
      }
    };
  });
}

export default {initial};
