import {v4} from 'node-uuid';

export function initial(baseUrl) {
  return System.import('./includedTemplates/gallery.html!text', __moduleName).then(galleryTemplate => {
    let id = v4();
    return {
      [baseUrl]: {
        [id]: {path: '/gallery.html', title: 'Gallery', content: 'Hello World', template:'/gallery.html', id}
      },
      [baseUrl+'/templates']: {
        '/gallery.html': {path: '/gallery.html'}
      },
      '/templates': {
        '/gallery.html': {path: '/gallery.html', content: galleryTemplate, type:'page'}
      }
    };
  });
}

export default {initial};
