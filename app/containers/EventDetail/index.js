/*
 *
 * EventDetail
 *
 */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import Helmet from 'react-helmet';
import { TiGroup } from 'react-icons/lib/ti';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/Button';

import Header from 'components/Header';
import Footer from 'components/Footer';
import { MapLocal } from "./MapLocal";
import { MapNonLocal } from "./MapNonLocal";
import Card, { CardMedia } from 'material-ui/Card';


import './style.css';
import './styleM.css';

export default class EventDetail extends React.PureComponent {
    state = {
        open: false,
        event: '',
        hostSpace: '',
        workSpace: '',
        workSpaces: '',
        upcomingEvents: '',
        sponsors: [],
        organizers: [],
        attendees: [],
        dates: [],
        snackBarMessage: '',
        snackBar: false,
        tags: [],
    };

    componentDidMount() {
        this.getEvent(this.props.match.params.id);
    }

    clickMapMarker = (spaceId) => {
        this.props.history.push(`/SpaceProfile/${spaceId}`);
    }

    getEvent = (eventID) => {
        fetch(`http://localhost:8000/api/event/${eventID}`, {
            method: 'GET'
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                this.setState({
                    event: json.event,
                    workSpace: json.workspace,
                    upcomingEvents: json.upcomingEvents,
                    sponsors: json.sponsors,
                    organizers: json.organizers,
                    attendees: json.attendees,
                    dates: json.dates,
                    tags: json.tags
                })
            }.bind(this))
    }

    registerForEvent = (e, eventID) => {
        e.preventDefault();
        fetch(`http:/localhost/api/event/join/${eventID}`, {
            headers: { Authorization: `Bearer ${this.token}` }
        },
        )
            .then(response => response.json()
            )
            .then(signedUp => {
                if (signedUp.success) {
                    this.toggleSnackBar(signedUp.success);
                } else if (signedUp.duplicate) {
                    this.toggleSnackBar(signedUp.duplicate);
                } else if (signedUp.error) {
                    this.props.history.push('/signIn');
                }
            })
            .catch(error => {
                alert(`handleTouchTap error: ${error}`)
            });
    };

    toggleSnackBar = (message) =>
        this.setState({
            snackBar: !this.state.snackBar,
            snackBarMessage: message
        });

    handleDates = (start, end) => {
        // hour:min:sec
        const startHourMinSec = moment(start).format('hms');
        const endHourMinSec = moment(end).format('hms');

        // day of month
        const startDay = moment(start).format('Do');
        const endDay = moment(end).format('Do');

        let timeFormat;
        if (startHourMinSec !== endHourMinSec && startDay !== endDay) {
            if (startDay === endDay) {
                timeFormat = (
                    <time>
                        {`${moment(start).format('MMMM Do h:mm')} - ${moment(end).format('h:mm')}`}
                    </time>
                );
            } else {
                timeFormat = (
                    <div>
                        <time>
                            starts:&nbsp;&nbsp;&nbsp;{`${moment(start).format(`MMMM D, h:mm A`)}`}
                        </time>

                        <br />

                        <time>
                            ends:&nbsp;&nbsp;&nbsp;{`${moment(end).format('MMMM D, h:mm A')}`}
                        </time>
                    </div>
                );
            }
        }
        return timeFormat;
    }


