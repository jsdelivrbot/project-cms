
export function initial(baseUrl) {
  return System.import('./includedTemplates/gallery.html!text', __moduleName).then(galleryTemplate => {
    return {
      [baseUrl]: {
        '/gallery.html': {path: '/gallery.html', title: 'Gallery', content: 'Hello World', template:'/gallery.html'}
      },
      '/templates': {
        '/gallery.html': {path: '/gallery.html', content: galleryTemplate, type:'page'}
      }
    };
  });
}

export default {initial};
