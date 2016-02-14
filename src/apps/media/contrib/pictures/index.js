import {connect} from 'react-redux'
import _ from 'lodash';

import PictureList from './components/PictureList.jsx';
import AddPicture from './components/AddPicture.jsx';
import EditPicture from './components/EditPicture.jsx';
import PictureField from './components/PictureField.jsx';

import actions from './actions';
import {uploadFile, replaceFile} from '~/actions';


function renderMediaItem(media_item, field) {
  switch(field) {
    case "detail_link":
      return media_item.get('media_type') + "/" + media_item.get('id');
    case "preview":
      return media_item.get('name');
    case "embed_code":
      const url = media_item.get('url');
      const name = media_item.get('name');
      return `<img src=${url} alt=${name}/>`;
    case "field":
      return PictureField;
  }
}


export default function PicturesApplicationFactory(baseUrl) {
  //TODO uploadPictures (for use with media picker)
  //TODO thumbnail request renderThumbnail(media_item, options) (maybe as action MAKE_THUMBNAIL)
  //would trigger an update and access state
  //also needs to be available as a filter
  return {
    type: 'media provider',
    actions,
    title: 'Pictures',
    renderMediaItem: renderMediaItem,
    routes: {
      path: baseUrl,
      component: 'div',
      indexRoute: {
        component: connect(state => {
          return {
            baseUrl: baseUrl,
            pictures: state.getIn(['tables', '/media']).filter(x => x.get('media_type') === baseUrl)
          }
        })(PictureList)
      },
      childRoutes: [{
        path: 'add',
        component: connect(state => {
          return {
            baseUrl: baseUrl
          }
        }, {
          addPicture: _.partial(actions.addPicture, baseUrl),
          uploadFile
        })(AddPicture)
      }, {
        path: ':pictureId',
        component: connect((state, props) => {
          return {
            baseUrl: baseUrl,
            picture: state.getIn(['tables', '/media', props.params.pictureId]),
            pictureId: props.params.pictureId
          }
        }, {
          updatePicture: _.partial(actions.updatePicture, baseUrl),
          removePicture: _.partial(actions.removePicture, baseUrl),
          replaceFile
        })(EditPicture)
      }]
    }
  }
}
