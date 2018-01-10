/**
*
* SecurityNotifSettings
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import './style.css';
import './styleM.css';

export default class SecurityNotifSettings extends React.PureComponent {
  render() {
    return (
      <div className="secNotifSettingsContainer">
        
        <div className="acctNotificationSettings">
         <h3>Notification Settings</h3>
         <div className="acctNotificationSettingsForm">
          <p className="acctFormItem">
            <label htmlFor="">placeholder label</label>
            <input type="checkbox" name="" id=""/>
          </p>
          <p className="acctFormItem">
              <label htmlFor=""> placeholder label            </label>
              <input type="checkbox" name="" id=""/>
            </p>
            <p className="acctFormItem">
              <label htmlFor="">placeholder label
              </label>
              <input type="checkbox" name="" id=""/>
            </p>
            <p className="acctFormItem">
              <label htmlFor="">placeholder label
              </label>
              <input type="checkbox" name="" id=""/>
            </p>
         </div>
         <div style={{ margin: '2em auto', textAlign: 'center' }}> 
            <button className="acctSubmitButton" >Submit</button>      
          </div> 
        </div>

        <div className="acctSecuritySettings">
          <h3>Security Settings</h3>
         <div className="acctSecuritySettingsForm">
         
          <p className="acctFormItem">
            <label htmlFor="">placeholder label</label>
            <input type="checkbox" name="" id=""/>
          </p>
          <p className="acctFormItem">
            <label htmlFor="">placeholder label</label>
          <input type="checkbox" name="" id=""/>
          </p>
            <p className="acctFormItem">
              <label htmlFor="">placeholder label</label>
            <input type="checkbox" name="" id=""/>
            </p>
            <p className="acctFormItem">
              <label htmlFor="">placeholder label</label>
              <input type="checkbox" name="" id=""/>
            </p>
            <div style={{ margin: '2em auto', textAlign: 'center' }}> 
            <button className="acctSubmitButton" >Submit</button>      
          </div>
          </div>
           
          </div>

      </div>
    );
  }
}

SecurityNotifSettings.contextTypes = {
  router: PropTypes.object
};
