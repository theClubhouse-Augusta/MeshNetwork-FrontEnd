/**
*
* AccountSettings
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import MtextField from '../../components/CustomUI/MtextField';

import './style.css';
import './styleM.css';

const AccountSettings = props => 
  <div className="acctSettingsContainer">
    <div className="acctPasswordInfo">
      <h3> Change Password</h3>
      <div className="acctChangePasswordForm">
        <p className="acctFormItem">
          <label htmlFor="">Current password</label>
          <MtextField
            onChange={props.currentPassword}
            value={props.CurrentPassword}
            type="password"
          />
        </p>
        <p className="acctFormItem">
          <label htmlFor="">New password</label>
          <MtextField
            onChange={props.password}
            value={props.Password}
            type="password"
          />
        </p>

        <p className="acctFormItem">
          <label htmlFor="confirmPassword" className="userFormLabel">
           confirm password
          </label>
          <MtextField 
            onChange={props.password2} 
            onBlur={props.confirmPassword} 
            error={props.passwordError}
            value={props.Password2}
            type="password" 
            id="confirmPassword" 
          />
         
        </p>
        {/*<p className="acctFormItem">
          <label htmlFor="">Confirm new password</label>
          <input
            onChange={this.password2} 
            onBlur={this.confirmPassword} 
            error={error}
            type="password" 
            id="confirmPassword" 
          />
        </p>*/}
        <div style={{ margin: '2em auto', textAlign: 'center' }}> 
        <button className="acctSubmitButton" >Submit</button>      
      </div> 
      </div>
      
    </div>

    <div className="acctEmailInfo">
      <h3>Change Email</h3>

      <div className="acctChangeEmailForm">
        <p className="acctFormItem">
          <label htmlFor="">New email</label>
          <MtextField
            onChange={props.email}
            value={props.Email}
          />
        </p>
        <p className="acctFormItem">
          <label htmlFor="">Confirm new email</label>
          <MtextField 
            onChange={props.email2} 
            onBlur={props.confirmEmail} 
            error={props.emailError}
            value={props.Email2}
            id="confirmPassword" 
          />
        </p>
        <div style={{ margin: '2em auto', textAlign: 'center' }}> 
        <button className="acctSubmitButton" >Submit</button>      
      </div> 
      </div>
      
    </div>

    <div className="acctDeleteAcct">
      <h3>Delete Account</h3>
      <p style={{margin: '2em 0'}}> some warnings about deleting accounts </p>
      <div style={{ margin: '2em auto', textAlign: 'right' }}> 
        <button>Delete Account</button>      
      </div> 
    </div>
  </div>;

export default AccountSettings;

<<<<<<< HEAD
AccountSettings.contextTypes = {
  router: PropTypes.object
=======
AccountSettings.propTypes = {
  // input functions
  password: PropTypes.func.isRequired,
  password2: PropTypes.func.isRequired,
  email: PropTypes.func.isRequired,
  email2: PropTypes.func.isRequired,
  confirmPassword: PropTypes.func.isRequired,
  confirmEmail: PropTypes.func.isRequired,
  // form values
  Password: PropTypes.string.isRequired,
  Password2: PropTypes.string.isRequired,
  Email: PropTypes.string.isRequired,
  Email2: PropTypes.string.isRequired,
  CurrentPassword: PropTypes.string.isRequired,
  emailError: PropTypes.bool.isRequired,
  passwordError: PropTypes.bool.isRequired
>>>>>>> 8baead33bc128eb35669d4f81e5f2008a2b9a9ce
};
