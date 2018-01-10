/*
 *
 * Home
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from 'components/Header';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/Button';

import Particles from 'react-particles-js';

import './style.css';
import './styleM.css';


export default class Home extends React.PureComponent {

  render() {
    return (
      <div className="container">
        <Helmet title="Home" meta={ { name: 'description', content: 'Description of Home' }}/>
          <header>
            <Header />
          </header>

          <main>
            <Particles
              style={{width:'100%', height:'100vh', position:'fixed'}}
              params={{
               particles: {
                 number: {
                   value: 80,
                   density: {
                     enable: true,
                     value_area: 800
                   }
                 },
                 interactivity: {
                   detect_on: "canvas",
                   events: {
                     onhover: {
                       enable: true,
                       mode: "grab"
                     },
                     onclick: {
                       enable: true,
                       mode: "push"
                     },
                     resize: true
                   },
                   modes: {
                     grab: {
                       distance: 400,
                       line_linked: {
                         opacity: 1
                       }
                     },
                     bubble: {
                       distance: 400,
                       size: 40,
                       duration: 2,
                       opacity: 8,
                       speed: 3
                     },
                     repulse: {
                       distance: 200,
                       duration: 0.4
                     },
                     push: {
                       particles_nb: 4
                     },
                     remove: {
                       particles_nb: 2
                     }
                   }
                 },
               }
             }}
            />
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
