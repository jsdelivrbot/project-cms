import {connect} from 'react-redux'

import EditSettings from './components/EditSettings.jsx';

import reducer from './reducer';
import actions from './actions';


export default function EngineFactory(baseUrl) {
  return {
    baseUrl,
    reducer,
    actions,
    title: 'Settings',
    routes: {
      path: baseUrl,
      component: connect(state => {
        return {
          baseUrl: baseUrl,
          settings: state.getIn(['/engine', 'settings'])
        }
      }, {
        updateSettings: actions.updateSettings
      })(EditSettings)
    }
  }
}
