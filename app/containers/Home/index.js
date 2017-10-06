/*
 *
 * Home
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/header'; 
import HomeBodyOne from 'components/homebodyone'; 
import HomeBodyTwo from 'components/homebodytwo'; 
import HomeBodyThree from 'components/homebodythree'; 


import './style.css';
import './styleM.css';

export default class Home extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="Home" meta={[ { name: 'description', content: 'Description of Home' }]}/>
          <Header></Header>
          <HomeBodyOne />
          <HomeBodyTwo />
          <HomeBodyThree /> 
      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object
};
