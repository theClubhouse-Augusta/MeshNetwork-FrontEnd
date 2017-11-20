/*
 *
 * BusinessSearch
 *
 */
import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header';
import Footer from 'components/Footer';
import MyMapComponent from './MyMapComponent';
import './style.css';
import './styleM.css';

export default class BusinessSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      spaces: [],
      spaceID: {},
      markerClicked: false,
    };
  }

  componentDidMount() {
    this.loadSpaces();
  }

  loadSpaces = () => {
    fetch('http://localhost:8000/api/workspaces'
    )
    .then((response) =>
      response.json()
    )
    .then((json) => {
      this.setState({ spaces: json });
    })
    .catch((error) => {
      alert(`server error: ${error}`); // eslint-disable-line
    });
  }

  ShowSearchResults = (spaceID) => {
    const showSpace = [];

    if (this.state.markerClicked) {
      const spaces = this.state.spaces;
      const selected = spaceID + 1;
      showSpace.push(
        <div
          key={`div${spaces[selected].id}`}
          id="BS-postSearchContainer"
        >
          <ul>
            <li key={`workspace${spaces[selected].id}`}>
              <img
                src={spaces[selected].logo}
                width="100px"
                height="100px"
                alt="logo"
              />
              <dl id="BS-workSpaceInfo">
                <div>
                  <dt>name:</dt>
                  <dd>
                    &nbsp;&nbsp;&nbsp;{spaces[selected].name}
                  </dd>
                </div>

                <div>
                  <dt>description:</dt>
                  <dd>
                    &nbsp;&nbsp;&nbsp;{spaces[selected].description}
                  </dd>
                </div>

                <div>
                  <dt>Email:</dt>
                  <dd>
                    &nbsp;&nbsp;&nbsp;{spaces[selected].email}
                  </dd>
                </div>

                <div>
                  <dt>Website:</dt>
                  <dd>
                    &nbsp;&nbsp;&nbsp;{spaces[selected].website}
                  </dd>
                </div>

              </dl>
            </li>
          </ul>
        </div>
      );
    }
    return showSpace;
  }

  clickMarker = (spaceId) => {
    if (this.state.markerClicked) {
      this.setState({ spaceID: spaceId });
    } else {
      this.setState({
        markerClicked: true,
        spaceID: spaceId,
      });
    }
  }

  render() {
    const workSpace = this.ShowSearchResults(this.state.spaceID);
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

          {/* workSpace */}
          {workSpace}
        </main>
        <Footer />
      </div>
    );
  }
}
