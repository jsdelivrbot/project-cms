import {connect} from 'react-redux'
import _ from 'lodash';

import EditSite from './components/EditSite.jsx';

import reducer from './reducer';
import actions from './actions';
import fixtures from './fixtures';

export default function SiteApplicationFactory(baseUrl) {
  return {
    type: 'application',
    reducer,
    actions,
    fixtures,
    tables: [baseUrl],
    title: 'Site',
    routes: {
      path: baseUrl,
      component: connect(state => {
        return {
          baseUrl: baseUrl,
          site: state.getIn(['tables', baseUrl, 'site']).toJS()
        }
      }, {
        updateSite: _.partial(actions.updateSite, baseUrl),
      })(EditSite)
    }
  }
}
