import React from 'react';


export default class TabItem extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
  }

  render() {
    return this.props.children;
  }
}
