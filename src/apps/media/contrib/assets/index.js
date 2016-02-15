import {connect} from 'react-redux'
import _ from 'lodash';

import AssetList from './components/AssetList.jsx';
import AddAsset from './components/AddAsset.jsx';
import EditAsset from './components/EditAsset.jsx';

import actions from './actions';
import itemInterface from './itemInterface';

import {uploadFile, replaceFile} from '~/actions';


export default function AssetsApplicationFactory(baseUrl) {

  return {
    type: 'media provider',
    actions,
    title: 'Assets',
    itemInterface,
    routes: {
      path: baseUrl,
      component: 'div',
      indexRoute: {
        component: connect(state => {
          return {
            baseUrl: baseUrl,
            assets: state.getIn(['tables', '/media']).filter(x => x.get('media_type') === baseUrl)
          }
        })(AssetList)
      },
      childRoutes: [{
        path: 'add',
        component: connect(state => {
          return {
            baseUrl: baseUrl
          }
        }, {
          addAsset: _.partial(actions.addAsset, baseUrl),
          uploadFile
        })(AddAsset)
      }, {
        path: ':assetId',
        component: connect((state, props) => {
          return {
            baseUrl: baseUrl,
            asset: state.getIn(['tables', '/media', props.params.assetId]),
            assetId: props.params.assetId
          }
        }, {
          updateAsset: _.partial(actions.updateAsset, baseUrl),
          removeAsset: _.partial(actions.removeAsset, baseUrl),
          replaceFile
        })(EditAsset)
      }]
    }
  }
}
