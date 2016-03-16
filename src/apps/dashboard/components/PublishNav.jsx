import React from 'react';
import {connect} from 'react-redux';

import zipPublisher from '~/publishers/zipfile';
import publish from '~/publishers/index';
import {loadUploader} from '~/middleware/uploader';

import PublishButton from './PublishButton.jsx';


export class PublishNav extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let {store} = this.context;
    let hostingConfig = this.props.hostingConfig;
    hostingConfig = hostingConfig ? hostingConfig.toJS() : null;
    let publishDefault = () => {
      return loadUploader(hostingConfig).then(({publisher}) => {
        return publish(store, publisher);
      });
    }
    let publishZipfile = () => {
      return publish(store, zipPublisher());
    }

    return <div className="nav navbar-nav navbar-right btn-group" role="group">
      <PublishButton key="zip" publish={publishZipfile}>Export Zipfile</PublishButton>
      {hostingConfig ? <PublishButton key="publisher" publish={publishDefault}>Publish</PublishButton> : null}
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
})(PublishNav);
