import _modernize from './shims';

import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {Map, fromJS} from 'immutable';
import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import createHistory from 'history/lib/createHashHistory'

import promiseMiddleware from './middleware/promise';
import nextUrlMiddleware from './middleware/next_url';
import askForMiddleware from './middleware/ask_for';
import uploaderMiddleware from './middleware/uploader';
import thumbnailerMiddleware from './middleware/thumbnailer';
import {initializeHosting} from './reducers/services';

import {appsLoader, loadAppsTables, makeReducer, sendLoadingMessage} from './appsLoader';
import AppRouter from './components/AppRouter.jsx';

import rjsfStyling from "zbyte64/react-jsonschema-form/css/react-jsonschema-form.css!";


var createStoreWithMiddleware = applyMiddleware(nextUrlMiddleware, uploaderMiddleware, thumbnailerMiddleware, promiseMiddleware, askForMiddleware)(createStore);

var history = createHistory();

sendLoadingMessage('Core Imported');

export default function(cmsConfig) {
  if (cmsConfig && !Map.isMap(cmsConfig)) cmsConfig = fromJS(cmsConfig);
  return appsLoader(cmsConfig).then(apps => {
    console.log("apps:", apps);
    sendLoadingMessage("Loading app data...");
    return loadAppsTables(apps).then(tables => {
      var initialState = Map({
        tables
      });
      if (cmsConfig) initialState = initialState.mergeDeep(cmsConfig);
      console.log("Initial State:", initialState);
      return {apps, initialState};
    })
  }).then(({apps, initialState}) => {
    sendLoadingMessage("Booting UX")
    function getApp(baseUrl) {
      return _.find(apps, {baseUrl});
    }

    /* set up reducer & store */

    var reducer = makeReducer(apps);
    var store = createStoreWithMiddleware(reducer, initialState);
    console.log("store:", store);

    var engine = getApp('/engine');

    store.dispatch(engine.actions.setApps(apps));
    initializeHosting(store);

    //CONSIDER: we are storing core functions in the engine domain - probably not using the redux as intended
    //this is because publish & render need to access state to run

    /* set up renderer */
    var renderer = getApp('/templates').renderFactory(store);
    console.log("renderer:", renderer);
    store.dispatch(engine.actions.setRenderer(renderer));

    sendLoadingMessage("Rendering UX");
    /* mount application to DOM */
    ReactDOM.render(
      <Provider store={store}>
        <AppRouter history={history}/>
      </Provider>,
      document.getElementById('app')
    );

    sendLoadingMessage(true);
  }).catch(error => {
    sendLoadingMessage("Error starting application, check console log");
    console.error(error);
  });
}
