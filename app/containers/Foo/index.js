import React, { PureComponent } from 'react';
import DayPicker from './DayPicker';
import moment from 'moment';

export default class Foo extends PureComponent {
  state = {
    days: [
      {
        // day: moment(),
        day: null,
        index: 0,
      },
      {
        // day: moment().add(1, 'd'),
        day: null,
        index: 1,
      },
      {
        // day: moment().add(2, 'd'),
        day: null,
        index: 2
      }
    ],
  };

  handleDays = (setDay, index) => {
    const { days } = this.state;
    let validDateBefore = true;
    let validDateSame = true;
    let validDateAfter = true;
    if (setDay === null) {
      this.setState(() => ({ days }));
      return true;
    }

    let previouslySetDay = null;
    days.forEach(day => {
      if (!!day.day && day.index < index) {
        if (day.day.isAfter(setDay)) {
          validDateBefore = false;
          if (previouslySetDay) day.day = previouslySetDay;
        }
        if (day.day.isSame(setDay, 'day')) { 
          validDateBefore = false;
          if (previouslySetDay) day.day = previouslySetDay;

        }
      } else if (!!day.day && day.index > index) {
        if (day.day.isBefore(setDay)) {
          validDateAfter = false;
          if (previouslySetDay) day.day = previouslySetDay;
        } 
        if (day.day.isSame(setDay, 'day')) {
          validDateAfter = false;
          if (previouslySetDay) day.day = previouslySetDay;
        }

      } 
      // else if (!!day.day && day.index === index) {
          // console.log('equal');
          // if (moment(day.day.format('YYYY-MM-DD')).isSame(moment(setDay.format('YYYY-MM-DD')), 'day' )) {
            // validDateSame = false;
          // }
      // }
      if (day.index === index && validDateBefore && validDateSame && validDateAfter) {
        if (!previouslySetDay) previouslySetDay = day.day;
        day.day = setDay;
      }
    })
    this.setState({ days });
    console.log(validDateAfter, validDateBefore, validDateSame);
    return validDateBefore && validDateAfter && validDateSame;
  };


  render() {
    let { days } = this.state;
    return (
      <div>
        {days.map((day, index) =>
          <DayPicker 
            key={JSON.stringify(day)}
            date={day.day ? day.day : null} 
            showClearDate
            numberOfMonths={1}
            index={index}
            days={days}
            handleDays={this.handleDays}
          />
        )}
      </div>
    );
  }
}
        // {/* <DateRangePicker
        //   startDate={this.state.startDate} // momentPropTypes.momentObj or null,
        //   startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
        //   endDate={this.state.endDate} // momentPropTypes.momentObj or null,
        //   endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        //   onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
        //   focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        //   onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        //   showClearDates
        //   showDefaultInputIcon
        // /> */}

  // days = (day, index) => {
  //   const { days } = this.state;
  //   days.forEach((dayValue, i) => {
  //     if (index < i) {
  //       if (dayValue.valueOf()) {
  //         if (dayValue.valueOf() >= day.valueOf()) {
  //           this.foo();
  //         }
  //       }
  //     }
  //   }); 
  //   if (this.state.foo) {
  //     days[index] = day.valueOf();
  //     this.setState({ days: days }, () => {
  //       console.log(this.state.days);
  //     });
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

    // const now = moment();

    // const tommorow = moment();
    // tommorow.add(1, 'd');

    // const dayAfterNext = moment();
    // dayAfterNext.add(2, 'd')
    // const dates = [
    // ];