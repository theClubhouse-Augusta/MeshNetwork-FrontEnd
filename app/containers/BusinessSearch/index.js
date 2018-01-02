/*
 *
 * BusinessSearch
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from 'components/Header';
import Footer from 'components/Footer';
import MyMapComponent from './MyMapComponent';

import './style.css';
import './styleM.css';


export default class BusinessSearch extends React.Component {

    state = {
      spaces: [],
      spaceID: {},
      markerClicked: false,
    };


  componentDidMount() {
      this.loadSpaces();
  }

  loadSpaces = () => {
    fetch('http://localhost:8000/api/workspaces')
    .then(response => response.json())
    .then(json => {
      this.setState({ spaces: json });
    })
    .catch((error) => {
      alert(`server error: ${error}`); // eslint-disable-line
    });
  }

  clickMarker = (spaceId) => {
    this.props.history.push(`/SpaceProfile/${spaceId}`);
  }

  render() {
    return (
      <div className="BS-Container">
        <Helmet title="BusinessSearch" meta={[{ name: 'description', content: 'Description of BusinessSearch' }]} />

        {/* Navbar */}
        <Header />

        <main id="BS-main">
          {/* Banner */}
          <h1> Find your space </h1>

          <h2> Join a community </h2>

          {/* Map of co-workspaces */}
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
        </main>
        <Footer />
      </div>
    );
  }
}
