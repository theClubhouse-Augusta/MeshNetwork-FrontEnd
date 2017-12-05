/*
 *
 * BookingSystem
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Header from 'components/header';
import Footer from 'components/footer';
import Select from 'react-select'; 
import DateTimeSelect from 'components/DateTimeSelect'; 
import BookingStepTwo from 'components/BookingStepTwo';



import './style.css';
import './styleM.css';

export default class BookingSystem extends React.PureComponent {



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
            <select>
                      <option value="">the Clubhou.se</option>
                      <option value=""> Spark Macon </option>
                      <option value=""> MakerVillage</option>
                      <option value=""> FourAthens</option>
                      <option value=""> Columbus Makes IT </option>
                  </select>   
            </div>
            
            {/* booking types are hard coded bc no additions anticipated, but booking card mechanism comps could be adapted 😉 */}
            <div className="bookingFlowContainer">
              <div className="bookingSelectType">
              <div className="bookingTypeCardBlock">
                 <Card   >
                    <h2 title="Room Reservation"             ></h2>
                  </Card>
                  <Card >
                    <h2 title="Mentor Meeting" 
                  ></h2>
                  </Card>
                  <Card >
                    <h2 title="Space Tour" 
                    ></h2>
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
                  <button />
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
