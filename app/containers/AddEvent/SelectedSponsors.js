import React from 'react';
import PropTypes from 'prop-types';

export const SelectedSponsors = props =>
  <div style={{marginBottom:'60px'}}>
    Selected Sponsors
    <ul>
      {props.selectedSponsors.map(sponsor => 
        <li className="addEventOrganizerCard" key={ !props.newSponsor ? `selectedSponsor${sponsor.value}` : `newSponsor${sponsor.name}`}>  
          <img className="fakeUserPic" src={props.newSponsor ? sponsor.imagePreviewUrl : sponsor.logo} />
          <dl id="addEventUserInfo">
            <div>  
              <dt>name:</dt>
              <dd> &nbsp;&nbsp;&nbsp;{!!sponsor.label ? sponsor.label : sponsor.name} </dd>
            </div>

            <div>  
              <dt>website:</dt>
              <dd> &nbsp;&nbsp;&nbsp;{sponsor.website} </dd>
            </div>

            <span className="addEventRemoveOrg" onClick={() => {props.removeSponsor(sponsor)}}>
              Remove
            </span>
            
          </dl>
        </li>
      )}
    </ul>
  </div>

SelectedSponsors.propTypes = {
  selectedSponsors: PropTypes.array.isRequired,
  removeSponsor: PropTypes.func.isRequired,
  newSponsor: PropTypes.bool.isRequired,
};