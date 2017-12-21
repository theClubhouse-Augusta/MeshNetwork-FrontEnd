import React from 'react';
import PropTypes from 'prop-types';

import RaisedButton from "./RaisedButton";

export const NewSponsorForm = props =>
  <form onSubmit={props.onFormSubmit}>
    <div style={{ display:'flex', flexDirection: 'column',}}>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label  style={{marginTop:16, fontWeight: 'bold'}} htmlFor="name">name</label>
        <input type="text" id="name" name="name" style={{width: '100%', marginTop: 10, height: '35px', border: '1px solid black'}} />
      </div>

      <div style={{display: 'flex', flexDirection: 'column'}}>
        <label  style={{marginTop:16, fontWeight: 'bold'}}  htmlFor="website">website</label>
        <input type="url" id="website" name="url" style={{width: '100%', marginTop: 10, height: '35px' , border: '1px solid black'}} />
      </div>

      <div style={{display: 'flex', flexDirection: 'column'}}>
        <label  style={{marginTop:16, fontWeight: 'bold'}} htmlFor="logo">logo</label>
        <input 
          name="logo" 
          type="file" 
          accept="image/png, image/jpg, image/jpeg" 
          id="logo" 
          style={{marginBottom: 16, width: '100%', marginTop: 10, height: '35px', border: '1px solid black'}} 
        />
      </div>
      
      <button><RaisedButton /></button>
    </div>
  </form>

NewSponsorForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
