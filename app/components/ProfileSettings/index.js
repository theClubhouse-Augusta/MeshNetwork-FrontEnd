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

export default class ProfileSettings extends React.Component {
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

    const { 
      avatar,
      name,
      bio,
      website,
      imagePreviewUrl,
      title,
      company,
      toggleHireable,
      hirable,
      selectedTags,
      loadedTags,
      selectTag,
      facebook,
      twitter,
      instagram,
      linkedin,
      github,
      dribble,
      behance,
      angellist
    } = this.props;

    return (
      <div className="profileSettingsContainer">

        <div className="profileMainInfo">     
          <div className="profileMainInfoForm"> 
            <div className="profileInformationForm">
              <p className="acctFormItem"> 
                  <label htmlFor="">Name</label>
                  <input onChange={name} type="text" name="" id="event name" />
                </p>
                <p className="acctFormItem">
                  <label htmlFor="">Title</label>
                  <input type="text" onChange={title} />
                </p>
                <p className="acctFormItem">
                  <label htmlFor="">Website</label>
                  <input type="text" onChange={website} />
                </p>
                <p className="acctFormItem">
                  <label> Bio </label>
                  <textarea  onChange={bio} style={{minWidth: '300px'}} rows="8" /> 
                </p>
              </div> 

              <div className="profilePictureForm">
                  {imagePreviewUrl &&
                  <img 
                  className="profilePicturePreview"
                    //style={{marginLeft: '15%', width: 100, height: 100}}
                    src={imagePreviewUrl} 
                  />}
                <p>
                  <input 
                    id="avatar"
                    name="avatar"
                    className="inputfile"
                    type="file" 
                    style={{margin: ' 1em 15%'}}
                    accept=".png, .jpg, .jpeg"
                    onChange={avatar} 
                  />
                  <label htmlFor="avatar" style={{display: 'block', margin: '0 15%'}}>
                  <MdFileUpload size="40px" />
                   profile picture 
                  </label>
                </p>
              </div> 
            </div>        
                
          <button className="acctSubmitButton">Submit</button>        
        </div>        

        <div className="profileWorkInfo">
          <h3> Work </h3>
          <div className="profileWorkForm"> 
            <p className="acctFormItem" style={{width: '45%'}}>
              <label  htmlFor="">Company</label>
              <input onChange={company} type="text" style={{marginLeft: '1em'}}/>
            </p>

          </div>

          <p className="profileWorkAvail">            
            <input 
              onClick={toggleHireable} 
              onKeyDown={(e) => e.keyCode === 13 ? toggleHireable() : null} 
              type="checkbox"
              id="hireable"
              name="hireable" 
              checked={hirable} 
            />
            <label htmlFor="hireable" style={{marginLeft: '2em'}}>Would you like to indiciate that you're available for hire?</label>
          </p>

          <div style={{ margin: '2em auto', textAlign: 'center' }}> 
            <button className="acctSubmitButton" >Submit</button>      
          </div> 
        </div>

        <div 
        className="profileTagSelection"
        >
        <h3 > Tags </h3> 
          <div 
          // className="profileTagWrapper"
          >
            {!!loadedTags.length && [
            <label key="skillLabel"> Skills and interests </label>,
            <Select.Creatable 
              key="skillSelect" 
              multi={true} 
              options={loadedTags} 
              onChange={selectTag} 
              value={selectedTags} 
            />
            ]}
          </div>         
        </div>

        <div className="profileSocialMedia">
          <h3> Social Media</h3>

          <div className="profileSocialForm">
            <p className="acctFormItem">
              <label htmlFor="">Facebook</label>
              <input onChange={facebook} type="text" style={{border: '1px solid black'}} />
            </p>

            <p className="acctFormItem">
              <label htmlFor="">Twitter</label>
              <input onChange={twitter} type="text" style={{border: '1px solid black'}} />
            </p>

            <p className="acctFormItem">
              <label htmlFor="">Instagram</label>
              <input onChange={instagram} type="text" style={{border: '1px solid black'}} />
            </p>

            <p className="acctFormItem"> 
            <label htmlFor="">LinkedIn</label> 

              <input onChange={linkedin} type="text" style={{border: '1px solid black'}} />
            </p>

            <p className="acctFormItem">
              <label htmlFor="">Github</label>
              <input onChange={github} type="text" style={{border: '1px solid black'}} />
            </p>

            <p className="acctFormItem">
              <label htmlFor="">dribble</label>
              <input onChange={dribble} type="text" style={{border: '1px solid black'}} />
            </p>

            <p className="acctFormItem">
              <label htmlFor="">Behance</label>
              <input onChange={behance} type="text" style={{border: '1px solid black'}} />
            </p>

            <p className="acctFormItem">
              <label htmlFor="">Angellist</label>
              <input onChange={angellist} type="text" style={{border: '1px solid black'}} />
            </p>
          </div>          

          <button className="acctSubmitButton"> Submit</button>  
        </div>
      </div>
    );
  }
}

ProfileSettings.propTypes = {
  name: PropTypes.func.isRequired,
  title: PropTypes.func.isRequired,
  website: PropTypes.func.isRequired,
  bio: PropTypes.func.isRequired,
  avatar: PropTypes.func.isRequired,
  company: PropTypes.func.isRequired,
  toggleHireable: PropTypes.func.isRequired,
  hireable: PropTypes.bool.isRequired,
  imagePreviewUrl: PropTypes.string.isRequired,
  loadedTags: PropTypes.array.isRequired,
  selectTag: PropTypes.func.isRequired,
  selectedTags: PropTypes.array.isRequired,
  facebook: PropTypes.func.isRequired,
  twitter: PropTypes.func.isRequired,
  instagram: PropTypes.func.isRequired,
  linkedin: PropTypes.func.isRequired,
  github: PropTypes.func.isRequired,
  dribble: PropTypes.func.isRequired,
  behance: PropTypes.func.isRequired,
  angellist: PropTypes.func.isRequired,
};
