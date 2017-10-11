/*
 *
 * LogInSignUp
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header'; 
import Footer from 'components/Footer';
import Tabs from 'components/Tabs';  

import './style.css';
import './styleM.css';

export default class LogInSignUp extends React.PureComponent {

    render() {
      return (
        <div className="container">
          <Helmet title="LogInSignUp" meta={[ { name: 'description', content: 'Description of LogInSignUp' }]}/>
          <Header />
            <section className="authBody">
              <Tabs> 
              
              </Tabs> 
            </section>  
          <Footer /> 
          
        </div>
      );
    }
  }
  
  LogInSignUp.contextTypes = {
    router: React.PropTypes.object
  };
  


