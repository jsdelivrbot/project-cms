import {connect} from 'react-redux'

import Dashboard from './components/Dashboard.jsx';
import Welcome from './components/Welcome.jsx';
import Signup from './components/Signup.jsx';

import reducer from './reducer';
import actions from './actions';

export default function DashboardApplicationFactory(baseUrl) {
  return {
    reducer,
    actions,
    title: 'Dashboard',
    dashboardPlugins: {
      signup: connect(state => {
        return {
          visible: state.getIn([baseUrl, 'signup-modal', 'visible']),
        }
      }, {
        dismissSignup: actions.dismissSignup
      })(Signup)
    },
    routes: {
      path: baseUrl,
      component: Dashboard,
      indexRoute: {
        component: Welcome
      }
    }
  }
}
