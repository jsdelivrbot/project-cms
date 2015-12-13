import {connect} from 'react-redux'
import _ from 'lodash';

import PageList from './components/PageList.jsx';
import AddPage from './components/AddPage.jsx';
import EditPage from './components/EditPage.jsx';

import reducer from './reducer';
import actions from './actions';
import publish from './publish';

export default function PagesApplicationFactory(baseUrl) {
  return {
    baseUrl,
    reducer,
    actions,
    publish: _.partial(publish, baseUrl),
    title: 'Pages',
    routes: {
      path: baseUrl,
      component: 'div',
      indexRoute: {
        component: connect(state => {
          return {
            baseUrl: baseUrl,
            pages: state.get(baseUrl)
          }
        })(PageList)
      },
      childRoutes: [{
        path: 'add',
        component: connect(state => {
          return {
            baseUrl: baseUrl
          }
        }, {
          addPage: _.partial(actions.addPage, baseUrl),
        })(AddPage)
      }, {
        path: '**',
        component: connect((state, props) => {
          return {
            baseUrl: baseUrl,
            page: state.getIn([baseUrl, props.params.splat]),
            path: props.params.splat,
            templates: state.get('/templates'),
            render: state.getIn(['/engine', 'renderer'])
          }
        }, {
          updatePage: _.partial(actions.updatePage, baseUrl),
          removePage: _.partial(actions.removePage, baseUrl),
        })(EditPage)
      }]
    }
  }
}
