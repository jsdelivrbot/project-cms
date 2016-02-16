import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import _ from 'lodash';

import ProviderList from './components/ProviderList.jsx';
import SidebarEmbed from './components/SidebarEmbed.jsx';

import reducer from './reducer';
import actions from './actions';


function snippitsProviders(state) {
  return _.filter(state.getIn(['/engine', 'apps']), {type: 'snippits provider'});
}

export default function snippitsApplicationFactory(baseUrl) {
  return {
    type: 'application',
    title: 'snippits',
    reducer,
    actions,
    tables: [baseUrl],
    embeddableComponents: {
      snippitsSidebar: connect(state => {
        return {
          providers: snippitsProviders(state),
          snippits: state.getIn(['tables', baseUrl])
        }
      })(SidebarEmbed)
    },
    routes: {
      path: baseUrl,
      component: 'div',
      indexRoute: {
        component: connect(state => {
          return {
            baseUrl: baseUrl,
            providers: snippitsProviders(state),
            snippits: state.getIn(['tables', baseUrl])
          }
        })(ProviderList)
      }
    }
  }
}
