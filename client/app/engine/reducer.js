import {Map} from 'immutable';

const INITIAL_STATE = Map({
  publishing: false,
  settings: {
    apps: [{
      baseUrl: '/',
      type: 'builtin',
      location: './dashboard/index'
    }, {
      baseUrl: '/engine',
      type: 'builtin',
      location: './engine/index'
    }, {
      baseUrl: '/site',
      type: 'builtin',
      location: './site/index'
    }, {
      baseUrl: '/pages',
      type: 'builtin',
      location: './pages/index'
    }, {
      baseUrl: '/templates',
      type: 'builtin',
      location: './templates/index'
    }]
  },
  apps: []
});

export default function engine(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_RENDERER':
      return state.set('renderer', action.renderer);
    case 'SET_PUBLISHER':
      return state.set('publisher', action.publisher);
    case 'SET_APPS':
      return state.set('apps', action.apps);
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
