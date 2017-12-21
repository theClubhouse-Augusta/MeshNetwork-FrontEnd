import React from 'react';
import PropTypes from 'prop-types';

export const SelectedOrganizers = props =>
  <div className="addEventSelectedOrganizersContainer">
    {/*<h3 style={{marginBottom: 12, marginTop: 4}}>Selected Organizers</h3>*/}
    <ul>
      {props.selectedOrganizers.map(organizer => 
        <li className="addEventOrganizerCard" key={`selected${organizer.value}`}>
        
          <img className="fakeUserPic" src={organizer.avatar} />

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