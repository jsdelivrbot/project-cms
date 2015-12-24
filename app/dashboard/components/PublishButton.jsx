import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';


function PublishButtonComponent({publishing, publish}) {
  if (publishing) {
    return <button type="button" className="btn btn-primary navbar-btn" disabled="disabled">Publishing</button>
  }
  return <button type="button" className="btn btn-primary navbar-btn" onClick={publish}>Export</button>
}

var PublishButton = connect(state => {
  return {
    publish: state.getIn(['/engine', 'publisher']),
    publishing: state.getIn(['/engine', 'publishing'])
  }
})(PublishButtonComponent);


export default PublishButton;
