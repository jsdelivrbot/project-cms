import React from 'react';
import _ from 'lodash';

import HostingConfig from './HostingConfig.jsx';
import DatabaseConfig from './DatabaseConfig.jsx';
import AppsConfig from './AppsConfig.jsx';


export default class ConfigPanel extends React.Component {
  constructor(props) {
    super(props); //{awsConfig, setAwsConfig, appsConfig, setAppsConfig}
    this.state = {
      active: 'apps'
    }
  }

  activateTab = (tab, event) => {
    event.preventDefault();
    this.setState({active: tab});
  };

  render() {
    let active = this.state.active;
    let {
      databaseConfig, setDatabaseConfig,
      appsConfig, setAppsConfig,
      hostingConfig, setHostingConfig,
    } = this.props;

    return <div>
      <ul className="nav nav-tabs" role="tablist">
        <li className={active === 'apps' ? 'active' : null} role="presentation">
          <a onClick={_.partial(this.activateTab, 'apps')} role="tab">Apps</a>
        </li>
        <li className={active === 'database' ? 'active' : null} role="presentation">
          <a onClick={_.partial(this.activateTab, 'database')} role="tab">Database</a>
        </li>
        <li className={active === 'hosting' ? 'active' : null} role="presentation">
          <a onClick={_.partial(this.activateTab, 'hosting')} role="tab">Hosting</a>
        </li>
      </ul>

      <div className="tab-content">
        <div className={"tab-pane "+ (active === 'apps' ? 'active' : '')} role="tabpanel">
          <AppsConfig appsConfig={appsConfig} setAppsConfig={setAppsConfig} key="apps-config"/>
        </div>
        <div className={"tab-pane "+ (active === 'database' ? 'active' : '')} role="tabpanel">
          <DatabaseConfig databaseConfig={databaseConfig} setDatabaseConfig={setDatabaseConfig} key="database-config"/>
        </div>
        <div className={"tab-pane "+ (active === 'hosting' ? 'active' : '')} role="tabpanel">
          <HostingConfig hostingConfig={hostingConfig} setHostingConfig={setHostingConfig} key="hosting-config"/>
        </div>
      </div>
    </div>
  }
}
