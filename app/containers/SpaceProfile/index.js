/*
 *
 * SpaceProfile
 *
 */
import React from 'react';
import Helmet from 'react-helmet';
import classNames from 'classnames';

import Header from 'components/Header'; 
import Footer from 'components/Footer'; 
import MapComponent from 'components/MapComponent'; 
import {
  TiSocialAtCircular,   
  TiSocialFacebookCircular,
  TiSocialInstagramCircular,
  TiSocialTwitterCircular, 
  TiInputChecked, 
  TiArrowSync
} from 'react-icons/lib/ti';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar'; 
import Chip from 'material-ui/Chip';
import Card, { CardHeader, CardMedia } from 'material-ui/Card'; 


import './style.css';
import './styleM.css';


const space = { 
  name: 'the Clubhou.se', 
  website: '/clubhouse', 
  email: '', 
  socialMedia : {
      facebook: '', 
      twitter: '', 
      instagram: '', 
  }, 
  lowestTier: '$20', 
}

const styles = {
  avatar: {
    margin: 20,
    background: '#AAAAAA', 
    width: 60,
    height: 60,
  },
  list: {
    listStyleType: 'disc',
    columnCount: '2', 
    padding: '15px',

  },
  listItem: {
    display: 'block',
    lineHeight: '2em',
  }, 
};

