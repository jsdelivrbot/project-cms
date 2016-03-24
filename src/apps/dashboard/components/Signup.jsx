import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import _ from 'lodash';


export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.visible !== nextProps.visible) {
      if (nextProps.visible) {
        $("#signup-modal").modal('show');
      } else {
        $("#signup-modal").modal('hide');
      }

      this.setState({
        visible: nextProps.visible,
      });
    }
  }

  onDismiss = (event) => {
    event.preventDefault();
    this.props.dismissSignup()
  };

  render() {
    let {visible} = this.state;
    const modalFade = visible ? "in" : "";

    return <div className={`modal fade ${modalFade}`} id="signup-modal" tabIndex="-1" role="dialog" aria-labelledby="signup-modal-label">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" aria-label="Close" onClick={this.onDismiss}><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="signup-modal-label">Signup</h4>
          </div>
          <div className="modal-body">
            TODO signup form goes here
          </div>
          <div className="modal-footer">

            <button type="button" className="btn btn-default" onClick={this.onDismiss} key="dismiss">Close</button>
          </div>
        </div>
      </div>
    </div>
  }
}
