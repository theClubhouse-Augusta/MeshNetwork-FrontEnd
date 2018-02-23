import React, { Component } from 'react';
import { 
  SingleDatePicker 
} from 'react-dates';

import TimePickers from './TimePickers';
import './style.css';

export default class DateRangePickerWithGapsController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      date: !!props.date ? props.date : null,
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

  // componentWillUpdate(nextProps) {
  //   if (nextProps.date === false) {

  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {

    // if (this.props.validDate === false) { 
      // this.setState(() => ({ date: prevState.date }));
    // }
  // }

  onDateChange = date => {
    console.log('wtf')
    let { 
      position, 
      isOrdered,
      repeatsAllowed,
      dates
    } = this.state;
    const validDate = this.props.handleDates(date, dates[position].day, position, isOrdered, repeatsAllowed);
    if (validDate) this.setState({ date: date }, () => {
      console.log('bar');
    });
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
          clearEndTimes={this.props.clearEndTimes}
          clearStartTimes={this.props.clearStartTimes}
          date={this.state.date}
          //startTime
          //endTime
        />
      </div>
    );
  }
}
