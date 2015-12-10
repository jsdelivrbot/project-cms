import {Map} from 'immutable';
import _ from 'lodash';

const INITIAL_STATE = Map({
  'alerts': Map()
});

export default function dashboard(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_ALERT':
      var key = _.uniqueId();
      return state.setIn(['alerts', key], {
        type: action.alert_type,
        key,
        message: action.message
      });
    case 'DISMISS_ALERT':
      return state.removeIn(['alerts', action.key]);
    case 'PAGE_TRANSITION':
      return state.set('alerts', Map())
    //TODO deprecate
    case 'UPDATE_PAGE':
      var key = _.uniqueId();
      return state.setIn(['alerts', key], {
        type: 'success',
        key,
        message: 'Page updated'
      });
    default:
      return state
  }
}
