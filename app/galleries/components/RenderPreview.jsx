import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'

class RenderPreview extends React.Component {
  componentDidMount() {
    this.renderFrameContents();
  }

  renderFrameContents() {
    var doc = ReactDOM.findDOMNode(this).contentDocument;
    if(doc && doc.readyState === 'complete') {
      let gallery = this.props.gallery;
      let site = this.props.site;
      var context = {
        site,
        gallery
      };
      var renderedPage = this.props.render(gallery.template, context);
      doc.write(renderedPage);

    } else {
      setTimeout(this.renderFrameContents, 0);
    }
  }

  componentDidUpdate() {
    var doc = ReactDOM.findDOMNode(this).contentDocument;
    var contentBlock = doc.getElementById("content");
    if (!contentBlock) return;
    /*
    var content = md.render(this.props.gallery.content);
    contentBlock.innerHTML = content;
    */
  }

  render() {
    return <iframe style={{width: '100%'}}/>
  }
}


export default connect((state, props) => {
  return {
    site: state.getIn(['tables', '/site', 'site']).toJS()
  };
})(RenderPreview);
