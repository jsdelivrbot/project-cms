import _ from 'lodash';
import {v4} from 'node-uuid';

export function initial(baseUrl) {
  return System.import('./includedTemplates/menu.html!text', __moduleName).then(menuTemplate => {
    let id = v4();
    return {
      '/templates': {
        '/snippets/menu.html': {path: '/snippets/menu.html', content: menuTemplate, type:'partial'},
      },
      [baseUrl] : {
        [id]: {
          id,
          template_name: '/snippets/menu.html',
          snippet_type: baseUrl,
          menuItems: []
        }
      }
    };
  });
}

export default {initial};
