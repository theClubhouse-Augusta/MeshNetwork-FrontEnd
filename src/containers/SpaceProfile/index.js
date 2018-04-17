/*
 *
 * SpaceProfile
 *
 */
import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import FlatButton from "material-ui/Button";

import DoubleArrow from "react-icons/lib/fa/angle-double-right";
import FacebookIcon from "react-icons/lib/fa/facebook";
import TwitterIcon from "react-icons/lib/fa/twitter";
import InstagramIcon from "react-icons/lib/fa/instagram";
import MailIcon from "react-icons/lib/fa/envelope-o";
import LinkIcon from "react-icons/lib/fa/chain";

import { Timeline } from 'react-twitter-widgets';

import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.css";
import "./styleM.css";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default class SpaceProfile extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      token: localStorage.getItem("token"),
      user: JSON.parse(localStorage.getItem("user")),
      spaceProfile: "",
      events: [],
      users: [],
      photoGallery: []
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = () => {
    fetch(
      "https://innovationmesh.com/api/workspace/" + this.props.match.params.id,
      {
        method: "GET"
      }
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (json) => {
          this.setState(
            {
              spaceProfile: json
            },
            () => {
              this.getSpaceEvents(this.state.spaceProfile.id);
              this.getUsers(this.state.spaceProfile.id);
              this.getPhotoGallery(this.state.spaceProfile.id);
            }
          );
        }
      );
  };

  getSpaceEvents = id => {
    fetch("https://innovationmesh.com/api/spaceEvents/" + id, {
      method: "GET"
    })
      .then((response) => {
        return response.json();
      })
      .then(
        (json) => {
          this.setState({
            events: json
          });
        }
      );
  };

  getUsers = id => {
    fetch("https://innovationmesh.com/api/organizers/space/" + id, {
      method: "GET"
    })
      .then((response) => {
        return response.json();
      })
      .then(
        (json) => {
          this.setState({
            users: json
          });
        }
      );
  };

  getPhotoGallery = id => {
    fetch("https://innovationmesh.com/api/photos/" + id, {
      method: "GET"
    })
      .then((response) => {
        return response.json();
      })
      .then(
        (json) => {
          this.setState({
            photoGallery: json.photos
          });
        }
      );
  };

  renderDashboard = () => {
    if (this.state.user) {
      if (
        this.state.user.spaceID === this.state.spaceProfile.id &&
        (this.state.user.roleID === 2 || this.state.user.roleID === 5)
      ) {
        return (
          <Link
            to={"/spacedash/" + this.state.spaceProfile.slug}
            style={{ width: "100%" }}
          >
            <FlatButton
              style={{
                background: "#FFFFFF",
                color: "#ff4d58",
                width: "100%",
                border: "1px solid #CCCCCC"
              }}
            >Dashboard</FlatButton>
          </Link>
        );
      }
    }
  };

  renderJoin = () => {
    if (!this.state.user) {
      return (
        <Link
          to={"/join/" + this.state.spaceProfile.slug}
          style={{ width: "100%" }}
        >
          <FlatButton
            style={{
              background: "#FFFFFF",
              color: "#ff4d58",
              width: "100%",
              marginTop: '15px',
              border: "1px solid #CCCCCC"
            }}
          >
            Join This Space
          </FlatButton>
        </Link>
      );
    } /*else {
      return (
      <Link
        to={"/user/" + this.state.user.id}
        style={{ width: "100%" }}
      >
        <FlatButton
          style={{
            background: "#FFFFFF",
            color: "#ff4d58",
            width: "100%",
            border: "1px solid #CCCCCC"
          }}
        >
          My Profile
        </FlatButton>
      </Link>
      );
    }*/
  };

  eventStyleGetter = (event, start, end, isSelected) => {
    // var backgroundColor = "#ff4d58";
    var style = {
      background: '#ff4d58',
      fontWeight: "bold",
      borderRadius: "0px",
      border: "none",
      fontFamily: "Noto Sans",
      display: "flex",
      flexDirection: "column",
      minHeight: "28px"
    };
    return {
      style: style
    };
  };

  eventRoute = event => {
    this.props.history.push("/event/" + event.id);
  };

  renderTwitterFeed = () => {
    if (this.state.spaceProfile.twitterHandle) {
      return (
        <div style={{ marginTop: '15px', height: '400px', overflow: 'hidden' }}>
          <Timeline
            dataSource={{
              sourceType: 'profile',
              screenName: this.state.spaceProfile.twitterHandle
            }}
            options={{
              username: this.state.spaceProfile.twitterHandle,
              height: '400'
            }}
          />
        </div>
      )
    }
  }

  render() {
    return (
      <div className="container">
        <Helmet
          title={this.state.spaceProfile.name}
          meta={[
            { name: "description", content: "Description of SpaceProfile" }
          ]}
        />
        <header>
          <Header space={this.state.spaceProfile.name} />
        </header>

        <main>
          <div className="spaceGalleryContainer">
            {this.state.photoGallery.map((photo, i) => (
              <div className="spaceGalleryPhotoBlock">
                <img alt="" src={photo.photoThumbnail} />
              </div>
            ))}
          </div>
          <div className="spaceMainHeader">
            <div
              className="spaceMainContainer"
              style={{ alignItems: "center" }}
            >
              <div className="spaceMainOne">
                <div className="spaceMainBread">
                  MeshNetwork<DoubleArrow
                    size={10}
                    style={{ marginLeft: "5px", marginRight: "5px" }}
                  />{" "}
                  WorkSpace{" "}
                  <DoubleArrow
                    size={10}
                    style={{ marginLeft: "5px", marginRight: "5px" }}
                  />{" "}
                  Home{" "}
                </div>
                <div className="spaceMainTitle">
                  {this.state.spaceProfile.name}
                </div>
                <div className="spaceMainSlogan">
                  {this.state.spaceProfile.city}&#39;s Collaborative Workspace
                </div>
                <div className="spaceContact">
                  <a
                    href={this.state.spaceProfile.facebook}
                    className="spaceContactBlock"
                  >
                    <FacebookIcon size={20} />
                  </a>
                  <a
                    href={this.state.spaceProfile.twitter}
                    className="spaceContactBlock"
                  >
                    <TwitterIcon size={20} />
                  </a>
                  <a
                    href={this.state.spaceProfile.instagram}
                    className="spaceContactBlock"
                  >
                    <InstagramIcon size={20} />
                  </a>
                  <a
                    href={this.state.spaceProfile.website}
                    className="spaceContactBlock"
                  >
                    <LinkIcon size={20} />
                  </a>
                  <a
                    href={"mailto:" + this.state.spaceProfile.email}
                    className="spaceContactBlock"
                  >
                    <MailIcon size={20} />
                  </a>
                </div>
              </div>
              <div className="spaceMainTwo">
                <img
                  alt=""
                  src={this.state.spaceProfile.logo}
                  className="spaceMainLogo"
                />
              </div>
            </div>
          </div>
          <div className="spaceMainContent">
            <div className="spaceMainContainer">
              <div className="spaceMainOne">
                <div className="spaceShare" />
                <div
                  className="spaceMainDescription"
                  dangerouslySetInnerHTML={{
                    __html: this.state.spaceProfile.description
                  }}
                />
                <div className="spaceFeatures" />
                {/*<div className="spaceEvents">
                                    {this.state.events.map((event, i) => (
                                        <Link to={'/event/' + event.id} className="spaceEventBlock">
                                            <div className="spaceEventBlockImage">
                                                <img src={event.image} />
                                            </div>
                                            <div className="spaceEventBlockTitle">{event.title}</div>
                                            <div className="spaceEventBlockContent">
                                                {event.start}
                                            </div>
                                        </Link>
                                    ))}
                                </div>*/}
              </div>
              <div className="spaceMainTwo">
                <div className="spaceOptions">
                  <Link
                    to={"/booking/" + this.state.spaceProfile.slug}
                    style={{ width: "100%" }}
                  >
                    <FlatButton
                      style={{
                        background: "#ff4d58",
                        color: "#FFFFFF",
                        width: "100%",
                        padding: "10px 0"
                      }}
                    >
                      Bookings{" "}
                    </FlatButton>
                  </Link>
                  {this.renderJoin()}
                  <Link
                    to={"/kiosk/" + this.state.spaceProfile.slug}
                    style={{ width: "100%" }}
                  >
                    <FlatButton
                      style={{
                        background: "#ff4d58",
                        color: "#FFFFFF",
                        width: "100%",
                        margin: "15px 0",
                        padding: "10px 0"
                      }}
                    >
                      Check-In
                    </FlatButton>
                  </Link>
                  {this.renderDashboard()}
                </div>
                {this.renderTwitterFeed()}
                <div className="spaceLocation">
                  <div className="spaceLocationImage">
                    <img
                      alt=""
                      src={
                        "https://maps.googleapis.com/maps/api/staticmap?center=" +
                        this.state.spaceProfile.city +
                        "," +
                        this.state.spaceProfile.state +
                        "&zoom=14&size=640x640&maptype=roadmap&markers=color:blue%7C" +
                        this.state.spaceProfile.lat +
                        "," +
                        this.state.spaceProfile.lon +
                        "&key=AIzaSyBDiXTt6jIkCs_VKtQeBZcVosIEgAdR1R0"
                      }
                    />
                  </div>
                  <div className="spaceLocationContent">
                    {this.state.spaceProfile.address}{" "}
                    {this.state.spaceProfile.city},{" "}
                    {this.state.spaceProfile.state}{" "}
                    {this.state.spaceProfile.zipcode}
                  </div>
                </div>
                <div className="spaceTime" />
                <div className="spaceMembers">
                  <div className="spaceMembersTitle">Organizers</div>
                  <div className="spaceMembersContent">
                    {this.state.users.map((u, i) => (
                      <div className="spaceProfileUser" key={`SpaceProfileUser${i}`}>
                        <img
                          alt=""
                          className="spaceProfileUserAvatar"
                          src={u.avatar}
                        />
                        <div className="spaceProfileUserContent">{u.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "100%", background: "#FFFFFF" }}>
              <BigCalendar
                className="fullCalendar"
                style={{
                  minHeight: "100vh",
                  fontFamily: "Noto Sans",
                  padding: "15px"
                }}
                defaultView="month"
                {...this.props}
                events={this.state.events}
                onSelectEvent={event => this.eventRoute(event)}
                views={["month"]}
                step={30}
                defaultDate={new Date()}
                eventPropGetter={this.eventStyleGetter}
              />

              <BigCalendar
                className="agendaCalendar"
                style={{
                  minHeight: "100vh",
                  fontFamily: "Noto Sans",
                  padding: "15px"
                }}
                defaultView="agenda"
                {...this.props}
                events={this.state.events}
                onSelectEvent={event => this.eventRoute(event)}
                views={["agenda"]}
                step={30}
                defaultDate={new Date()}
                eventPropGetter={this.eventStyleGetter}
              />
            </div>
          </div>
        </main>

        <footer className="homeFooterContainer">
          Copyright © 2018 theClubhou.se • 540 Telfair Street • Tel: (706)
          723-5782
        </footer>
      </div>
    );
  }
}
