import {Map} from 'immutable';

import baseTemplate from './includedTemplates/base.html!text';

const INITIAL_STATE = Map({
  'base.html': {path: 'base.html', content: baseTemplate}
});

export default function templates(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_TEMPLATE':
      return state.set(action.path, action.template);
    case 'REMOVE_TEMPLATE':
      return state.delete(action.path);
    case 'UPDATE_TEMPLATE':
      return state.set(action.path, action.template);
    default:
      return state
  }
}
