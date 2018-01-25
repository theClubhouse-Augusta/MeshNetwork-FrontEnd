import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import FlatButton from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import Header from 'components/Header';

import './style.css';
import './styleM.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default class Booking extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            msg: "",
            spaceProfile: "",
            snack: false,
            space: "",
            name: "",
            email: "",
            resources: [],
            activeType: 0,
            activeTimes: [],
            events: [],
            start: "",
            end: "",
            types: ['Private Office', 'Mentor', 'Tour', 'Meeting Room'],
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            times: [{ time: "08:00", active: 0 }, { time: "09:00", active: 0 }, { time: "10:00", active: 0 }, { time: "11:00", active: 0 }, { time: "12:00", active: 0 }, { time: "13:00", active: 0 }, { time: "14:00", active: 0 }, { time: "15:00", active: 0 }, { time: "16:00", active: 0 }, { time: "17:00", active: 0 }, { time: "18:00", active: 0 }],
            app: this.props.app
        }
    }

    handleRequestClose = () => { this.setState({ snack: false, msg: "" }); };
    showSnack = (msg) => { this.setState({ snack: true, msg: msg }); };

    componentWillReceiveProps(app) {
        this.setState({
            app: app.app
        }, function () {
            this.forceUpdate();
        })
    }

    componentWillMount() {
        this.getProfile();
    }

    handleName = (event) => { this.setState({ name: event.target.value }) }
    handleEmail = (event) => { this.setState({ email: event.target.value }) }
    handleType = (type) => {
        let _this = this;
        let activeTimes = [];
        let times = this.state.times;
        for (let i = 0; i < times.length; i++) {
            times[i].active = 0;
        }

        let events = this.state.events;
        if (this.state.start !== "" && this.state.end !== "") {
            events.splice(-1, 1);
        }

        this.setState({
            activeType: type,
            activeTimes: activeTimes,
            events: events,
            start: "",
            end: "",
            times: times
        }, function () {
            fetch('https://innovationmesh.com/api/bookings/' + type, {
                method: 'GET'
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    let events = json;
                    for (let i = 0; i < events.length; i++) {
                        events[i].start = new Date(events[i].start);
                        events[i].end = new Date(events[i].end);
                    }
                    _this.setState({
                        events: events
                    }, function () {
                        _this.forceUpdate();
                        console.log(this.state.events);
                    })
                })
        })
    }

    handleTime = (day, time, j) => {
        let activeTimes = this.state.activeTimes;
        let times = this.state.times;
        times[j].active = 1;

        let sched = { day: day, time: time };

        activeTimes.push(sched);

        this.setState({
            activeTimes: activeTimes,
            times: times
        }, function () {
            this.forceUpdate();
        })
    }

    removeTime = (day, time, j) => {
        let activeTimes = this.state.activeTimes;
        let sched = { day: day, time: time };

        let times = this.state.times;
        times[j].active = 0;

        for (let i = 0; i < activeTimes.length; i++) {
            if (activeTimes[i].day === sched.day && activeTimes[i].time === sched.time) {
                activeTimes.splice(i, 1);
            }
        }

        this.setState({
            activeTimes: activeTimes,
            times: times
        }, function () {
            this.forceUpdate();
        })
    }

    getProfile = () => {
        fetch('https://innovationmesh.com/api/workspace/' + this.props.match.params.id, {
            method: 'GET'
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                this.setState({
                    spaceProfile: json,
                }, function () {
                    if (!this.state.token) {
                        this.props.history.push('/join/' + this.state.spaceProfile.slug)
                    }
                    this.getResources(json.id);
                })
            }.bind(this));
    }

    getResources = (id) => {
        fetch('https://innovationmesh.com/api/resources/' + id, {
            method: 'GET',
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                this.setState({
                    resources: json
                })
            }.bind(this))
    };

    storeBooking = () => {
        let _this = this;
        let data = new FormData;

        data.append('name', this.state.name);
        data.append('email', this.state.email);
        data.append('resourceID', this.state.activeType);
        data.append('start', this.state.start);
        data.append('end', this.state.end);
        data.append('spaceID', this.state.spaceProfile.id);

        fetch("https://innovationmesh.com/api/booking", {
            method: 'POST',
            body: data,
            headers: { 'Authorization': 'Bearer ' + this.state.token }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                if (json.error) {
                    _this.showSnack(json.error);
                }
                else if (json.success) {
                    _this.showSnack(json.success);
                    setTimeout(() => {
                        this.props.history.push(`/space/${this.state.spaceProfile.slug}`)
                    }, 5000);
                }
            }.bind(this));
    }

    renderTypeButton = (res, i) => {

        if (this.state.activeType === res.id) {
            return (
                <div className="bookingActiveTypeButton" key={i} onClick={() => this.handleType(res.id)}>{res.resourceName}</div>
            )
        }
        else {
            return (
                <div className="bookingTypeButton" key={i} onClick={() => this.handleType(res.id)}>{res.resourceName}</div>
            )
        }
    }

    renderTimes = (day, item, j) => {
        let activeTimes = this.state.activeTimes;
        let times = { day: day, time: item.time };
        if (item.active === 0) {
            return (
                <div className="bookingTimeBlock" key={j}>
                    <div className="bookingTimeText">{item.time}</div>
                    <div className="bookingTimeButton">
                        <FlatButton style={{ background: '#ff4d58', color: '#FFFFFF' }} onClick={() => this.handleTime(day, item.time, j)}>Select</FlatButton>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="bookingTimeBlock" key={j}>
                    <div className="bookingTimeText">{item.time}</div>
                    <div className="bookingTimeButton">
                        <FlatButton style={{ background: '#ff4d58', color: '#FFFFFF' }} onClick={() => this.removeTime(day, item.time, j)}>Remove</FlatButton>
                    </div>
                </div>
            )
        }
    }

    handleNewDate = (slotInfo) => {
        let start = slotInfo.start.toLocaleString();
        let end = slotInfo.end.toLocaleString();
        console.log(slotInfo.start);
        let dateObject = {
            title: 'Your Booking',
            start: slotInfo.start,
            end: slotInfo.end
        }

        let events = this.state.events;
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

        this.setState({
            events: events,
            start: start,
            end: end
        })
    }

    bookedSlot = (event) => {
        this.showSnack('This Slot has already been booked.');
        let events = this.state.events;
        let index = events.length;
        if (index !== 0) {
            if (this.state.start !== "" && this.state.end !== "") {
                events.splice(-1, 1);
                let start = "";
                let end = "";
                this.setState({
                    events: events,
                    start: start,
                    end: end
                })
            }
        }
    }

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


    render() {

        return (
            <div className="bookingContainer">
                <Helmet title="Bookings" meta={[{ name: 'description', content: 'Book a Time Slot' }]} />

                <header style={{ background: '#FFFFFF' }}>
                    <Header app={this.state.app} />
                </header>

                <main className="bookingMainContainer">
                    <div className="bookingInfoContainer">
                        <div className="bookingColumnTitle">Your Info</div>
                        <TextField label="Your Name" margin='normal' fullWidth={true} onChange={this.handleName} value={this.state.name} />
                        <TextField label="E-mail" margin='normal' fullWidth={true} onChange={this.handleEmail} value={this.state.email} />
                        {this.state.resources.map((res, i) => (
                            this.renderTypeButton(res, i)
                        ))}
                        <FlatButton style={{ width: '100%', background: '#ff4d58', color: '#FFFFFF', marginTop: '15px' }} onClick={this.storeBooking}>Confirm Booking</FlatButton>
                    </div>
                    <div style={{ width: '100%', background: '#FFFFFF', padding: '10px' }}>
                        <BigCalendar
                            selectable
                            onSelectEvent={event => this.bookedSlot(event)}
                            defaultView="work_week"
                            {...this.props}
                            events={this.state.events}
                            views={['work_week']}
                            step={30}
                            defaultDate={new Date()}
                            onSelectSlot={slotInfo => this.handleNewDate(slotInfo)}
                            eventPropGetter={(this.eventStyleGetter)}
                        />
                    </div>
                    {/*<div className="bookingTimeContainer">
                      <div className="bookingColumnTitle">Schedule Times</div>
                      {this.state.days.map((day, i) => (
                          <ExpansionPanel style={{ marginTop: '30px' }} key={i}>
                              <ExpansionPanelSummary>
                                  <div className="bookingPanelTitle">{day}</div>
                              </ExpansionPanelSummary>
                              <ExpansionPanelDetails style={{ display: 'flex', flexDirection: 'column' }}>
                                  {this.state.times.map((time, j) => (
                                      this.renderTimes(day, time, j)
                                  ))}
                              </ExpansionPanelDetails>
                          </ExpansionPanel>
                      ))}
                  </div>*/}
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

Booking.contextTypes = {
    router: PropTypes.object
};
