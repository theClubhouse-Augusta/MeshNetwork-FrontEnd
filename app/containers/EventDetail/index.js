/*
 *
 * EventDetail
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Helmet from 'react-helmet';
import { TiGroup } from 'react-icons/lib/ti'; 
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Snackbar from 'material-ui/Snackbar'; 

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
    sponsors: '',
    organizers: [],
    attendees: [],
    snackBarMessage: '',
    snackBar: false,
    tags: [],
  };

  token = localStorage['token'];
  path = this.props.location.pathname.split('/');
  eventID = this.path[this.path.length - 1];

  componentDidMount() {
    if ( isNaN(parseInt(this.eventID)) || this.eventID === '0' || this.eventID === '0') {
      this.props.history.push('/');
    } else {
      this.getEvent(this.eventID);
    }
  }

  clickMapMarker = (spaceId) => {
    this.props.history.push(`/SpaceProfile/${spaceId}`);
  }

  getEvent = (eventID) => {
    fetch(`http://localhost:8000/api/event/${eventID}`, {
      headers: { Authorization: `Bearer ${this.token}` }
    })
    .then(reponse => reponse.json())
    .then(Event => {
      if (Event.local) {
        this.setState({	
          event: Event.event,
          workSpace: Event.local,
          upcomingEvents: Event.upcomingEvents,
          sponsors: Event.sponsors,
          organizers: Event.organizers,
          attendees: Event.attendees,
          tags: Event.tags
        });
      } else if (Event.nonLocal) {
        this.setState({	
          event: Event.event,
          hostSpace: Event.hostSpace,
          workSpaces: Event.nonLocal,
          upcomingEvents: Event.upcomingEvents,
          sponsors: Event.sponsors,
          organizers: Event.organizers,
          attendees: Event.attendees,
          tags: Event.tags
        })
      }
    })
    .catch(error => {
      alert(`error getEvent(): ${error}`)
    });
  }

  registerForEvent = (e, eventID) => {
    e.preventDefault();
    fetch(`http://localhost:8000/api/event/join/${eventID}`, {
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
        this.props.history.push('/auth');
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
    if ( startHourMinSec !== endHourMinSec && startDay !== endDay ) {
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

              <br/> 

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
      <div className="container">
        <Helmet title="EventDetail" meta={[ { name: 'description', content: 'Description of EventDetail' }]}/>
        <Header />
        
        <main>
          <div className="eventBanner">
            <h1 className="eventName">{event.title}</h1>
            <h2 className="eventDateTime"> 
              {this.handleDates(start,end)}
            </h2>
          </div>

          <div className="eventBody">
            <div className="eventDescription">
              <div className="eventQuickInfo">
                  <div className="eventNotices">
                    <div className="eventNotice"> 
                      <TiGroup style={{fontSize: '32px'}} /> 
                        <label style={{marginLeft: '10px', lineHeight: '32px'}}>
                          Public Welcome
                        </label>  
                    </div>

                    {!!tags.length && 
                    <div className="eventTags">
                      {tags.map((tag, key) =>
                        <Chip key={`chip${key}`} label={tag} style={{margin: '10px'}} />
                      )}
                    </div>}

                  </div>

                </div>

                {event && 
                <div                 
                  className="eventDescriptionContent"
                  dangerouslySetInnerHTML={{__html: event.description}}
                >
                </div>}
                
                {event && <a key="foo" href={event.url}> Find out more </a>}

                <div className="eventPeopleBlock">

                  <div className="eventAvatarsBlock"> 
                    <div className="eventOrganizers">
                      <h3> organizers </h3>
                      {organizers && organizers.map((organizer, key) =>
                        <div className="eventDetailAvatar" onClick={() => (this.props.history.push(`/userprofile/${organizer.id}`))}>
                          <Avatar key={`org${key}`} src={organizer.avatar} />
                          {organizer.name}
                        </div>
                      )}
                    </div>
                  
                    <div className="eventAttendees">
                      <h3> attendees </h3>
                      {attendees &&
                      attendees.map((attendee, key) =>
                        <div className="eventDetailAvatar" onClick={() => (this.props.history.push(`/userprofile/${attendee.id}`))}>
                          <Avatar key={`att${key}`} src={attendee.avatar} />
                          {attendee.name}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="eventSponsorsBlock">
                    <h3> sponsors </h3>
                    {sponsors && sponsors.map((sponser,key) => 
                      <Card key={`eventSponsorCard${key}`} className="eventSponsorCard"> 
                        <CardMedia title="a company logo"> 
                          <h2 className="eventCardHeader">{sponser.name}</h2>
                          <img src={`${sponser.logo}`} className="eventSponsorLogo"/> 
                        </CardMedia> 
                      </Card>
                    )}
                  </div>
                </div> 
              </div>

            <div className="eventLocationInfo">
              <div className="eventMap">
                {/* local event */}
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

                {/* non-local event */}
                {workSpaces &&
                  <MapNonLocal
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAHpoe-vzS5soyKj6Q4i8stTy6fZtYmqgs&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: '100%' }} />}
                    containerElement={<div id="dude" style={{ minHeight: '23em', border: '1px solid black' }} />}
                    mapElement={<div style={{ height: '23em' }} />}
                    lat={33.5105746}
                    lon={-82.08560469999999}
                    clickMarker={this.clickMapMarker}
                    spaces={workSpaces}
                  />
                }
              <div className="eventLocation">
                {/* local event */}
                {workSpace && <div className="eventSpace">{workSpace.name}</div>}

                {/* non-local event */}
                {hostSpace && <div className="eventSpace">{hostSpace.name}</div>}
              </div>               
              <div className="eventAddress">

                {/* local event */}
                  {workSpace &&
                    <address>
                      {workSpace.address}, <br />
                      {`${workSpace.city}, ${workSpace.state} ${workSpace.zipcode}`}  <br />
                    </address> 
                  }

                  {/* non-local event */}
                  {hostSpace &&
                    <address>
                      {hostSpace.address}, <br />
                      {`${hostSpace.city}, ${hostSpace.state} ${hostSpace.zipcode}`}  <br />
                    </address> 
                  }


                </div>
              </div>

              <div className="eventRegistration">
                <button 
                  onClick={(e) => { this.registerForEvent(e, event.id) }}  
                  style={{ marginTop: '40px'}} 
                  backgroundColor="#e36937"  
                > 
                  register  
                </button>
                  
                <Snackbar
                  open={this.state.open}
                  message="You're signed up!"
                  autoHideDuration={4000}
                />
              </div>

              <div className="eventSponsors">
                
              </div>

              <div className="eventUpcomingEvents">
                <h4 className="eventUpcomingTitle"> Upcoming events </h4> 
                {(upcomingEvents && !hostSpace) &&
                <ul className="eventUpcomingList"> 
                  {upcomingEvents.map((event, key) => 
                  <a key={`a${key}`} href={`/EventDetail/${event.id}`}>
                    <li style={{lineHeight: '2em'}}>
                      {`${moment(event.start).format('MMMM D')} ${event.title} @${event.name}`}
                    </li>
                  </a>)} 
                </ul>} 

                {(upcomingEvents && workSpaces) &&
                <ul className="eventUpcomingList"> 
                  {upcomingEvents.map((event, key) => 
                  <a key={`a${key}`} href={`/EventDetail/${event.id}`}>
                    <li style={{lineHeight: '2em'}}>
                      {`${moment(event.start).format('MMMM D')} ${event.title} @` + `${workSpaces.map(space => space.name,)}`}
                    </li>
                  </a>)}
                </ul>} 
              </div>
              <img src="htto://localhost" alt=""/>
              
            </div>
          </div>        
        </main>  

        <Footer />
        <Snackbar open={snackBar} message={snackBarMessage} autoHideDuration={4000} onRequestClose={this.toggleSnackBar} />
      </div>
    );
  }
}

EventDetail.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
