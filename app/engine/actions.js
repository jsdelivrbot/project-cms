export function setRenderer(renderer) {
  //assert renderer is function
  return {
    type: 'SET_RENDERER',
    renderer
  };
}

export function setPublisher(publisher) {
  //assert publisher is function
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

export function setAppsConfig(apps) {
  //TODO apps should be ran through apps loader
  //this would then have a promise property
  //somehow on app set we replace the core reducer (black magic?)
  return {
    type: 'SET_APPS_CONFIG',
    apps
  }
}

export function setAwsConfig(awsConfig) {
  return {
    type: 'SET_AWS_CONFIG',
    awsConfig
  }
}

export default {setRenderer, setPublisher, pushContent, setApps, setAppsConfig, setAwsConfig}
