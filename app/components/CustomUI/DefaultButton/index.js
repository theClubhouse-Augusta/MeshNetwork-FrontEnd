/**
*
* DefaultButton
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import './style.css';
import './styleM.css';

const DefaultButton = props =>
  <button onClick={(e) => {props.login(e, props.email, props.password)}} className="MeshDefaultButton left"> 
    {props.children}
  </button> 

export default DefaultButton;

DefaultButton.propTypes = {
  login: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  email : PropTypes.string.isRequired,
};