import {Map} from 'immutable';

const INITIAL_STATE = Map({
  'site': {'name': 'Demo Site'}
});

export default function site(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'UPDATE_SITE':
      return state.set('site', action.site);
    default:
      return state
  }
}
