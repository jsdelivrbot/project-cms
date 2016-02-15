import {connect} from 'react-redux'
import _ from 'lodash';

import PictureList from './components/PictureList.jsx';
import AddPicture from './components/AddPicture.jsx';
import EditPicture from './components/EditPicture.jsx';
import PictureField from './components/PictureField.jsx';

import actions from './actions';
import itemInterface from './itemInterface.jsx';

import {uploadFile, replaceFile} from '~/actions';


export default function PicturesApplicationFactory(baseUrl) {
  return {
    type: 'media provider',
    actions,
    title: 'Pictures',
    itemInterface,
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
