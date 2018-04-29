import Grid from 'material-ui/Grid';
import Chip from 'material-ui/Chip';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { Button, CustomInput, ItemGrid, ProfileCard, RegularCard } from '../../components';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import userProfileStyles from '../../variables/styles/userProfileStyles';
import avatar from '../../assets/img/faces/marc.jpg';
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
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
      minHeight: "100%"
    };
    return {
      style: style
    };
  };
  eventRoute = event => {
    this.props.history.push("/event/" + event.id);
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
            marginBottom={60}
            borderBottom="1px solid black"
          />
          <div className={`${classes.mainProfile} mainProfileCalc`}>
            <Grid container direction="column">
              <ItemGrid
                xs={12}
                sm={12}
                md={12}
                style={{
                  width: '100%',
                }}
              >
                <Grid container>
                  <ItemGrid
                    xs={12}
                    sm={12}
                    md={6}
                  >
                    <ProfileCard
                      avatar={this.state.user.avatar}
                      subtitle={this.state.user.title}
                      title={this.state.user.name}
                      description={this.state.user.bio}
                      footer={
                        <Button color="primary" round>
                          Update
                        </Button>
                      }
                      style={{
                        minHeight: '48vh'
                      }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <ProfileCard
                      isCalendar
                      //     avatar="https://cdn-images-1.medium.com/fit/c/80/80/0*GCZdPPcsr8kr0q8x.png"
                      subtitle="upcoming events"
                      //           title="upcoming events"
                      // description="Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is..."
                      footer={this.state.calEvents &&
                        <BigCalendar
                          className="fullCalendar"
                          style={{
                            minHeight: "50vh",
                            fontFamily: "Noto Sans",
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
                  </ItemGrid>
                </Grid>
              </ItemGrid>
              <ItemGrid xs={12} sm={12} md={12} style={{ width: '100%' }}>
                <div className={classes.profileColumns}>
                  <aside className={classes.profileColumnLeft}>
                    <div className={classes.profileMentorship}></div>
                    <div className={classes.profileEvents}>
                      upcoming events
                    {events &&
                        <ul className={classes.profileTagCloud}>
                          {events.map((event, index) =>
                            <li
                              onClick={() => { this.props.history.push(`/EventDetail/${event.id}`) }}
                              key={`${event.title}${index}`}
                              className={classes.EventTag}
                            >{event.title}</li>
                          )}
                        </ul>
                      }
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
              </ItemGrid>
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
