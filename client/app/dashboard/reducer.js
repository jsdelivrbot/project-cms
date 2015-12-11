import {Map} from 'immutable';
import _ from 'lodash';

const INITIAL_STATE = Map({
  'alerts': Map()
});

function craftAlert(state, type, message) {
  var key = _.uniqueId();
  var alert = {
    type,
    key,
    message
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
      return state.set('alerts', Map())
  }

  //auto detect alerts
  if (action.error) {
    return craftAlert(state, 'error', action.error);
  }
  if (action.new_object) {
    return craftAlert(state, 'success', `New ${stripName(action.type)} created.`);
  }
  if (action.updated_object) {
    return craftAlert(state, 'success', `${stripName(action.type)} updated.`);
  }
  if (action.deleted_object) {
    return craftAlert(state, 'success', `${stripName(action.type)} deleted.`);
  }
  return state;
}
