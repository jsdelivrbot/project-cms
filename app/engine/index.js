import {connect} from 'react-redux'

import AppsConfig from './components/AppsConfig.jsx';

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
          appsConfig: state.getIn(['/engine', 'appsConfig'])
        }
      }, {
        setAppsConfig: actions.setAppsConfig
      })(AppsConfig)
    }
  }
}
