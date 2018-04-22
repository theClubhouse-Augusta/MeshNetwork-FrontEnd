import React from 'react';

export const SelectedSponsors = props =>
  <div style={{ color: 'rgba(0,0,0,0.54)', marginBottom: '32px', }}>
    {props.newSponsor ? 'New Sponsors' : null}
    <ul>
      {props.selectedSponsors.map(sponsor =>
        <li
          className="addEventOrganizerCard foobar"
          key={!props.newSponsor ? `selectedSponsor${sponsor.value}` : `newSponsor${sponsor.name}`}
        >
          <dl id="addEventUserInfo">
            <div>
              <dt>name:</dt>
              <dd> &nbsp;&nbsp;&nbsp;{!!sponsor.label ? sponsor.label : sponsor.name} </dd>
            </div>
            <div>
              <dt>website:</dt>
              <dd> &nbsp;&nbsp;&nbsp;{sponsor.website} </dd>
            </div>
            <span className="addEventRemoveOrg" onClick={() => { props.removeSponsor(sponsor) }}>
              Remove
            </span>
          </dl>
        </li>
      )}
    </ul>
  </div>
