import React from 'react';
import PropTypes from 'prop-types';

export const Skills = (props) => {
  const tags = props.skills.map((skill, index) => <li key={`${skill.name}${index}`} className="profileTag"> {skill.name} </li> );

  return ( 
    <ul className="profileTagCloud">
      {tags}
    </ul>
  );
}

Skills.propTypes = {
  skills: PropTypes.array.isRequired,
};

export const Events = (props) => {
  const events = props.events.map((event, index) => (
    <li 
      onClick={() => {props.history.push(`/EventDetail/${event.id}`)}}
      key={`${event.title}${index}`} 
      className="EventTag"
    >
      {event.title}
    </li>
  ));
  return ( 
    <ul className="profileTagCloud">
      {events}
    </ul>
  );
};

Events.propTypes = {
  events: PropTypes.array.isRequired,
};

export const Attending = (props) => {
  const attendingEvent = props.attending.map((attend, index) => (
    <li 
      onClick={() => {props.history.push(`/EventDetail/${attend.id}`)}}
      key={`${attend.title}${index}`} 
      className="profileAttendingItem"
    >
      {attend.title}
    </li>
  ))
  return ( 
    <ul className="profileAttendingContent">
      {attendingEvent}
    </ul>
  );
};

Attending.propTypes = {
  attending: PropTypes.array.isRequired,
};
