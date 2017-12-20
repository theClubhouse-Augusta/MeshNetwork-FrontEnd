import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';

export const Organizers = props => 
  <div className={props.showOrganizers ? "addEventOrganizersContainer" : "addEventOrganizersContainerHide"}>
    <ul>
      {props.organizers.map(organizer => 
        <li className="addEventOrganizerCard" onClick={() => {props.selectOrganizer(organizer)}} key={`li${organizer.id}`}>
          <img className="fakeUserPic" src={organizer.avatar} />
          <dl id="addEventUserInfo">
            <div>  
              <dt>name:</dt>
              <dd>
                &nbsp;&nbsp;&nbsp;{organizer.name}
              </dd>
            </div>
            <div>  
              <dt>Email:</dt>
              <dd>
                &nbsp;&nbsp;&nbsp;{organizer.email}
              </dd>
            </div>
          </dl>
        </li>
      )}
    </ul>
  </div>

Organizers.propTypes = {
  showOrganizers: PropTypes.bool.isRequired,
  selectOrganizer: PropTypes.func.isRequired,
  organizers: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.array.isRequired,
  ]),  
};