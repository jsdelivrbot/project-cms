import React from 'react';
import {connect} from 'react-redux';


function PublishButtonComponent({publishing, publish, children}) {
  if (publishing) {
    return <button type="button" className="btn btn-primary navbar-btn" disabled="disabled">Publishing</button>
  }
  return <button type="button" className="btn btn-primary navbar-btn" onClick={publish}>{children}</button>
}

var PublishButton = connect(state => {
  return {
    publishing: state.getIn(['/engine', 'publishing'])
  }
})(PublishButtonComponent);


export default PublishButton;
