/*
 *
 * KioskSystem
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Select from 'react-select';
import KioskFlowTwo from '../../components/KioskFlowTwo'; 
import KioskUpcomingEvents from '../../components/KioskUpcomingEvents'; 

import './style.css';
import './styleM.css';
import 'react-select/dist/react-select.css';

const menuWrapperStyle = {
  margin: '0 auto',
}; 

export default class KioskSystem extends React.PureComponent {
  state = {
    loggedInUser: '',
    kioskStyles: '',
    workspace: '',
    events: [], 
    users: [],
    reasons: [],
    selectedReason: '',
  }
  path = this.props.location.pathname.split('/');
  spaceID = this.path[this.path.length - 1];

  componentDidMount() {

    if (isNaN(this.spaceID) || this.spaceID === "") {
      this.props.history.push('/');
    }

    this.getUpcomingEvents();
    this.getKioskStyles();
    this.getUsers();
    this.getReasons();
  }

  getKioskStyles = () => {
    fetch(`http://localhost:8000/api/kiosk/${this.spaceID}`)
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
    fetch(`http://localhost:8000/api/users/space/${this.spaceID}`)
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
    fetch(`http://localhost:8000/api/occasions`)
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
    fetch(`http://localhost:8000/api/upcoming/${this.spaceID}`)
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

  handleNameInputChange = (loggedInUser) => {
    this.setState({ loggedInUser }); 
  }

  selectReason = reason => this.setState({	selectedReason: reason });

  render() {

    const { 
      events, 
      kioskStyles, 
      users, 
      loggedInUser, 
      workspace, 
      reasons,
      selectedReason
    } = this.state;

    return (
      <div className="kioskContainer">
        <Helmet title="KioskSystem" meta={[ { name: 'description', content: 'Description of KioskSystem' }]}/>

        <main> 
          <div className="kioskBody">
            <div className="kioskLogoBlock">
              <div className="kioskLogoWrapper"></div>
            </div>

            <div className="kioskFormContainer">
               <div className="kioskAutoWrapper">
                 {(kioskStyles && !!users.length) && 
                  <Select 
                    name="form-field-name"
                    value={loggedInUser.value}
                    placeholder= {kioskStyles.inputPlaceholder}
                    arrowRenderer={null} 
                    clearable={true}           
                    openOnClick={false}
                    onChange={this.handleNameInputChange} 
                    options={users}
                    wrapperStyle={menuWrapperStyle}
                  />}
              </div>     

              {(!!reasons.length && loggedInUser && !selectedReason) && 
              <KioskFlowTwo 
                reasons={reasons}
                selectReason={this.selectReason}
              />}
              
              {(kioskStyles && loggedInUser && selectedReason) && [
                <div key="kioskevents" className="kioskUserName">
                  Thanks {(loggedInUser.label.split('-')[0]).trim()}! 
                </div>,
                <KioskUpcomingEvents 
                  key="kioskevents2"
                  events={events} 
                  thanks={`${kioskStyles.userThanks} ${workspace}`}
                />
              ]}
              {/*Switch with just name really nice */}
              
              
            </div>          
          </div> 

          <div className="kioskRedirectNav">
              <small> <a href="/home"> mesh network home </a></small>
          </div>         
        </main>
      </div>
    );
  }
}
