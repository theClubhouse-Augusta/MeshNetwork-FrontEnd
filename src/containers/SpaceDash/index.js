
/*
 *
 * SpaceDash
 *
 */
import React from 'react';
import Helmet from 'react-helmet';
import moment from 'moment';
import PerfectScrollbar from "perfect-scrollbar";
import EventsTable from './EventsTable';
import MemberTable from './MemberTable';
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { withStyles, Grid } from "material-ui";
import ChartistGraph from "react-chartist";
import {
  ContentCopy,
  Store,
  InfoOutline,
  DateRange,
  Accessibility,
  Update,
  AccessTime,
} from "material-ui-icons";
import {
  StatsCard,
  ChartCard,
  ItemGrid
} from "../../components";
import FlatButton from 'material-ui/Button';
import appStyle from '../../variables/styles/appStyle.jsx';
import { allJoins, allAppearances, allEvents } from "../../variables/charts";
import dashboardRoutes from '../../routes';
import image from "../../assets/img/sidebar-2.jpg";
import { DashHeader, Footer, Sidebar } from "../../components";
import SpaceInformation from '../../components/SpaceInformation';
import EventInformation from '../../components/EventInformation';
import OrganizerManager from '../../components/OrganizerManager';
import UserManager from '../../components/UserManager';
import { Checkins } from '../../components/UserData/Checkins';
import { SignUps } from '../../components/UserData/SignUps';
import { CustomerSignUps } from '../../components/UserData/CustomerSignUps';
import Spinner from '../../components/Spinner';
import authenticate from '../../utils/Authenticate';
import "../../assets/css/material-dashboard-react.css";
import ResourceForm from '../../components/ResourceForm';
const spaceInfoAPI = 'http://localhost:8000/api/workspace/auth/';
class SpaceDash extends React.Component {
  state = {
    token: localStorage.getItem('token'),
    user: '',
    currentPage: 'main',
    spaceUsers: [],
    roles: [],
    spaceDescription: '',
    spaceID: 0,
    memberCount: 0,
    eventCount: 0,
    checkinCount: 0,
    spaceEvents: [],
    photoGallery: [],
    resources: [],
    resourceName: "",
    resourceEmail: "",
    msg: "",
    snack: false,
    loading: true,
    thisMonthCheckIns: 0,
    userPage: 0,
    userRowsPerPage: 10,
    eventPage: 0,
    eventRowsPerPage: 10,
    resourceDays: '',
    resourceMonday: 0,
    resourceTuesday: 0,
    resourceWednesday: 0,
    resourceThursday: 0,
    resourceFriday: 0,
    resourceStartTime: '',
    resourceEndTime: '',
    resourceIncrement: 0,
    pageContent: [],
    editEventID: '',
    monthlyBalance: null,
    monthlyBalanceError: false,
    customerCount: 0,
    mobileOpen: false,
    logo: '',
    allJoinsData: '',
    allAppearancesData: '',
    joinsUpdatedAt: '',
    joinsError: '',
    allEventsData: '',
    eventsUpdatedAt: '',
    eventMetricsError: '',
    usingCRM: null,
  };
  async componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      // eslint-disable-next-line
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    let authorized;
    try {
      authorized = await authenticate(localStorage['token']);
    } finally {
      if (authorized !== undefined) {
        const { error, user } = authorized;
        if (user) {
          if (user.roleID !== 2 && user.roleID !== 5) {
            this.props.history.push('/');
          } else {
            this.setState(() => ({ user }));
          }
          this.loadSpaceDescription();
          this.setState({ loading: false });
        } else if (error) {
          localStorage.removeItem('token');
          this.props.history.push('/signin');
        }
      } else {
        localStorage.removeItem('token');
        this.props.history.push('/signin');
      }
    }
  };
  componentDidUpdate() { this.refs.mainPanel.scrollTop = 0; }
  loadJoins = () => {
    fetch(`http://localhost:8000/api/joins/${this.props.match.params.id}`, {})
      .then(response => response.json())
      .then(({
        data,
        updatedAt: joinsUpdatedAt,
        error: joinsError
      }) => {
        if (joinsError) {
          this.setState(() => ({
            joinsError,
            joinsUpdatedAt
          }));
        } else if (data) {
          const allJoinsData = allJoins(data);
          this.setState(() => ({
            allJoinsData,
            joinsUpdatedAt
          }));
        }
      })
  };
  loadEventMetrics = () => {
    fetch(`http://localhost:8000/api/events/metrics/${this.props.match.params.id}`, {})
      .then(response => response.json())
      .then(({
        data,
        updatedAt: eventsUpdatedAt,
        error: eventMetricsError
      }) => {
        if (eventMetricsError) {
          this.setState(() => ({
            eventMetricsError,
            eventsUpdatedAt
          }));
        } else if (data) {
          const allEventsData = allEvents(data);
          this.setState(() => ({
            allEventsData,
            eventsUpdatedAt
          }));
        }
      })
  };
  loadAppearances = () => {
    fetch(`http://localhost:8000/api/appearances/${this.props.match.params.id}`, {})
      .then(response => response.json())
      .then(({
        data,
        updatedAt: appearancesUpdatedAt,
        error: appearancesError
      }) => {
        if (appearancesError) {
          this.setState(() => ({
            appearancesError,
            appearancesUpdatedAt,
          }));
        } else if (data && appearancesUpdatedAt) {
          const allAppearancesData = allAppearances(data);
          this.setState(() => ({
            allAppearancesData,
            appearancesUpdatedAt,
          }));
        }
      })
  };
  handleDrawerToggle = () => {
    this.setState(() => ({
      mobileOpen: !this.state.mobileOpen
    }));
  };
  handleRequestClose = () => {
    this.setState(() => ({
      snack: false, msg: ""
    }));
  };
  showSnack = msg => {
    this.setState(() => ({
      snack: true, msg: msg
    }));
  };
  loadSpaceDescription = async () => {
    const { user } = this.state;
    try {
      const response = await fetch(spaceInfoAPI + this.props.match.params.id, {
        headers: { Authorization: `Bearer ${localStorage['token']}` }
      });
      const {
        description: spaceDescription,
        id: spaceID,
        logo,
        crm: usingCRM
      } = await response.json();
      this.setState(() => ({
        spaceDescription,
        spaceID,
        logo,
        usingCRM,
      }), () => {
        if (usingCRM) {
          if (user.roleID === 2) {
            this.getMonthlyBalance();
          }
          this.getMonthlyCustomerCount();
        }
        this.getSpaceUsers(spaceID);
        this.getSpaceStats(spaceID);
        this.getSpaceEvents(spaceID);
        this.getPhotoGallery(spaceID);
        // this.getResources(spaceID);
        this.loadJoins();
        this.loadAppearances();
        this.loadEventMetrics();
      });
    } catch (err) {
    }
  };
  getMonthlyBalance = () => {
    const now = moment().format('X');
    const lastMonth = moment().format('X') - (86400 * 30);
    fetch(`http://localhost:8000/api/balance/current/${lastMonth}/${now}`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    })
      .then(response => response.json())
      .then(({
        balances,
        error: monthlyBalanceError
      }) => {
        if (monthlyBalanceError) {
          this.setState(() => ({ monthlyBalanceError }))
        } else if (balances) {
          let monthlyBalance = 0;
          balances.forEach(balance => {
            monthlyBalance += balance.amount;
          });

          monthlyBalance = monthlyBalance / 100;
          monthlyBalance = monthlyBalance.toLocaleString("en-US", { style: "currency", currency: "USD" });
          this.setState(() => ({ monthlyBalance }));
        }
      });
  };
  getMonthlyCustomerCount = () => {
    const now = moment().format('X');
    const lastMonth = moment().format('X') - (86400 * 30);
    fetch(`http://localhost:8000/api/customers/month/${lastMonth}/${now}`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    })
      .then(response => response.json())
      .then(({
        customers,
        error
      }) => {
        const customerCount = error ? 0 : customers.length;
        this.setState(() => ({ customerCount }));
      });
  };
  getSpaceStats = (id) => {
    fetch('http://localhost:8000/api/space/metrics/' + id)
      .then(response => response.json())
      .then(({
        memberCount,
        eventCount,
        checkinCount,
        thisMonthCheckIns
      }) => {
        this.setState(() => ({
          memberCount,
          eventCount,
          checkinCount,
          thisMonthCheckIns,
        }));
      });
  };
  getSpaceUsers = (id) => {
    fetch('http://localhost:8000/api/getDashboardUsers/' + id, {
      headers: {
        'Authorization': 'Bearer ' + this.state.token
      }
    })
      .then(response => response.json())
      .then(({
        users: spaceUsers,
        roles,
      }) => {
        this.setState(() => ({
          spaceUsers,
          roles,
        }))
      })
  };
  getSpaceEvents = (id) => {
    fetch('http://localhost:8000/api/events/' + id)
      .then(response => response.json())
      .then(spaceEvents => {
        this.setState(() => ({ spaceEvents }));
      });
  };
  changeMenu = currentPage => {
    if (currentPage === '/addEvent') {
      this.props.history.push(currentPage);
    } else {
      this.setState(() => ({ currentPage }))
    }
  };
  getPhotoGallery = id => {
    fetch('http://localhost:8000/api/photos/' + id)
      .then(response => response.json())
      .then((json) => {
        this.setState(() => ({ photoGallery: json.photos }))
      })
  };
  handleGalleryPhoto = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.storePhoto(file);
    }
    reader.readAsDataURL(file);
  }
  storePhoto = (file) => {
    let photoGallery = this.state.photoGallery.slice();
    let data = new FormData();
    data.append('spaceID', this.state.spaceID);
    data.append('photo', file);
    fetch('http://localhost:8000/api/photos', {
      method: 'POST',
      body: data,
      headers: { 'Authorization': 'Bearer ' + this.state.token }
    })
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          this.showSnack(json.error);
        }
        else if (json.success) {
          this.showSnack(json.success);
          photoGallery.push(json.photo);
          this.setState(() => (() => ({ photoGallery })));
        }
      })
  };
  deletePhoto = (id, i, spaceID) => {
    let photoGallery = this.state.photoGallery.slice();
    let data = new FormData();
    data.append("_method", "DELETE");
    fetch(`http://localhost:8000/api/photos/${id}`, {
      headers: { 'Authorization': 'Bearer ' + this.state.token },
      method: "POST",
      body: data,
    })
      .then(response => response.json())
      .then(({ success, error }) => {
        if (success) {
          photoGallery.splice(i, 1);
          this.setState(() => ({ photoGallery }));
        }
        else {
          this.showSnack(error);
        }
      });

  };
  handleResourceName = (event) => {
    this.setState({
      resourceName: event.target.value
    })
  };
  handleResourceEmail = (event) => {
    this.setState({
      resourceEmail: event.target.value
    })
  };
  handleStartDay = (event) => {
    this.setState({
      resourceStartDay: event.target.value
    })
  };

  handleEndDay = (event) => {
    this.setState({
      resourceEndDay: event.target.value
    })
  };
  handleStartTime = (event) => {
    this.setState({
      resourceStartTime: event.target.value
    })
  };
  handleStartEnd = (event) => {
    this.setState({
      resourceEndTime: event.target.value
    })
  };
  handleIncrement = (event) => {
    this.setState({
      resourceIncrement: event.target.value
    })
  };
  handleUserChangePage = (event, page) => {
    this.setState({ userPage: page });
  };
  handleUserChangeRowsPerPage = event => {
    this.setState({ userRowsPerPage: event.target.value });
  };
  handleEventChangePage = (event, page) => {
    this.setState({ eventPage: page });
  };
  handleEventChangeRowsPerPage = event => {
    this.setState({ eventRowsPerPage: event.target.value });
  };
  editEventID = id => this.setState({ editEventID: id });
  deleteEvent = (eventID, index) => {
    fetch(`http://localhost:8000/api/event/delete/${eventID}`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    })
      .then(response => response.json())
      .then(({ success, error }) => {
        if (success) {
          const spaceEvents = this.state.spaceEvents.slice();
          spaceEvents.splice(index, 1);
          this.setState(() => ({ spaceEvents }));
        } else if (error) {
        }
      })
  };
  handleRoleChange = (event, key, user) => {
    let spaceUsers = this.state.spaceUsers;
    spaceUsers[key].roleID = event.target.value;
    this.setState({
      spaceUsers: spaceUsers
    }, () => {
      let data = new FormData();
      data.append('userID', user);
      data.append('roleID', event.target.value);

      fetch('http://localhost:8000/api/changeRole', {
        method: 'POST',
        body: data,
        headers: {
          'Authorization': 'Bearer ' + this.state.token
        }
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          this.showSnack('Role Updated');
        });
    });
  };
  deleteEvent = (eventID, index) => {
    fetch(`http://localhost:8000/api/event/delete/${eventID}`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    })
      .then(response => response.json())
      .then(({ success, error }) => {
        if (success) {
          const spaceEvents = this.state.spaceEvents.slice();
          spaceEvents.splice(index, 1);
          this.setState(() => ({ spaceEvents }));
        } else if (error) {
        }
      })
      .catch(error => {
        //
      })
  };
  renderDashContent = () => {
    const {
      allJoinsData,
      allAppearancesData,
      appearancesError,
      currentPage,
      joinsUpdatedAt,
      joinsError,
      appearancesUpdatedAt,
      monthlyBalance,
      monthlyBalanceError,
      customerCount,
      memberCount,
      thisMonthCheckIns,
      allEventsData,
      eventsUpdatedAt,
      eventMetricsError,
      spaceUsers,
      userPage,
      userRowsPerPage,
      spaceEvents,
      eventPage,
      eventRowsPerPage,
      usingCRM,
      user,
    } = this.state;
    if (currentPage === 'main') {
      return (
        <div>
          <Grid container>
            {(thisMonthCheckIns && usingCRM && user.roleID === 2) ?
              <ItemGrid xs={12} sm={6} md={3}>
                <StatsCard
                  icon={InfoOutline}
                  iconColor="orange"
                  title="Check-ins"
                  description={thisMonthCheckIns}
                  statIcon={DateRange}
                  statText="Last 30 Days"
                />
              </ItemGrid>
              : (thisMonthCheckIns && usingCRM && user.roleID === 5) ?
                <ItemGrid xs={12} sm={6} md={4}>
                  <StatsCard
                    icon={InfoOutline}
                    iconColor="orange"
                    title="Check-ins"
                    description={thisMonthCheckIns}
                    statIcon={DateRange}
                    statText="Last 30 Days"
                  />
                </ItemGrid>
                : !usingCRM ?
                  <ItemGrid xs={6} sm={6} md={6}>
                    <StatsCard
                      icon={InfoOutline}
                      iconColor="orange"
                      title="Check-ins"
                      description={thisMonthCheckIns}
                      statIcon={DateRange}
                      statText="Last 30 Days"
                    />
                  </ItemGrid>
                  :
                  <ItemGrid xs={12} sm={6} md={3}>
                    <Spinner loading={true} size={50} />
                  </ItemGrid>
            }
            {((monthlyBalance || monthlyBalanceError) && usingCRM) ?
              <ItemGrid xs={12} sm={6} md={3}>
                <StatsCard
                  icon={Store}
                  iconColor="red"
                  title="Revenue"
                  description={monthlyBalance ? monthlyBalance : "$0.00"}
                  statIcon={DateRange}
                  statText="Last 30 Days"
                />
              </ItemGrid>
              :
              (usingCRM && user.roleID === 2) ?
                <ItemGrid xs={12} sm={6} md={3}>
                  <Spinner loading={true} size={50} />
                </ItemGrid>
                : null
            }
            {(customerCount && usingCRM && user.roleID === 2) ?
              <ItemGrid xs={12} sm={6} md={3}>
                <StatsCard
                  icon={ContentCopy}
                  iconColor="blue"
                  title="New Paying Members"
                  description={customerCount}
                  statIcon={DateRange}
                  statText="Last 30 Days"
                />
              </ItemGrid>
              : (customerCount && usingCRM && user.roleID === 5) ?
                <ItemGrid xs={12} sm={6} md={4}>
                  <StatsCard
                    icon={ContentCopy}
                    iconColor="blue"
                    title="New Paying Members"
                    description={customerCount}
                    statIcon={DateRange}
                    statText="Last 30 Days"
                  />
                </ItemGrid>
                : usingCRM ?
                  <ItemGrid xs={12} sm={6} md={4}>
                    <Spinner loading={true} size={50} />
                  </ItemGrid>
                  : null
            }
            {(memberCount && usingCRM && user.roleID === 2) ?
              <ItemGrid xs={12} sm={6} md={3}>
                <StatsCard
                  icon={Accessibility}
                  iconColor="purple"
                  title="Total Members"
                  description={memberCount}
                  statIcon={Update}
                  statText="Just Updated"
                />
              </ItemGrid>
              : (memberCount && usingCRM && user.roleID === 5) ?
                <ItemGrid xs={12} sm={6} md={4}>
                  <StatsCard
                    icon={Accessibility}
                    iconColor="purple"
                    title="Total Members"
                    description={memberCount}
                    statIcon={Update}
                    statText="Just Updated"
                  />
                </ItemGrid>
                : !usingCRM ?
                  <ItemGrid xs={12} sm={6} md={6}>
                    <StatsCard
                      icon={Accessibility}
                      iconColor="purple"
                      title="Total Members"
                      description={memberCount}
                      statIcon={Update}
                      statText="Just Updated"
                    />
                  </ItemGrid>
                  :
                  <ItemGrid xs={12} sm={6} md={3}>
                    <Spinner loading={true} size={50} />
                  </ItemGrid>
            }
          </Grid>

          {/* Graphs */}
          <Grid container>
            {(allJoinsData && joinsUpdatedAt) ?
              <ItemGrid xs={12} sm={12} md={4}>
                <ChartCard
                  chart={
                    <ChartistGraph
                      className="ct-chart"
                      data={allJoinsData.data}
                      type="Line"
                      options={allJoinsData.options}
                      listener={allJoinsData.animation}
                    />
                  }
                  chartColor="green"
                  title="Member onboarding"
                  statIcon={AccessTime}
                  statText={`Updated at ${moment(joinsUpdatedAt).fromNow()}`}
                />
              </ItemGrid>
              :
              joinsError ?
                <ItemGrid xs={12} sm={12} md={4}>
                  <ChartCard
                    chart={
                      <ChartistGraph
                        className="ct-chart"
                        data={null}
                        type="Line"
                        options={null}
                        listener={null}
                      />
                    }
                    chartColor="green"
                    title={joinsError}
                    statIcon={AccessTime}
                    statText={`Updated at ${moment(joinsUpdatedAt).fromNow()}`}
                  />
                </ItemGrid>
                :
                <ItemGrid xs={12} sm={12} md={4}>
                  <Spinner loading={true} size={50} />
                </ItemGrid>
            }

            {(allAppearancesData && appearancesUpdatedAt) ?
              <ItemGrid xs={12} sm={12} md={4}>
                <ChartCard
                  chart={
                    <ChartistGraph
                      className="ct-chart"
                      data={allAppearancesData.data}
                      type="Bar"
                      options={allAppearancesData.options}
                      responsiveOptions={allAppearancesData.responsiveOptions}
                      listener={allAppearancesData.animation}
                    />
                  }
                  chartColor="purple"
                  title={`Total visits`}
                  statIcon={AccessTime}
                  statText={`Updated at ${moment(appearancesUpdatedAt).fromNow()}`}
                />
              </ItemGrid>
              :
              appearancesError ?
                <ItemGrid xs={12} sm={12} md={4}>
                  <ChartCard
                    chart={
                      <ChartistGraph
                        className="ct-chart"
                        data={null}
                        type="Bar"
                        options={null}
                        responsiveOptions={null}
                        listener={null}
                      />
                    }
                    chartColor="purple"
                    title={appearancesError}
                    statIcon={AccessTime}
                    statText={`Updated at ${moment(appearancesUpdatedAt).fromNow()}`}
                  />
                </ItemGrid>
                :
                <ItemGrid xs={12} sm={12} md={4}>
                  <Spinner loading={true} size={50} />
                </ItemGrid>
            }
            {(allEventsData && eventsUpdatedAt) ?
              <ItemGrid xs={12} sm={12} md={4}>
                <ChartCard
                  chart={
                    <ChartistGraph
                      className="ct-chart"
                      data={allEventsData.data}
                      type="Line"
                      options={allEventsData.options}
                      listener={allEventsData.animation}
                    />
                  }
                  chartColor="red"
                  title="Total Hosted Events"
                  statIcon={AccessTime}
                  statText={`Updated at ${moment(eventsUpdatedAt).fromNow()}`}
                />
              </ItemGrid>
              :
              eventMetricsError ?
                <ItemGrid xs={12} sm={12} md={4}>
                  <ChartCard
                    chart={
                      <ChartistGraph
                        className="ct-chart"
                        data={null}
                        type="Line"
                        options={null}
                        listener={null}
                      />
                    }
                    chartColor="red"
                    title={eventMetricsError}
                    statIcon={AccessTime}
                    statText={`Updated at ${moment(eventsUpdatedAt).fromNow()}`}
                  />
                </ItemGrid>
                :
                <ItemGrid xs={12} sm={12} md={4}>
                  <Spinner loading={true} size={50} />
                </ItemGrid>
            }
          </Grid>
          <Grid container>
            {spaceUsers ?
              <MemberTable
                headerColor="orange"
                users={spaceUsers}
                userPage={userPage}
                userRowsPerPage={userRowsPerPage}
                handleUserChangePage={this.handleUserChangePage}
                handleUserChangeRowsPerPage={this.handleUserChangeRowsPerPage}
                title="Members"
              />
              :
              <ItemGrid xs={12} sm={12} md={6}>
                <Spinner loading={true} size={50} />
              </ItemGrid>
            }
            {spaceEvents ?
              <EventsTable
                headerColor="blue"
                spaceEvents={spaceEvents}
                eventPage={eventPage}
                eventRowsPerPage={eventRowsPerPage}
                title="Events"
                eventMetricsError={eventMetricsError ? eventMetricsError : null}
                changeMenu={this.changeMenu}
                editEventID={this.editEventID}
                deleteEvent={this.deleteEvent}
                handleEventChangeRowsPerPage={this.handleEventChangeRowsPerPage}
                handleEventChangePage={this.handleEventChangePage}
              />
              :
              <ItemGrid xs={12} sm={12} md={6}>
                <Spinner loading={true} size={50} />
              </ItemGrid>
            }
          </Grid>
        </div>
      )
    }
    else if (this.state.currentPage === 'updateSpace') {
      return (
        <div>
          <SpaceInformation
            id={this.props.match.params.id}
            spaceID={this.state.spaceID}
            description={this.state.spaceDescription}
          />
        </div>
      );
    }
    else if (this.state.currentPage === 'updatePhotos') {
      return (
        <div className="spaceDashContent">
          <div style={{ width: '20%', paddingLeft: '15px', paddingRight: '15px' }}>
            <label htmlFor="photo-file" style={{ width: '10%', margin: '10px' }}>
              <div style={{ fontFamily: 'Noto Sans', textTransform: 'uppercase', fontSize: '0.9em', textAlign: 'center', width: '100%', background: '#ff4d58', paddingTop: '10px', paddingBottom: '10px', color: '#FFFFFF', fontWeight: 'bold' }} >Upload Photo</div>
            </label>
            <input type="file" accept="image/*" onChange={this.handleGalleryPhoto} id="photo-file" style={{ display: 'none' }} />
          </div>
          <div className="spaceDashPhotoGallery">
            {this.state.photoGallery.map((photo, i) => (
              <div key={`photoGallery${i}`} className="spaceDashPhotoBlock">
                <img alt="" src={photo.photoThumbnail} />
                <FlatButton style={{ width: '100%', background: '#ff4d58', paddingTop: '10px', paddingBottom: '10px', color: '#FFFFFF', fontWeight: 'bold', alignSelf: 'center' }}
                  onClick={() => this.deletePhoto(photo.id, i, this.state.spaceID)}
                >Delete photo</FlatButton>
              </div>
            ))}
          </div>
        </div>
      )
    }
    else if (this.state.currentPage === 'organizerManager') {
      return spaceUsers.length ?
        <OrganizerManager
          users={this.state.spaceUsers}
          roles={this.state.roles}
          history={this.state.history}
        />
        :
        <Spinner loading={true} />;
    }
    else if (this.state.currentPage === 'userManager') {
      return (
        <div className="spaceDashContent">
          <UserManager {...this.props} />
        </div>
      );
    }
    else if (this.state.currentPage === 'userParticipation') {
      return (
        <div className="spaceDashContent">
          <div style={{ marginLeft: 32 }}>
            <Checkins {...this.props} />
            <SignUps {...this.props} />
            <CustomerSignUps {...this.props} />
          </div>
        </div>
      );
    }
    else if (this.state.currentPage === 'editResources') {
      return (
        this.state.spaceID ?
          <ResourceForm
            history={this.props.history}
            spaceName={this.props.spaceName}
            spaceID={this.state.spaceID}
          />
          : null
      );
    } else if (this.state.currentPage === 'editEvent') {
      return (
        <div className="spaceDashContent">
          <EventInformation {...this.props} id={this.state.editEventID} />
        </div>
      )
    } else if (this.state.currentPage === 'userInfo') {
    }
  }

  render() {
    const {
      classes,
      spaceName,
      history
    } = this.props;
    return (
      this.state.loading
        ?
        <div className={classes.mainPanel} ref="mainPanel">
          <Spinner loading={this.state.loading} />
        </div>
        :
        <div className={classes.wrapper}>
          <Sidebar
            routes={dashboardRoutes}
            usingCRM={this.state.usingCRM}
            role={this.state.user.roleID}
            logo={this.state.logo}
            image={image}
            handleDrawerToggle={this.handleDrawerToggle}
            open={this.state.mobileOpen}
            color="blue"
            changeMenu={this.changeMenu}
            currentRoute={this.state.currentPage}
            spaceName={spaceName}
            history={history}
          />
          <div className={classes.mainPanel} ref="mainPanel">
            <Helmet title="Space Dashboard" meta={[{ name: 'description', content: 'Description of SpaceDashboard' }]} />
            <DashHeader
              routes={dashboardRoutes}
              handleDrawerToggle={this.handleDrawerToggle}
              space={this.props.spaceName}
              spaceName={this.props.spaceName}
              history={this.props.history}
            />
            <div className={classes.content}>
              <div className={classes.container}>
                {this.renderDashContent()}
              </div>
            </div>
            <Footer history={history} />
          </div>
        </div>
    );
  }
}

export default withStyles(appStyle)(SpaceDash);
