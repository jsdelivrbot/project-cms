import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux'
import {Router} from 'react-router';


export function AppRouter({apps, history}) {
  let dashboard = _.find(apps, {baseUrl: '/'});
  let routes = _.clone(dashboard.routes);
  routes.childRoutes = _.map(_.filter(apps, x => x.baseUrl !== '/'), x => x.routes);
  //TODO media.childRoutes = media apps
  console.log("loading routes:", routes);

  //by changing the key we force a router reload!
  return <Router history={history} routes={routes} key={_.uniqueId()}/>
}

export default connect(state => {
  return {
    apps: state.getIn(['/engine', 'apps'])
  }
})(AppRouter);
