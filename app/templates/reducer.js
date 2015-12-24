import {Map} from 'immutable';

const INITIAL_STATE = Map();

export default function templates(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_TEMPLATE':
      return state.set(action.path, Map(action.template));
    case 'REMOVE_TEMPLATE':
      return state.delete(action.path);
    case 'UPDATE_TEMPLATE':
      return state.set(action.path, Map(action.template));
    default:
      return state
  }
}
