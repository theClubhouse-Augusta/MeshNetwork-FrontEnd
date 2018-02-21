import React, { PureComponent } from 'react';
import { 
  SingleDatePicker 
} from 'react-dates';
// import moment from 'moment';

import './style.css';

export default class DateRangePickerWithGaps extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      date: props.date ? props.date : null,
      days: props.days,
      position: props.position,
      isOrdinal: !!props.ordinal,
      repeatsAllowed: !!props.ordinal ? false : !!props.repeatsAllowed
    };
  }

  onDateChange = date => {
    let { 
      days, 
      position, 
      isOrdinal,
      repeatsAllowed
     } = this.state;
    let daysNotSet = 0;
    days.forEach(day => {
      if (!!!day.day) daysNotSet++;
    })
    const noDatesSet = daysNotSet === days.length;
    const allDatesSet = daysNotSet === 0;
    if (noDatesSet) {
      const validDate = this.props.handleDays(date, position, isOrdinal, repeatsAllowed);
      if (validDate) this.setState(() => ({ date }));
    } else if (allDatesSet) {
      const validDate = this.props.handleDays(date, position, isOrdinal, repeatsAllowed);
      if (validDate) this.setState(() => ({ date }));
    } else {
      const validDate = this.props.handleDays(date, position, isOrdinal, repeatsAllowed);
      if (validDate) this.setState(() => ({ date }));
    }
  }

  render() {
    return (
      <div className="fooContainer">
        <SingleDatePicker
          date={this.state.date} // momentPropTypes.momentObj or null
          onDateChange={this.onDateChange} // PropTypes.func.isRequired
          focused={this.state.focused} // PropTypes.bool
          onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
          showClearDate={this.props.showClearDate}
          numberOfMonths={this.props.numberOfMonths}
        />
          <label>start time</label>
          <input type="time" />

          <label>end time</label>
          <input type="time" />
      </div>
    );
  }
}
