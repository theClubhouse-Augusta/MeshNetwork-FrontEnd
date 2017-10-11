/*
 *
 * Sponsors
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header'; 
import Footer from 'components/Footer'; 

import './style.css';
import './styleM.css';

export default class Sponsors extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="Sponsors" meta={[ { name: 'description', content: 'Description of Sponsors' }]}/>
        <Header />
        <div className="sponsorsBodyContainer"> 
            
        </div>
        <Footer />
      </div>
    );
  }
}

Sponsors.contextTypes = {
  router: React.PropTypes.object
};
