import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {Map} from 'immutable';
import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import {Route, Router, Redirect} from 'react-router';
import createHistory from 'history/lib/createHashHistory'

import promiseMiddleware from './middleware/promise';
import nextUrlMiddleware from './middleware/next_url';
import askForMiddleware from './middleware/ask_for';

import {appsLoader, loadAppsTables, makeReducer} from './appsLoader';


var createStoreWithMiddleware = applyMiddleware(nextUrlMiddleware, promiseMiddleware, askForMiddleware)(createStore);

var history = createHistory();


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
  var dashboard = getApp('/');

  store.dispatch(engine.actions.setApps(apps));


  //CONSIDER: we are storing core functions in the engine domain - probably not using the redux as intended
  //this is because publish & render need to access state to run

  /* set up renderer */
  var renderer = getApp('/templates').renderFactory(store);
  console.log("renderer:", renderer);
  store.dispatch(engine.actions.setRenderer(renderer));


  /* mount application to DOM */
  var routes = dashboard.routes;
  routes.childRoutes = _.map(_.filter(apps, x => x.baseUrl !== '/'), x => x.routes);
  //TODO media.childRoutes = media apps

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('app')
  )
}).catch(error => {
  console.log("Error starting application:");
  console.error(error);
});


/*
"engine" redux domain for publishing & rendering

MVP:
  publish() //each app can export a publish(state, pushContent) that returns a promise
  // preview could be implemented as a special case of publish (different pushContent)
  // BUT we want different link behavior for preview



Too Complicated:
  preview(page url) //not really an action but we need a method for rendering a page preview
  renderPage(page url) //same as above but used for publishing
  //one issue is that an app may give multiple urls but we might not know how to work backwards
  //we end up implementing an express like routing layer
  //but what we really want to for apps to push pages instead of polling requests
  //apps should push pages that need to be updated as a changeset; the only issue is we get into dependency mgmt!
  //like if we update a CTA that is present in more then one place

  //high level
  stage(...) //produces change set?
  publish(...) //change sets?


//low level
pushContent(path, content, mimetype)
setRenderer(renderF) // renderF(templateKey, context)

//how do we internall access the renderer?
store.get(['/engine', renderer'])

*/
