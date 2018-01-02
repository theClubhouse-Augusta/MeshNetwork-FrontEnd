import React from 'react';
import PropTypes from 'prop-types';

export const SelectedOrganizers = props =>
  <div style={{color: 'rgba(0,0,0,0.54)', marginBottom:'32px', }}>
   Organizers
    <ul>
      {props.selectedOrganizers.map(organizer => 
        <li 
          className="addEventOrganizerCard foobar" 
          key={`selected${organizer.value}`}>
        
          <img 
            className="fakeUserPic" 
            style={{
              height: '72px',
              width: '72px'
            }}
            src={organizer.avatar} 
            />

          <dl id="addEventUserInfo">
            <div>  
              <dt>name:</dt>
              <dd> &nbsp;&nbsp;&nbsp;{organizer.name}</dd>
            </div>

            <div>  
              <dt>Email:</dt>
              <dd> &nbsp;&nbsp;&nbsp;{organizer.label}</dd>
            </div>

            <span className="addEventRemoveOrg" onClick={() => {props.removeOrganizer(organizer)}}>
              Remove
            </span>
          </dl>

        </li>
      )}
    </ul>
  </div>

SelectedOrganizers.propTypes = {
  selectedOrganizers: PropTypes.array.isRequired,
  removeOrganizer: PropTypes.func.isRequired,
};