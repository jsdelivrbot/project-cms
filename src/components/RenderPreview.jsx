import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import _ from 'lodash';


export class RenderPreview extends React.Component {
  static propTypes = {
    site: React.PropTypes.object.isRequired,
    context: React.PropTypes.object.isRequired,
    template: React.PropTypes.string,
    render: React.PropTypes.func.isRequired
  };

  componentDidMount() {
    if (this.props.template) this.renderFrameContents();
  }

  renderFrameContents() {
    var doc = ReactDOM.findDOMNode(this).contentDocument;
    if(doc && doc.readyState === 'complete') {
      let {context, template, site, render} = this.props;
      context.site = site;
      render(template, context).then(renderedPage => {
        doc.write(renderedPage);
      });
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
      let {context, template, site, render} = this.props;
      context.site = site;
      render(template, context, true).then(renderedBlocks => {
        //console.log("renderedBlocks:", renderedBlocks);
        _.each(renderedBlocks, (content, block) => {
          let element = doc.querySelector(`[data-template-block="${block}"]`);
          if (element && element.innerHTML !== content) {
            element.innerHTML = content;
          }
        });
      });
    }
  }

  render() {
    return <iframe style={{width: '100%'}}/>
  }
}

export default connect(state => {
  return {
    render: state.getIn(['/engine', 'renderer']),
    site: state.getIn(['tables', '/site', 'site'])
  }
})(RenderPreview);
