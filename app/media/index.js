import {connect} from 'react-redux'
import _ from 'lodash';

import ProviderList from './components/ProviderList.jsx';
import ModalPicker from './components/ModalPicker.jsx';
import SidebarEmbed from './components/SidebarEmbed.jsx';


export default function MediaApplicationFactory(baseUrl) {
  function mediaProvidersFilter(app) {
    return _.startsWith(app.baseUrl, baseUrl+'/');
  }

  return {
    baseUrl,
    type: 'application',
    title: 'Media',
    dashboardPlugins: {
      mediaPicker: connect(state => {
        return {
          providers: _.filter(state.getIn(['/engine', 'apps']), mediaProvidersFilter)
        }
      })(ModalPicker),
      mediaEmbed: connect(state => {
        return {
          providers: _.filter(state.getIn(['/engine', 'apps']), mediaProvidersFilter)
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
            providers: _.filter(state.getIn(['/engine', 'apps']), mediaProvidersFilter)
          }
        })(ProviderList)
      }
    }
  }
}
