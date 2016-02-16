import React from 'react';
import _ from 'lodash';

import MenuItemList from './MenuItemList.jsx';


export default class AddMenu extends React.Component {
  constructor(props) {
    super(props) //{addMenu}
    this.state = {};
  }

  receiveSubmit = (event) => {
    event.preventDefault();
    this.props.addMenu(this.state);
  }

  updateValue = (event) => {
    var changes = {};
    changes[event.target.name] = event.target.value;
    this.setState(changes);
  }

  updateMenuItems = (menuItems) => {
    this.setState({menuItems});
  }

  render() {
    let menu = this.state;

    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <h1>Add Menu</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <form onSubmit={this.receiveSubmit}>
            <div className="form-group">
              <label className="control-label">key</label>
              <input name="key" className="form-control" value={menu.key} required="required" onChange={this.updateValue}
                placeholder="menu-name"/>
            </div>
            <MenuItemList defaultValue={menu.menuItems} onChange={this.updateMenuItems} />
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  }
}
