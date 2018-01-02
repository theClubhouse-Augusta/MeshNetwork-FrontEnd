/**
*
* DateTimeSelect
*
*/
import React from 'react';
import DatePicker from '../DatePicker'; 
import TimePicker from '../TimePicker'; 
import PropTypes from 'prop-types';

import './style.css';
import './styleM.css';

const DateTimeSelect = props =>
  <div className= {props.multiday ? "dateTimeContainerMultiday" : "dateTimeContainer"}> 
    <DatePicker 
      label={props.dateLabel}
      index={typeof props.index === 'number' ? props.index : false} 
      selector={!props.multiday ? props.selectDate : props.selectDateMulti} 
      multiday={props.multiday} 
    />   
    <TimePicker 
      label={props.startTimeLabel} 
      index={typeof props.index === 'number' ? props.index : false} 
      selector={!props.multiday ? props.selectStart : props.selectStartMulti} 
    />
    <TimePicker 
      label={props.endTimeLabel} 
      index={typeof props.index === 'number' ? props.index : false} 
      selector={!props.multiday ? props.selectEnd : props.selectEndMulti} 
    />
  </div>
  
export default DateTimeSelect;

DateTimeSelect.propTypes = {
  dateLabel: PropTypes.string.isRequired,
  startTimeLabel: PropTypes.string.isRequired,
  endTimeLabel: PropTypes.string.isRequired,
  multiday: PropTypes.bool.isRequired,
  selectDate: PropTypes.func,
  selectDateMulti: PropTypes.func,
  index: PropTypes.number
};