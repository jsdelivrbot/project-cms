import {Map} from 'immutable';
import _ from 'lodash';

export const INITIAL_STATE = Map({
  'alerts': Map(),
  'plugins': Map(),
});

function craftAlert(state, type, message) {
  if (type === 'error') {
    console.error(message);
    type = 'danger';
  }
  var key = _.uniqueId();
  var alert = {
    type,
    key,
    message: `${message}`
  };
  return state.setIn(['alerts', key], alert);
}

export default function dashboard(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SHOW_SIGNUP':
      return state.setIn(['signup-modal', 'visible'], true);
    case 'DISMISS_SIGNUP':
      return state.setIn(['signup-modal', 'visible'], false);
    case 'ADD_ALERT':
      return craftAlert(state, action.alert_type, action.message);
    case 'DISMISS_ALERT':
      return state.removeIn(['alerts', action.key]);
    case 'PAGE_TRANSITION':
      return state.set('alerts', Map());
    case 'DASHBOARD_PLUGINS':
      return state.set('plugins', Map(action.plugins));
    case 'SET_APPS':
      var dashboardPlugins = _.reduce(action.apps, (col, app) => {
        if (app.dashboardPlugins) {
          _.assign(col, app.dashboardPlugins);
        }
        return col;
      }, {});
      return state.set('plugins', Map(dashboardPlugins));
  }

  //auto detect alerts
  if (action.error) {
    return craftAlert(state, 'error', action.error);
  }
  if (action.alert_message) {
    return craftAlert(state, 'success', action.alert_message);
  }
  return state;
}
