import {loadAppsConfig} from '~/appsLoader';


export function setRenderer(renderer) {
  /* set the template renderer */
  //assert renderer is function
  return {
    type: 'SET_RENDERER',
    renderer
  };
}

export function pushContent(path, content, mimetype) {
  return {
    type: 'PUSH_CONTENT',
    path,
    content,
    mimetype
  };
}

export function setApps(apps) {
  return {
    type: 'SET_APPS',
    apps
  }
}

export function testAppsConfig(appsConfig) {
  return {
    type: 'TEST_APPS_CONFIG',
    appsConfig,
    promise: loadAppsConfig(appsConfig)
  }
}

export function setAppsConfig(appsConfig, store) {
  //TODO apps should be ran through apps loader
  //this would then have a promise property
  //import {loadAppsConfig} from '~/appsLoader'
  //somehow on app set we replace the core reducer (need access to store)
  //also need to trigure fixture loading
  //TODO only record change after app config is successfully loaded
  return {
    type: 'SET_APPS_CONFIG',
    appsConfig,
    promise: loadAppsConfig(appsConfig).then(apps => {
      return apps;
    }),
    record_change: {
      update_object: appsConfig,
      table_name: '/engine',
      object_id: 'appsConfig'
    }
  }
}

export function setAwsConfig(awsConfig) {
  return {
    type: 'SET_AWS_CONFIG',
    awsConfig,
    record_change: {
      update_object: awsConfig,
      table_name: '/engine',
      object_id: 'awsConfig'
    }
  }
}

export default {setRenderer, pushContent, setApps, testAppsConfig, setAppsConfig, setAwsConfig}
