import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {Map} from 'immutable';
import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {combineReducers} from 'redux-immutablejs';

import {Route, Router, Redirect} from 'react-router';
import createHistory from 'history/lib/createHashHistory'

import promiseMiddleware from './middleware/promiseMiddleware';

import DashboardFactory from './dashboard/index';
import Engine from './engine/index';
import appsLoader from './appsLoader';
import zipPublisher from './publishers/zipfile';


var createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

var history = createHistory();

//apps that have an admin presence
var appConfig = {
  '/site': './site/index',
  '/pages': './pages/index',
  '/templates': './templates/index',
};


appsLoader(appConfig).then(apps => {
  console.log("apps:", apps);

  var dashboard = DashboardFactory(apps);

  /* set up reducer & store */
  var reducers = {
    dashboard: dashboard.reducer,
    engine: Engine.reducer,
  };

  _.each(apps, app => {
    reducers[app.baseUrl] = app.reducer;
  });
  console.log("reducers:", reducers)
  var reducer = combineReducers(reducers);
  var store = createStoreWithMiddleware(reducer, Map());
  //store.dispatch(Engine.actions.setApps(apps));
  console.log("store:", store);


  //CONSIDER: we are storing core functions in the engine domain - probably not using the redux as intended
  //this is because publish & render need to access state to run

  /* set up renderer */
  var renderer = _.find(apps, {baseUrl: '/templates'}).renderFactory(store);
  console.log("renderer:", renderer);
  store.dispatch(Engine.actions.setRenderer(renderer));


  /* set up publishing */
  function publish() {
    let publisher = zipPublisher();
    let pushContentAction = _.flow(Engine.actions.pushContent, store.dispatch);

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
  store.dispatch(Engine.actions.setPublisher(publish));


  /* mount application to DOM */
  function AppDashboard(props) {
    props = _.merge({apps}, props);
    console.log("new props:", props)
    var Dashboard = dashboard.component;
    return <Provider store={store}>
      <Dashboard {...props}/>
    </Provider>
  }

  var rootRoute = {
    component: AppDashboard,
    childRoutes: _.map(apps, x => x.routes).concat([dashboard.routes])
  }

  ReactDOM.render(
    <Router history={history} routes={rootRoute} />,
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
store.get(['engine', renderer'])

*/
