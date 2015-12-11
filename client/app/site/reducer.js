import {Map} from 'immutable';

const INITIAL_STATE = Map({
  'name': 'Demo Site'
});

export default function site(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'UPDATE_SITE':
      return Map(action.site);
    default:
      return state
  }
}
