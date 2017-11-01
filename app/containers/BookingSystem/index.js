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

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card, CardActions, CardTitle} from 'material-ui/Card';


import './style.css';
import './styleM.css';

export default class BookingSystem extends React.PureComponent {

  static propTypes = { children: React.PropTypes.node,};
  static childContextTypes = { muiTheme: React.PropTypes.object };
  getChildContext() {var theme = getMuiTheme(); return { muiTheme: theme }};

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
              select your mesh space
            </div>
            <div className="booking_locationSelect">
              <LocationSelect />
            </div>
            

            <div className="booking_flowContainer">
              <div className="booking_selectType">
                <div className="booking_cardBlock">
                  <Card className="booking_card">
                    <CardTitle title="Room Reservation" />
                  </Card>
                  <Card className="booking_card">
                    <CardTitle title="Mentoring" />
                  </Card>
                  <Card className="booking_card">
                    <CardTitle title="Space Tour" />
                  </Card>
                </div>               
              </div>

              <div className="booking_flowTwo">
                <div className="booking_cardBlock">
                  <Card>
                    <CardTitle title="Conference Room"></CardTitle>
                  </Card>
                  <Card>
                    <CardTitle title="Workshop"></CardTitle>
                  </Card>
                  <Card>
                    <CardTitle title="Computer Lab"></CardTitle>
                  </Card>
                </div>          
              </div>

              <div className="booking_selectDateTime">
                <DateTimeSelect />
              </div>
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
