/**
*
* ProfileSettings
*
*/

import React from 'react';
import Select from 'react-select'; 
import PropTypes, { oneOfType } from 'prop-types';
import MdFileUpload from 'react-icons/lib/md/file-upload';

import './style.css';
import './styleM.css';

const ProfileSettings = props => 
  <div className="profileSettingsContainer">
    <div className="profileMainInfo">     
      <div className="profileMainInfoForm"> 
        <div className="profileInformationForm">
          <p className="acctFormItem"> 
              <label htmlFor="">Name</label>
              <input 
                onChange={props.name} 
                value={props.Name}
                type="text" 
                name="" 
                id="event name" 
              />
            </p>
            <p className="acctFormItem">
              <label htmlFor="">Title</label>
              <input 
                type="text" 
                onChange={props.title} 
                value={props.Title} 
              />
            </p>
            <p className="acctFormItem">
              <label htmlFor="">Website</label>
              <input 
                type="url" 
                onChange={props.website} 
                value={props.Website}
              />
            </p>
            {/*<p className="acctFormItem">
              <label> Bio </label>
              <textarea  
                onChange={bio} 
                value={Bio}
                style={{minWidth: '300px'}} 
                rows="8" 
              /> 
            </p>*/}
          </div> 

          <div className="profilePictureForm">

            {!props.imagePreviewUrl && <div className="profilePicturePreview" />}
            {props.imagePreviewUrl && <img className="profilePicturePreview" src={props.imagePreviewUrl} />}

            <p>
              <input 
                id="avatar"
                name="avatar"
                className="inputfile"
                type="file" 
                style={{margin: ' 1em 15%'}}
                accept=".png, .jpg, .jpeg"
                onChange={props.avatar} 
              />
              <label htmlFor="avatar" style={{display: 'block', margin: '0 15%'}}>
                <MdFileUpload size="40px" />
                profile picture 
              </label>
            </p>
          </div> 
        </div>        
            
      <button onClick={props.onUserInfoSubmit} className="acctSubmitButton">Submit</button>        
    </div>        

    <div className="profileWorkInfo">
      <h3> Work </h3>
      <div className="profileWorkForm"> 
        <p className="acctFormItem" style={{width: '45%'}}>
          <label  htmlFor="">Company</label>
          <input 
            onChange={props.company} 
            value={props.Company}
            type="text" 
            style={{marginLeft: '1em'}}
          />
        </p>

      </div>

      <p className="profileWorkAvail">            
        <input 
          onChange={props.toggleHireable} 
          onKeyDown={(e) => e.keyCode === 13 ? props.toggleHireable() : null} 
          type="checkbox"
          id="hireable"
          name="hireable" 
          checked={props.hireable} 
        />
        <label htmlFor="hireable" style={{marginLeft: '2em'}}>Would you like to indiciate that you're available for hire?</label>
      </p>

      <div style={{ margin: '2em auto', textAlign: 'center' }}> 
        <button onClick={props.onWorkInfoSubmit} className="acctSubmitButton" >Submit</button>      
      </div> 
    </div>

    <div className="profileTagSelection">
      <h3 > Tags </h3> 
      <div className="profileTagWrapper">
        {!!props.loadedTags.length && [
        <label key="skillLabel"> Skills and interests </label>,
        <Select.Creatable 
          key="skillSelect" 
          multi 
          options={props.loadedTags} 
          onChange={props.selectTag} 
          value={props.selectedTags} 
        />
        ]}
      </div>         
      <button onClick={props.onTagsSubmit} className="acctSubmitButton" >Submit</button>      
    </div>

    <div className="profileSocialMedia">
      <h3> Social Media</h3>

      <div className="profileSocialForm">
        <p className="acctFormItem">
          <label htmlFor="">Facebook</label>
          <input 
            onChange={props.facebook}
            value={props.Facebook} 
            type="text" 
            style={{border: '1px solid black'}} 
          />
        </p>

        <p className="acctFormItem">
          <label htmlFor="">Twitter</label>
          <input 
            onChange={props.twitter}
            value={props.Twitter} 
            type="text"
              style={{border: '1px solid black'}} 
          />
        </p>

        <p className="acctFormItem">
          <label htmlFor="">Instagram</label>
          <input 
            onChange={props.instagram}
            value={props.Instagram} 
            type="text" 
            style={{border: '1px solid black'}} 
          />
        </p>

        <p className="acctFormItem"> 
        <label htmlFor="">LinkedIn</label> 

          <input 
            onChange={props.linkedin}
            value={props.Linkedin} 
            type="text" 
            style={{border: '1px solid black'}}
            />
        </p>

        <p className="acctFormItem">
          <label htmlFor="">Github</label>
          <input 
            onChange={props.github}
            value={props.Github}
            type="text" 
            style={{border: '1px solid black'}}
          />
        </p>

        <p className="acctFormItem">
          <label htmlFor="">dribble</label>
          <input 
            onChange={props.dribble} 
            value={props.Dribble}
            type="text" 
            style={{border: '1px solid black'}} 
          />
        </p>

        <p className="acctFormItem">
          <label htmlFor="">Behance</label>
          <input 
            onChange={props.behance} 
            type="text" 
            value={props.Behance}
            style={{border: '1px solid black'}} 
          />
        </p>

        <p className="acctFormItem">
          <label htmlFor="">Angellist</label>
          <input
            onChange={props.angellist} 
            type="text"
            style={{border: '1px solid black'}} 
            value={props.Angellist}
          />
        </p>
      </div>          

      <button className="acctSubmitButton"> Submit</button>  
    </div>
  </div>;

export default ProfileSettings;

<<<<<<< HEAD
ProfileSettings.contextTypes = {
  router: PropTypes.object
=======
ProfileSettings.propTypes = {
  // userInfo functions
  name: PropTypes.func.isRequired,
  title: PropTypes.func.isRequired,
  website: PropTypes.func.isRequired,
  avatar: PropTypes.func.isRequired,
  imagePreviewUrl: PropTypes.string.isRequired,
  onUserInfoSubmit: PropTypes.func.isRequired,
  // userInfo form values
  Name: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
  Website: PropTypes.string.isRequired,
  // workInfo
  company: PropTypes.func.isRequired,
  toggleHireable: PropTypes.func.isRequired,
  onWorkInfoSubmit: PropTypes.func.isRequired,
  // workInfo form values
  hireable: PropTypes.bool.isRequired,
  Company: PropTypes.string.isRequired,
  // tagForm
  onTagsSubmit: PropTypes.func.isRequired,
  loadedTags: PropTypes.array.isRequired,
  selectTag: PropTypes.func.isRequired,
  selectedTags: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired,
  ]),
  //  bio: PropTypes.func.isRequired,
  facebook: PropTypes.func.isRequired,
  twitter: PropTypes.func.isRequired,
  instagram: PropTypes.func.isRequired,
  linkedin: PropTypes.func.isRequired,
  github: PropTypes.func.isRequired,
  dribble: PropTypes.func.isRequired,
  behance: PropTypes.func.isRequired,
  angellist: PropTypes.func.isRequired,
  // form values
  // Bio: PropTypes.string.isRequired,
  Facebook: PropTypes.string.isRequired,
  Twitter: PropTypes.string.isRequired,
  Instagram: PropTypes.string.isRequired,
  Linkedin: PropTypes.string.isRequired,
  Github: PropTypes.string.isRequired,
  Dribble: PropTypes.string.isRequired,
  Behance: PropTypes.string.isRequired,
  Angellist: PropTypes.string.isRequired,
>>>>>>> 8baead33bc128eb35669d4f81e5f2008a2b9a9ce
};
