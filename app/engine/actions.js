export function setRenderer(renderer) {
  //assert renderer is function
  return {
    type: 'SET_RENDERER',
    renderer
  };
}

export function setPublisher(publisher) {
  //assert publisher is function
  //CONSIDER: is this needed anymore?
  return {
    type: 'SET_PUBLISHER',
    publisher
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

export function setAppsConfig(appsConfig) {
  //TODO apps should be ran through apps loader
  //this would then have a promise property
  //import {loadAppsConfig} from '~/appsLoader'
  //somehow on app set we replace the core reducer (need access to store)
  return {
    type: 'SET_APPS_CONFIG',
    appsConfig,
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

export default {setRenderer, setPublisher, pushContent, setApps, setAppsConfig, setAwsConfig}
