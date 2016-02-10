import {connect} from 'react-redux'

import ConfigPanel from './components/ConfigPanel.jsx';

import reducer from './reducer';
import actions from './actions';
import fixtures from './fixtures';


export default function EngineFactory(baseUrl) {
  return {
    type: 'application',
    reducer,
    actions,
    fixtures,
    tables: [baseUrl],
    title: 'System',
    routes: {
      path: baseUrl,
      component: connect(state => {
        return {
          baseUrl: baseUrl,
          appsConfig: state.getIn(['tables', '/engine', 'appsConfig']),
          awsConfig: state.getIn(['tables', '/engine', 'awsConfig'])
        }
      }, {
        setAppsConfig: actions.setAppsConfig,
        setAwsConfig: actions.setAwsConfig
      })(ConfigPanel)
    }
  }
}
