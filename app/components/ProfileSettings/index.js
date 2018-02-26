/**
*
* ProfileSettings
*
*/

import React from 'react';
// import Select from 'react-select'; 
import PropTypes from 'prop-types';

import './style.css';
import './styleM.css';


const ProfileSettings = props => 
  <div className="profileSettingsContainer">
    <div className="profileSettingsMain">
      <div className="profileSettingsMainInfo">

        <div className="profileSettingsMainInfoForm">
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
        </div> 

        <div className="profileSettingsMainAvatarForm">
        </div>

      </div>

      <div className="profileSettingsWorkInfo">
      </div>

      <div className="profileSettingsTagSelection">
      </div>

      <div className="profileSettingsSocialMedia">

      </div>
    </div>
  </div>;

export default ProfileSettings;

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
};
