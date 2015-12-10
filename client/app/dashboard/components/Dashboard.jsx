import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import Alerts from './Alerts.jsx';
import PublishButton from './PublishButton.jsx';


function MenuLink({to, children}) {
  return <button type="link"><Link to={to}>{children}</Link></button>
}


function Dashboard({apps, children}) {
  return <div>
    <nav className="navbar navbar-default" key="navbar">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to="/">CMS</Link>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-left">
            {_.map(apps, app => <li key={app.baseUrl}><Link to={app.baseUrl}>{app.title}</Link></li>)}
          </ul>

          <ul className="nav navbar-nav navbar-right">
            <li><PublishButton/></li>
          </ul>
        </div>
      </div>
    </nav>

    <Alerts key="alerts"/>

    <div key="current-app" className="current-app">
      {children}
    </div>
  </div>
}

export default Dashboard;
