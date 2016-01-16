import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'

class RenderPreview extends React.Component {
  componentWillMount() {
    this._renderedPage = this.renderPage();
  }

  componentDidMount() {
    const renderedPage = this._renderedPage;
    this.writeFrameContents(renderedPage);
  }

  renderPage() {
    let gallery = this.props.gallery;
    let site = this.props.site.toJS();
    var context = {
      site,
      gallery
    };
    return this.props.render(gallery.template, context);
  }

  writeFrameContents(renderedPage) {
    var doc = ReactDOM.findDOMNode(this).contentDocument;
    if(doc && doc.readyState === 'complete') {
      doc.open();
      doc.write(renderedPage);
      doc.close();
    } else {
      setTimeout(this.writeFrameContents.bind(this, renderedPage), 0);
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
    site: state.getIn(['tables', '/site', 'site'])
  };
})(RenderPreview);
