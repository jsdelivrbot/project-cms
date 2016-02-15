import {connect} from 'react-redux'
import _ from 'lodash';

import LinkList from './components/LinkList.jsx';
import AddLink from './components/AddLink.jsx';

import actions from './actions';
import itemInterface from './itemInterface';


export default function LinksApplicationFactory(baseUrl) {

  return {
    type: 'media provider',
    actions,
    title: 'Links',
    itemInterface,
    routes: {
      path: baseUrl,
      component: 'div',
      indexRoute: {
        component: connect(state => {
          return {
            baseUrl: baseUrl,
            links: state.getIn(['tables', '/media']).filter(x => x.get('media_type') === baseUrl)
          }
        })(LinkList)
      },
      childRoutes: [{
        path: 'add',
        component: connect(state => {
          return {
            baseUrl: baseUrl
          }
        }, {
          addLink: _.partial(actions.addLink, baseUrl),
        })(AddLink)
      }]
    }
  }
}
