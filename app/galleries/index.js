import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash';

import GalleryList from './components/GalleryList.jsx';
import AddGallery from './components/AddGallery.jsx';
import EditGallery from './components/EditGallery.jsx';

import reducer from './reducer';
import actions from './actions';
import publish from './publish';
import fixtures from './fixtures';


function galleryTemplates(state) {
  return state.get('/templates').filter(tmp => tmp.get('type') === 'page');
}


function askForMedia(quantityLimit=20) {
  return {
    type: 'ASK_FOR_MEDIA',
    media_types: ['pictures'],
    quantityLimit
  }
}

export default function GallerysApplicationFactory(baseUrl) {
  return {
    baseUrl,
    type: 'application',
    reducer,
    actions,
    fixtures,
    publish: _.partial(publish, baseUrl),
    title: 'Galleries',
    routes: {
      path: baseUrl,
      component: 'div',
      indexRoute: {
        component: connect(state => {
          return {
            baseUrl: baseUrl,
            galleries: state.get(baseUrl).toJS()
          }
        }, {
          askForMedia
        })(GalleryList)
      },
      childRoutes: [{
        path: 'add',
        component: connect(state => {
          return {
            baseUrl: baseUrl,
            templates: galleryTemplates(state),
            render: state.getIn(['/engine', 'renderer'])
          }
        }, {
          addGallery: _.partial(actions.addGallery, baseUrl),
          askForMedia,
        })(AddGallery)
      }, {
        path: '**',
        component: connect(state => {
          let path = '/'+props.params.splat;
          return {
            baseUrl: baseUrl,
            gallery: state.getIn([baseUrl, path]).toJS(),
            path,
            templates: galleryTemplates(state),
            render: state.getIn(['/engine', 'renderer']),
          }
        }, {
          updateGallery: _.partial(actions.updateGallery, baseUrl),
          removeGallery: _.partial(actions.removeGallery, baseUrl),
          askForMedia,
        })(EditGallery)
      }]
    }
  }
}
