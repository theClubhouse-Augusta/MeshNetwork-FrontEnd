  /**
   * Checks for duplicate date form input
   * @param {Array.<{day:string, index:number }>} previousDateSelections 
   * @param {{day:string, index:number}} currentDateSelection 
   */
export const removeDuplicateDate = (previousDateSelections, currentDateSelection) => { 
    for (let i = 0; i < previousDateSelections.length; i++) {
      if (previousDateSelections[i].index === currentDateSelection.index) {
        return i;
      }
    }
    return false;
  };

  /**
   * Retruns true if user inputs impossible day
   * @param {Array.<{day:string, index:number }>} dates 
   */
  export const dateErrors = dates => { 
    if (dates.length > 1) {
      for (let i=0; i < (dates.length); i++) {
        let day = dates.findIndex(date => date.index === i);
        let day2 = dates.findIndex(date => date.index === (i + 1));
        if (day !== -1 && day2 !== -1) {
          const previousDay = new Date(dates[day].day);
          const nextDay = new Date(dates[day2].day);
          if (previousDay.valueOf() > nextDay.valueOf() || previousDay.valueOf() === nextDay.valueOf()) {
            return true;
          } 
        }
      }
      return false;
    }
  };

  /**
   * Checks for duplicate time form input
   * @param {Array.<{start:string, index:number }>} startTimes 
   * @param {{start:string, index:number}} end 
   */
  export const removeDuplicateStart = (startTimes, start) => {
    for (let i = 0; i < startTimes.length; i++) {
      if (startTimes[i].index === start.index) {
        return i;
      }
    }
    return false;
  };

  /**
   * Checks to see if the currently selected end time needs
   * to replace a previous one 
   * @param {Array.<{end:string, index: number}>} endTimes 
   * @param {{end:string, index:number}} end 
   */
  export const removeDuplicateEnd = (endTimes, end) => {
    for (let i = 0; i < endTimes.length; i++) {
      if (endTimes[i].index === end.index) {
        return i;
      }
    }
    return false;
  };

  /**
   * Checks if user inputs impossible date/time
   * @param {Array.<{start:string, index:number }>} startTimes 
   * @param {Array.<{end:string, index:number}>} endTimes 
   * @param {Array.<{day:string, index:number}>} dates 
   */
export const multiDayTimeErrors = (startTimes, endTimes, dates) => {
    const length = startTimes.length;
    if (endTimes.length === length && dates.length === length) {
      for (let i=0; i < length; i++) {
        let start = startTimes.findIndex(time => (time.index === i));
        let end = endTimes.findIndex(time => (time.index === i));
        let date = dates.findIndex(date => (date.index === i));

        if (start !== -1 && end !== -1 && date !== -1) {
          const startTimeFormatString = dates[date].day + '-' + startTimes[start].start;
          const endTimeFormatString = dates[date].day + '-' + endTimes[end].end;
          const startDate = convertToUnixTimeStamp(startTimeFormatString);
          const endDate = convertToUnixTimeStamp(endTimeFormatString);
          
          if (startDate > endDate || startDate === endDate) {
            return true;
          }
        } 
      }
    }
    return false;
  };

  /**
   * Checks if user inputs impossible date/time
   * @param {string} startTime 
   * @param {string} endTime 
   * @param {string} day 
   */
  export const timeError = (startTime, endTime, day) => {
    const startTimeFormatString = day + '-' + startTime;
    const endTimeFormatString = day + '-' + endTime;
    const startDate = convertToUnixTimeStamp(startTimeFormatString);
    const endDate = convertToUnixTimeStamp(endTimeFormatString);
          
    if (startDate > endDate || startDate === endDate) {
      return true;
    }
    return false;
  };

  /**
   * Converts formatted string to unix time stamp
   * @param {string} time 
   */
const convertToUnixTimeStamp = (time) => {
    const formatTime = time.split('-');
    const hourMinute = formatTime[3].split(':');
    formatTime[3] = hourMinute[0];
    formatTime[4] = hourMinute[1];
    const date = new Date(formatTime[0], formatTime[1], formatTime[2], formatTime[3], formatTime[4])
    return date.valueOf();
  }