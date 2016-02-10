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
    let {awsConfig} = this.props;
    let publishS3 = () => {
      return publish(store, s3Publisher(awsConfig));
    }
    let publishZipfile = () => {
      return publish(store, zipPublisher());
    }

    return <ul className="nav navbar-nav navbar-right">
      <li key="zip"><PublishButton publish={publishZipfile}>Export Zipfile</PublishButton></li>
      {awsConfig.bucket ? <li key="s3"><PublishButton publish={publishS3}>Publish to S3</PublishButton></li> : null}
    </ul>
  }
}

PublishNav.contextTypes = {
  store: React.PropTypes.object
};

export default connect(state => {
  return {
    awsConfig: state.getIn(['/engine', 'awsConfig'])
  }
})(PublishNav);