    render() {
        const {
      event,
            workSpace,
            hostSpace,
            workSpaces,
            upcomingEvents,
            sponsors,
            dates,
            organizers,
            attendees,
            snackBar,
            snackBarMessage,
            tags
    } = this.state;
        // organizers.forEach(organizer => attendees.push(organizer))
        const start = event.start;
        const end = event.end;

        return (
            <div className="eventDetailContainer">
                <Helmet title="EventDetail" meta={[{ name: 'description', content: 'Description of EventDetail' }]} />
                <header style={{ background: '#FFFFFF' }}>
                    <Header />
                    <div className="eventDetailBanner"
                        style={{
                            background: "linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)),url(" + this.state.event.image + ")",
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                        }}>
                        <div className="homeHeaderContentTitle">{this.state.event.title}</div>
                        <div className="homeHeaderContentSubtitle">{this.state.workSpace.address} {this.state.workSpace.city}, {this.state.workSpace.state} {this.state.workSpace.zipcode}</div>
                    </div>
                </header>

                <main className="spaceSignUpMain">
                    <div className="spaceSignUpUser">
                        <div className="spaceSignUpTitle">Event Location</div>
                        {workSpace &&
                            <MapLocal
                                isMarkerShown
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAHpoe-vzS5soyKj6Q4i8stTy6fZtYmqgs&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: '100%' }} />}
                                containerElement={<div id="dude" style={{ minHeight: '23em', border: '1px solid black' }} />}
                                mapElement={<div style={{ height: '23em' }} />}
                                lat={workSpace.lat}
                                lon={workSpace.lon}
                                clickMapMarker={this.clickMapMarker}
                                workSpace={workSpace}
                            />
                        }
                    </div>
                    <div className="spaceSignUpContainer">
                        <div className="eventDetailSection">
                            <div className="eventDetailSectionTitle">Description</div>
                            <div className="eventDetailSectionContent">
                                <p>{this.state.event.description}</p>
                                {!!tags.length &&
                                    <div className="eventTags">
                                        {tags.map((tag, key) =>
                                            <Chip key={`chip${key}`} label={tag} style={{ color: "#FFFFFF", marginRight: '5px', marginTop: '5px', borderRadius: '5px', background: '#ff4d58' }} />
                                        )}
                                    </div>}
                            </div>
                        </div>
                        <div className="eventDetailSection">
                            <div className="eventDetailSectionTitle">Time & Days</div>
                            <div className="eventDetailSectionContent">
                                <div className="eventDetailDates">
                                    {this.state.dates.map((date, i) => (
                                        <div className="eventDetailsDateBlock">{date.start} -- {date.end}</div>
                                    ))}
                                </div>
                                <div className="eventDetailSignUpRow">
                                    <div className="homeSignButtons">
                                        <Link to={'/join/' + this.state.workSpace.slug} style={{ margin: '15px', width: '45%' }}><FlatButton style={{ width: '100%', background: '#ff4d58', paddingTop: '10px', paddingBottom: '10px', color: '#FFFFFF', fontWeight: 'bold' }}>Sign Up</FlatButton></Link>
                                        <Link to={'/space/' + this.state.workSpace.slug} style={{ margin: '15px', width: '45%' }}><FlatButton style={{ width: '100%', background: '#FFFFFF', paddingTop: '10px', paddingBottom: '10px', color: '#ff4d58', fontWeight: 'bold', border: '1px solid #DDDDDD' }}>About the Space</FlatButton></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="eventDetailSection">
                            <div className="eventDetailSectionTitle">Organizers</div>
                            <div className="eventDetailSectionContent">
                                <div className="eventDetailUsersList">
                                    {this.state.organizers.map((organizer, i) => (
                                        <div className="eventDetailUsersBlock">
                                            <img src={organizer.avatar} />
                                            <div style={{ marginTop: '10px' }}>{organizer.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="eventDetailSection">
                            <div className="eventDetailSectionTitle">Sponsors</div>
                            <div className="eventDetailSectionContent">
                                <div className="eventDetailUsersList">
                                    {this.state.sponsors.map((sponsor, i) => (
                                        <div className="eventDetailUsersBlock">
                                            <img src={sponsor.logo} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="eventDetailSection">
                            <div className="eventDetailSectionTitle">Attendees</div>
                            <div className="eventDetailSectionContent">
                                <div className="eventDetailUsersList">
                                    {this.state.attendees.map((attendee, i) => (
                                        <div className="eventDetailUsersBlock">
                                            <img src={attendee.avatar} />
                                            <div style={{ marginTop: '10px' }}>{attendee.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="homeFooterContainer">
                    Copyright © 2018 theClubhou.se  • 540 Telfair Street  •  Tel: (706) 723-5782
        </footer>

                <Snackbar open={this.state.snackBar} message={this.state.snackBarMessage} autoHideDuration={4000} onRequestClose={this.toggleSnackBar} />
            </div>
        );
    }
}

EventDetail.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
