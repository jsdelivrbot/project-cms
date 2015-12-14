import {Map} from 'immutable';

import baseTemplate from './includedTemplates/base.html!text';
import pageTemplate from './includedTemplates/page.html!text';
import headerTemplate from './includedTemplates/header.html!text';
import footerTemplate from './includedTemplates/footer.html!text';

const INITIAL_STATE = Map({
  '/base.html': {path: '/base.html', content: baseTemplate, type:'layout'},
  '/page.html': {path: '/page.html', content: pageTemplate, type:'page'},
  '/header.html': {path: '/header.html', content: headerTemplate, type:'partial'},
  '/footer.html': {path: '/footer.html', content: footerTemplate, type:'partial'},
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
