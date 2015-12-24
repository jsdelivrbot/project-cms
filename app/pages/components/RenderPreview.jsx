import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import {connect} from 'react-redux'

let md = new Remarkable({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
});

class RenderPreview extends React.Component {
  componentDidMount() {
    this.renderFrameContents();
  }

  renderFrameContents() {
    var doc = ReactDOM.findDOMNode(this).contentDocument;
    if(doc && doc.readyState === 'complete') {
      let page = this.props.page;
      let site = this.props.site;
      var context = {
        site,
        page
      };
      var renderedPage = this.props.render(page.template, context);
      doc.write(renderedPage);

    } else {
      setTimeout(this.renderFrameContents, 0);
    }
  }

  componentDidUpdate() {
    var doc = ReactDOM.findDOMNode(this).contentDocument;
    var contentBlock = doc.getElementById("content");
    if (!contentBlock) return;
    var content = md.render(this.props.page.content);
    contentBlock.innerHTML = content;
  }

  render() {
    return <iframe style={{width: '100%'}}/>
  }
}


export default connect((state, props) => {
  return {
    site: state.get('/site').toJS()
  };
})(RenderPreview);
