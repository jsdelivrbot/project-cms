import React from 'react';

import Alerts from './Alerts.jsx';
import Plugins from './Plugins.jsx';
import NavBar from './NavBar.jsx';


function Dashboard({location, children}) {
  return <div>
    <NavBar key="nav" pathname={location.pathname}/>

    <Alerts key="alerts"/>

    <Plugins key="plugins"/>

    <div key="current-app" className="current-app">
      {children}
    </div>
  </div>
}

export default Dashboard;
