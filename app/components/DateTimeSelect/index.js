/**
*
* DateTimeSelect
*
*/


import React from 'react';
import DatePicker from 'components/DatePicker'; 
import TimePicker from 'components/TimePicker'; 


import './style.css';
import './styleM.css';

export default class DateTimeSelect extends React.PureComponent {
  render() {
    return (
      <div className="dateTimeContainer"> 
        <DatePicker />   
        <TimePicker />
      </div>
    );
  }
}
