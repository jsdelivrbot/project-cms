import {connect} from 'react-redux'
import _ from 'lodash';

import TemplateList from './components/TemplateList.jsx';
import AddTemplate from './components/AddTemplate.jsx';
import EditTemplate from './components/EditTemplate.jsx';

import reducer from './reducer';
import actions from './actions';
import renderFactory from './render';
import fixtures from './fixtures';

export default function TemplateApplicationFactory(baseUrl) {

  return {
    baseUrl,
    reducer,
    actions,
    fixtures,
    renderFactory: renderFactory,
    title: 'Templates',
    routes: {
      path: baseUrl,
      component: 'div',
      indexRoute: {
        component: connect(state => {
          return {
            baseUrl: baseUrl,
            templates: state.get(baseUrl).toJS()
          }
        })(TemplateList)
      },
      childRoutes: [{
        path: 'add',
        component: connect(state => {
          return {
            baseUrl: baseUrl
          }
        }, {
          addTemplate: _.partial(actions.addTemplate, baseUrl),
        })(AddTemplate)
      }, {
        path: '**',
        component: connect((state, props) => {
          let path = '/'+props.params.splat;
          return {
            baseUrl: baseUrl,
            template: state.getIn([baseUrl, path]).toJS(),
            path
          }
        }, {
          updateTemplate: _.partial(actions.updateTemplate, baseUrl),
          removeTemplate: _.partial(actions.removeTemplate, baseUrl),
        })(EditTemplate)
      }]
    }
  }
}
