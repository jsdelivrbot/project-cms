import {Map} from 'immutable';

const INITIAL_STATE = Map();

export default function pages(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_PAGE':
      return state.set(action.path, Map(action.page));
    case 'REMOVE_PAGE':
      return state.delete(action.path);
    case 'UPDATE_PAGE':
      return state.set(action.path, Map(action.page));
    default:
      return state
  }
}
