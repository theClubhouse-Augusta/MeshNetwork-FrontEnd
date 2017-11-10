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
import BookingStepTwo from 'components/BookingStepTwo';
import SubmitButton from 'components/SubmitButton'; 

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card, CardActions, CardTitle} from 'material-ui/Card';


import './style.css';
import './styleM.css';

export default class BookingSystem extends React.PureComponent {

  static propTypes = { children: React.PropTypes.node,};
  static childContextTypes = { muiTheme: React.PropTypes.object };
  getChildContext() {var theme = getMuiTheme(); return { muiTheme: theme }};


  constructor(props) {
    super(props);  
    this.addActiveClass= this.addActiveClass.bind(this);
    this.state = {
      active: false,
      bgColor: '#ffffff', 
  }
}; 

  addActiveClass() {
    this.setState({
      active: true,
      bgColor: '#37B1E3', 
    }); 
    console.log('clicketh'); 
  }

  render() {

    return (
      <div className="bookingContainer">
        <Helmet title="BookingSystem" meta={[ { name: 'description', content: 'Description of BookingSystem' }]}/> 
        <Header/>
        <header className="bookingHeaderBookingStyle">
          <div className="bookingHeaderMain">
            <div className="bookingHeaderTitle">Booking System</div>
          </div>
        </header>
        <main className="bookingMainStyle">
          <div className="bookingSectionContainer">
            <div className="bookingMainTitle">
              select your mesh space
            </div>
            <div className="bookingLocationSelect">
              <LocationSelect />
            </div>
            
            {/* booking types are hard coded bc no additions anticipated, but booking card mechanism comps could be adapted 😉 */}
            <div className="bookingFlowContainer">
              <div className="bookingSelectType">
              <div className="bookingTypeCardBlock">
                 <Card  onClick={this.addActiveClass} style={{ backgroundColor: this.state.bgColor }}>
                    <CardTitle title="Room Reservation"             ></CardTitle>
                  </Card>
                  <Card onClick={this.addActiveClass} style={{ backgroundColor: this.state.bgColor }}>
                    <CardTitle title="Mentor Meeting" 
                    onClick={this.addActiveClass} ></CardTitle>
                  </Card>
                  <Card onClick={this.addActiveClass} style={{ backgroundColor: this.state.bgColor }}>
                    <CardTitle title="Space Tour" 
                    onClick={this.addActiveClass}></CardTitle>
                  </Card>    
                  {/* make these cards iterative array so that one at a time will be active - later disable others that are not selected aka pass disabled to other 2*/ }        
                  </div> 
              </div>

              <div className="bookingFlowTwo">
                  <BookingStepTwo />
              </div>

              <div className="bookingSelectDateTime">
                <DateTimeSelect />
                <div className="bookingSubmit"> 
                  <SubmitButton />
                </div>
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
