import {connect} from 'react-redux'

import ConfigPanel from './components/ConfigPanel.jsx';

import reducer from './reducer';
import actions from './actions';


export default function EngineFactory(baseUrl) {
  return {
    type: 'application',
    reducer,
    actions,
    title: 'Apps',
    routes: {
      path: baseUrl,
      component: connect(state => {
        return {
          baseUrl: baseUrl,
          appsConfig: state.getIn(['/engine', 'appsConfig']),
          awsConfig: state.getIn(['/engine', 'awsConfig'])
        }
      }, {
        setAppsConfig: actions.setAppsConfig,
        setAwsConfig: actions.setAwsConfig
      })(ConfigPanel)
    }
  }
}
