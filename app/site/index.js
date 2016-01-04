import {connect} from 'react-redux'
import _ from 'lodash';

import EditSite from './components/EditSite.jsx';

import reducer from './reducer';
import actions from './actions';
import fixtures from './fixtures';

export default function SiteApplicationFactory(baseUrl) {
  return {
    baseUrl,
    type: 'application',
    reducer,
    actions,
    fixtures,
    title: 'Site',
    routes: {
      path: baseUrl,
      component: connect(state => {
        return {
          baseUrl: baseUrl,
          site: state.getIn([baseUrl, 'site']).toJS()
        }
      }, {
        updateSite: _.partial(actions.updateSite, baseUrl),
      })(EditSite)
    }
  }
}
