import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';

import {dismissAlert} from '../actions';


function Alert({alert, dismiss}) {
  return <div className={`alert alert-${alert.type} alert-dismissible`} role="alert">
    <button onClick={_.partial(dismiss, alert.key)} type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    {alert.message}
  </div>
}

function AlertsComponent({alerts, dismiss}) {
  return <div className="alerts">
    {alerts.map((alert) => <Alert alert={alert} dismiss={dismiss} key={alert.key}/>).toArray()}
  </div>
}

var Alerts = connect(state => {
  return {
    alerts: state.getIn(['dashboard', 'alerts'])
  }
}, {
  dismiss: dismissAlert
})(AlertsComponent);


export default Alerts;
