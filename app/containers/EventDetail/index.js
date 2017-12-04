/*
 *
 * EventDetail
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import { TiGroup } from 'react-icons/lib/ti'; 
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Snackbar from 'material-ui/Snackbar'; 
import Header from 'components/Header';
import Footer from 'components/Footer';
import moment from 'moment';

import './style.css';
import './styleM.css';

export default class EventDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      event: '',
    };
    this.path = this.props.location.pathname;
    this.eventIdIndex = this.props.location.pathname.length - 1;
    this.eventID = this.path[this.eventIdIndex];
  }

  componentDidMount() {
    this.getEvent(this.eventID, localStorage.getItem('token'));
  }

  getEvent = (eventID, token) => {
    fetch(`http://localhost:8000/api/showEvent/${eventID}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    .then(reponse => 
      reponse.json()
    )
    .then(Event => {
      this.setState({	event: Event }, () => {
        console.log(JSON.stringify(this.state.event))
      });
    })
    .catch(error => {
      alert(`error: ${error}`)
    });
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };


  render() {  
    const event = this.state.event; 
    return (
      <div className="container">
        <Helmet title="EventDetail" meta={[ { name: 'description', content: 'Description of EventDetail' }]}/>
        <Header />
        
        <main>
          <div className="eventBanner">
            <h1 className="eventName">{event.title}</h1>
            <h2 className="eventDateTime"> 
              {
                moment(event.start).format('Do') === moment(event.end).format('Do')
                  ?
                    `${moment(event.start).format('MMMM Do')}, ${moment(event.end).format('YYYY')}`
                  :
                    `${moment(event.start).format('MMMM Do')} - ${moment(event.end).format('Do')}, ${moment(event.end).format('YYYY')}`
              }
            </h2>
          </div>

          <div className="eventBody">

            <div className="eventDescription">

              <div className="eventQuickInfo">
                  <div className="eventNotices">
                    <div className="eventNotice"> <TiGroup style={{fontSize: '32px'}}/> <label style={{marginLeft: '10px', lineHeight: '32px'}}>Public Welcome</label>  </div>
                  </div>

                  <div className="eventTags">
                    <Chip style={{width: '60px', margin: '5px'}}> TAG </Chip>
                    <Chip style={{width: '60px', margin: '5px'}}> TAG </Chip>
                    <Chip style={{width: '60px', margin: '5px'}}> TAG </Chip>
                    <Chip style={{width: '60px', margin: '5px'}}> TAG </Chip>
                  </div>
                </div>

                <div className="eventDescriptionContent">
                  <p>{event.description}</p>
                </div>

                <div className="eventPeopleBlock">
                  <div className="eventAvatarsBlock"> 
                  
                    <div className="eventOrganizers">
                      <Avatar size={75}/>
                      <Avatar size={75}/>
                      <Avatar size={75}/> 
                    </div>
                  
                    <div className="eventAttendees">
                      <Avatar size={75}/>
                      <Avatar size={75}/>
                      <Avatar size={75}/> 
                      <Avatar size={75}/>
                      <Avatar size={75}/>
                      <Avatar size={75}/> 
                    </div>
                  </div>
                </div> 
              </div>

            <div className="eventLocationInfo">
              <div className="eventMap">
                  <img src={require("../../images/mapa.jpg")} width=" 100%"/> 
              <div className="eventLocation">
               
                  <div className="eventSpace"> the Clubhou.se</div>
                </div>               
                <div className="eventAddress">
                  <address>540 Telfair St, <br />
                    Augusta, GA 30902 <br />
                  </address> 
                </div>
              </div>

              <div className="eventRegistration">
                  <button 
                    onClick={this.handleTouchTap}  
                    style={{ marginTop: '40px'}} 
                  > 
                    register  
                  </button>
                  
                  <Snackbar
                    open={this.state.open}
                    message="You're signed up!"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                  />
              </div>

              <div className="eventUpcomingEvents">
                  <h4 className="eventUpcomingTitle"> Upcoming events @ the Clubhou.se </h4> 
                  <ul className="eventUpcomingList"> 
                    <li style={{lineHeight: '2em'}} >Nov 8  - Beer & Bytes</li>
                    <li style={{lineHeight: '2em'}} >Nov 17 - Growler Gardening</li>
                    <li style={{lineHeight: '2em'}} >Nov 21 - Holiday Pop-up Shop</li>
                  </ul> 
              </div>
              
            </div>
          </div>        
        </main>  

        <Footer />
      </div>
    );
  }
}
