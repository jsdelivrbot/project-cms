import {connect} from 'react-redux'
import _ from 'lodash';

import EditSite from './components/EditSite.jsx';

import actions from './actions';
import fixtures from './fixtures';

export default function SiteApplicationFactory(baseUrl) {
  return {
    type: 'application',
    actions,
    fixtures,
    tables: [baseUrl],
    title: 'Site',
    routes: {
      path: baseUrl,
      component: connect(state => {
        return {
          baseUrl: baseUrl,
          site: state.getIn(['tables', baseUrl, 'site'])
        }
      }, {
        updateSite: _.partial(actions.updateSite, baseUrl),
      })(EditSite)
    }
  }
}
