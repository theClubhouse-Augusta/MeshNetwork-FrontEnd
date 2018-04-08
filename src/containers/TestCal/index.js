import React from 'react'
import moment from 'moment';
import BigCalendar from 'react-big-calendar'
import events from './events'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

let TestCal = () => (
  <BigCalendar
    events={events}
    views={allViews}
    step={60}
    showMultiDayTimes
    defaultDate={new Date()}
  />
)

export default TestCal;
