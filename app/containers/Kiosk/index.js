/*
 *
 * KioskSystem
 *
 */
import React from 'react';
import Helmet from 'react-helmet';
import Select from 'react-select';
import moment from 'moment';
import { Link } from 'react-router-dom'

import Header from 'components/Header';

import MeetIcon from 'react-icons/lib/fa/group';
import ClassIcon from 'react-icons/lib/fa/graduation-cap';
import WorkIcon from 'react-icons/lib/fa/briefcase';
import EventIcon from 'react-icons/lib/fa/black-tie';

import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/Button';

import './style.css';
import './styleM.css';
import 'react-select/dist/react-select.css';

export default class Kiosk extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: '',
      workspace:"",
      events: [],
      users: [],
      reasons: [],
      showComplete:false,
      selectedReason: '',
      msg:"",
      snack:false,
    }
  }

  componentDidMount() {
    this.getUpcomingEvents();
    this.getProfile();
    this.getReasons();
    this.getTodaysEvents();
  }

  handleRequestClose = () => { this.setState({ snack: false, msg: "" }); };
  showSnack = (msg) => { this.setState({ snack: true, msg: msg }); };

   getProfile = () => {
      fetch('https://innovationmesh.com/api/workspace/'+ this.props.match.params.id, {
        method:'GET'
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        localStorage['workspaceKiosk'] = JSON.stringify(json);
        this.setState({
          workspace:json
        }, function() {
          this.getUsers(json.id);
        })
      }.bind(this))
  }

  getUsers = (id) => {
    fetch('https://innovationmesh.com/api/users/space/'+id)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        users:json
      })
    }.bind(this))
  }

  getReasons = () => {
    fetch('https://innovationmesh.com/api/occasions')
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        reasons:json
      })
    }.bind(this))
  }

  getUpcomingEvents = () => {
    fetch('https://innovationmesh.com/api/upcoming/'+this.props.match.params.id)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        events:json
      })
    }.bind(this))
  }

  getTodaysEvents = () => {
    fetch('https://innovationmesh.com/api/upcoming/'+this.props.match.params.id)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        events:json
      })
    }.bind(this))
  }

  storeAppearance = () => {
    let data = new FormData();
    data.append('userID', this.state.loggedInUser.value);
    data.append('eventID', 0);
    data.append('spaceID', this.state.workspace.id);
    data.append('occasion', this.state.selectedReason);

    fetch('https://innovationmesh.com/api/appearance', {
      method:'POST',
      body:data
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        selectedReason:'',
        showComplete:true
      })
    }.bind(this))
  }

  handleNameInputChange = (loggedInUser) => {
    this.setState({ loggedInUser });
  }

  selectReason = (reason) => {
    this.setState({	selectedReason: reason }, () => {
      this.storeAppearance();
    });
  }

  restartPage = () => {window.location.reload()}

  renderComplete = () => {
    if (this.state.showComplete === true)
    {
      let { events } = this.state;
      return(
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'20px'}}>
          <div className="kioskTitle">Thanks for Checking-In!</div>

          {!!events.length && <div className="kioskSubtitle">Be sure to check out these Events</div>}

          {!!events.length && events.map((event, key) =>
            <Link target="_blank" to={`/event/${event.id}`} key={`eventDiv2${key}`} className="eventList">
              <div className="eventBlock">
                <div className="eventBlockImage"></div>
                  <div  className="eventBlockInfo">
                    <div className="eventBlockTitle">{event.title}</div>
                    <div className="eventBlockDesc">{moment(event.start).format('MMMM, Do, YYYY')}</div>
                  </div>
              </div>
            </Link>
          )}

          <FlatButton style={{background:'#FFFFFF', color:'#222222', marginTop:'30px', width:'80%', fontWeight:'bold'}} onClick={this.restartPage}>Done</FlatButton>
        </div>
      )
    }
  }

  renderReasons = () => {
    let { reasons } = this.state;
    if(this.state.loggedInUser)
    {
      return(
        <div className="kioskReasons">
          <div className="kioskReasonBlock" onClick={() => this.selectReason(reasons.work)}>
            <WorkIcon size={40} style={{marginBottom:'10px'}} />
            {reasons.work}
          </div>
          <div className="kioskReasonBlock" onClick={() => this.selectReason(reasons.meetup)}>
            <MeetIcon size={40} style={{marginBottom:'10px'}} />
            {reasons.meetup}
          </div>
          <div className="kioskReasonBlock" onClick={() => this.selectReason(reasons.event)}>
            <EventIcon size={40} style={{marginBottom:'10px'}} />
            {reasons.event}
          </div>
          <div className="kioskReasonBlock" onClick={() => this.selectReason(reasons.student)}>
            <ClassIcon size={40} style={{marginBottom:'10px'}} />
            {reasons.student}
          </div>
        </div>
      )
    }
  }

  render() {

    return (
      <div className="kioskContainer">
        <Helmet title={"Check-In to " + this.state.workspace.name} meta={[ { name: 'description', content: 'Description of KioskSystem' }]}/>
        <header>

        </header>
        <main className="kioskMain">
          <img className="kioskLogo" src={this.state.workspace.logo} style={{width:'300px', height:'auto', marginTop:'30px'}}/>
          <div className="kioskTitle">Welcome to {this.state.workspace.name}</div>
          <div className="kioskSubtitle">Check-In with Us!</div>
           <div className="kioskContent">
              <Select
                name="form-field-name"
                value={this.state.loggedInUser.value}
                placeholder="Select your Name"
                arrowRenderer={null}
                clearable={true}
                openOnClick={false}
                onChange={this.handleNameInputChange}
                options={this.state.users}
              />

              {this.renderReasons()}

              {this.renderComplete()}

            <Snackbar
              open={this.state.snack}
              message={this.state.msg}
              autoHideDuration={3000}
              onRequestClose={this.handleRequestClose}
            />
          </div>
        </main>
      </div>
    );
  }
}
