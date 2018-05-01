import Edit from "material-ui-icons/Edit";
import Chip from 'material-ui/Chip';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import IconButton from "material-ui/IconButton";
import Tooltip from 'material-ui/Tooltip';
import { withStyles } from 'material-ui/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Helmet from 'react-helmet';
import {
  CalendarCard,
  MemberDashCard,
  MemberDashGrid
} from '../../components';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import userProfileStyles from '../../variables/styles/userProfileStyles';
import "./style.css";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class MemberDash extends React.Component {
  state = {
    user: '',
    skills: '',
    space: '',
    events: '',
    calEvents: '',
    upcoming: '',
    loading: true,
    logo: '',
    employeeCount: '',
    companyName: '',
    companyID: '',
  };
  userID = this.props.match.params.id;
  token = localStorage['token'];
  componentWillMount() {
    if (isNaN(this.userID)) {
      this.props.history.push('/');
    }
  };
  componentDidMount() {
    this.loadUser(this.token);
  };
  loadUser = token => {
    if (!token) {
      this.props.history.push('/');
    }
    fetch(`http://localhost:8000/api/showuser/${this.userID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => response.json())
      .then(({
        user,
        space,
        events,
        upcoming,
        error
      }) => {
        if (!error) {
          this.setState(() => ({
            user,
            skills: user.skills ? user.skills.split(',') : [],
            space,
            events,
            upcoming,
            loading: false,
          }), () => {
            this.getSpaceEvents(user.spaceID);
            if (user.companyID) {
              this.getCompany(user.companyID)
            }
          });
        } else {
          this.props.history.push('/');
        }
      })
  };
  getSpaceEvents = id => {
    fetch(`http://localhost:8000/api/spaceEvents/${id}`)
      .then(response => response.json())
      .then(calEvents => {
        this.setState(() => ({ calEvents }));
      });
  };
  getCompany = companyID => {
    fetch(`http://localhost:8000/api/company/${companyID}`)
      .then(response => response.json())
      .then(({
        company,
        error
      }) => {
        if (company) {
          const {
            logo,
            employeeCount,
            id: companyID,
            name: companyName,
          } = company;
          this.setState(() => ({
            logo,
            employeeCount,
            companyID,
            companyName,
          }));
        }
      });
  };
  eventStyleGetter = (event, start, end, isSelected) => {
    // var backgroundColor = "#ff4d58";
    var style = {
      background: "rgb(192, 104, 109)",
      fontWeight: "bold",
      borderRadius: "0px",
      border: "none",
      fontFamily: "Noto Sans",
      display: "flex",
      flexDirection: "column",
      minHeight: "100%"
    };
    return {
      style: style
    };
  };
  eventRoute = event => {
    this.props.history.push("/event/" + event.id);
  };
  renderTag = (skill, i) => {
    const chipStyle = {
      color: "#FFFFFF",
      margin: "5px",
      borderRadius: "5px",
      background: "rgb(218, 73, 83)",
    };
    return (
      <Chip
        style={chipStyle}
        key={`Chip${i}`}
        label={skill}
        onClick={() => {
          this.tagClick(skill.id);
        }}
      />
    );
  };
  renderVerticals = (skill, i) => {
    const chipStyle = {
      color: "#FFFFFF",
      margin: "5px",
      borderRadius: "5px",
      background: "rgb(193, 50, 59)",
      // background: "#ff4d58",
    }
    return (
      <Chip
        style={chipStyle}
        key={`Vertical${i}`}
        label={skill}
        onClick={() => {
          this.tagClick(skill.id);
        }}
      />
    );
  };
  render() {
    const {
      user,
      skills,
      space,
      events,
      upcoming,
    } = this.state;
    const { classes } = this.props;
    return this.state.loading ? (
      <Spinner loading={this.state.loading} />
    ) : (
        <div className={classes.UPcontainer}>
          <Helmet title="UserProfile" meta={[{ name: 'description', content: 'Description of UserProfile' }]} />
          <Header
            space={this.props.spaceName}
            marginBottom={window.innerWidth >= 700 ? 25 : 50}
            borderBottom="1px solid black"
          />
          <div className={classes.mainProfile}>
            <Typography
              variant="display2"
              classes={{
                display2: classes.display2
              }}
              align="center"
              //  ["inherit","primary","textSecondary","secondary","error","default"].
              gutterBottom
            >My Dashboard</Typography>
            <Grid container direction="column">
              <MemberDashGrid xs={12} sm={12} md={12} style={{ width: "100%", }}>
                <Grid container justify="center">
                  <MemberDashGrid xs={12} sm={12} md={6}>
                    <MemberDashCard
                      header={
                        <div className={classes.editButton}>
                          <Typography
                            variant="display1"
                            classes={{
                              display1: classes.display1,
                            }}
                          >My profile</Typography>
                          <Tooltip
                            id="tooltip-top"
                            title="Edit profile"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <IconButton
                              aria-label="Edit"
                              className={classes.tableActionButton}
                              onClick={() => {
                                this.props.history.push(`/account`);
                              }}
                            >
                              <Edit className={classes.tableActionButtonIcon + " " + classes.edit} />
                            </IconButton>
                          </Tooltip>
                        </div>
                      }
                      avatar={this.state.user.avatar}
                      subtitle={this.state.user.title}
                      title={this.state.user.name}
                      //description={this.state.user.bio}
                      footer={
                        <React.Fragment>
                          <div className={classes.memberSearchTagSelect}>
                            {this.state.skills.map((skill, i) => this.renderTag(skill, i))}
                          </div>
                        </React.Fragment>
                      }
                      style={{
                        maxHeight: '20vh'
                      }}
                    />
                  </MemberDashGrid>
                  <MemberDashGrid xs={12} sm={12} md={6}>
                    <CalendarCard
                      isCalendar
                      subtitle="upcoming events"
                      footer={this.state.calEvents &&
                        <BigCalendar
                          className="fullCalendar"
                          style={{
                            minHeight: "50vh",
                            fontFamily: "Noto Sans",
                            fontSize: (window.innerWidth < 800 ? 10 : 12),
                            //  padding: "15px"
                          }}
                          defaultView="month"
                          {...this.props}
                          events={this.state.calEvents}
                          onSelectEvent={event => this.eventRoute(event)}
                          views={["month"]}
                          step={30}
                          defaultDate={new Date()}
                          eventPropGetter={this.eventStyleGetter}
                        />
                      }
                    />
                  </MemberDashGrid>
                </Grid>
              </MemberDashGrid>
              <MemberDashCard
                header={
                  <div className={classes.editButton}>
                    <Typography
                      variant="display1"
                      classes={{
                        display1: classes.display1
                      }}
                    >My company</Typography>
                    <Tooltip
                      id="tooltip-top"
                      title="Edit profile"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton aria-label="Edit" className={classes.tableActionButton}>
                        <Edit className={classes.tableActionButtonIcon + " " + classes.edit} />
                      </IconButton>
                    </Tooltip>
                  </div>
                }
                avatar={this.state.logo}
                title={this.state.companyName}
                footer={
                  <React.Fragment>
                    <div className={classes.memberSearchTagSelect}>
                      {this.state.skills.map((skill, i) => this.renderVerticals(skill, i))}
                    </div>
                  </React.Fragment>
                }
                style={{
                  maxHeight: '15vh'
                }}
              />
              <MemberDashGrid xs={12} sm={12} md={12} style={{ width: '100%' }}>
                <aside className={classes.profileAttending}>
                  <h2 className={classes.profileAttendingHeader}>Attending</h2>
                  {upcoming &&
                    <ul className={classes.profileAttendingContent}>a
                    {upcoming.map((attend, index) =>
                        <li
                          onClick={() => { this.props.history.push(`/EventDetail/${attend.id}`) }}
                          key={`${attend.title}${index}`}
                          className={classes.profileAttendingItem}
                        >{attend.title}</li>
                      )}
                    </ul>
                  }
                </aside>
              </MemberDashGrid>
              <MemberDashGrid xs={12} sm={12} md={12} style={{ width: '100%' }}>
                <div className={classes.profileColumns}>
                  <aside className={classes.profileColumnLeft}>
                    <div className={classes.profileMentorship}></div>
                    <div className={classes.profileEvents}>
                      upcoming events
                    </div>
                  </aside>
                  <div className={classes.profileColumnRight}>
                    <div className={classes.profileBio}>
                      <h1 className={classes.bioHeader}>
                        About name
                    </h1>
                      <div className={classes.profileBioContent}>
                        <p dangerouslySetInnerHTML={{ __html: user.bio }} />
                      </div>
                    </div>
                    <aside className={classes.profileAttending}>
                      <h2 className={classes.profileAttendingHeader}>Attending</h2>
                      {upcoming &&
                        <ul className={classes.profileAttendingContent}>a
                        {upcoming.map((attend, index) =>
                            <li
                              onClick={() => { this.props.history.push(`/EventDetail/${attend.id}`) }}
                              key={`${attend.title}${index}`}
                              className={classes.profileAttendingItem}
                            >
                              {attend.title}
                            </li>
                          )}
                        </ul>
                      }
                    </aside>
                  </div>
                </div>
              </MemberDashGrid>
            </Grid>
          </div>
        </div>
      );
  }
}
export default withStyles(userProfileStyles)(MemberDash);

MemberDash.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
