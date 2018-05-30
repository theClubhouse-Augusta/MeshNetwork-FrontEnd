import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import Grid from 'material-ui/Grid';
import Snackbar from 'material-ui/Snackbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Helmet from 'react-helmet';
import { BookingCard, ItemGrid, MemberDashCard } from '../../components';
import Header from '../../components/Header';
import { CalendarModal } from '../../components/Modal';
import Spinner from '../../components/Spinner';
import memberDashStyles from '../../variables/styles/memberDashStyles';
import "./style.css";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class MemberDash extends React.Component {
  state = {
    user: '',
    skills: '',
    verticals: [],
    space: '',
    events: '',
    calEvents: '',
    upcoming: '',
    loading: true,
    logo: '',
    employeeCount: '',
    companyName: '',
    companyID: '',
    openModal: false,
    open: false,
    modal: null,
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
    fetch(`http://localhost:8000/api/company/${companyID}`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    })
      .then(response => response.json())
      .then(({
        company,
        verticals,
        error,
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
            verticals,
          }));
        }
      });
  };
  renderTag = (skill, i) => {
    const { classes } = this.props;
    return (
      <Chip
        className={classes.chipStyle}
        key={`Chip${i}`}
        label={skill}
        onClick={() => {
        }}
      />
    );
  };
  renderVertical = (vertical, i) => {
    const { classes } = this.props;
    return (
      <Chip
        className={classes.chipStyle}
        key={`verticals${i}`}
        label={vertical.label}
        onClick={() => {
        }}
      />
    );
  };
  showSnack = msg => {
    this.setState(() => ({
      snack: true,
      msg,
    }));
  };
  handleRequestClose = () => {
    this.setState(() => ({
      snack: false,
      msg: ""
    }));
  };
  attendEvent = (eventId, index) => {
    fetch(`http://localhost:8000/api/attend/${eventId}`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    })
      .then(response => response.json())
      .then(({ error, success, duplicate }) => {
        if (error) {
          this.showSnack("Session Expired. Please Log in Again.");
        } else if (success) {
          this.showSnack(success);
          const events = [...this.state.events];
          events[index].isAttending = true;
          this.setState(() => ({
            events,
            open: true,
            openModal: true,
          }), () => {
            this.renderModal(events[index]);
          })
        } else if (duplicate) {
          this.showSnack(duplicate);
        }
      });
  };
  handleClose = () => {
    this.setState({
      open: false,
      openModal: false,
      modal: null,
    });
  };
  renderModal = ({ event, startDate, endDate }) => {
    this.setState({
      modal:
        <CalendarModal
          open={true}
          title={event.title}
          description={event.description}
          start={startDate}
          end={endDate}
          handleClose={this.handleClose}
        />,
    })
  };

  render() {
    const {
      events,
      skills,
      verticals,
      modal,
      openModal,
    } = this.state;
    const { classes } = this.props;
    return this.state.loading ? (
      <Spinner loading={this.state.loading} />
    ) : (
        <div className={classes.UPcontainer}>
          <Helmet title="Member Dashboard" meta={[{ name: 'description', content: 'Description of Memberdashboard' }]} />
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
                    {!!verticals.length &&
                      <MemberDashCard
                        company
                        header="My Company"
                        avatar={this.state.logo}
                        title={this.state.companyName}
                        tags={verticals}
                        renderTag={this.renderVertical}
                        history={this.props.history}
                      />
                    }
                    {!!!verticals.length &&
                      <MemberDashCard
                        company
                        header="My Company"
                        avatar={this.state.logo}
                        title={this.state.companyName}
                        tags={verticals}
                        renderTag={this.renderVertical}
                        history={this.props.history}
                      />
                    }
                  </ItemGrid>
                </Grid>
              </ItemGrid>
              <ItemGrid xs={12} sm={12} md={12}>
                <Typography variant="display1" classes={{ display1: classes.bookingType, }}>
                  Bookings
                </Typography>
                feature coming soon
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
                          <Typography className={classes.onHover} variant="headline" gutterBottom onClick={() => { this.props.history.push(`/event/${event.event.id}`) }}>
                            {event.event.title} on {moment(event.startDate).format("MMM DD")}
                          </Typography>
                        </div>
                        <Button onClick={() => {
                          if (!event.event.isAttending) {
                            this.attendEvent(event.event.id, index);
                          }
                        }}>
                          {event.isAttending ? "Going" : "Add"}
                        </Button>
                      </div>
                    )}
                  </section>
                }
              </aside>
            </Grid>
            <Snackbar
              open={this.state.snack}
              message={this.state.msg}
              autoHideDuration={5000}
              onClose={this.handleRequestClose}
            />
          </div>
          {openModal && modal}
          <footer className={classes.homeFooterContainer}>
            Copyright © 2018 theClubhou.se • 540 Telfair Street • Tel: (706)
            723-5782
        </footer>
        </div>
      );
  }
}
export default withStyles(memberDashStyles)(MemberDash);

MemberDash.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
