/*
 *
 * Spaces
 *
 */

import React from 'react';
import PropTypes from 'prop-types'; 
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  TiSocialAtCircular,
  TiSocialFacebookCircular,
  TiSocialInstagramCircular,
  TiSocialTwitterCircular
} from 'react-icons/lib/ti';

import Card, { CardMedia, CardContent, CardHeader } from 'material-ui/Card';
import Header from 'components/Header';
import Footer from 'components/Footer';
import MyMapComponent from './MyMapComponent';
import FlatButton from 'material-ui/Button';

import './style.css';
import './styleM.css';

export default class Spaces extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      spaces:[],
      spaceID: {},
      markerClicked: false,
    }
  }

  componentWillMount() {
    this.getSpaces();
  }

  getSpaces = () => {
    fetch(`http://innovationmesh.com/api/workspaces`, {
      method:'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        spaces:json
      })
    }.bind(this))
  }

  clickMarker = (spaceId) => {
    this.props.history.push(`/space/${spaceId}`);
  }


  render() {
    return (
      <div className="container">
        <Helmet title="Spaces" meta={[ { name: 'description', content: 'Description of Spaces' }]}/>
        <Header />
        <div className="spacesBodyWrapper">
            <MyMapComponent
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAHpoe-vzS5soyKj6Q4i8stTy6fZtYmqgs&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: '100%' }} />}
              containerElement={<div id="dude" style={{ minHeight: '23em', border: '1px solid black' }} />}
              mapElement={<div style={{ height: '23em' }} />}
              lat={33.5105746}
              lon={-82.08560469999999}
              clickMarker={this.clickMarker}
              spaces={this.state.spaces}
            />
          <div className="spaceListHeader">Find Your Space</div>
          <div className="spacesList">
            {this.state.spaces.map((space, i) => (
              <Link to={'space/' + space.id} className="spaceListing" key={i}>
                <Card style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                  <CardMedia style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', flexGrow:'1'}}>
                    <img src={space.logo} alt="" width="100%"/>
                  </CardMedia>
                  <div>
                    <CardHeader className="spaceNameHeader" title={space.name} />
                    <CardContent className="spaceAddress"> {space.address} {space.city}, {space.state} {space.zipcode}</CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        <div className="aboutButtons">
          <div className="aboutButtonText">Ready to Discover the Mesh Network?</div>
          <div className="aboutButtons">
            <Link to={'/newSpace'} style={{ width:'200px',marginRight:'15px'}}><FlatButton style={{width:'100%', background:'#3399cc', paddingTop:'10px', paddingBottom:'10px',color:'#FFFFFF', fontWeight:'bold'}}>Sign Up</FlatButton></Link>
            <Link to={'/about'} style={{ width:'200px',marginRight:'15px'}}><FlatButton style={{width:'100%', background:'#3399cc', paddingTop:'10px', paddingBottom:'10px',color:'#FFFFFF', fontWeight:'bold'}}>Learn More</FlatButton></Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Spaces.contextTypes = {
  router: PropTypes.object
};
