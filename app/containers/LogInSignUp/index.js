/*
 *
 * LogInSignUp
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/header'; 

import './style.css';
import './styleM.css';

export default class LogInSignUp extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="LogInSignUp" meta={[ { name: 'description', content: 'Description of LogInSignUp' }]}/>

        //Remove this line and you can start writing your code here.
      </div>
    );
  }
}

LogInSignUp.contextTypes = {
  router: React.PropTypes.object
};
