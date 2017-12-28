/*
 *
 * Home
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from 'components/Header';

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
                <Link to={'/newSpace'} style={{margin:'15px', width:'45%'}}><FlatButton style={{width:'100%', background:'#3399cc', paddingTop:'10px', paddingBottom:'10px',color:'#FFFFFF', fontWeight:'bold'}}>Sign Up</FlatButton></Link>
                <Link to={'/signIn'} style={{margin:'15px', width:'45%'}}><FlatButton style={{width:'100%', background:'#ee3868', paddingTop:'10px', paddingBottom:'10px',color:'#FFFFFF', fontWeight:'bold'}}>Sign In</FlatButton></Link>
              </div>
            </div>
          </main>

          <footer></footer>
        </div>
    );
  }
}
