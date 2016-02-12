import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import _ from 'lodash';


export function renderBlocks() {
  return {}
}

export default class RenderPreview extends React.Component {
  static propTypes = {
    context: React.PropTypes.object.isRequired,
    template: React.PropTypes.string.isRequired
  };

  componentDidMount() {
    if (this.props.template) this.renderFrameContents();
  }

  renderFrameContents() {
    var doc = ReactDOM.findDOMNode(this).contentDocument;
    if(doc && doc.readyState === 'complete') {
      let {context, template} = this.props;
      var renderedPage = this.props.render(template, context);
      doc.write(renderedPage);
    } else {
      setTimeout(this.renderFrameContents, 0);
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.template) return;
    if (prevProps.template !== this.props.template) {
      this.renderFrameContents();
    } else {
      let doc = ReactDOM.findDOMNode(this).contentDocument;
      //TODO identify blocks
      let blocks = ['content'];
      let {context, template} = this.props;
      let renderedBlocks = renderBlocks(template, context, blocks);
      _.each(renderedBlocks, (content, block) => {
        let element = doc.querySelector(`[data-template-block="${block}"]`);
        if (element && element.innerHTML !== content) {
          element.innerHTML = content;
        }
      });
    }
  }

  render() {
    return <iframe style={{width: '100%'}}/>
  }
}
