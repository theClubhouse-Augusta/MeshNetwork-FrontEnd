/*
 *
 * KioskSystem
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Select from 'react-select';
import KioskFlowTwo from 'components/KioskFlowTwo'; 
import KioskUpcomingEvents from 'components/KioskUpcomingEvents'; 

import './style.css';
import './styleM.css';
import 'react-select/dist/react-select.css';

//LOCATION NEEDS TO BE DEAFULT OVERALL STATE FOR FETCHING REASONS & EVENTS 


const menuWrapperStyle = {
  margin: '0 auto',
}; 


// fetch location from kiosk db

/* fetch user table datag 

make user obj to pass as prop 

 for the select input 
  reassign email=>value 
   separate name @ first space = firstName
   name=> label 
*/ 

const testUserData = [
  { value: 'audoralc@gmail.com', label: 'Audora'},
  { value: 'ivy@theclubhou.se', label: 'Ivy'},
  { value: 'nadeem@theclubhou.se', label: 'Nadeem'}
] 

const userInputPlaceholder = "Find yourself ☮"; 
// {var from kiosk db}

const testLocation = 'the Clubhouse'; 

export default class KioskSystem extends React.PureComponent {
 state= {
    location: testLocation, 
    selectedUser: '', 
  }

  handleNameInputChange = (selectedUser) => {
    this.setState({selectedUser});
    console.log(`Selected: ${selectedUser.label}`);
  } 

 


  handleFlowTwo = () => {
    //render FlowTwo on page
 }

  dudeWhatsMyState= () => {
   console.log(this.state); 
 }
 
 

  render() {
    return (
      <div className="kioskContainer">
        <Helmet title="KioskSystem" meta={[ { name: 'description', content: 'Description of KioskSystem' }]}/>

        <main> 
          <div className="kioskBody">
            <div className="kioskLogoBlock">
              <div className="kioskLogoWrapper"></div>
            </div>

            <div className="kioskFormContainer">
             
             
               <div className="kioskAutoWrapper">
                 <Select 
                  name="kioskUserLogin"
                  value={this.state.selectedUser.value}
                  placeholder={userInputPlaceholder} 
                  arrowRenderer={null} 
                  clearable      
                  openOnClick={false}
                  onChange={this.handleNameInputChange} 
                  options={testUserData}
                  wrapperStyle={menuWrapperStyle}               
                />
              </div>     

                  {/* user={selectedUser}
                      reasonLabel={}
                      reasons={location.reasons}
                  */}
                <KioskFlowTwo 
                 
                />
                
               {/*
              <KioskUpcomingEvents 
                location={location}                
                afterLoginMsg={location.afterLoginMessage}
                username={user.firstName}        
                events={location.events}               
              />
               
              Switch with just name really nice */}
              
              
            </div>          
          </div> 

          <div className="kioskRedirectNav">
              <small> <a href="/home"> mesh network home </a></small>
          </div>         
        </main>
      </div>
    );
  }
}

KioskSystem.contextTypes = {
  router: React.PropTypes.object
};
