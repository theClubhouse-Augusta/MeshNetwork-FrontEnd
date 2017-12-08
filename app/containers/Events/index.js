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
import TagSelect from 'components/TagSelect'; 
import EventHomeCalender from 'components/EventHomeCalender'; 
 

import './style.css';
import './styleM.css';

export default class Events extends React.PureComponent {
  

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
            <TagSelect />
          </div>
        </div>

        <div className="eventHomeCalenderWrapper">
        <EventHomeCalender />
        </div>
      </div>      
          
      </main>

       <Footer />
      </div>
    );
  }
}

