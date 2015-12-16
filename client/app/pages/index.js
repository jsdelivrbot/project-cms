import {connect} from 'react-redux'
import _ from 'lodash';

import PageList from './components/PageList.jsx';
import AddPage from './components/AddPage.jsx';
import EditPage from './components/EditPage.jsx';

import reducer from './reducer';
import actions from './actions';
import publish from './publish';
import fixtures from './fixtures';

export default function PagesApplicationFactory(baseUrl) {
  return {
    baseUrl,
    reducer,
    actions,
    fixtures,
    publish: _.partial(publish, baseUrl),
    title: 'Pages',
    routes: {
      path: baseUrl,
      component: 'div',
      indexRoute: {
        component: connect(state => {
          return {
            baseUrl: baseUrl,
            pages: state.get(baseUrl).toJS()
          }
        })(PageList)
      },
      childRoutes: [{
        path: 'add',
        component: connect(state => {
          return {
            baseUrl: baseUrl,
            templates: state.get('/templates').filter(tmp => tmp.get('type') === 'page'),
            render: state.getIn(['/engine', 'renderer'])
          }
        }, {
          addPage: _.partial(actions.addPage, baseUrl),
        })(AddPage)
      }, {
        path: '**',
        component: connect((state, props) => {
          let path = '/'+props.params.splat;
          return {
            baseUrl: baseUrl,
            page: state.getIn([baseUrl, path]).toJS(),
            path,
            templates: state.get('/templates').filter(tmp => tmp.get('type') === 'page'),
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
