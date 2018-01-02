/**
*
* ProfileSettings
*
*/

import React from 'react';
import Select from 'react-select'; 
import PropTypes from 'prop-types';
import './style.css';
import './styleM.css';

export default class ProfileSettings extends React.PureComponent {
  state = {
    title: '', 
    tags: '',
    workspace: '',
    company: '',
    forHire: '',
    bio: '',
    avatar: '',
    website: '',
  };

  render() {
    return (
      <div className="profileSettingsContainer">

        <div className="profileMainInfo">     

          <div className="profileMainInfoForm"> 
            <div className="profileInformationForm">
              <p className="acctFormItem"> 
                  <label htmlFor="">Name</label>
                  <input type="text" name="" id="event name" />
                </p>
                <p className="acctFormItem">
                  <label htmlFor="">Title</label>
                  <input type="text" />
                </p>
                <p className="acctFormItem">
                  <label htmlFor="">Website</label>
                  <input type="text" />
                </p>
                <p className="acctFormItem">
                  <label> Bio </label>
                  <textarea  style={{minWidth: '300px'}} rows="8" /> 
                </p>
              </div> 

              <div className="profilePictureForm">
                <div className="profilePicturePreview">

                </div>                
                  <label htmlFor="" style={{display: 'block', margin: '0 15%'}}>upload</label>
                  <input type="file" style={{margin: ' 1em 15%'}}/>    
                </div> 
              </div>        
                
          <button className="acctSubmitButton">Submit</button>        
        </div>        

        <div className="profileWorkInfo">
          <h3> Work </h3>
          <div className="profileWorkForm"> 
            <p className="acctFormItem" style={{width: '45%'}}>
              <label htmlFor="">Company</label>
              <input type="text" style={{marginLeft: '1em'}}/>
            </p>

            <p className="acctFormItem" style={{width: '45%'}}>
              <label htmlFor="">Position</label>
              <input type="text" style={{marginLeft: '1em'}}/>
            </p>
          </div>

          <p className="profileWorkAvail">            
            <input type="radio"/>
            <label htmlFor="" style={{marginLeft: '2em'}}>Would you like to indiciate that you're available for hire?</label>
          </p>

          <div style={{ margin: '2em auto', textAlign: 'center' }}> 
            <button className="acctSubmitButton" >Submit</button>      
          </div> 
        </div>

        <div className="profileTagSelection">
        <h3 > Tags </h3> 
          <div className="profileTagWrapper">
           
          </div>         
        </div>

        <div className="profileSocialMedia">
          <h3> Social Media</h3>

          <div className="profileSocialForm">
            <p className="acctFormItem">
              <label htmlFor="">Facebook</label>
              <input type="text" style={{border: '1px solid black'}} />
            </p>

            <p className="acctFormItem">
              <label htmlFor="">Twitter</label>
              <input type="text" style={{border: '1px solid black'}} />
            </p>

            <p className="acctFormItem">
              <label htmlFor="">Instagram</label>
              <input type="text" style={{border: '1px solid black'}} />
            </p>

            <p className="acctFormItem"> 
            <label htmlFor="">LinkedIn</label> 
            <input type="text" style={{border: '1px solid black'}} /> 
            </p>

            <p className="acctFormItem">
              <label htmlFor="">Github</label>
            <input type="text" style={{border: '1px solid black'}} />
            </p>

            <p className="acctFormItem">
              <label htmlFor="">dribble</label>
            <input type="text" style={{border: '1px solid black'}} />
            </p>

            <p className="acctFormItem">
              <label htmlFor="">Behance</label>
            <input type="text" style={{border: '1px solid black'}} />
            </p>

            <p className="acctFormItem">
              <label htmlFor="">Angellist</label>
            <input type="text" style={{border: '1px solid black'}} />
            </p>
          </div>          

          <button className="acctSubmitButton"> Submit</button>  
        </div>

      </div>
    );
  }
}

ProfileSettings.contextTypes = {
  router: PropTypes.object
};
