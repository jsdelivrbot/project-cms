import {connect} from 'react-redux'
import _ from 'lodash';

import PictureList from './components/PictureList.jsx';
import AddPicture from './components/AddPicture.jsx';
import EditPicture from './components/EditPicture.jsx';

import actions from './actions';
import {uploadFile} from '~/actions';


function renderMediaItem(media_item, field) {
  switch(field) {
    case "detail_link":
      return media_item.get('media_type') + "/" + media_item.get('id');
    case "preview":
      return media_item.get('path');
    case "embed_code":
      const path = media_item.get('path');
      return `<img src=${path}/>`;
  }
}


export default function PicturesApplicationFactory(baseUrl) {

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
          uploadFile
        })(EditPicture)
      }]
    }
  }
}
