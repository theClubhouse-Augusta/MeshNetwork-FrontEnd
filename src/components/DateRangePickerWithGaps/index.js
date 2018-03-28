import React, { Component } from 'react';
import DateRangePickerWithGapsController from './DateRangePickerWithGapsController';
import moment from 'moment';
import Snackbar from 'material-ui/Snackbar';

export default class DateRangePickerWithGaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: !!props.dates ? props.dates : [],
      isOrdered: !!props.ordered,
      repeatsAllowed: !!props.ordered ? false : !!props.repeatsAllowed,
      snackMsg: "",
      snack: false,
    };
  }
  convertToMinutes = 60;

  componentDidMount() {
    const { dates } = this.state
    if (!dates.length) {
      this.setDatesIfNoneProvidedByProps(this.props.numberOfDates);
    }
  }

  setDatesIfNoneProvidedByProps = numberOfDates => {

    let count = 0;
    const dates = [];
    while (count < numberOfDates) {
      dates.push({
        day: null,
        start: '',
        end: '',
      });
      count++;
    }
    this.setState({ dates }, () => {
      this.props.handleDate(dates)
    });
  };


  handleDates = (newDay, positionOfDayPicker, isOrdered, repeatsAllowed) => {

    let dates = this.state.dates.slice();

    let validDateAfter = true;
    let validDateBefore = true;
    let validDateSame = true;

    if (newDay === null) {
      dates[positionOfDayPicker].day = null;
      this.setState({ dates }, () => {
        this.props.handleDate(dates);
      });
      return true;
    }
    if (!isOrdered && repeatsAllowed) {
      dates[positionOfDayPicker].day = null;
      this.setState({ dates }, () => {
        this.props.handleDate(dates);
      });
      return true;
    }

    if (dates.length === 1) {
      dates[0].day = newDay;
      this.setState({ dates }, () => {
        this.props.handleDate(dates);
      });
      return true;
    }

    let previouslySetDay = null;
    dates.forEach((date, index) => {
      if (!!date.day && index < positionOfDayPicker) {
        if (date.day.isAfter(newDay) || date.day.isSame(newDay, 'day')) {
          validDateBefore = false;
          this.showSnack('1 Invalid date');
          if (previouslySetDay) dates[index - 1].day = previouslySetDay;
        }
      } else if (!!date.day && index > positionOfDayPicker) {
        if (date.day.isBefore(newDay) || date.day.isSame(newDay, 'day')) {
          this.showSnack('2 Invalid date');
          validDateAfter = false;
          if (previouslySetDay) dates[index - 1].day = previouslySetDay;
        }
      }
      if (index === positionOfDayPicker && validDateBefore && validDateSame && validDateAfter) {
        if (!previouslySetDay) {
          previouslySetDay = date.day;
        }
        if (validDateAfter && validDateBefore && validDateSame) {
          date.day = newDay;
          this.setState({ dates }, () => {
            this.props.handleDate(dates);
          });
        }
      }
    });
    return validDateBefore && validDateAfter && validDateSame;
  };

  handleStartTimes = (
    newStartTime,
    currentEndTime,
    date,
    position
  ) => {
    let dates = this.state.dates.slice();
    let validStartTime = true;
    if (date && currentEndTime) {
      validStartTime = moment(`${dates[position].day.format('YYYY-MM-DD')} ${newStartTime}`).isBefore(moment(`${dates[position].day.format('YYYY-MM-DD')} ${currentEndTime}`))
      validStartTime
        ? dates[position].start = newStartTime
        : this.showSnack(' 0 Invalid time');
    } else {
      dates[position].start = newStartTime;
    }
    this.setState({ dates }, () => {
      this.props.handleDate(dates);
    });
    return validStartTime
  };

  handleEndTimes = (newEndTime, currentStartTime, date, position) => {

    let dates = this.state.dates.slice();
    let validEndTime = true;
    if (date && currentStartTime) {
      validEndTime = moment(`${dates[position].day.format('YYYY-MM-DD')} ${newEndTime}`).isAfter(moment(`${dates[position].day.format('YYYY-MM-DD')} ${currentStartTime}`))
      validEndTime
        ? dates[position].end = newEndTime
        : this.showSnack(' 2 invalid time');
    } else {
      dates[position].end = newEndTime;
    }
    this.setState({ dates }, () => {
      this.props.handleDate(dates);
    });
    return validEndTime;
  };

  clearStartTimes = position => {

    let dates = this.state.date.slice();
    dates[position].start = "";
    this.setState({ dates }, () => {
      this.props.handleDate(dates);
    });
  };

  clearEndTimes = position => {
    let dates = this.state.dates.slice();
    dates[position].end = "";
    this.setState({ dates }, () => {
      this.props.handleDate(dates);
    })
  };

  handleRequestClose = () => { this.setState({ snack: false, snackMsg: "" }); };
  showSnack = (msg) => { this.setState({ snack: true, snackMsg: msg }); };

  render() {
    let { dates } = this.state;
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'column', }}>
          {dates.map((date, index) =>
            <DateRangePickerWithGapsController
              key={`date${index}`}
              date={date.day}
              dates={dates}
              startTime={date.start}
              endTime={date.end}
              position={index}
              showClearDate
              numberOfMonths={1}
              handleDates={this.handleDates}
              handleDate={this.props.handleDate}
              handleStartTimes={this.handleStartTimes}
              handleEndTimes={this.handleEndTimes}
              clearEndTimes={this.clearEndTimes}
              clearStartTimes={this.clearStartTimes}
              ordered={true}
            //repeatsAllowed
            // validDate={validDateAfter  && validDateBefore && validDateSame}
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