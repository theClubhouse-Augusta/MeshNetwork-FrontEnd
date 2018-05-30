import React, { Component } from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';
import { EditEventModal } from '../../components/Modal';
import moment from 'moment';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';

export default class BigCal extends Component {
  state = {
    openModal: false,
    modal: null,
    events: [
      {
        title: 'All Day Event',
        start: '2017-05-01',
        end: '2017-05-01'
      },
      {
        title: 'Long Event',
        start: '2017-05-07',
        end: '2017-05-10'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2017-05-09T16:00:00'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2017-05-16T16:00:00'
      },
      {
        title: 'Conference',
        start: '2017-05-11',
        end: '2017-05-13'
      },
      {
        title: 'Meeting',
        start: '2017-05-12T10:30:00',
        end: '2017-05-12T12:30:00'
      },
      {
        title: 'Birthday Party',
        start: '2017-05-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2017-05-28'
      }
    ],
  };
  handleClose = () => {
    this.setState({
      open: false,
      openModal: false,
      modal: null,
    });
  };
  renderModal = event => {
    this.setState({
      modal:
        <EditEventModal
          open={true}
          event={event}
          handleClose={this.handleClose}
          updateEvent={this.updateEvent}
        />,
    })
  };
  handleAddEvent = events => {
    console.log('e', events);
    // this.setState({ events }, () => {
    // alert('great, now update your database')
    // });
  }
  updateEvent = event => {
    if (this.state.modal) {
      let eventSources = event.source.events;
      let events = [...this.state.events];
      this.state.events.forEach((e, index) => {
        if (eventSources[index]._id === event._id) {
          if (e.title && e.start && e.end) {
            if (events[index].title === "foobar") {
              events[index].title = "baz";
              e.start = '2017-05-03 03:30:00';
              e.end = '2017-05-03 06:30:00';
            } else {
              events[index].title = "foobar";
              e.start = '2017-05-01 03:30:00';
              e.end = '2017-05-01 06:30:00';
            }
            this.setState(() => ({ events }));
          }
        }
      });
    }
  };
  promptButton = () => {
    const events = [...this.state.events];
    const index = events.length;
    const handleAddEvent = this.handleAddEvent;
    var dateStr = prompt('Enter a date in YYYY-MM-DD format');
    var date = moment(dateStr);
    if (date.isValid()) {
      events[index] = {
        title: 'dynamic event',
        start: date,
        allDay: true
      };
      handleAddEvent(events);
    } else {
      alert('Invalid date.');
    }
  };

  addButton = () => {
    // const events = [...this.state.events];
    const handleAddEvent = this.handleAddEvent;
    // const updateEvent = this.updateEvent;
    // const renderModal = this.renderModal;
    return ({
      text: 'book resource',
      click: () => handleAddEvent(),
    });
  };
  render() {
    const { modal } = this.state;
    return (
      <div>
        <FullCalendar
          id="your-custom-ID"
          defaultView="agendaWeek"
          header={{
            left: 'prev,next today myCustomButton',
            center: 'addEventButton',
            right: 'month,listDay,listWeek'
            //  right: 'month,basicWeek,basicDay,listDay'
          }}
          businessHours={{
            dow: [1, 2, 3],
            start: '10:00',
            end: '18:00',
          }}
          defaultDate={'2017-05-01'}
          navLinks={true} // can click day/week names to navigate views
          editable={true}
          eventLimit={true} // allow "more" link when too many events
          events={this.state.events}
          eventClick={(event, element) => {
            this.renderModal(event);
          }}
          addEventSource={() => ({
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2017-05-29'
          })}
          customButtons={{
            addEventButton: this.eventClick(),
          }}
        />
        {modal}
      </div>
    );
  }
}