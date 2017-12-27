/*
 *
 * BookingSystem
 *
 */
import React from 'react';
import Helmet from 'react-helmet';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Header from 'components/header';
import Footer from 'components/footer';
import Select from 'react-select'; 
import DateTimeSelect from 'components/DateTimeSelect'; 
import BookingStepTwo from '../../components/BookingStepTwo';

import './style.css';
import './styleM.css';
import 'react-select/dist/react-select.css';

/**
 * Store booking
 * http://localhost:8000/booking
 * method: POST
 * params: [
 *  'name' => 'required|string',
    'email' => 'required|string',
    'spaceID' => 'required|string',
    'type' => 'required|string',
    'day' => 'required|string',
    'start' => 'required|string',
    'end' => 'required|string',
 * ]
 */

 /**
  * Approve booking
  * http://localhost:8000/booking/approve
  * method: GET
  */

 /**
  * Deny booking
  * http://localhost:8000/booking/deny
  * method: GET
  */

export default class BookingSystem extends React.PureComponent {
  state = {
    // maybe location: locationDefault? 
    selectedLocation: '', 
  }

  //         

  handleLocationSelect = (selectedLocation) => {
    this.setState( {selectedLocation}); 
    console.log(selectedLocation)
  }


  render() {
    const locationWrapperStyle ={
      width: '200px',
      margin: '60px',
    }

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
              select a mesh space
            </div>
            <div className="bookingLocationSelect">
            <Select 
              value={this.state.selectedLocation}
              placeholder="select a location"
              clearable
              onChange={this.handleLocationSelect}
              options={locationData}
              wrapperStyle={locationWrapperStyle}
              autosize
            />
            </div>
            {/* which db we're sending shit to */ }

            {/* Iterative catds?*/}
            <div className="bookingFlowContainer">
              <div className="bookingSelectType">
              <div className="bookingTypeCardBlock">
                 <Card>
                    <CardHeader title="Room Reservation" /> 
                  </Card>
                  <Card>
                    <CardHeader title="Mentor Meeting"   /> 
                  </Card>
                  <Card>
                    <CardHeader title="Space Tour"       />
                  </Card>      
                  </div> 
              </div> 

              <div className="bookingNextFlow">
                  <BookingStepTwo />
                  {/* type={this.state.type} */}
              </div>
        
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
