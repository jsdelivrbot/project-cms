export function addAlert(alert_type, message) {
  return {
    type: 'ADD_ALERT',
    alert_type,
    message
  };
}

export function dismissAlert(key) {
  return {
    type: 'DISMISS_ALERT',
    key
  };
}

export function pageTransition(path) {
  return {
    type: 'PAGE_TRANSITION',
    path
  };
}

export function setPlugins(plugins) {
  return {
    type: 'DASHBOARD_PLUGINS',
    plugins
  }
}

export default {addAlert, dismissAlert, pageTransition, setPlugins}
