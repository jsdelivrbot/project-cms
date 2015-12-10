import {Map} from 'immutable';

const INITIAL_STATE = Map({
  publishing: false,
  directory: Map(), //more for debuging currently, lets us see what got published without actualling publishing
});

export default function engine(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_RENDERER':
      return state.set('renderer', action.renderer);
    case 'SET_PUBLISHER':
      return state.set('publisher', action.publisher);
    case 'PUBLISH_REQUEST':
      return state.set('publishing', true).remove('publish_error');
    case 'PUBLISH':
      return state.set('publishing', false);
    case 'PUBLISH_FAILURE':
      return state.set('publishing', false).set('publish_error', action.error);
    case 'PUSH_CONTENT':
      console.log("Content pushed", action);
      return state.setIn(['directory', action.path], action.content);
    default:
      return state
  }
}
