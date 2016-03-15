import _ from 'lodash';

import {loadAppsConfig, makeReducer, setStorage} from '~/appsLoader';


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
  /* sets apps on successful loading and records change */
  if (!store) throw new Error('Must provide store when setting appsConfig');
  //CONSIDER: this might become THE way to load apps

  let record_change = {
    update_object: appsConfig,
    table_name: '/engine',
    object_id: 'appsConfig'
  };

  return {
    type: 'SET_APPS_CONFIG',
    appsConfig,
    promise: loadAppsConfig(appsConfig).then(apps => {
      console.log("Triggering apps reload", apps, store);
      let reducer = makeReducer(apps);
      let renderer = _.find(apps, {baseUrl: '/templates'}).renderFactory(store);
      console.log("renderer:", renderer);

      store.replaceReducer(reducer);
      store.dispatch(setApps(apps));
      store.dispatch(setRenderer(renderer));
      //TODO handle fixtures
      //loadAppsTables(apps) -> set tables

      store.dispatch({
        type: '!',
        record_change,
        alert_message: 'Apps reloaded',
      });
      return apps;
    })
  }
}

export function setAwsConfig(awsConfig) {
  let promise;
  //CONSIDER: this is awkward. We switch storages where a copy of this is stored
  if (awsConfig.table) {
    promise = setStorage(_.assign({
      module_path: '~/services/dynamodb',
    }, awsConfig));
  }
  return {
    type: 'SET_AWS_CONFIG',
    awsConfig,
    promise,
    record_change: {
      update_object: awsConfig,
      table_name: '/engine',
      object_id: 'awsConfig'
    },
    alert_message: 'AWS Config updated',
  }
}

export default {setRenderer, pushContent, setApps, testAppsConfig, setAppsConfig, setAwsConfig}
