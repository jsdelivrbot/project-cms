import React from 'react';
import {connect} from 'react-redux';

import zipPublisher from '~/publishers/zipfile';
import publish from '~/publishers/index';
import {loadUploader} from '~/middleware/uploader';

import PublishButton from './PublishButton.jsx';

import {showSignup} from '../actions';


export class PublishNav extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  publishZipFile = (event) => {
    event.preventDefault()
    let {store} = this.context;
    return publish(store, zipPublisher());
  }

  publishDefault = (event) => {
    let {store} = this.context;
    let {hostingConfig} = this.props;
    return loadUploader(hostingConfig.toJS()).then(({publisher}) => {
      return publish(store, publisher);
    });
  }

  displaySignup = (event) => {
    event.preventDefault()
    this.props.showSignup();
  }

  render() {
    let hostingConfig = this.props.hostingConfig;

    return <div className="nav navbar-nav navbar-right btn-group" role="group">
      {hostingConfig
        ? <PublishButton key="publisher" publish={this.publishDefault}>Publish</PublishButton>
        : <button type="button" className="btn btn-primary" onClick={this.displaySignup}>Signup</button>}
      <PublishButton key="zip" publish={this.publishZipfile}>Export Zipfile</PublishButton>
    </div>
  }
}

PublishNav.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default connect(state => {
  return {
    hostingConfig: state.getIn(['services', 'hosting'])
  }
}, {showSignup})(PublishNav);
