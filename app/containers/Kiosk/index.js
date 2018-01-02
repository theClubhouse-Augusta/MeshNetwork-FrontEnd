/*
 *
 * KioskSystem
 *
 */
import React from 'react';
import Helmet from 'react-helmet';
import Select from 'react-select';

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

  handleRequestClose = () => { this.setState({ snack: false, msg: "" }); };
  showSnack = (msg) => { this.setState({ snack: true, msg: msg }); };

  componentDidMount() {
    this.getUpcomingEvents();
    this.getProfile();
    this.getUsers();
    //this.getReasons();
  }


   getProfile = () => {
      fetch('http://innovationmesh.com/api/workspace/'+ this.props.match.params.id, {
        method:'GET'
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        this.setState({
          workspace:json
        })
      }.bind(this))
  }

  getKioskStyles = () => {
    fetch('http://innovationmesh.com/api/kiosk/'+this.props.match.params.id)
    .then(response => response.json())
    .then(Kiosk => {
      if (Kiosk) {
        this.setState({
          kioskStyles: Kiosk.styles,
          workspace: Kiosk.workspace,
        });
      } else {
        // redirect 404
      }
    })
    .catch(error => {
      // do something with error
    })
  }

  getUsers = () => {
    fetch('http://innovationmesh.com/api/users/space/'+this.props.match.params.id)
    .then(response => response.json())
    .then(Users => {
      if (Users) {
        this.setState({	users: Users });
      }
    })
    .catch(error => {
      // do something with error
    })
  }

  getReasons = () => {
    fetch('http://innovationmesh.com/api/occasions')
    .then(response => response.json())
    .then(Reasons => {
      if (Reasons) {
        this.setState({	reasons: Reasons });
      }
    })
    .catch(error => {
      // do something with error
    })
  }

  getUpcomingEvents = () => {
    fetch('http://innovationmesh.com/api/upcoming/'+this.props.match.params.id)
    .then(response => response.json())
    .then(Events => {
      if (Events) {
        this.setState({	events: Events });
      }
    })
    .catch(error => {
      // do something with error
    })
  }

  storeAppearance = () => {
    let _this = this;
    let data = new FormData();
    data.append('userID', this.state.loggedInUser.value);
    data.append('eventID', 0);
    data.append('spaceID', this.props.match.params.id);
    data.append('occasion', this.state.seelctedReason);

    fetch('http://innovationmesh.com/api/appearance', {
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
    this.setState({	selectedReason: reason },
    function() {
      this.storeAppearance();
    });
  }

  restartPage = () => {window.location.reload()}

  renderComplete = () => {
    if(this.state.showComplete === true)
    {
      return(
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'20px'}}>
          <div className="kioskTitle">Thanks for Checking-In!</div>
          <div className="kioskSubtitle">Be sure to check out these Events</div>

          <div className="eventList">
            <div className="eventBlock">
              <div className="eventBlockImage"></div>
              <div className="eventBlockInfo">
                <div className="eventBlockTitle">Some Event</div>
                <div className="eventBlockDesc">November 18, 2017</div>
              </div>
            </div>
          </div>

          <FlatButton style={{background:'#FFFFFF', color:'#222222', marginTop:'30px', width:'80%', fontWeight:'bold'}} onClick={this.restartPage}>Done</FlatButton>
        </div>
      )
    }
  }

  renderReasons = () => {
    if(this.state.loggedInUser)
    {
      return(
        <div className="kioskReasons">
          <div className="kioskReasonBlock">
            <WorkIcon size={40} style={{marginBottom:'10px'}} onClick={() => this.selectReason('Work')}/>
            Work
          </div>
          <div className="kioskReasonBlock">
            <MeetIcon size={40} style={{marginBottom:'10px'}} onClick={() => this.selectReason('Meet-Up')}/>
            Meet-Up
          </div>
          <div className="kioskReasonBlock">
            <EventIcon size={40} style={{marginBottom:'10px'}} onClick={() => this.selectReason('Event')}/>
            Event
          </div>
          <div className="kioskReasonBlock">
            <ClassIcon size={40} style={{marginBottom:'10px'}} onClick={() => this.selectReason('Class')}/>
            Class
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
          <img className="kioskLogo" src={this.state.workspace.logo}/>
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
