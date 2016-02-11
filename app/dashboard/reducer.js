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

function stripName(action_type)  {
  return _.capitalize(_.last(action_type.split('_')).toLowerCase());
}

export default function dashboard(state = INITIAL_STATE, action) {
  switch (action.type) {
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
  if (action.record_change) {
    let change = action.record_change;
    if (change.new_object) {
      return craftAlert(state, 'success', `New ${stripName(action.type)} created.`);
    }
    if (change.update_object) {
      return craftAlert(state, 'success', `${stripName(action.type)} updated.`);
    }
    if (change.remove_object) {
      return craftAlert(state, 'success', `${stripName(action.type)} deleted.`);
    }
  }
  return state;
}
