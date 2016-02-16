import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash';

import GalleryList from './components/GalleryList.jsx';
import AddGallery from './components/AddGallery.jsx';
import EditGallery from './components/EditGallery.jsx';

import actions from './actions';
import publish from './publish';
import fixtures from './fixtures';

import {getTemplates} from '~/plugins';


const galleryTemplates = getTemplates('page', ['gallery']);


export default function GallerysApplicationFactory(baseUrl) {
  return {
    type: 'application',
    actions,
    fixtures,
    publish: _.partial(publish, baseUrl),
    tables: [baseUrl],
    title: 'Galleries',
    routes: {
      path: baseUrl,
      component: 'div',
      indexRoute: {
        component: connect(state => {
          return {
            baseUrl: baseUrl,
            galleries: state.getIn(['tables', baseUrl])
          }
        })(GalleryList)
      },
      childRoutes: [{
        path: 'add',
        component: connect(state => {
          return {
            baseUrl: baseUrl,
            templates: galleryTemplates(state),
          }
        }, {
          addGallery: _.partial(actions.addGallery, baseUrl),
        })(AddGallery)
      }, {
        path: ':id',
        component: connect((state, props) => {
          let {id} = props.params;
          return {
            baseUrl: baseUrl,
            gallery: state.getIn(['tables', baseUrl, id]),
            id,
            templates: galleryTemplates(state),
          }
        }, {
          updateGallery: _.partial(actions.updateGallery, baseUrl),
          removeGallery: _.partial(actions.removeGallery, baseUrl),
        })(EditGallery)
      }]
    }
  }
}
