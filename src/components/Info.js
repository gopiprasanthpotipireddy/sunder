import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Info.scss';


export default class Info extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  }

  render() {
    const className = this.props.className || '';
    return (
      <p className={`flex-row info ${className}`}>
        <i className="fa fa-info-circle" />{this.props.children}
      </p>
    );
  }
}
