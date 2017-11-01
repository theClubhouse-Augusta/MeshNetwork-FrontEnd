/*
 *
 * BookingSystem
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/header'; 
import Footer from 'components/footer';
import LocationSelect from 'components/LocationSelect'; 
import DateTimeSelect from 'components/DateTimeSelect'; 


import './style.css';
import './styleM.css';

export default class BookingSystem extends React.PureComponent {
  render() {
    return (
      <div className="booking_container">
        <Helmet title="BookingSystem" meta={[ { name: 'description', content: 'Description of BookingSystem' }]}/> 
        <Header/>
        <header className="booking_headerBookingStyle">
          <div className="booking_headerMain">
            <div className="booking_headerTitle">Booking System</div>
          </div>
        </header>
        <main className="booking_mainStyle">
          <div className="booking_sectionContainer">
            <div className="booking_mainTitle">
              Let’s Mesh Together
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

BookingSystem.contextTypes = {
  router: React.PropTypes.object
};
