import React, { PureComponent } from 'react';
import DateRangePickerWithGapsController from './DateRangePickerWithGapsController';
// import moment from 'moment';

export default class DateRangePickerWithGaps extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dates: !!props.dates ? props.dates : [],
      times: !!props.times ? props.times : [],
      startTimes: !!props.startTimes ? props.startTimes : [],
      endTimes: !!props.endTimes ? props.endTimes : [],
      // focused: false,
      // date: !!props.date ? props.date : null,
      // dates: props.dates,
      // startTimes: props.startTimes,
      // startTime: props.startTime,
      // endTimes: props.endTimes,
      // endTime: props.endTime,
      // position: props.position,
      isOrdered: !!props.ordered,
      repeatsAllowed: !!props.ordered ? false : !!props.repeatsAllowed,
    };
  }


  componentDidMount() {
    const {
      dates,
      startTimes,
      endTimes
    } = this.state

    if (!dates.length) {
      this.setDatesIfNoneProvidedByProps(this.props.numberOfDates);
    }

    if (!startTimes.length) {
      this.setStartTimesIfNoneProvidedByProps(this.props.numberOfDates);
    }

    if (!endTimes.length) {
      this.setEndTimesIfNoneProvidedByProps(this.props.numberOfDates);
    }
  }

  onDateChange = date => {
    console.log('wtf', this.state.date);
    let { 
      position, 
      isOrdered,
      repeatsAllowed,
    } = this.state;
    const validDate = this.props.handleDates(date, position, isOrdered, repeatsAllowed);
    if (validDate) this.setState(() => ({ date }));
  }

  setDatesIfNoneProvidedByProps = numberOfDates => {
    let count = 0;
    const dates = [];
    while (count < numberOfDates) {
      dates.push({
        day: null,
        position: count
      });
      count++;
    }
    this.setState(() => ({ dates }));
  }

  setStartTimesIfNoneProvidedByProps = numberOfDates => {
    let count = 0;
    const startTimes = [];
    while (count < numberOfDates) {
      startTimes.push({
        start: null,
        position: count
      });
      count++;
    }
    this.setState(() => ({ startTimes }));
  }

  setEndTimesIfNoneProvidedByProps = numberOfDates => {
    let count = 0;
    const endTimes = [];
    while (count < numberOfDates) {
      endTimes.push({
        end: null,
        position: count
      });
      count++;
    }
    this.setState(() => ({ endTimes }));
  }

  handleDates = (newDay, positionOfDayPicker, isOrdered, repeatsAllowed) => {
    const { dates } = this.state;
    if (newDay === null) {
      dates.forEach((date, index) => {
        if (date.position === index) date.day = null;
        this.setState(() => ({ dates }));
      })
      return true;
    }
    if (!isOrdered && repeatsAllowed) {
      dates.forEach((date, index) => {
        if (date.position === index) date.day = newDay; 
        this.setState(() => ({ dates }));
      })
      return true;
    }
    let validDateBefore = true;
    let validDateSame = true;
    let validDateAfter = true;


    let previouslySetDay = null;
    dates.forEach(date => {
      if (!!date.day && date.position < positionOfDayPicker) {
        if (date.day.isAfter(newDay) || date.day.isSame(newDay, 'day')) { 
          validDateBefore = false;
          if (previouslySetDay) date.day = previouslySetDay;
        }

      } else if (!!date.day && date.position > positionOfDayPicker) {
        if (date.day.isBefore(newDay) || date.day.isSame(newDay, 'day')) {
          validDateAfter = false;
          if (previouslySetDay) date.day = previouslySetDay;
        } 
      } 
      if (date.position === positionOfDayPicker && validDateBefore && validDateSame && validDateAfter) {
        if (!previouslySetDay) previouslySetDay = date.day;
        date.day = newDay;
      }
    })

    this.setState({ dates });
    return validDateBefore && validDateAfter && validDateSame;
  };

  handleStartTimes = newStartTime => {
    const { startTimes } = this.state;
    startTimes.forEach((startTime, index) => {
      if (startTime.position === newStartTime.position) {
        startTime.start = newStartTime.start;
      }
    });
    this.setState(() => ({ startTimes }));
  };
  handleEndTimes = newEndTime => {
    const { endTimes } = this.state;
    endTimes.forEach((endTime, index) => {
      if (endTime.position === newEndTime.position) {
        endTime.end = newEndTime.end;
      }
    });
    this.setState(() => ({ endTimes }));
  };


  render() {
    let { 
      dates, 
      startTimes,
      endTimes 
    } = this.state;
    return (
      <div style={{
        display: 'flex', 
        flexDirection: 'column',
        }}>
        {dates.map((date, index) =>
          <DateRangePickerWithGapsController 
            key={JSON.stringify(date)}
            //date={date.day ? date.day : null} 
            date={date.day}
            dates={dates}
            startTimes={startTimes}
            //startTime={startTimes[index].start ? startTimes[index].start : null}
            startTime={startTimes[index].start}
            endTimes={endTimes}
            endTime={endTimes[index].end}
            position={index}
            showClearDate
            numberOfMonths={1}
            handleDates={this.handleDates}
            handleStartTimes={this.handleStartTimes}
            handleEndTimes={this.handleEndTimes}
            ordered={true}
            repeatsAllowed
          />
        )}
      </div>
    );
  }
}