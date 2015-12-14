import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';

let md = new Remarkable();

export default class RenderPreview extends React.Component {
  componentDidMount() {
    this.renderFrameContents();
  }

  renderFrameContents() {
    var doc = ReactDOM.findDOMNode(this).contentDocument;
    if(doc && doc.readyState === 'complete') {
      let page = this.props.page;
      var content = md.render(page.content);
      var context = {
        content,
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
    var content = md.render(this.props.page.content);
    doc.getElementById("content").innerHTML = content;
  }

  render() {
    return <iframe/>
  }
}
