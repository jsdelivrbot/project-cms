import {connect} from 'react-redux'

import Dashboard from './components/Dashboard.jsx';
import Welcome from './components/Welcome.jsx';

import reducer from './reducer';
import actions from './actions';

export default function DashboardApplicationFactory(baseUrl) {
  return {
    reducer,
    actions,
    baseUrl,
    title: 'Dashboard',
    routes: {
      path: baseUrl,
      component: connect(state => {
        return {
          apps: state.getIn(['/engine', 'apps'])
        }
      })(Dashboard),
      indexRoute: {
        component: Welcome
      }
    }
  }
}
