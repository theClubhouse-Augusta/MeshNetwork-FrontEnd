import React, { Component } from 'react';
import DateRangePickerWithGapsController from './DateRangePickerWithGapsController';
import moment from 'moment';
import Snackbar from 'material-ui/Snackbar';

export default class DateRangePickerWithGaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: !!props.dates ? props.dates : [],
      times: !!props.times ? props.times : [],
      startTimes: !!props.startTimes ? props.startTimes : [],
      endTimes: !!props.endTimes ? props.endTimes : [],
      isOrdered: !!props.ordered,
      repeatsAllowed: !!props.ordered ? false : !!props.repeatsAllowed,
      snackMsg: "",
      snack: false,
    };
  }

 convertToMinutes = 60;


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
          this.showSnack('Invalid date');
          if (previouslySetDay) date.day = previouslySetDay;
        }

      } else if (!!date.day && date.position > positionOfDayPicker) {
        if (date.day.isBefore(newDay) || date.day.isSame(newDay, 'day')) {

          this.showSnack('Invalid date');
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

  handleStartTimes = (newStartTime, date, position) => {
    const { startTimes, endTimes } = this.state;
    let validStartTime = true;
    startTimes.forEach((startTime, index) => {
      if (startTime.position === position) {
        if (endTimes[index].end && date) {
          validStartTime = moment(`${date} ${newStartTime}`).isBefore(moment(`${date} ${endTimes[index].end}`))
          if (validStartTime) startTime.start = newStartTime;
          else this.showSnack('Invalid time')
        } 
        // else if (endTimes[index].end && !date) {
          // console.log('two');
          // const endMinutes = endTimes[index].end.slice(3);
          // const endHoursToMinutes = endTimes[index].end.slice(0,2) * this.convertToMinutes;
          // const startMinutes = newStartTime.slice(3);
          // const startHoursToMinutes = newStartTime.slice(0,2) * this.convertToMinutes;

          // validStartTime = moment().add((startMinutes + startHoursToMinutes), 'm').isBefore(moment().add((endMinutes + endHoursToMinutes), 'h'));
          // validStartTime = moment(`MM-DD-YYYY ${newStartTime}`).isBefore(moment(`MM-DD-YYYY ${endTimes[index].end}`))
          // if (validStartTime) startTime.start = newStartTime;
        // } 
        else {
          startTime.start = newStartTime;
        }
      }
    });
    this.setState(() => ({ startTimes }));
    return validStartTime
  };

  handleEndTimes = (newEndTime, date, position) => {

    const { endTimes, startTimes } = this.state;
    let validEndTime = true;
    endTimes.forEach((endTime, index) => {
      if (endTime.position === position) {
        if (startTimes[index].start && date) {
          validEndTime = moment(`${date} ${newEndTime}`).isAfter(moment(`${date} ${startTimes[index].start}`))
          if (validEndTime) endTime.end = newEndTime;
          else this.showSnack('invalid time');
        
        } 
        // else if (startTimes[index].start && !date) {

        //   const startMinutes = startTimes[index].start.slice(3);
        //   const startHoursToMinutes = startTimes[index].start.slice(0,2) * this.convertToMinutes;
        //   const endMinutes = newEndTime.slice(3);
        //   const endHoursToMinutes = newEndTime.slice(0,2) * this.convertToMinutes;

        //   validEndTime = moment().add((startMinutes + startHoursToMinutes), 'm').isBefore(moment().add((endMinutes + endHoursToMinutes), 'h'));
        //   if (validEndTime) endTime.end = newEndTime;
        // } 
        else {
          if (date) endTime.end = newEndTime;
        }
      }
    });
    this.setState(() => ({ endTimes }));
    return validEndTime;
  };

    handleRequestClose = () => { this.setState({ snack: false, snackMsg: "" }); };
    showSnack = (msg) => { this.setState({ snack: true, snackMsg: msg }); };
  render() {
    let { 
      dates, 
      startTimes,
      endTimes 
    } = this.state;
    return (
      <div>
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
        <Snackbar
          open={this.state.snack}
          message={this.state.snackMsg}
          autoHideDuration={3000}
          onClose={this.handleRequestClose}
        />
      </div>
    );
  }
}