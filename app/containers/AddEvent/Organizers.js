import React from 'react';

export const Organizers = props => 
  <div className={props.showOrganizers ? "addEventOrganizersContainer" : "addEventOrganizersContainerHide"}>
    <ul>
      {props.organizers.map(organizer => 
        <li className="addEventOrganizerCard" onClick={() => {props.selectOrganizer(organizer)}} key={`li${organizer.id}`}>
          <img alt="" className="fakeUserPic" src={organizer.avatar} />
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
