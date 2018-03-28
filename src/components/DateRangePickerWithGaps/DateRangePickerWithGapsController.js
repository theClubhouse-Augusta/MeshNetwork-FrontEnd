import React, { Component } from 'react';
import { SingleDatePicker } from 'react-dates';

import TimePickers from './TimePickers';
import './style.css';

export default class DateRangePickerWithGapsController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      date: !!props.date ? props.date : null,
      dates: props.dates,
      position: props.position,
      isOrdered: !!props.ordered,
      repeatsAllowed: !!props.ordered ? false : !!props.repeatsAllowed,
    };
  }

  onDateChange = date => {
    let { position, isOrdered, repeatsAllowed, } = this.state;
    const validDate = this.props.handleDates(date, position, isOrdered, repeatsAllowed);
    if (validDate) this.setState(() => ({ date }));
  }

  render() {
    const {
      position,
      date,
      focused,
      dates,
    } = this.state;
    const {
      showClearDate,
      numberOfMonths,
      handleStartTimes,
      handleEndTimes,
      clearEndTimes,
      clearStartTimes
    } = this.props;
    return (
      <div className="singleDpCon" style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
        <SingleDatePicker
          placeholder={`Day ${position + 1}`}
          date={date} // momentPropTypes.momentObj or null
          onDateChange={this.onDateChange} // PropTypes.func.isRequired
          focused={focused} // PropTypes.bool
          onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
          showClearDate={showClearDate}
          numberOfMonths={numberOfMonths}
          showDefaultInputIcon
        />
        <TimePickers 
          position={position} 
          startTime={dates[position].start}
          endTime={dates[position].end}
          handleStartTimes={handleStartTimes}
          handleEndTimes={handleEndTimes}
          clearEndTimes={clearEndTimes}
          clearStartTimes={clearStartTimes}
          date={date}
          //startTime
          //endTime
        />
      </div>
    );
  }
}
