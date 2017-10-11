/*
 *
 * LearningHome
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header'; 
import Footer from 'components/Footer'; 

import './style.css';
import './styleM.css';

export default class LearningHome extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="LearningHome" meta={[ { name: 'description', content: 'Description of LearningHome' }]}/>
        <Header />
        <div className="learningBodyContainer"> 
          
        </div>
        <Footer />
      </div>
    );
  }
}

LearningHome.contextTypes = {
  router: React.PropTypes.object
};
