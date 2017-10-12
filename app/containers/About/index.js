/*
 *
 * About
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header'; 
import Footer from 'components/Footer'; 

import './style.css';
import './styleM.css';

export default class About extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="About" meta={[ { name: 'description', content: 'Description of About' }]}/>

        <Header/>

        <main className="mainProfile">          
            <div className="aboutBlock">
              <div className="aboutTextHeader"></div>
              <div className="aboutContent"></div>
              <div className="aboutTextHeader"></div>
              <div className="aboutFaq"></div>
              <div className="aboutButtons"></div>
              <div className="aboutSignUp"></div>
              <div className="aboutContact"></div>      
          </div> 
        </main>

        <Footer/>

      </div>
    );
  }
}

About.contextTypes = {
  router: React.PropTypes.object
};
