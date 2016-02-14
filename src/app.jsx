import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {Map} from 'immutable';
import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import createHistory from 'history/lib/createHashHistory'

import promiseMiddleware from './middleware/promise';
import nextUrlMiddleware from './middleware/next_url';
import askForMiddleware from './middleware/ask_for';
import uploaderMiddleware from './middleware/uploader';
import thumbnailerMiddleware from './middleware/thumbnailer';

import {appsLoader, loadAppsTables, makeReducer} from './appsLoader';
import AppRouter from './components/AppRouter.jsx';

import {s3Uploader} from './services/s3';


var createStoreWithMiddleware = applyMiddleware(nextUrlMiddleware, uploaderMiddleware, promiseMiddleware, thumbnailerMiddleware, askForMiddleware)(createStore);

var history = createHistory();

console.log('loading apps...')
appsLoader().then(apps => {
  console.log("apps:", apps);

  return loadAppsTables(apps).then(tables => {
    var initialState = Map({
      tables
    });
    console.log("Initial State:", initialState);
    return {apps, initialState};
  })
}).then(({apps, initialState}) => {

  function getApp(baseUrl) {
    return _.find(apps, {baseUrl});
  }

  /* set up reducer & store */

  var reducer = makeReducer(apps);
  var store = createStoreWithMiddleware(reducer, initialState);
  console.log("store:", store);

  var engine = getApp('/engine');

  store.dispatch(engine.actions.setApps(apps));

  //hook in S3 uploader
  s3Uploader(store);


  //CONSIDER: we are storing core functions in the engine domain - probably not using the redux as intended
  //this is because publish & render need to access state to run

  /* set up renderer */
  var renderer = getApp('/templates').renderFactory(store);
  console.log("renderer:", renderer);
  store.dispatch(engine.actions.setRenderer(renderer));


  /* mount application to DOM */
  ReactDOM.render(
    <Provider store={store}>
      <AppRouter history={history}/>
    </Provider>,
    document.getElementById('app')
  )
}).catch(error => {
  console.log("Error starting application:");
  console.error(error);
});
