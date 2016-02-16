import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux'


export function MediaSidebar({mediaApp}) {
  let Sidebar = (mediaApp && mediaApp.embeddableComponents) ? mediaApp.embeddableComponents.mediaSidebar : null;
  if (Sidebar) {
    return <Sidebar/>
  } else {
    return <noscript/>
  }
}

export default connect(state => {
  return {
    mediaApp: _.find(state.getIn(['/engine', 'apps']), {baseUrl: '/media'})
  }
})(MediaSidebar);
