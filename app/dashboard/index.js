import Dashboard from './components/Dashboard.jsx';
import Welcome from './components/Welcome.jsx';

import reducer from './reducer';
import actions from './actions';

export default function DashboardApplicationFactory(baseUrl) {
  return {
    reducer,
    actions,
    title: 'Dashboard',
    routes: {
      path: baseUrl,
      component: Dashboard,
      indexRoute: {
        component: Welcome
      }
    }
  }
}
