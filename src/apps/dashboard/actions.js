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

export function showSignup() {
  return {
    type: 'SHOW_SIGNUP'
  }
}

export function dismissSignup() {
  return {
    type: 'DISMISS_SIGNUP'
  }
}

export function completeSignup() {
  //TODO
}

export default {addAlert, dismissAlert, pageTransition, setPlugins, showSignup, dismissSignup}
