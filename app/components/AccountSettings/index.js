/**
*
* AccountSettings
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class AccountSettings extends React.PureComponent {
  render() {
    return (
      <div className="acctSettingsContainer">
        <div className="acctPasswordInfo">
          <h3> Change Password</h3>
          <div className="acctChangePasswordForm">
            <p className="acctFormItem">
              <label htmlFor="">Current password</label>
              <input type="text"/>
            </p>
            <p className="acctFormItem">
              <label htmlFor="">New password</label>
              <input type="text"/>
            </p>
            <p className="acctFormItem">
              <label htmlFor="">Confirm new password</label>
              <input type="text"/>
            </p>
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
            <input type="text"/></p>
            <p className="acctFormItem">
              <label htmlFor="">Confirm new email</label>
            <input type="text"/>
            </p>
            <div style={{ margin: '2em auto', textAlign: 'center' }}> 
            <button className="acctSubmitButton" >Submit</button>      
          </div> 
          </div>
          
        </div>

        <div className="acctManageSpaces">
          <h3> Manage Space Affiliation </h3>
          <div className="acctLocationSelect">
            {/*<MultiLocationSelect />*/}
            <div style={{ margin: '2em auto', textAlign: 'center'}} > 
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
      </div>
    );
  }
}

AccountSettings.contextTypes = {
  router: React.PropTypes.object
};
