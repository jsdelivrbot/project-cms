import React from 'react';
import {connect} from 'react-redux';

export function Plugins({plugins}) {
  console.log("rendering plugins:", plugins);
  let renderedPlugins = plugins.map((PluginComponent, key) => {
    return <PluginComponent key={key}/>
  }).toArray();
  return <div>
    {renderedPlugins}
  </div>
}

export default connect(state => {
  return {
    plugins: state.getIn(['/', 'plugins'])
  }
})(Plugins);
