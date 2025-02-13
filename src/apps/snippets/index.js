import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import _ from 'lodash';

import ProviderList from './components/ProviderList.jsx';
import SidebarEmbed from './components/SidebarEmbed.jsx';

import reducer from './reducer';
import actions from './actions';
import templateTags from './templateTags';


function snippetsProviders(state) {
  return _.filter(state.getIn(['/engine', 'apps']), {type: 'snippets provider'});
}

export default function snippetsApplicationFactory(baseUrl) {
  return {
    type: 'application',
    title: 'Snippets',
    reducer,
    actions,
    tables: [baseUrl],
    templateTags,
    embeddableComponents: {
      snippetsSidebar: connect(state => {
        return {
          providers: snippetsProviders(state),
          snippets: state.getIn(['tables', baseUrl])
        }
      })(SidebarEmbed)
    },
    routes: {
      path: baseUrl,
      component: 'div',
      indexRoute: {
        component: connect(state => {
          let providers = snippetsProviders(state);
          let addLinks = _.flatten(_.map(providers, provider => {
            if (provider.snippetAddLinks) {
              return provider.snippetAddLinks(state);
            } else {
              return {
                link: `${provider.baseUrl}/add`,
                title: provider.title,
              }
            }
          }));
          let serviceLinks = _.flatten(_.filter(_.map(providers, provider => {
            if (provider.snippetServiceLinks) {
              return provider.snippetServiceLinks(state);
            }
          })));
          return {
            baseUrl,
            providers,
            addLinks,
            serviceLinks,
            snippets: state.getIn(['tables', baseUrl])
          }
        })(ProviderList)
      }
    }
  }
}