export default class SpaceProfile extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      token:sessionStorage.getItem("token"),
      profile:""
    }
  }

  componetWillMount() {
    //this.getProfile();
  }

  getProfile = () => {
    fetch("", {
      method:'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        profile:json.profile
      })
    }.bind(this))
  }

  render() {
    
    const events =[
      { name: 'Javascript Meetup', 
        time: '6:30-8pm',  
        date: 'Thurs, November 30th', 
        image: '', 
        description: 'Object Modeling with Mongoose',
        location: 'the Clubhou.se',
      }, 
      { name: 'One Million Cups', 
        time: '8:30am', 
        date: 'Wed, December 6th', 
        image: '', 
        description: 'Pitches, and coffee, and mingling',
        location: 'the Clubhou.se',
    }
    ]; 

    const eventCards = events.map((event) => (
      <Card className="spaceEventCard" containerStyle={{width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap',  justifyContent: 'space-between'}}> 
        <CardMedia className="spaceEventCardImage">
         
        </CardMedia>

        <div className="spaceEventCardContent">
          <CardHeader title={event.name} style={{padding: '0'}} />
          <div className="spaceEventCardDetails">
            <span className="spaceEventCardDate" style={{margin: '1em 0'}}> {event.date} </span>
            <span className="spaceEventCardTime" style={{margin: '1em'}}>
            {event.time} </span>
            <span className="spaceEventCardLocation" style={{margin: '1em 0 0 1em'}}> {event.location} </span>
          </div>
          <p className="spaceEventCardDescription"> {event.description} </p> 
        </div>
      </Card>
    ))

    return (
      <div className="container">
        <Helmet title="SpaceProfile" meta={[ { name: 'description', content: 'Description of SpaceProfile' }]}/>
        <Header />
        
        <main className="spaceProfileMain"> 

            <div className="spaceProfileBanner">
              <div className="spaceProfileBannerColumnLeft">
                <div className="spaceProfileHeader">
                <div> 
                  <h2 className="spaceProfileName">{space.name}</h2>
                  <div className="spaceProfileContactLinks">
                    <div className="spaceProfileContact">
                      <p className="spaceProfileEmail"> <TiSocialAtCircular /> <a href="mailto:heythere@thecluhou.se" >heythere@theclubhou.se</a></p>
                      <p className="spaceProfileWebsite"><a href="">http://theclubhou.se</a></p>
                    </div>
                    <div className="spaceProfileSocialMediaBlock">
                      <span className="spaceProfileSocialIcon">
                        <a href='mailto:'>
                          
                          <span className="spaceProfileSocialLabel">{space.email}</span> 
                        </a> 
                      </span>
              
                      <span className="spaceProfileSocialIcon"> 
                        <a href="">
                          <TiSocialFacebookCircular  />
                          <span className="spaceProfileSocialLabel">{space.facebook}  </span>
                        </a>
                      </span>

                      <span className="spaceProfileSocialIcon">
                        <a href=""> 
                          <TiSocialInstagramCircular /> 
                          <span className="spaceProfileSocialLabel">  </span>
                        </a> 
                      </span>

                      <span className="spaceProfileSocialIcon"> 
                        <a href=""> 
                          <TiSocialTwitterCircular />
                          <span className="spaceProfileSocialLabel">{space.twitter}</span>
                        </a>
                      </span> 
                    </div>                  
                  </div>
                </div> 
                  <img src="https://theclubhou.se/wp-content/uploads/2017/04/theclubhouselogo-1.png" height="200px" width="200px" />
                </div>
                
                <div className="spaceProfileAmeneties">
                <p style={{fontSize: '1.5em', fontWeight: '600', color: '#4167b1' }}> Offering </p>
                  <ul className="spaceProfileOfferings"> 
                    <li style={{margin: '.25em'}}>Co-working Space</li>
                    <li style={{margin: '.25em'}}>Maker Space</li>
                    <li style={{margin: '.25em'}}> Startup Incubation/Acceleration</li>
                  </ul>
              </div>
            </div>

            <div className="spaceProfileBannerColumnRight">
              <div className="spaceProfileMap">
              <MapComponent
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAHpoe-vzS5soyKj6Q4i8stTy6fZtYmqgs&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: '100%' }} />}
                  containerElement={<div id="mapComp" />}
                  mapElement={<div style={{ height: '100%' }} />}
                  lat={33.5105746}
                  lon={-82.08560469999999}
              />
              </div>
            </div>

            </div>

            
             
           <div className="spaceProfileBody">
           <div className="spaceProfileAbout"
           >
                <div className="spaceProfileAboutContent">
                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>

                <div className="spaceProfileStaff"></div>
            </div>

      <Divider />

            <div className="spaceProfileMembership">
                
                <div className="spaceProfileMemberships">
                  <h4>Memberships:</h4>
                  <p> starting at {space.lowestTier}</p>
                  <button style={{border: '1px dashed peru'}}> Explore Memberships </button>
                </div>

                <div className="spaceProfileMembershipPerks">
                  <h4> Space Perks </h4>
                  <div className="spaceProfilePerksWrapper">
                    <ul style={styles.list}> 
                     <li style={styles.listItem}>Semi private workspace and desks</li>
                     <li style={styles.listItem}>Secure Wifi</li>
                     <li style={styles.listItem}>Electronics and Prototyping Lab</li>
                     <li style={styles.listItem}>Community & Networking Events</li>
                     <li style={styles.listItem}>Free off-street parking</li>
                     <li style={styles.listItem}>Enclosed outdoor courtyard with patio seating</li>
                     <li style={styles.listItem}>Coffee and monthly specials</li>
                     <li style={styles.listItem}>3-D Printer</li>
                    </ul>
                  </div>
                </div>

                <div className="spaceProfileMembershipContact">
                  <div className="spaceProfileBookATour">
                    <button style={{border: '1px dashed peru'}}> Book A Tour </button> 
                  </div>

                  <div className="spaceProfileMembAddContact">
                    <p> For more information:</p>
                    <ul className="spaceProfileMemConLinks">
                      <li> <a href="http://theclubhou.se/join">http://theclubhou.se/join</a> </li>
                      <li>  <a href="mailto:heythere@theclubhou.se">
                      heythere@theclubhou.se </a></li>
                      
                    </ul>
                  </div>
                </div>
            </div>
    
    <Divider />      

            <div className="spaceProfileUpcomingEvents">
                <h4 style={{textAlign: 'center'}}> Upcoming Events </h4>
                <div className="spaceProfileEventsWrapper">
                {eventCards}
                </div>
                
            </div>

    <Divider />

            <div className="spaceProfileSpaceMembers">
            <h4 className="spaceProfileMemberHeader">Members</h4>
            <div className="spaceProfileAvatarBlock">
            <Avatar style={styles.avatar}> AB </Avatar> 
          <Avatar style={styles.avatar}> AB </Avatar> 
          <Avatar style={styles.avatar}> AB </Avatar> 
          <Avatar style={styles.avatar}> AB </Avatar> 
          <Avatar style={styles.avatar}> AB </Avatar> 
          <Avatar style={styles.avatar}> AB </Avatar> 
          <Avatar style={styles.avatar}>  AB </Avatar> 
          <Avatar style={styles.avatar}> AB </Avatar> 
            </div>
    
            </div>
           
           </div>
            
         

        
        </main>

       <Footer />
      </div>
    );
  }
}
