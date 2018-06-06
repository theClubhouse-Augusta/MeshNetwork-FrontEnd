import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import FlatButton from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import authenticate from '../../utils/Authenticate';
import './style.css';
import './styleM.css';

const calevents = [
  {
    title: 'All Day Event',
    start: '2017-05-01'
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
];

export default class Booking extends PureComponent {
  state = {
    token: localStorage.getItem('token'),
    user: '',
    loading: true,
    msg: "",
    spaceProfile: "",
    snack: false,
    name: "",
    email: "",
    resources: [],
    activeType: 0,
    activeTimes: [],
    increment: 60,
    events: [],
    start: "",
    end: "",
    activeDays: "",
    activeResource: "",
    types: ['Private Office', 'Mentor', 'Tour', 'Meeting Room'],
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    times: [
      { time: "08:00", active: 0 },
      { time: "09:00", active: 0 },
      { time: "10:00", active: 0 },
      { time: "11:00", active: 0 },
      { time: "12:00", active: 0 },
      { time: "13:00", active: 0 },
      { time: "14:00", active: 0 },
      { time: "15:00", active: 0 },
      { time: "16:00", active: 0 },
      { time: "17:00", active: 0 },
      { time: "18:00", active: 0 }
    ],
    minTime: '',
    maxTime: '',
    dow: [],
  };
  handleRequestClose = () => {
    this.setState(() => ({
      snack: false,
      msg: ""
    }));
  };
  showSnack = msg => {
    this.setState(() => ({
      snack: true,
      msg,
    }));
  };
  async componentDidMount() {
    let authorized;
    try {
      authorized = await authenticate(localStorage['token']);
    } finally {
      if (authorized !== undefined) {
        const { error, user } = authorized;
        if (user) {
          // if (user.roleID !== 2 && user.roleID !== 5) {
          //   this.props.history.push('/');
          // }
          this.setState(() => ({ user }), () => {
            this.getProfile();
            this.setState({ loading: false });
          })
        } else if (error) {
          localStorage.removeItem('token');
          this.props.history.push('/signin');
        }
      } else {
        this.props.history.push('/');
      }
    }
  };
  handleName = event => {
    this.setState(() => ({ name: event.target.value }));
  };
  handleEmail = event => {
    this.setState(() => ({ email: event.target.value }));
  };
  handleType = activeType => {
    let activeTimes = [];
    let times = [...this.state.times];
    for (let i = 0; i < times.length; i++) {
      times[i].active = 0;
    }
    let events = [...this.state.events];
    if (this.state.start !== "" && this.state.end !== "") {
      events.splice(-1, 1);
    }
    this.setState(() => ({
      activeType,
      activeTimes,
      events,
      start: "",
      end: "",
      acitveDays: [1, 2, 3, 4, 5],
      increment: 60,
      times
    }), () => {
      fetch(`http://localhost:8000/api/bookings/${activeType}`, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(json => {
          let events = json;
          for (let i = 0; i < events.length; i++) {
            events[i].start = new Date(events[i].start);
            events[i].end = new Date(events[i].end);
          }
          this.setState({
            events: json.bookings,
            activeResource: json.resource,
            activeDays: JSON.parse(json.resource.resourceDays),
            increment: json.resource.resourceIncrement
          });
        });
    });
  };
  handleTime = (day, time, j) => {
    let activeTimes = [...this.state.activeTimes];
    let times = [...this.state.times];
    times[j].active = 1;
    let sched = { day: day, time: time };
    activeTimes.push(sched);
    this.setState(() => ({
      activeTimes,
      times
    }));
  };
  removeTime = (day, time, j) => {
    let activeTimes = [...this.state.activeTimes];
    let sched = {
      day: day,
      time: time
    };
    let times = [...this.state.times];
    times[j].active = 0;
    for (let i = 0; i < activeTimes.length; i++) {
      if (activeTimes[i].day === sched.day && activeTimes[i].time === sched.time) {
        activeTimes.splice(i, 1);
      }
    }
    this.setState(() => ({
      activeTimes,
      times
    }))
  };
  getProfile = () => {
    fetch(`http://localhost:8000/api/workspace/${this.state.user.spaceID}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          spaceProfile: json,
        }, () => {
          if (!this.state.token) {
            this.props.history.push('/join/' + this.state.spaceProfile.slug)
          }
          this.getResources(json.id);
        })
      });
  };
  getResources = (id) => {
    fetch('http://localhost:8000/api/resources/' + id, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          resources: json
        })
      })
  };
  storeBooking = () => {
    let data = new FormData();
    data.append('name', this.state.name);
    data.append('email', this.state.email);
    data.append('resourceID', this.state.activeType);
    data.append('start', this.state.start);
    data.append('end', this.state.end);
    data.append('spaceID', this.state.spaceProfile.id);
    fetch("http://localhost:8000/api/booking", {
      method: 'POST',
      body: data,
      headers: { 'Authorization': 'Bearer ' + this.state.token }
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          this.showSnack(json.error);
        }
        else if (json.success) {
          this.showSnack(json.success);
          setTimeout(() => {
            this.props.history.push(`/space/${this.state.spaceProfile.slug}`)
          }, 5000);
        }
      });
  };
  renderTypeButton = (res, i) => {
    if (this.state.activeType === res.id) {
      return (
        <div className="bookingActiveTypeButton" key={`activeButton${i}`} onClick={() => this.handleType(res.id)}>{res.resourceName}</div>
      )
    } else {
      return (
        <div className="bookingTypeButton" key={`bookingButton${i}`} onClick={() => this.handleType(res.id)}>{res.resourceName}</div>
      )
    }
  };
  renderTimes = (day, item, j) => {
    // let activeTimes = this.state.activeTimes;
    // let times = { day: day, time: item.time };
    if (item.active === 0) {
      return (
        <div className="bookingTimeBlock" key={`BookingTimeBlock${j}`}>
          <div className="bookingTimeText">{item.time}</div>
          <div className="bookingTimeButton">
            <FlatButton
              style={{ background: '#ff4d58', color: '#FFFFFF' }}
              onClick={() => this.handleTime(day, item.time, j)}
            >Select</FlatButton>
          </div>
        </div>
      )
    } else {
      return (
        <div className="bookingTimeBlock" key={`bookingTimeBlock2${j}`}>
          <div className="bookingTimeText">{item.time}</div>
          <div className="bookingTimeButton">
            <FlatButton style={{ background: '#ff4d58', color: '#FFFFFF' }} onClick={() => this.removeTime(day, item.time, j)}>Remove</FlatButton>
          </div>
        </div>
      )
    }
  };
  handleNewDate = slotInfo => {
    let start = slotInfo.start.toLocaleString();
    let end = slotInfo.end.toLocaleString();
    let dateObject = {
      title: 'Your Booking',
      start: slotInfo.start,
      end: slotInfo.end
    };
    let events = [...this.state.events];
    let index = events.length;
    if (index === 0) {
      events.push(dateObject);
    } else {
      if (this.state.start === "" && this.state.end === "") {
        events.push(dateObject);
      } else {
        events[index - 1] = dateObject;
      }
    }
    this.setState(() => ({
      events,
      start,
      end
    }))
  };
  bookedSlot = event => {
    this.showSnack('This Slot has already been booked.');
    let events = [...this.state.events];
    let index = events.length;
    if (index !== 0) {
      if (this.state.start !== "" && this.state.end !== "") {
        events.splice(-1, 1);
        let start = "";
        let end = "";
        this.setState(() => ({
          events,
          start,
          end
        }));
      }
    }
  };
  eventStyleGetter = (event, start, end, isSelected) => {
    var backgroundColor = '#ff4d58';
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      border: 'none',
      fontFamily: 'Noto Sans',
      display: 'block'
    };
    return {
      style: style
    };
  };
  testSlot = (start, end, event) => {
    let startTime = start._i;
    let endTime = end._i;
    let diff = Math.abs(new Date(endTime) - new Date(startTime));
    let minutes = Math.floor((diff / 1000) / 60);
    if (minutes > this.state.increment) {
      this.showSnack("This can only be booked for " + this.state.increment + " minutes.");
    } else {
      let dateObject = {
        title: 'Book This Time',
        start: startTime,
        end: endTime
      }
      let events = [...this.state.events];
      let index = events.length;
      if (index === 0) {
        events.push(dateObject);
      } else {
        if (this.state.start === "" && this.state.end === "") {
          events.push(dateObject);
        } else {
          events[index - 1] = dateObject;
        }
      }
      let start = moment(startTime).format();
      let end = moment(endTime).format();
      this.setState(() => ({
        events,
        start,
        end
      }));
    }
  };
  render() {
    const {
      minTime,
      maxTime,
      loading,
      dow,
      resources,
      startTime,
      endTime,
    } = this.state;
    const showCalendar = () => (minTime && maxTime && dow.length && startTime && endTime);
    return (
      loading
        ?
        <Spinner loading={this.state.loading} />
        :
        <div className="bookingContainer">
          <Helmet title="Bookings" meta={[{ name: 'description', content: 'Book a Time Slot' }]} />
          <header style={{ background: '#FFFFFF' }}>
            <Header app={this.state.app} space={this.props.spaceName} />
          </header>
          <main className="bookingMainContainer">
            <div className="bookingInfoContainer">
              <div className="bookingColumnTitle">Your Info</div>
              <TextField label="Your Name" margin='normal' fullWidth={true} onChange={this.handleName} value={this.state.name} />
              <TextField label="E-mail" margin='normal' fullWidth={true} onChange={this.handleEmail} value={this.state.email} />
              {this.state.resources.map((res, i) => (
                this.renderTypeButton(res, i)
              ))}
              <FlatButton
                style={{ width: '100%', background: '#ff4d58', color: '#FFFFFF', marginTop: '15px' }}
                onClick={this.storeBooking}
              >Confirm Booking</FlatButton>
            </div>
            <div style={{ width: '100%', background: '#FFFFFF', padding: '10px' }}>
              {showCalendar() &&
                <FullCalendar
                  id="your-custom-ID"
                  defaultView="agendaWeek"
                  minTime={minTime}
                  maxTime={maxTime}
                  header={{
                    left: 'prev,next today myCustomButton',
                    center: 'title',
                    right: 'month,basicWeek,basicDay'
                  }}
                  businessHours={{
                    dow: dow,
                    start: startTime,
                    end: endTime,
                  }}
                  defaultDate={'2017-05-12'}
                  navLinks={true} // can click day/week names to navigate views
                  editable={true}
                  eventLimit={true} // allow "more" link when too many events
                  events={calevents}
                  eventDragStart={(e, jsEvent, ui, view) => {
                    console.log(`title: ${e.title} start: ${e.start} end:${e.end}`);
                  }}
                />
              }
            </div>
          </main>
          <footer className="homeFooterContainer">
            Copyright © 2018 theClubhou.se  • 540 Telfair Street  •  Tel: (706) 723-5782
                    <Snackbar
              open={this.state.snack}
              message={this.state.msg}
              autoHideDuration={5000}
              onClose={this.handleRequestClose}
            />
          </footer>
        </div>
    );
  }
}
/* <FullCalendar
  id="bookingCal"
  header={{
    left: 'prev,next today',
    center: 'title',
    right: 'agendaWeek'
  }}
  defaultDate={new Date()}
  editable={true}
  selectable={true}
  selectOverlap={false}
  slotDuration={'00:' + this.state.increment + ':00'}
  allDaySlot={false}
  timezone="local"
  select={(start, end, event) => this.testSlot(start, end, event)}
  businessHours={{
    dow: this.state.activeDays,
    start: this.state.activeResource.startTime,
    end: this.state.activeResource.endTime
  }}
  selectConstraint='businessHours'
  eventConstraint="businessHours"
  slotEventOverlap={false}
  weekends={false}
  defaultView='agendaWeek'
  navLinks={true} // can click day/week names to navigate views
  eventLimit={true} // allow "more" link when too many events
  events={this.state.events}
/> */
