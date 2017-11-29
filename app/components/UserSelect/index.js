/**
*
* UserSelect
*
*/

import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Avatar from 'material-ui/Avatar';

import './style.css';
import './styleM.css';


const USERS = ['Audora', 
  'Austin', 'Nadeem', 'Ivy', 'David'];
  
  const AvatarOption = createClass({
    propTypes: {
      children: PropTypes.node,
      className: PropTypes.string,
      isDisabled: PropTypes.bool,
      isFocused: PropTypes.bool,
      isSelected: PropTypes.bool,
      onFocus: PropTypes.func,
      onSelect: PropTypes.func,
      option: PropTypes.object.isRequired,
    },
    handleMouseDown (event) {
      event.preventDefault();
      event.stopPropagation();
      this.props.onSelect(this.props.option, event);
    },
    handleMouseEnter (event) {
      this.props.onFocus(this.props.option, event);
    },
    handleMouseMove (event) {
      if (this.props.isFocused) return;
      this.props.onFocus(this.props.option, event);
    },
    render () {
      return (
        <div className={this.props.className}
          onMouseDown={this.handleMouseDown}
          onMouseEnter={this.handleMouseEnter}
          onMouseMove={this.handleMouseMove}
          title={this.props.option.title}>
          <div className="fakeUserPic" style={{ height: '75px', width: '75px', borderRadius: '50%', background: '#DDDDDD'}}/>
            {this.props.children}
        </div>
      );
    }
  });
  
  const AvatarValue = createClass({
    propTypes: {
      children: PropTypes.node,
      placeholder: PropTypes.string,
      value: PropTypes.object
    },
    render () {
      return (
        <div className="Select-value" title={this.props.value.title}>
          <span className="Select-value-label">
          <div className="fakeUserPic" style={{ height: '75px', width: '75px', borderRadius: '50%', background: '#DDDDDD'}}/>
            {this.props.children}
          </span>
        </div>
      );
    }
  });
  
  const UsersField = createClass({
    propTypes: {
      hint: PropTypes.string,
      label: PropTypes.string,
    },
    getInitialState () {
      return {};
    },
    setValue (value) {
      this.setState({ value });
    },
    render () {
      var placeholder = <span>&#9786; Select User</span>;
  
      return (
        <div className="section">
          <Select
            arrowRenderer={arrowRenderer}
            onChange={this.setValue}
            optionComponent={AvatarOption}
            options={USERS}
            placeholder={placeholder}
            value={this.state.value}
            valueComponent={AvatarValue}            
            autosize 
            />
        </div>
      );
    }
  });
  
  function arrowRenderer () {
    return (
      <span>+</span>
    );
  }
  
  module.exports = UsersField;