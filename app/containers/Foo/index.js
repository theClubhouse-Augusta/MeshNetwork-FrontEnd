import React, { PureComponent } from 'react';
import DateRangePickerWithGaps from './DateRangePickerWithGaps';
import moment from 'moment';


export default class Foo extends PureComponent {
  state = {
    days: [
      {
        day: moment(),
        // day: null,
        ordinalPosition: 0,
      },
      {
        day: moment().add(1, 'd'),
        // day: null,
        ordinalPosition: 1,
      },
      {
        day: moment().add(2, 'd'),
        // day: null,
        ordinalPosition: 2,
      }
    ],
  };

  handleDays = (setDay, positionOfDayPicker, isOrdinal, repeatsAllowed) => {
    const { days } = this.state;
    if (setDay === null) {
      days.forEach((day, index) => {
        if (day.ordinalPosition === index) day.day = null;
        this.setState(() => ({ days }));
      })
      return true;
    }
    if (!isOrdinal && repeatsAllowed) {
      days.forEach((day, index) => {
        if (day.ordinalPosition === index) day.day = setDay; 
        this.setState(() => ({ days }));
      })
      return true;
    }
    let validDateBefore = true;
    let validDateSame = true;
    let validDateAfter = true;


    let previouslySetDay = null;
    days.forEach(day => {
      if (!!day.day && day.ordinalPosition < positionOfDayPicker) {
        if (day.day.isAfter(setDay) || day.day.isSame(setDay, 'day')) { 
          validDateBefore = false;
          if (previouslySetDay) day.day = previouslySetDay;
        }

      } else if (!!day.day && day.ordinalPosition > positionOfDayPicker) {
        if (day.day.isBefore(setDay) || day.day.isSame(setDay, 'day')) {
          validDateAfter = false;
          if (previouslySetDay) day.day = previouslySetDay;
        } 
      } 
      if (day.ordinalPosition === positionOfDayPicker && validDateBefore && validDateSame && validDateAfter) {
        if (!previouslySetDay) previouslySetDay = day.day;
        day.day = setDay;
      }
    })

    this.setState({ days });
    return validDateBefore && validDateAfter && validDateSame;
  };


  render() {
    let { days } = this.state;
    return (
      <div style={{display: 'flex'}}>
        {days.map((date, index) =>
          <DateRangePickerWithGaps 
            key={JSON.stringify(date)}
            date={date.day ? date.day : null} 
            showClearDate
            numberOfMonths={1}
            position={index}
            days={days}
            handleDays={this.handleDays}
            ordinal={true}
            repeatsAllowed
          />
        )}
      </div>
    );
  }
}