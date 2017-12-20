/*
 *
 * Events
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header'; 
import Footer from 'components/Footer'; 
import MultiLocationSelect from 'components/MultiLocationSelect';
import EventHomeCalender from 'components/EventHomeCalender'; 
 

import './style.css';
import './styleM.css';

//SEARCH? 

export default class Events extends React.PureComponent {
  state = {
    
  }

  

  render() {
    return (
      <div className="container">
        <Helmet title="Events" meta={[ { name: 'description', content: 'Description of Events' }]}/>

        <Header />

        <main>
        <div className="eventHomeBanner">
        </div>
      
      <div className="eventHomeBody">
        <div className="eventHomeSearchSort">
          
          <div className="eventHomeLocationSelect">
             <MultiLocationSelect />
          </div>
          

          <div className="eventHomeSearchWrapper">
            <label> Search </label>
            <input type="text" className="eventSearch" style={{margin: '0 1em'}}/> 
            
          </div>

          <div className="eventHomeTagSort">
         
          </div>
        </div>

        <div className="eventHomeCalenderWrapper">
        <EventHomeCalender />
        {/* 

          location={this.location}
          tags={this.selectedSkills}
        */}
        </div>
      </div>      
          
      </main>

       <Footer />
      </div>
    );
  }
}

