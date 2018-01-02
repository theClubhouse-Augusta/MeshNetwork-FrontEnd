/*
 *
 * SpaceProfile
 *
 */
import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
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
import FlatButton from 'material-ui/Button';


import './style.css';
import './styleM.css';


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
      token:localStorage.getItem("token"),
      spaceProfile:'',
      profileEvents: '',
      users:[],
      }
  }

  componentWillMount() {
    this.getProfile();
    //getSpaceEvents();
    this.getUsers();
  }

 getProfile = () => {
    fetch('http://localhost:8000/api/workspace/'+ this.props.match.params.id, {
      method:'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        spaceProfile:json
      })
    }.bind(this))
}

  getSpaceEvents = () => {
    fetch(`http://localhost:8000/api/events/upcoming/${this.state.id}`, {
      method: 'GET'
    })
    .then((response) => {
      return response.json();
    }).then(data => {
      let profileEvents = data.response.map((profileEvent) => {
        return (
          <div  key={'profileCard' + profileCard.id}>
          <Card
          className="spaceEventCard" containerStyle={{width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap',  justifyContent: 'space-between'}}>
          <CardMedia className="spaceEventCardImage">

          </CardMedia>

          <div className="spaceEventCardContent">
            <CardHeader title={event.name} style={{padding: '0'}} />
            <div className="spaceEventCardDetails">
              <span className="spaceEventCardDate" style={{margin: '1em 0'}}>  </span>
              <span className="spaceEventCardTime" style={{margin: '1em'}}>
               </span>
              <span className="spaceEventCardLocation" style={{margin: '1em 0 0 1em'}}> </span>
            </div>
            <p className="spaceEventCardDescription">  </p>
          </div>
        </Card>
        </div>
        )
      })
      this.setState({profileEvents:profileEvents});
    })
  }

  getUsers = () => {
    fetch('http://innovationmesh.com/api/users/space/' + this.props.match.params.id, {
      method:'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        users:json
      })
    }.bind(this))
  }

  render() {

    return (
      <div className="container">
        <Helmet title="SpaceProfile" meta={[ { name: 'description', content: 'Description of SpaceProfile' }]}/>
        <Header />

        <main className="spaceProfileMain">

            <div className="spaceProfileBanner">
              <div className="spaceProfileBannerColumnLeft">
                <div className="spaceProfileHeader">
                <div>
                  <h2 className="spaceProfileName">{this.state.spaceProfile.name}</h2>
                  <div className="spaceProfileContactLinks">
                    <div className="spaceProfileContact">
                      <p className="spaceProfileEmail"> <TiSocialAtCircular /> <a href="mailto:" >{this.state.spaceProfile.email}</a></p>
                      <p className="spaceProfileWebsite"><a href={this.state.spaceProfile.website}>{this.state.spaceProfile.website}</a></p>
                    </div>
                    <div className="spaceProfileSocialMediaBlock">
                      <span className="spaceProfileSocialIcon">
                        <a href='mailto:'>
                          <span className="spaceProfileSocialLabel"></span>
                        </a>
                      </span>

                      <span className="spaceProfileSocialIcon">
                        <a href="">
                          <TiSocialFacebookCircular  />
                          <span className="spaceProfileSocialLabel">  </span>
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
                          <span className="spaceProfileSocialLabel"></span>
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
                <img src={this.state.spaceProfile.logo} height="auto" width="300px" />
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
                  lon={-82.0856046}
              />
              </div>
            </div>

            </div>



           <div className="spaceProfileBody">
           <div className="spaceProfileActions">
             <Link to={'/booking/' + this.state.spaceProfile.id}><FlatButton style={{background:'#3399cc', color:'#FFFFFF', width:'200px'}}>Booking System </FlatButton></Link>
             <Link to={'/join/' + this.state.spaceProfile.id}><FlatButton style={{background:'#ee3868', color:'#FFFFFF', width:'200px'}}>Join This Space </FlatButton></Link>
             <Link to={'/kiosk/' + this.state.spaceProfile.id}><FlatButton style={{background:'#3399cc', color:'#FFFFFF', width:'200px'}}>Check-In</FlatButton></Link>
           </div>


           <div className="spaceProfileAbout"
           >
                <div className="spaceProfileAboutContent">
                <p> {this.state.spaceProfile.description} </p>
                </div>

                <div className="spaceProfileStaff"></div>
            </div>

      <Divider />

            <div className="spaceProfileMembership">

                <div className="spaceProfileMemberships">
                  <h4>Memberships:</h4>
                  <p> starting at </p>
                  <FlatButton style={{background:'#ee3868', color:'#FFFFFF', width:'200px'}}>Explore Memberships </FlatButton>
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

                  <div className="spaceProfileMembAddContact">
                    <p> For more information:</p>
                    <ul className="spaceProfileMemConLinks">
                      <li> <a href={this.state.spaceProfile.website}>Website</a> </li>
                      <li>  <a href="mailto:heythere@theclubhou.se">
                      {this.state.spaceProfile.email} </a></li>
                    </ul>
                  </div>
                </div>
            </div>

    <Divider />

            <div className="spaceProfileUpcomingEvents">
                <h4 style={{textAlign: 'center'}}> Upcoming Events </h4>
                <div className="spaceProfileEventsWrapper">
                 {this.state.profileEvents}
                </div>

            </div>

    <Divider />

            <div className="spaceProfileSpaceMembers">
            <h4 className="spaceProfileMemberHeader">Members</h4>
            <div className="spaceProfileUserList">
             {this.state.users.map((u, i) => (
              <div className="spaceProfileUser" key={i}>
                <img className="spaceProfileUserAvatar" src={u.avatar}/>
                <div className="spaceProfileUserContent">{u.name}</div>
              </div>
             ))}
            </div>

            </div>

           </div>




        </main>

       <Footer />
      </div>
    );
  }
}
