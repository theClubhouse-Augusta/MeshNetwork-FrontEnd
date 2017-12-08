/**
*
* SponsorSelect
*
*/

import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';


import './style.css';
import './styleM.css';

const USERS = [
  {
    name: 'Audora', 
  },
  {
    name: 'Austin', 
  }, 
  {
    name: 'Nadeem'
  }
]


const sponsorOption = createClass({
  propTypes: {
    children: PropTypes.node, 
    className: PropTypes.string, 
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
      <div className="sponsorSelectOption"
      onMouseDown={this.handleMouseDown} 
      onMouseEnter={this.handleMouseEnter}
      onMouseMove={this.handleMouseMove}
      > 
        <div className="tempLogo" style={{height: '75px', width: '75px', borderRadius: "50%", background: '#DDDDDD'}}/>
        
        {this.props.children}
      </div>
    );
  }
});



const sponsorValue = createClass({
  propTypes: {
    children: PropTypes.node, 
    placeholder: PropTypes.string, 
    value: PropTypes.object
  }, 

  render () {
    return (
      <div className="sponsorValue">
        {this.props.children}
      </div>
    ); 
  }
}); 


const SponsorField = createClass ({

  getInitialState () {
   return {
     backspaceRemoves: true, 
     multi: true, 
   }; 
  }, 

  setValue (value) {
    this.setState({ value }); 
  }, 
  
  render () {
    let placeholder = <span> Select Sponsor(s) </span>

    return (
      <div className="sponsorSelectField"> 
        <h3> Sponsors </h3>
        <Select.Creatable
       
          arrowRenderer={arrowRenderer}
          onChange={this.setValue}
          optionComponent={sponsorOption}
          options={USERS}
          placeholder={placeholder}
          value={this.state.value}
          valueComponent={sponsorValue}
        />
      </div>
    ); 
  }
}); 

function arrowRenderer () { 
  return ( 
    <span> + </span>
  ); 
}

module.exports = SponsorField; 