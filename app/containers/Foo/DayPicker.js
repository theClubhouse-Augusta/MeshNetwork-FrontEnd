import React, { PureComponent } from 'react';
import { 
  SingleDatePicker 
} from 'react-dates';
// import moment from 'moment';

export default class DayPicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      date: props.date ? props.date : null,
      days: props.days,
      index: props.index
    };
  }

  onDateChange = date => {
    let { days, index } = this.state;
    let daysNotSet = 0;
    days.forEach(day => {
      if (!!!day.day) daysNotSet++;
    })
    const noDatesSet = daysNotSet === days.length;
    const allDatesSet = daysNotSet === 0;
    if (noDatesSet) {
      const validDate = this.props.handleDays(date, index);
      if (validDate) this.setState(() => ({ date }));
    } else if (allDatesSet) {
      const validDate = this.props.handleDays(date, index);
      if (validDate) this.setState(() => ({ date }));
    } else {
      const validDate = this.props.handleDays(date, index);
      if (validDate) this.setState(() => ({ date }));
    }
  }

  render() {
    return (
      <SingleDatePicker
        date={this.state.date} // momentPropTypes.momentObj or null
        onDateChange={this.onDateChange} // PropTypes.func.isRequired
        focused={this.state.focused} // PropTypes.bool
        onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
        showClearDate={this.props.showClearDate}
        numberOfMonths={this.props.numberOfMonths}
      />
    );
  }
}

  // onDateChange = date => {
  //   if (date === null) {
  //     this.setState({ date });
  //   } else {
  //     const success = this.props.days(date, this.props.index);
  //     if (success) {
  //       this.setState({ date });
  //     } else {
  //       this.setState({ date: null });
  //     }
  //   }
  // }