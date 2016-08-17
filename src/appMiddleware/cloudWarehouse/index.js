import {connect} from 'react-redux'
import _ from 'lodash';
import {Map} from 'immutable';

//view & manage subscriptions (ipfs names)
import SubscriptionList from './components/SubscriptionList.jsx';
//view importable items
import WarehouseList from './components/WarehouseList.jsx';

import actions from './actions';
import reducer from './reducer';


export default function cloudWarehouseMiddleware(appFactory, importItem, namespace='cloud-warehouse') {
  if (!_.isFunction(importItem)) {
    //importItem is an action to call when the user indicates they want to import an item
    //three arguments are provided: baseUrl, item, cloud id
    throw Error('importItem function must be provided');
  }
  //call actions.exportItem(item) if you wish to publish an item; returns a promise to the cloud id
  //call actions.updateItem(cloud id, item) to update an item

  return function(baseUrl, ...args) {
    let app = appFactory(baseUrl, ...args);
    let tableName = `${baseUrl}/${namespace}`;
    //state[tableName] for stashing cloud results
    //state['tables'][tableName] for storing subscriptions

    app.tables.push(tableName);

    app.actions = _.merge({
      exportWarehouseItem: _.partial(actions.exportItem, tableName),
      updateWarehouseItem: _.partial(actions.updateItem, tableName),
    }, app.actions);


    let extraRoutes = [{
      path: namespace,
      component: connect(state => {
        return {
          baseUrl: tableName,
          subscriptions: state.getIn(['tables', tableName]),
          items: state.get(tableName)
        }
      }, {
        fetchWarehouseListing: _.partial(actions.fetchWarehouseListing, tableName),
        importItem,
      })(WarehouseList)
    }, {
      path: `${namespace}/subscriptions`,
      component: connect(state => {
        return {
          baseUrl: tableName,
          subscriptions: state.getIn(['tables', tableName])
        }
      }, {
        addSubscription: _.partial(actions.addSubscription, tableName),
        removeSubscription: _.partial(actions.removeSubscription, tableName),
      })(SubscriptionList)
    }];

    app.routes.childRoutes = extraRoutes.concat(app.routes.childRoutes);
    app.reducers = _.assign({
      [tableName]: _.partial(reducer, tableName),
    }, app.reducers || {});

    //TODO app.fixtures.initial {tableName: {}}

    return app;
  }
}
