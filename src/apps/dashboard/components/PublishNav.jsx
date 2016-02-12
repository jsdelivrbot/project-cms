import React from 'react';
import {connect} from 'react-redux';

import zipPublisher from '~/publishers/zipfile';
import s3Publisher from '~/publishers/s3';
import publish from '~/publishers/index';

import PublishButton from './PublishButton.jsx';


export class PublishNav extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let {store} = this.context;
    let awsConfig = this.props.awsConfig.toJS();
    let publishS3 = () => {
      return publish(store, s3Publisher(awsConfig));
    }
    let publishZipfile = () => {
      return publish(store, zipPublisher());
    }

    return <div className="nav navbar-nav navbar-right btn-group" role="group">
      <PublishButton key="zip" publish={publishZipfile}>Export Zipfile</PublishButton>
      {awsConfig.bucket ? <PublishButton key="s3" publish={publishS3}>Publish to S3</PublishButton> : null}
    </div>
  }
}

PublishNav.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default connect(state => {
  return {
    awsConfig: state.getIn(['tables', '/engine', 'awsConfig'])
  }
})(PublishNav);
