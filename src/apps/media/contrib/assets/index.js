import {connect} from 'react-redux'
import _ from 'lodash';

import AssetList from './components/AssetList.jsx';
import AddAsset from './components/AddAsset.jsx';
import EditAsset from './components/EditAsset.jsx';

import actions from './actions';
import {uploadFile} from '~/actions';


export default function AssetsApplicationFactory(baseUrl) {

  return {
    type: 'media provider',
    actions,
    title: 'Assets',
    renderMediaItem: renderMediaItem,
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
        })(EditAsset)
      }]
    }
  }
}

function renderMediaItem(media_item, field) {
  switch(field) {
    case "detail_link":
      return media_item.get('media_type') + "/" + media_item.get('id');
    case "preview":
      return media_item.get('url');
    case "embed_code":
      const url = media_item.get('url');
      switch(media_item.get('type')) {
        case "anchor":
          return `<a href=${url}>${url}</a>`
        case "css":
          return `<link ref="stylesheet" href=${url}/>`
        case "javascript":
          return `<script src=${url}></script>`
        case "image":
          return `<img src=${url}/>`
    }
  }
}
