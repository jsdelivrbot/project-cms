import {DEFAULT_APPS_CONFIG} from '~/appsLoader';

export function initial(baseUrl) {
  return {
    [baseUrl]: {
      awsConfig: {},
      appsConfig: {apps: DEFAULT_APPS_CONFIG}
    }
  }
}

export default {initial};
