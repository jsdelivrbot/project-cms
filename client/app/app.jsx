import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {Map} from 'immutable';
import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {combineReducers} from 'redux-immutablejs';

import {Route, Router, Redirect} from 'react-router';
import createHistory from 'history/lib/createHashHistory'

import promiseMiddleware from './middleware/promise';
import persistenceMiddleware, {readTable} from './middleware/persistence';

import appsLoader from './appsLoader';
import zipPublisher from './publishers/zipfile';


var createStoreWithMiddleware = applyMiddleware(persistenceMiddleware, promiseMiddleware)(createStore);

var history = createHistory();

//TODO have the engine app tell us what apps to load (dynamically loaded apps?)
//apps that have an admin presence
var appConfig = {
  '/': './dashboard/index',
  '/engine': './engine/index',
  '/site': './site/index',
  '/pages': './pages/index',
  '/templates': './templates/index',
};


appsLoader(appConfig).then(apps => {
  console.log("apps:", apps);

  var initialState = Map();
  return Promise.all(_.map(apps, app => {
    var baseUrl = app.baseUrl;
    return readTable(baseUrl).then(tableState => {
      if (tableState) {
        initialState = initialState.set(baseUrl, tableState);
      }
    });
  })).then(x => {
    console.log("Initial State:", initialState.toJS());
    return {apps, initialState};
  });
}).then(({apps, initialState}) => {

  function getApp(baseUrl) {
    return _.find(apps, {baseUrl});
  }

  /* set up reducer & store */

  var reducers = _.reduce(apps, (col, app) => {
    col[app.baseUrl] = app.reducer;
    return col;
  }, {});
  console.log("reducers:", reducers)
  var reducer = combineReducers(reducers);
  var store = createStoreWithMiddleware(reducer, initialState);
  console.log("store:", store);

  var engine = getApp('/engine');
  var dashboard = getApp('/')

  store.dispatch(engine.actions.setApps(apps));


  //CONSIDER: we are storing core functions in the engine domain - probably not using the redux as intended
  //this is because publish & render need to access state to run

  /* set up renderer */
  var renderer = getApp('/templates').renderFactory(store);
  console.log("renderer:", renderer);
  store.dispatch(engine.actions.setRenderer(renderer));


  /* set up publishing */
  function publish() {
    let publisher = zipPublisher();
    let pushContentAction = _.flow(engine.actions.pushContent, store.dispatch);

    function pushContent(path, content, mimetype) {
      pushContentAction(path, content, mimetype);
      return publisher.pushContent(path, content, mimetype);
    }

    let state = store.getState();

    var appPublishes = _.filter(_.map(apps, app => {
      if (app.publish) {
        return app.publish(state, pushContent);
      }
      return null;
    }));

    console.log("app publishes:", appPublishes);

    return store.dispatch({
      type: 'PUBLISH',
      promise: Promise.all(appPublishes).then(done => {
        return publisher.view();
      })
    }).catch(error => {
      console.error(error);
      store.dispatch(dashboard.actions.addAlert('error', 'Publish failed: '+error))
    });
  }
  store.dispatch(engine.actions.setPublisher(publish));


  /* mount application to DOM */
  var routes = dashboard.routes;
  routes.childRoutes = _.map(_.filter(apps, x => x.baseUrl !== '/'), x => x.routes);

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('app')
  )
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
