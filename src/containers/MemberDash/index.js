import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Helmet from 'react-helmet';
import {
  MemberDashCard,
  BookingCard,
  ItemGrid
} from '../../components';
import moment from 'moment';
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
      .then(({ company, error }) => {
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
  renderTag = (skill, i, background = null) => {
    const { classes } = this.props;
    return (
      <Chip
        className={background ? classes.company : classes.chipStyle}
        key={`Chip${i}`}
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
      events,
      skills
    } = this.state;
    const { classes } = this.props;
    return this.state.loading ? (
      <Spinner loading={this.state.loading} />
    ) : (
        <div className={classes.UPcontainer}>
          <Helmet title="UserProfile" meta={[{ name: 'description', content: 'Description of UserProfile' }]} />
          <Header
            space={this.props.spaceName}
            marginBottom={window.innerWidth >= 700 ? 30 : 30}
            borderBottom="1px solid black"
          />
          <div className={classes.mainProfile}>
            <Typography variant="display2" classes={{ display2: classes.display2 }} align="center" gutterBottom>
              My Dashboard
            </Typography>
            <Grid container direction="column">
              <ItemGrid xs={12} sm={12} md={12}>
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <MemberDashCard
                      header="My Profile"
                      avatar={this.state.user.avatar}
                      subtitle={this.state.user.title}
                      title={this.state.user.name}
                      tags={skills}
                      renderTag={this.renderTag}
                      history={this.props.history}
                    />
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <MemberDashCard
                      company
                      header="My Company"
                      avatar={this.state.logo}
                      title={this.state.companyName}
                      tags={skills}
                      renderTag={this.renderTag}
                      history={this.props.history}
                    />
                  </ItemGrid>
                </Grid>
              </ItemGrid>
              <ItemGrid xs={12} sm={12} md={12}>
                <Typography variant="display1" classes={{ display1: classes.bookingType, }}>
                  Bookings
                </Typography>
                <BookingCard />
              </ItemGrid>
              <aside style={{ marginBottom: 30, }}>
                <h2 className={classes.profileAttendingHeader}>
                  Upcoming Events
                </h2>
                {events &&
                  <section style={{ width: '100%', margin: '0 auto', }}>
                    {events.map((event, index) =>
                      <div key={`${event.event.title}2${index}`} style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', width: '100%', }}>
                        <div>
                          <Typography variant="headline" gutterBottom onClick={() => { this.props.history.push(`/EventDetail/${event.event.id}`) }}>
                            {event.event.title} on {moment(event.startDate).format("MMM DD")}
                          </Typography>
                        </div>
                        <Button>
                          {event.isAttending ? "Going" : "Add"}
                        </Button>
                      </div>
                    )}
                  </section>
                }
              </aside>
              {/* </ItemGrid> */}
            </Grid>
          </div>
          <footer className={classes.homeFooterContainer}>
            Copyright © 2018 theClubhou.se • 540 Telfair Street • Tel: (706)
            723-5782
        </footer>
        </div>
      );
  }
}
export default withStyles(userProfileStyles)(MemberDash);

MemberDash.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
