import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux'
import {Router} from 'react-router';

//TODO router reloading doesn't seem to work
export function AppRouter({apps, history}) {
  let dashboard = _.find(apps, {baseUrl: '/'});
  let routes = _.clone(dashboard.routes);
  routes.childRoutes = _.map(_.filter(apps, x => x.baseUrl !== '/'), x => x.routes);
  //TODO media.childRoutes = media apps
  console.log("loading routes:", routes);

  return <Router history={history} routes={routes} />
}

export default connect(state => {
  return {
    apps: state.getIn(['/engine', 'apps'])
  }
})(AppRouter);
