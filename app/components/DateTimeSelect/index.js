/**
*
* DateTimeSelect
*
*/


import React from 'react';
import CalendarTimeWrapper from 'components/CalendarTimeWrapper'; 

import './style.css';
import './styleM.css';

export default class DateTimeSelect extends React.PureComponent {
  render() {
    return (
      <div className="dateTimeContainer"> 
          
        <CalendarTimeWrapper /> 
      </div>
    );
  }
}
