import React from 'react';

export const Sponsors = props => 
  <div className= {props.sponsors ? "addEventSponsorsContainer" : "addEventOrganizersContainerHide"}>

    <ul>
      {props.sponsors.map(sponsor => 
        <li className="addEventOrganizerCard" onClick={() => {props.selectSponsor(sponsor)}} key={`sponsor${sponsor.id}`}>
          <img alt="" className="fakeUserPic" src={sponsor.logo} />
          <dl id="addEventUserInfo">
            <div>  
              <dt>name:</dt>
              <dd>
                &nbsp;&nbsp;&nbsp;{sponsor.name}
              </dd>
            </div>
            <div>  
              <dt>Website:</dt>
              <dd>
                &nbsp;&nbsp;&nbsp;{sponsor.website}
              </dd>
            </div>
          </dl>
        </li>
      )}
    </ul>
  </div>
