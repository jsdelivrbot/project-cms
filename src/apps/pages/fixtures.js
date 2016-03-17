import {v4} from 'node-uuid';

export function initial(baseUrl) {
  return System.import('./includedTemplates/page.html!text', __moduleName).then(pageTemplate => {
    let id = v4()
    return {
      [baseUrl]: {
        [id]: {path: '/index.html', title: 'Home Page', content: 'Hello World', template:'/page.html', id}
      },
      [baseUrl+'/templates']: {
        '/page.html': {path: '/page.html'}
      },
      '/templates': {
        '/page.html': {path: '/page.html', content: pageTemplate, type:'page'}
      }
    };
  });
}

export default {initial};
