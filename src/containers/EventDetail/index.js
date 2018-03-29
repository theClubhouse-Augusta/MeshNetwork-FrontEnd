/*
 *
 * EventDetail
 *
 */
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Chip from "material-ui/Chip";
import Snackbar from "material-ui/Snackbar";
import FlatButton from "material-ui/Button";
import LinkIcon from "react-icons/lib/fa/chain";

import Header from "../../components/Header";
import { MapLocal } from "./MapLocal";

import "./style.css";
import "./styleM.css";

export default class EventDetail extends React.PureComponent {
  state = {
    token: localStorage.getItem("token"),
    open: false,
    event: "",
    hostSpace: "",
    workSpace: "",
    workSpaces: "",
    upcomingEvents: "",
    sponsors: [],
    organizers: [],
    attendees: [],
    challenges: [],
    dates: [],
    snackBarMessage: "",
    snackBar: false,
    tags: []
  };

  componentDidMount() {
    this.getEvent(this.props.match.params.id);
  }

  clickMapMarker = spaceId => {
    this.props.history.push(`/SpaceProfile/${spaceId}`);
  };

  getEvent = eventID => {
    fetch(`http://testbean2-env.us-east-1.elasticbeanstalk.com/api/event/${eventID}`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          event: json.event,
          workSpace: json.workspace,
          upcomingEvents: json.upcomingEvents,
          sponsors: json.sponsors,
          organizers: json.organizers,
          attendees: json.attendees,
          challenges: json.challenges,
          dates: json.dates,
          tags: json.tags
        });
      });
  };

  registerForEvent = (e, eventID) => {
    e.preventDefault();
    fetch(`http://testbean2-env.us-east-1.elasticbeanstalk.com/api/event/join/${eventID}`, {
      headers: { Authorization: `Bearer ${this.token}` }
    })
      .then(response => response.json())
      .then(signedUp => {
        if (signedUp.success) {
          this.toggleSnackBar(signedUp.success);
        } else if (signedUp.duplicate) {
          this.toggleSnackBar(signedUp.duplicate);
        } else if (signedUp.error) {
          this.props.history.push("/signIn");
        }
      })
      .catch(error => {
        alert(`handleTouchTap error: ${error}`);
      });
  };

  toggleSnackBar = message =>
    this.setState({
      snackBar: !this.state.snackBar,
      snackBarMessage: message
    });

  renderLocation = () => {
    if (!this.state.event.address) {
      return (
        <div className="homeHeaderContentSubtitle" style={{ color: "#FFFFFF" }}>
          {this.state.workSpace.address} {this.state.workSpace.city},{" "}
          {this.state.workSpace.state} {this.state.workSpace.zipcode}
        </div>
      );
    } else {
      return (
        <div className="homeHeaderContentSubtitle" style={{ color: "#FFFFFF" }}>
          {this.state.event.address}, {this.state.event.city},{" "}
          {this.state.event.state}
        </div>
      );
    }
  };

  renderChallenges = () => {
    if (this.state.challenges.length != 0) {
      return (
        <div className="eventDetailSection">
          <div className="eventDetailSectionTitle">Challenges</div>
          <div className="eventDetailSectionContent">
            <div className="eventDetailUsersList">
              {this.state.challenges.map((challenge, i) => (
                <Link
                  to={"/Challenges/challenge/" + challenge.challengeSlug}
                  key={`challengeevent${i}`}
                  className="eventDetailUsersBlock"
                >
                  <img
                    alt=""
                    src={challenge.challengeImage}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div style={{ marginTop: "10px", textAlign: "center" }}>
                    {challenge.challengeTitle}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      );
    }
  };

  attendEvent = () => {
    fetch("http://testbean2-env.us-east-1.elasticbeanstalk.com/api/attend/" + this.state.event.id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.state.token
      }
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.error) {
          this.toggleSnackBar("Session Expired. Please Log in Again.");
        } else if (json.success) {
          this.toggleSnackBar(json.success);
        } else if (json.duplicate) {
          this.toggleSnackBar(json.duplicate);
        }
      });
  };

  renderJoin = () => {
    if (!this.state.token) {
      return (
        <Link
          to={"/join/" + this.state.workSpace.slug}
          style={{ margin: "15px", width: "45%" }}
        >
          <FlatButton
            style={{
              width: "100%",
              background: "#ff4d58",
              paddingTop: "10px",
              paddingBottom: "10px",
              color: "#FFFFFF",
              fontWeight: "bold"
            }}
          >
            Sign Up
          </FlatButton>
        </Link>
      );
    } else {
      return (
        <FlatButton
          onClick={this.attendEvent}
          style={{
            margin: "15px",
            background: "#ff4d58",
            paddingTop: "10px",
            paddingBottom: "10px",
            color: "#FFFFFF",
            fontWeight: "bold"
          }}
        >
          Attend Event
        </FlatButton>
      );
    }
  };

  render() {
    const { workSpace, tags, event } = this.state;
    // organizers.forEach(organizer => attendees.push(organizer))
    // const start = event.start;
    // const end = event.end;

    return (
      <div className="eventDetailContainer">
        <Helmet
          title={this.state.event.title}
          meta={[
            { name: "description", content: "Description of EventDetail" }
          ]}
        />
        <header style={{ background: "#FFFFFF" }}>
          <Header space={this.props.spaceName} />
          <div className="eventDetailBanner" style={{ background: "#ff4d58" }}>
            <h3 className="homeHeaderContentTitle">{this.state.event.title}</h3>
            {this.renderLocation()}
          </div>
        </header>

        <main className="eventDetailMain">
          <div className="spaceSignUpUser">
            <div className="spaceSignUpTitle">Event Location</div>
            {workSpace &&
              !event.lon && (
                <MapLocal
                  isMarkerShown
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAHpoe-vzS5soyKj6Q4i8stTy6fZtYmqgs&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: "100%" }} />}
                  containerElement={
                    <div
                      id="dude"
                      style={{ minHeight: "23em", border: "1px solid black" }}
                    />
                  }
                  mapElement={<div style={{ height: "23em" }} />}
                  lat={workSpace.lat}
                  lon={workSpace.lon}
                  clickMapMarker={() => {
                    this.props.history.push(`/space/${workSpace.slug}`);
                  }}
                  workSpace={workSpace}
                />
              )}

            {workSpace &&
              event.lon &&
              event.lat && (
                <MapLocal
                  isMarkerShown
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAHpoe-vzS5soyKj6Q4i8stTy6fZtYmqgs&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: "100%" }} />}
                  containerElement={
                    <div
                      id="dude"
                      style={{ minHeight: "23em", border: "1px solid black" }}
                    />
                  }
                  mapElement={<div style={{ height: "23em" }} />}
                  lat={event.lat}
                  lon={event.lon}
                  event={event}
                />
              )}
          </div>

          {/*<div>
                        <h1 className="eventDetailSectionTitle">Location</h1>
                        {!!event.address &&
                            <React.Fragment>
                                <p>{event.address}</p> 
                                <p>{event.city}, {event.state}</p>
                            </React.Fragment>
                        }
                        {!!!event.address &&
                            <React.Fragment>
                                <p>{workSpace.address}</p> 
                                <p>{workSpace.city}, {workSpace.state}</p>
                            </React.Fragment>
                        }
                    </div>*/}

          <div className="spaceSignUpContainer">
            <div className="eventDetailSection">
              <div className="eventDetailSectionTitle">Description</div>
              <div className="eventDetailSectionContent">
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.event.description
                  }}
                />
                <a
                  href={this.state.event.url}
                  style={{
                    textDecoration: "none",
                    background: "#ff4d58",
                    padding: "5px",
                    color: "#FFFFFF",
                    marginTop: "30px",
                    marginRight: "10px",
                    borderRadius: "5px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    maxWidth: "300px",
                    margin: "30px auto"
                  }}
                  target="_blank"
                >
                  <LinkIcon size={25} style={{ marginRight: "10px" }} /> Visit
                  Website
                </a>
                {!!tags.length && (
                  <div className="eventTags">
                    {tags.map((tag, key) => (
                      <Chip
                        key={`chip${key}`}
                        label={tag}
                        style={{
                          color: "#33333",
                          marginRight: "5px",
                          marginTop: "5px",
                          borderRadius: "5px",
                          background: "#EEEEEE"
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="eventDetailSection">
              <div className="eventDetailSectionTitle">Time & Days</div>
              <div className="eventDetailSectionContent">
                <div className="eventDetailDates">
                  {this.state.dates.map((date, i) => (
                    <div
                      key={`eventDates${i}`}
                      className="eventDetailsDateBlock"
                    >
                      {date.startFormatted} -- {date.endFormatted}
                    </div>
                  ))}
                </div>
                <div className="eventDetailSignUpRow">
                  <div className="homeSignButtons">
                    {this.renderJoin()}
                    <Link
                      to={"/space/" + this.state.workSpace.slug}
                      style={{ margin: "15px" }}
                    >
                      <FlatButton
                        style={{
                          width: "100%",
                          background: "#FFFFFF",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          color: "#ff4d58",
                          fontWeight: "bold",
                          border: "1px solid #DDDDDD"
                        }}
                      >
                        About the Space
                      </FlatButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {this.renderChallenges()}
            <div className="eventDetailSection">
              <div className="eventDetailSectionTitle">Organizers</div>
              <div className="eventDetailSectionContent">
                <div className="eventDetailUsersList">
                  {this.state.organizers.map((organizer, i) => (
                    <div
                      key={`organizers${i}`}
                      className="eventDetailUsersBlock"
                    >
                      <img
                        alt=""
                        src={organizer.avatar}
                        style={{ width: "100px", height: "100px" }}
                      />
                      <div style={{ marginTop: "10px", textAlign: "center" }}>
                        {organizer.name}
                      </div>
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
                    <div key={`sponsors${i}`} className="eventDetailUsersBlock">
                      <img alt="" src={sponsor.logo} />
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
                    <div
                      key={`attendeeevent${i}`}
                      className="eventDetailUsersBlock"
                    >
                      <img
                        alt=""
                        src={attendee.avatar}
                        style={{ width: "100px", height: "100px" }}
                      />
                      <div style={{ marginTop: "10px", textAlign: "center" }}>
                        {attendee.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="homeFooterContainer">
          Copyright © 2018 theClubhou.se • 540 Telfair Street • Tel: (706)
          723-5782
        </footer>

        <Snackbar
          open={this.state.snackBar}
          message={this.state.snackBarMessage}
          autoHideDuration={4000}
          onClose={this.toggleSnackBar}
        />
      </div>
    );
  }
}

EventDetail.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
