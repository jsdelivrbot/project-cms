import {connect} from 'react-redux'

import DashboardComponent from './components/Dashboard.jsx';
import Welcome from './components/Welcome.jsx';

import reducer from './reducer';
import actions from './actions';

export default function DashboardApplicationFactory(apps) {
  let Dashboard = connect(state => {
    return {
      apps
    }
  })(DashboardComponent);

  return {
    reducer,
    component: Dashboard,
    title: 'Dashboard',
    routes: {
      path: '/',
      indexRoute: {
        component: Welcome
      }
    }
  }
}
