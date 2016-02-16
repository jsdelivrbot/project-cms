import React from 'react';
import _ from 'lodash';

//import styling from './SidebarEmbed.css!'


class CopyLink extends React.Component {
  constructor(props) {
    super(props);

  }

  copyToClipboard = (event) => {
    var cutTextarea = this.refs.textarea;
    cutTextarea.select();

    try {
      var successful = document.execCommand('cut');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Cutting text command was ' + msg);
    } catch(err) {
      console.log('Oops, unable to cut');
    }
  }

  render() {
    return <div>
      <p><textarea className="js-cuttextarea" ref="textarea" value={this.props.data} readOnly={true}/></p>
      <button onClick={this.copyToClipboard}>Copy</button>
    </div>
  }
}

function MediaRow({providers, media_item}) {
  const media_type = media_item.get('media_type');
  const provider = _.find(providers, {baseUrl: media_type});
  if (!provider || !provider.itemInterface) {
    return <tr/>
  }
  return <tr>
    <td><CopyLink data={provider.itemInterface.embedCode(media_item)}/></td>
    <td>{provider.itemInterface.preview(media_item)}</td>
  </tr>
}

export default class SidebarEmbed extends React.Component {
  constructor(props) {
    super(props) //{providers, media}
    this.state = {
      collapsed: true
    }
  }

  toggleCollapse = (event) => {
    this.setState({collapsed: !this.state.collapsed});
  }

  render() {
    let {media, providers} = this.props;
    let glyphDirection = this.state.collapsed ? "left" : "right";
    let paneClass = this.state.collapsed ? "collapsed" : "visible";
    return <div className="Component-SidebarEmbed">
      <div className="Component-SidebarEmbed-Button">
        <span className={`glyphicon glyphicon-chevron-${glyphDirection}`} onClick={this.toggleCollapse}/>
      </div>
      <div className={`Component-SidebarEmbed-Pane ${paneClass}`}>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Copy</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              {media.map((media_item, id) => <MediaRow providers={providers} media_item={media_item} key={id}/>).toArray()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  }
}
