import React from 'react';
import _ from 'lodash';


export default class MenuItemList extends React.Component {
  constructor(props) {
    super(props); //{value, onChange}
    let value = props.value || props.defaultValue || [{
      link: "#",
      text: "text",
    }];
    this.state = {
      value
    };
  }

  signalChange(value) {
    if (!value) value = this.state.value;

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  removeMenuItem = (event) => {
    event.preventDefault();
    let index = parseInt(event.target.dataset.index);

    var value = this.state.value.slice();
    value.splice(index, 1);
    console.log("removeMenuItem", index, value)
    this.setState({value});
    this.signalChange(value);
  }

  addMenuItem = (event) => {
    event.preventDefault();
    var value = this.state.value.slice();
    value.push({
      link: "#",
      text: "text",
    });
    this.setState({value});
    this.signalChange(value);
  }

  updateMenuItem = (index, event) => {
    var value = this.state.value.slice();
    let menuItem = value[index];
    menuItem[event.target.name] = event.target.value;
    this.setState({value});
    this.signalChange(value);
  }

  renderMenuItemRow = (menuItem, index) => {
    let updateMenuItem = _.partial(this.updateMenuItem, index);
    return <div className="form-group" key={index}>
      <input type="text" name="link" onChange={updateMenuItem} value={menuItem.link} key="link"/>
      <input type="text" name="text" onChange={updateMenuItem} value={menuItem.text} key="text"/>
      <button className="btn btn-default" onClick={this.removeMenuItem} key="remove" data-index={index}>Remove</button>
    </div>
  }

  render() {
    return <div>
      {_.map(this.state.value, this.renderMenuItemRow)}

      <div className="form-group" key="add">
        <button type="button" className="btn btn-default" onClick={this.addMenuItem}>Add Menu Item</button>
      </div>
    </div>
  }
}
