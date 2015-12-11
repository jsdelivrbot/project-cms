import {connect} from 'react-redux'
import _ from 'lodash';

import EditSite from './components/EditSite.jsx';

import reducer from './reducer';
import actions from './actions';

export default function SiteApplicationFactory(baseUrl) {
  return {
    baseUrl,
    reducer,
    title: 'Site',
    routes: {
      path: baseUrl,
      component: connect(state => {
        return {
          baseUrl: baseUrl,
          site: state.get(baseUrl).toJS()
        }
      }, {
        updateSite: actions.updateSite
      })(EditSite)
    }
  }
}
