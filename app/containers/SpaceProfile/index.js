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

import DoubleArrow from 'react-icons/lib/fa/angle-double-right';
import FacebookIcon from 'react-icons/lib/fa/facebook';
import TwitterIcon from 'react-icons/lib/fa/twitter';
import InstagramIcon from 'react-icons/lib/fa/instagram';
import MailIcon from 'react-icons/lib/fa/envelope-o';
import LinkIcon from 'react-icons/lib/fa/chain';


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
      }, function() {
        this.getSpaceEvents(this.state.spaceProfile.id);
        this.getUsers(this.state.spaceProfile.id);
      })
    }.bind(this))
}

  getSpaceEvents = (id) => {
    fetch('http://innovationmesh.com/api/workevents/'+ id, {
      method: 'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        events:json.data
      })
    }.bind(this))
  }

  getUsers = (id) => {
    fetch('http://innovationmesh.com/api/spaceOrganizers/' + id, {
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
        <Helmet title={this.state.spaceProfile.name} meta={[ { name: 'description', content: 'Description of SpaceProfile' }]}/>
        <header>
          <Header />
        </header>

        <main>
          <div className="spaceGalleryContainer"></div>
          <div className="spaceMainHeader">
            <div className="spaceMainContainer" style={{alignItems:'center'}}>
              <div className="spaceMainOne">
                <div className="spaceMainBread">MeshNetwork<DoubleArrow size={10} style={{marginLeft:'5px', marginRight:'5px'}}/> WorkSpace <DoubleArrow size={10} style={{marginLeft:'5px', marginRight:'5px'}}/> Home </div>
                <div className="spaceMainTitle">{this.state.spaceProfile.name}</div>
                <div className="spaceMainSlogan">{this.state.spaceProfile.city}&#39;s Collaborative Workspace</div>
                <div className="spaceContact">
                  <a href={this.state.spaceProfile.facebook} className="spaceContactBlock">
                    <FacebookIcon size={20}/>
                  </a>
                  <a href={this.state.spaceProfile.twitter} className="spaceContactBlock">
                    <TwitterIcon size={20}/>
                  </a>
                  <a href={this.state.spaceProfile.instagram} className="spaceContactBlock">
                    <InstagramIcon size={20}/>
                  </a>
                  <a href={this.state.spaceProfile.website} className="spaceContactBlock">
                    <LinkIcon size={20}/>
                  </a>
                  <a href={"mailto:"+ this.state.spaceProfile.email} className="spaceContactBlock">
                    <MailIcon size={20}/>
                  </a>
                </div>
              </div>
              <div className="spaceMainTwo">
                <img src={this.state.spaceProfile.logo} className="spaceMainLogo"/>
              </div>
            </div>
          </div>
          <div className="spaceMainContent">
            <div className="spaceMainContainer">
              <div className="spaceMainOne">
                <div className="spaceShare"></div>
                <div className="spaceMainDescription">
                  {this.state.spaceProfile.description}
                </div>
                <div className="spaceFeatures"></div>
                <div className="spaceEvents">
                  {this.state.events.map((event, i) => (
                    <Link to={'/event/' + event.id} className="spaceEventBlock">
                      <div className="spaceEventBlockImage">
                        <img src={event.image} />
                      </div>
                      <div className="spaceEventBlockTitle">{event.title}</div>
                      <div className="spaceEventBlockContent">
                        {event.start}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="spaceMainTwo">
                <div className="spaceOptions">
                  <Link to={'/booking/' + this.state.spaceProfile.id} style={{width:'100%', marginBottom:'15px'}}><FlatButton style={{background:'#ff4d58', color:'#FFFFFF', width:'100%'}}>Bookings </FlatButton></Link>
                  <Link to={'/join/' + this.state.spaceProfile.id} style={{width:'100%', marginBottom:'15px'}}><FlatButton style={{background:'#FFFFFF', color:'#ff4d58', width:'100%', border:'1px solid #CCCCCC'}}>Join This Space </FlatButton></Link>
                  <Link to={'/kiosk/' + this.state.spaceProfile.id} style={{width:'100%'}}><FlatButton style={{background:'#ff4d58', color:'#FFFFFF', width:'100%'}}>Check-In</FlatButton></Link>
                </div>
                <div className="spaceLocation">
                  <div className="spaceLocationImage">
                    <img src={"https://maps.googleapis.com/maps/api/staticmap?center="+ this.state.spaceProfile.city +","+ this.state.spaceProfile.state +"&zoom=14&size=640x640&maptype=roadmap&markers=color:blue%7C"+this.state.spaceProfile.lat+","+this.state.spaceProfile.lon+"&key=AIzaSyBDiXTt6jIkCs_VKtQeBZcVosIEgAdR1R0"}/>
                  </div>
                  <div className="spaceLocationContent">
                    {this.state.spaceProfile.address} {this.state.spaceProfile.city}, {this.state.spaceProfile.state} {this.state.spaceProfile.zipcode}
                  </div>
                </div>
                <div className="spaceTime">

                </div>
                <div className="spaceMembers">
                  <div className="spaceMembersTitle">Organizers</div>
                    <div className="spaceMembersContent">
                    {this.state.users.map((u, i) => (
                     <div className="spaceProfileUser" key={i}>
                       <img className="spaceProfileUserAvatar" src={u.avatar}/>
                       <div className="spaceProfileUserContent">{u.name}</div>
                     </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="homeFooterContainer">
          Copyright © 2018 theClubhou.se  • 540 Telfair Street  •  Tel: (706) 723-5782

        </footer>
      </div>
    );
  }
}
