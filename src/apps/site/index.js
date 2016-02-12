import {connect} from 'react-redux'
import _ from 'lodash';

import EditSite from './components/EditSite.jsx';

import actions from './actions';
import fixtures from './fixtures';

import {mediaSidebar} from '~/plugins';


export default function SiteApplicationFactory(baseUrl) {
  return {
    type: 'application',
    actions,
    fixtures,
    tables: [baseUrl],
    title: 'Site',
    routes: {
      path: baseUrl,
      component: connect(state => {
        return {
          baseUrl: baseUrl,
          site: state.getIn(['tables', baseUrl, 'site']),
          mediaSidebar: mediaSidebar(state)
        }
      }, {
        updateSite: _.partial(actions.updateSite, baseUrl),
      })(EditSite)
    }
  }
}
