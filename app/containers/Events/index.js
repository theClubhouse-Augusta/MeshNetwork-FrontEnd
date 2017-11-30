/*
 *
 * Events
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header'; 
import Footer from 'components/Footer'; 
import LocationSelect from 'components/LocationSelect';
import TagSelect from 'components/TagSelect'; 

import './style.css';
import './styleM.css';

export default class Events extends React.PureComponent {
  

  render() {
    return (
      <div className="container">
        <Helmet title="Events" meta={[ { name: 'description', content: 'Description of Events' }]}/>

        <Header />

        <main>
        <div className="eventBanner">
        </div>
      
      <div className="eventBody">
        <div className="eventSearchSort">
          
          <div className="eventLocationSelect">
             <LocationSelect />
          </div>
          

          <div className="eventSearch"></div>

          <div className="eventTagSort">
            <TagSelect />
          </div>
        </div>

        <div className="eventCalender">

        </div>
      </div>
       
          
        </main>

       <Footer />
      </div>
    );
  }
}

