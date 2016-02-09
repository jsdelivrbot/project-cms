import React from 'react';
import _ from 'lodash';

import AwsConfig from './AwsConfig.jsx';
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
  }

  render() {
    let active = this.state.active;
    let {awsConfig, setAwsConfig, appsConfig, setAppsConfig} = this.props;

    return <div>
      <ul className="nav nav-tabs" role="tablist">
        <li className={active === 'apps' ? 'active' : null} role="presentation">
          <a onClick={_.partial(this.activateTab, 'apps')} role="tab">Apps</a>
        </li>
        <li className={active === 'aws' ? 'active' : null} role="presentation">
          <a onClick={_.partial(this.activateTab, 'aws')} role="tab">AWS</a>
        </li>
      </ul>

      <div className="tab-content">
        <div className={"tab-pane "+ (active === 'apps' ? 'active' : '')} role="tabpanel">
          <AppsConfig appsConfig={appsConfig} setAppsConfig={setAppsConfig} key="apps-config"/>
        </div>
        <div className={"tab-pane "+ (active === 'aws' ? 'active' : '')} role="tabpanel">
          <AwsConfig awsConfig={awsConfig} setAwsConfig={setAwsConfig} key="aws-config"/>
        </div>
      </div>
    </div>
  }
}
