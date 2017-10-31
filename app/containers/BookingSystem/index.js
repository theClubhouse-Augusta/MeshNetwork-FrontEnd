/*
 *
 * BookingSystem
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/header'; 
import LocationSelect from 'components/LocationSelect'; 
import DateTimeSelect from 'components/DateTimeSelect'; 


import './style.css';
import './styleM.css';

export default class BookingSystem extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="BookingSystem" meta={[ { name: 'description', content: 'Description of BookingSystem' }]}/> 
        <Header />
        <div className="booking_main"> 
          <h2 className="booking_headerMain">
            mesh booking system
          </h2>

          <div className="booking_locationSelect">
            <p> to get started select your location</p>
            <LocationSelect />
          </div>

          <div className="booking_flowWrap">
            <div className="booking_typeSelect">

            </div>

            <div className="booking_flowTwo">

            </div>

            <div className="booking_dateTime">
              <DateTimeSelect /> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BookingSystem.contextTypes = {
  router: React.PropTypes.object
};
