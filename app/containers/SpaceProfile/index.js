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
import Moment from 'react-moment';
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
      events: [],
      users:[],
      }
  }

  componentWillMount() {
    this.getProfile();
    this.getSpaceEvents();
    this.getUsers();
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
        spaceProfile:json
      })
    }.bind(this))
}

  getSpaceEvents = () => {
    fetch('http://innovationmesh.com/api/upcoming/'+ this.props.match.params.id, {
      method: 'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        events:json
      })
    }.bind(this))
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

            <div className="spaceProfileMap">
              <img src={"https://maps.googleapis.com/maps/api/staticmap?center="+ this.state.spaceProfile.city +","+ this.state.spaceProfile.state +"&zoom=13&size=1280x300&maptype=roadmap&markers=color:blue%7C"+this.state.spaceProfile.lat+","+this.state.spaceProfile.lon+"&key=AIzaSyBDiXTt6jIkCs_VKtQeBZcVosIEgAdR1R0"}/>
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
                  <p dangerouslySetInnerHTML={{__html:this.state.spaceProfile.description}} />
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

                {/*}<div className="spaceProfileMembershipPerks">
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
                </div>*/}

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
                  <div className="eventList">
                    {this.state.events.map((event, i) => (
                      <Link to={'/event/' + event.id} className="eventBlock">
                        <div className="eventBlockImage"></div>
                        <div className="eventBlockInfo">
                          <div className="eventBlockTitle">{event.title}</div>
                          <div className="eventBlockDesc">
                            <Moment parse="YYYY-MM-DD HH:mm">
                                {event.start}
                            </Moment>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
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
