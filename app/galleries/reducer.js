import {Map} from 'immutable';

const INITIAL_STATE = Map();

export default function galleries(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_GALLERY':
      return state.set(action.path, Map(action.gallery));
    case 'REMOVE_GALLERY':
      return state.delete(action.path);
    case 'UPDATE_GALLERY':
      return state.set(action.path, Map(action.gallery));
    default:
      return state
  }
}
