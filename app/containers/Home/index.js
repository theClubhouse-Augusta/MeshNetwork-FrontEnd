/*
 *
 * Home
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/header'; 

import Footer from 'components/footer'; 

import './style.css';
import './styleM.css';

export default class Home extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="Home" meta={[ { name: 'description', content: 'Description of Home' }]}/>
          <Header></Header>
          <Footer></Footer> 
      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object
};
