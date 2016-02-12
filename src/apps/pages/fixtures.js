
export function initial(baseUrl) {
  return System.import('./includedTemplates/page.html!text', __moduleName).then(pageTemplate => {
    return {
      [baseUrl]: {
        '/index.html': {path: '/index.html', title: 'Home Page', content: 'Hello World', template:'/page.html'}
      },
      '/templates': {
        '/page.html': {path: '/page.html', content: pageTemplate, type:'page'}
      }
    };
  });
}

export default {initial};
