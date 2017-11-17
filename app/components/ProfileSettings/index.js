/**
*
* ProfileSettings
*
*/

import React from 'react';
import TagSearch from 'components/TagSearch'; 
import TagSelect from 'components/TagSelect';
import RaisedButton from 'material-ui/RaisedButton';  

import './style.css';
import './styleM.css';

export default class ProfileSettings extends React.PureComponent {
  render() {
    return (
      <div className="profileSettingsContainer">

        <div className="profileMainInfo">     

          <div className="profileMainInfoForm"> 
            <div className="profileInformationForm">
              <p className="profileFormItem"> 
                  <label htmlFor="">Name</label>
                  <input type="text" name="" id="event name" />
                </p>
                <p className="profileFormItem">
                  <label htmlFor="">Email</label>
                  <input type="email" />
                </p>
                <p className="profileFormItem">
                  <label htmlFor="">Title</label>
                  <input type="text" />
                </p>
                <p className="profileFormItem">
                  <label htmlFor="">Website</label>
                  <input type="text" />
                </p>
                <p className="profileFormItem">
                  <label htmlFor="">Home mesh space</label>
                  <select>
                      <option value="">the Clubhou.se</option>
                      <option value=""> Spark Macon </option>
                      <option value=""> MakerVillage</option>
                      <option value=""> FourAthens</option>
                      <option value=""> Columbus Makes IT </option>
                  </select>    
                </p> 
              </div> 

              <div className="profilePictureForm">
                <div className="profilePicturePreview">

                </div>                
                  <label htmlFor="" style={{display: 'block'}}>upload</label>
                  <input type="file" style={{maxWidth: '200px'}}/>    
                </div> 
              </div>        
                
          <RaisedButton className="acctSubmitButton">Submit</RaisedButton>        
        </div>        

        <div className="profileWorkInfo">
          <h3> Work </h3>
          <div className="profileWorkForm"> 
            <p className="profileFormItem" style={{width: '45%'}}>
              <label htmlFor="">Company</label>
              <input type="text"/>
            </p>

            <p className="profileFormItem" style={{width: '45%'}}>
              <label htmlFor="">Position</label>
              <input type="text"/>
            </p>
          </div>

          <p className="profileWorkAvail">            
            <input type="radio"/>
            <label htmlFor="" style={{marginLeft: '2em'}}>Would you like to indiciate that you're available for hire?</label>
          </p>

          <div style={{ margin: '2em auto', textAlign: 'center' }}> 
            <RaisedButton className="acctSubmitButton" >Submit</RaisedButton>      
          </div> 
        </div>

        <div className="profileTagSelection">
        <h3 > Tags </h3> 
          <div className="profileTagWrapper">
            <TagSearch />
            <TagSelect />
          </div>         
        </div>

        <div className="profileSocialMedia">
          <h3> Social Media</h3>

          <div className="profileSocialForm">
            <p className="profileFormItem">
              <label htmlFor="">Facebook</label>
              <input type="text" style={{border: '1px solid black'}} />
            </p>

            <p className="profileFormItem">
              <label htmlFor="">Twitter</label>
              <input type="text" style={{border: '1px solid black'}} />
            </p>

            <p className="profileFormItem">
              <label htmlFor="">Instagram</label>
              <input type="text" style={{border: '1px solid black'}} />
            </p>

            <p className="profileFormItem"> 
            <label htmlFor="">LinkedIn</label> 
            <input type="text" style={{border: '1px solid black'}} /> 
            </p>

            <p className="profileFormItem">
              <label htmlFor="">Github</label>
            <input type="text" style={{border: '1px solid black'}} />
            </p>

            <p className="profileFormItem">
              <label htmlFor="">dribble</label>
            <input type="text" style={{border: '1px solid black'}} />
            </p>

            <p className="profileFormItem">
              <label htmlFor="">Behance</label>
            <input type="text" style={{border: '1px solid black'}} />
            </p>

            <p className="profileFormItem">
              <label htmlFor="">Angellist</label>
            <input type="text" style={{border: '1px solid black'}} />
            </p>
          </div>          

          <RaisedButton className="acctSubmitButton"> Submit</RaisedButton>  
        </div>

      </div>
    );
  }
}

ProfileSettings.contextTypes = {
  router: React.PropTypes.object
};
