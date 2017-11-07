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
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

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
      isActive: false,
      open: false,
    }
  }
  
  addActiveClass() {
    this.setState({
      isActive: true 
    }); 
    console.log('clicketh'); 
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

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
              <div className="bookingCardBlock">
                 <Card>
                    <CardTitle title="Room Reservation" 
                    onClick={this.addActiveClass}></CardTitle>
                  </Card>
                  <Card>
                    <CardTitle title="Mentor Meeting"></CardTitle>
                  </Card>
                  <Card>
                    <CardTitle title="Space Tour"></CardTitle>
                  </Card>            
                  </div> 
              </div>

              <div className="bookingFlowTwo">
                  <BookingStepTwo />
              </div>

              <div className="bookingSelectDateTime">
                <DateTimeSelect />
                <div className="bookingSubmit"> 
                  <RaisedButton label="Submit" primary={true}   onClick={this.handleTouchTap}/>
                  <Snackbar
                    open={this.state.open}
                    message="Got it! Please check your email for confirmation"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                    />
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
