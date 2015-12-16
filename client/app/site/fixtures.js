
export function initial(store, baseUrl) {
  return new Promise(function(resolve, reject) {
    resolve({
      [baseUrl]: {
        'site': {'name': 'Demo Site'}
      }
    });
  });
}

export default {initial};
