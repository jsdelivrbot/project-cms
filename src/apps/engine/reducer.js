import {Map} from 'immutable';

const INITIAL_STATE = Map({
  publishing: false,
  apps: [],
});

export default function engine(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_RENDERER':
      return state.set('renderer', action.renderer);
    case 'SET_APPS':
      return state.set('apps', action.apps);
    case 'SET_UPLOADER':
      return state.set('uploader', action.uploader);
    case 'PUBLISH_REQUEST':
      return state.set('publishing', true).remove('publish_error');
    case 'PUBLISH':
      return state.set('publishing', false);
    case 'PUBLISH_FAILURE':
      return state.set('publishing', false).set('publish_error', action.error);
    case 'PUSH_CONTENT':
      console.log("Content pushed", action);
    default:
      return state
  }
}
