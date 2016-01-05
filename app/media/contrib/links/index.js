import {connect} from 'react-redux'
import _ from 'lodash';

import LinkList from './components/LinkList.jsx';
import AddLink from './components/AddLink.jsx';

//import reducer from './reducer';
import actions from './actions';

export default function LinksApplicationFactory(baseUrl) {

  return {
    baseUrl,
    type: 'media provider',
    //reducer,
    actions,
    title: 'Links',
    routes: {
      path: baseUrl,
      component: 'div',
      indexRoute: {
        component: connect(state => {
          return {
            baseUrl: baseUrl,
            links: state.get(baseUrl).toJS()
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
      }/*, {
        path: ':linkId',
        component: connect((state, props) => {
          return {
            baseUrl: baseUrl,
            link: state.getIn([baseUrl, props.params.linkId]).toJS(),
            linkId: props.params.linkId
          }
        }, {
          updateTemplate: _.partial(actions.updateTemplate, baseUrl),
          removeTemplate: _.partial(actions.removeTemplate, baseUrl),
        })(EditTemplate)
      }*/]
    }
  }
}
