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
import RaisedButton from 'material-ui/RaisedButton';  
import Header from 'components/Header';
import Footer from 'components/Footer';

import './style.css';
import './styleM.css';

export default class EventDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
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
    return (
      <div className="container">
        <Helmet title="EventDetail" meta={[ { name: 'description', content: 'Description of EventDetail' }]}/>
        <Header />
        
        <main>
          <div className="eventBanner">
            <h1 className="eventName"> Javascript Meetup</h1>
            <h2 className="eventDateTime"> October 26, 2017 &nbsp;
              <time>6:30-8:00pm </time> </h2>
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
                  <p>Cat ipsum dolor sit amet, dead stare with ears cocked friends are not food so use lap as chair but stand in front of the computer screen. Scratch at the door then walk away thug cat yet claw drapes. Meow mew so i cry and cry and cry unless you pet me, and then maybe i cry just for fun spill litter box, scratch at owner, destroy all furniture, especially couch but vommit food and eat it again, roll on the floor purring your whiskers off or meowwww. Paw at beetle and eat it before it gets away unwrap toilet paper catch mouse and gave it as a present.</p>
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
                  <RaisedButton onClick={this.handleTouchTap}  style={{ marginTop: '40px'}} backgroundColor="#e36937"  > register  </RaisedButton>
                  
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
