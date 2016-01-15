import {connect} from 'react-redux'
import _ from 'lodash';

import ProviderList from './components/ProviderList.jsx';
import ModalPicker from './components/ModalPicker.jsx';
import SidebarEmbed from './components/SidebarEmbed.jsx';

import reducer from './reducer';
import actions from './actions';


function mediaProviders(state) {
  return _.filter(state.getIn(['/engine', 'apps']), {type: 'media provider'});
}

export default function MediaApplicationFactory(baseUrl) {
  return {
    type: 'application',
    title: 'Media',
    reducer,
    actions,
    tables: ['/media'],
    dashboardPlugins: {
      mediaPicker: connect(state => {
        return {
          providers: mediaProviders(state),
          media: state.getIn(['tables', '/media']),
          mediaTypes: state.getIn([baseUrl, 'modal-options', 'mediaTypes']),
          quantityLimit: state.getIn([baseUrl, 'modal-options', 'quantityLimit']),
        }
      }, actions)(ModalPicker)
    },
    embeddableComponents: {
      mediaSidebar: connect(state => {
        return {
          providers: mediaProviders(state),
          media: state.getIn(['tables', '/media'])
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
            media: state.getIn(['tables', '/media'])
          }
        })(ProviderList)
      }
    }
  }
}
