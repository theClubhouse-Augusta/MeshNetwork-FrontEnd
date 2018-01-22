/*
 *
 * Spaces
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from 'components/Header';
import MyMapComponent from './MyMapComponent';

import './style.css';
import './styleM.css';

export default class Spaces extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            spaces: [],
            spaceID: {},
            markerClicked: false,
        }
    }

    componentWillMount() {
        this.getSpaces();
    }

    getSpaces = () => {
        fetch(`https://innovationmesh.com/api/workspaces`, {
            method: 'GET'
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                this.setState({
                    spaces: json
                })
            }.bind(this))
    }

    clickMarker = (spaceId) => {
        this.props.history.push(`/space/${spaceId}`);
    }


    render() {
        return (
            <div className="spacesContainer">
                <Helmet title="Spaces" meta={[{ name: 'description', content: 'Description of Spaces' }]} />
                <header className="spacesHeaderContainer">
                    <Header backgroundColor="#FFFFFF" />
                </header>

                <main className="spacesMain">
                    <div className="spacesMainContainer">
                        {this.state.spaces.map((space, i) => (
                            <Link to={'space/' + space.slug} className="spacesBlock" key={i}>
                                <div className="spacesBlockImage">
                                    <img src={space.logo} />
                                </div>
                                <div className="spacesBlockTitle">{space.name}</div>
                                <div className="spacesBlockContent">{space.address} {space.city}, {space.state} {space.zipcode}</div>
                            </Link>
                        ))}
                    </div>
                    <div className="spacesMapContainer">
                        <MyMapComponent
                            isMarkerShown
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAHpoe-vzS5soyKj6Q4i8stTy6fZtYmqgs&v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: '100%' }} />}
                            containerElement={<div id="dude" style={{ minHeight: '23em' }} />}
                            mapElement={<div style={{ height: '100vh', width: '100%' }} />}
                            lat={33.5105746}
                            lon={-82.08560469999999}
                            clickMarker={this.clickMarker}
                            spaces={this.state.spaces}
                        />
                    </div>
                </main>

            </div>
        );
    }
}

Spaces.contextTypes = {
    router: PropTypes.object
};
