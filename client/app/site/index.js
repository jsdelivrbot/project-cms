import {connect} from 'react-redux'
import _ from 'lodash';

import EditSite from './components/EditSite.jsx';

import reducer from './reducer';
import actions from './actions';

export default function SiteApplicationFactory(baseUrl) {
  return {
    baseUrl,
    reducer,
    actions,
    title: 'Site',
    routes: {
      path: baseUrl,
      component: connect(state => {
        return {
          baseUrl: baseUrl,
          site: state.getIn([baseUrl, 'site'])
        }
      }, {
        updateSite: _.partial(actions.updateSite, baseUrl),
      })(EditSite)
    }
  }
}
