import {connect} from 'react-redux'
import _ from 'lodash';

import EditMenu from './components/EditMenu.jsx';
import AddMenu from './components/AddMenu.jsx';

import actions from './actions';
import itemInterface from './itemInterface';
import fixtures from './fixtures';

import {getTemplates} from '~/plugins';


const menuTemplates = getTemplates('partial');


export default function MenusApplicationFactory(baseUrl) {

  return {
    type: 'snippets provider',
    actions,
    title: 'Menus',
    itemInterface,
    fixtures,
    routes: {
      path: baseUrl,
      component: 'div',
      indexRoute: null,
      childRoutes: [{
        path: 'add',
        component: connect(state => {
          return {
            baseUrl: baseUrl,
            templates: menuTemplates(state)
          }
        }, {
          addMenu: _.partial(actions.addMenu, baseUrl),
        })(AddMenu)
      }, {
        path: ':id',
        component: connect((state, props) => {
          return {
            baseUrl: baseUrl,
            id: props.params.id,
            menu: state.getIn(['tables', '/snippets', props.params.id]),
            templates: menuTemplates(state)
          }
        }, {
          editMenu: _.partial(actions.editMenu, baseUrl),
          removeMenu: _.partial(actions.removeMenu, baseUrl),
        })(EditMenu)
      }]
    }
  }
}
