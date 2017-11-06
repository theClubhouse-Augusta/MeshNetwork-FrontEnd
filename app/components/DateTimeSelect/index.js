/**
*
* DateTimeSelect
*
*/


import React from 'react';
import CalendarTimeWrapper from 'components/CalendarTimeWrapper'; 


import './style.css';
import './styleM.css';

/* gonna hold the state for entire container render */ 
export default class DateTimeSelect extends React.PureComponent {
  render() {
    return (
      <div className="dateTimeContainer"> 
          
        <CalendarTimeWrapper /> 
      </div>
    );
  }
}

DateTimeSelect.contextTypes = {
  router: React.PropTypes.object
};
