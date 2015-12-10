import {Map} from 'immutable';

const INITIAL_STATE = Map({
  'index.html': {path: 'index.html', title: 'Home Page', content: 'Hello World', template:'base.html'}
});

export default function pages(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_PAGE':
      return state.set(action.path, action.page);
    case 'REMOVE_PAGE':
      return state.delete(action.path);
    case 'UPDATE_PAGE':
      return state.set(action.path, action.page);
    default:
      return state
  }
}
