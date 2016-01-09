import {connect} from 'react-redux'
import _ from 'lodash';

import ProviderList from './components/ProviderList.jsx';
import ModalPicker from './components/ModalPicker.jsx';
import SidebarEmbed from './components/SidebarEmbed.jsx';

import reducer from './reducer';


function mediaProviders(state) {
  return _.filter(state.getIn(['/engine', 'apps']), {type: 'media provider'});
}

export default function MediaApplicationFactory(baseUrl) {
  return {
    baseUrl,
    type: 'application',
    title: 'Media',
    reducer: reducer,
    dashboardPlugins: {
      mediaPicker: connect(state => {
        return {
          providers: mediaProviders(state),
          media: state.get(baseUrl)
        }
      })(ModalPicker),
      mediaEmbed: connect(state => {
        return {
          providers: mediaProviders(state),
          media: state.get(baseUrl)
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
            providers: mediaProviders(state),
            media: state.get(baseUrl)
          }
        })(ProviderList)
      }
    }
  }
}
