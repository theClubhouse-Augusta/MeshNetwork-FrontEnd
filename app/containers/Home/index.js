/*
 *
 * Home
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/header';

import FlatButton from 'material-ui/Button';

import './style.css';
import './styleM.css';


export default class Home extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="Home" meta={[ { name: 'description', content: 'Description of Home' }]}/>
          <header>
            <Header />
          </header>

          <main>
            <div className="homeSection">
              <div className="homeBodyHeaderSlant">
                MESH NETWORK<br/>
                OF INNOVATION
              </div>
              <div className="homeSignButtons">
                <FlatButton style={{margin:'15px', width:'45%', background:'#3399cc', paddingTop:'10px', paddingBottom:'10px',color:'#FFFFFF', fontWeight:'bold'}}>Sign Up</FlatButton>
                <FlatButton style={{margin:'15px', width:'45%', background:'#ee3868', paddingTop:'10px', paddingBottom:'10px',color:'#FFFFFF', fontWeight:'bold'}}>Sign In</FlatButton>
              </div>
            </div>
          </main>

          <footer></footer>
        </div>
    );
  }
}
