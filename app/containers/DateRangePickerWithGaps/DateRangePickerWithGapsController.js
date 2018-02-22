import React, { PureComponent } from 'react';
import { 
  SingleDatePicker 
} from 'react-dates';

import TimePickers from './TimePickers';
import './style.css';

export default class DateRangePickerWithGapsController extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      date: props.date ? props.date : null,
      dates: props.dates,
      startTimes: props.startTimes,
      startTime: props.startTime,
      endTimes: props.endTimes,
      endTime: props.endTime,
      position: props.position,
      isOrdered: !!props.ordered,
      repeatsAllowed: !!props.ordered ? false : !!props.repeatsAllowed,
    };
  }

  onDateChange = date => {
    let { 
      dates, 
      position, 
      isOrdered,
      repeatsAllowed,
     } = this.state;
    let daysNotSet = 0;
    dates.forEach(date => {
      if (!!!date.day) daysNotSet++;
    })
    // const noDatesSet = daysNotSet === dates.length;
    // const allDatesSet = daysNotSet === 0;
    // if (noDatesSet) {
      const validDate = this.props.handleDates(date, position, isOrdered, repeatsAllowed);
      if (validDate) this.setState(() => ({ date }));
    // } else if (allDatesSet) {
      // const validDate = this.props.handleDates(date, position, isOrdered, repeatsAllowed);
      // if (validDate) this.setState(() => ({ date }));
    // } else {
      // const validDate = this.props.handleDates(date, position, isOrdered, repeatsAllowed);
      // if (validDate) this.setState(() => ({ date }));
    // }
  }

  render() {
    return (
      <div className="singleDpCon">
        <SingleDatePicker
          placeholder={`Day ${this.state.position + 1}`}
          date={this.state.date} // momentPropTypes.momentObj or null
          onDateChange={this.onDateChange} // PropTypes.func.isRequired
          focused={this.state.focused} // PropTypes.bool
          onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
          showClearDate={this.props.showClearDate}
          numberOfMonths={this.props.numberOfMonths}
          showDefaultInputIcon
        />
        <TimePickers 
          position={this.state.position} 
          startTime={this.state.startTime}
          endTime={this.state.endTime}
          handleStartTimes={this.props.handleStartTimes}
          handleEndTimes={this.props.handleEndTimes}
          //startTime
          //endTime
        />
      </div>
    );
  }
}
