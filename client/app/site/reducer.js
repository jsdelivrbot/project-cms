import {Map} from 'immutable';

const INITIAL_STATE = Map();

export default function site(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'UPDATE_SITE':
      return state.set('site', Map(action.site));
    default:
      return state
  }
}
