/**
*
* MtextField
*
*/
import React from 'react';

import './style.css';
import './styleM.css';

const MtextField = props => 
  <input 
    className={
      !!props.error ? 'MeshTextFieldError' : !!props.className ? props.className : 'MeshTextField'
    } 
    id={!!props.id ? props.id : ''}
    name={!!props.name ? props.name : ""}
    onChange={props.onChange} 
    onBlur={props.onBlur} 
    type={!!props.type ? props.type : 'text' }
    accept={!!props.accept ? props.accept : ""}
    // autoComplete={!!props.autoComplete ? props.autoComplete : "on"}
    value={!!props.value ? props.value : ''}
  />

export default MtextField;
