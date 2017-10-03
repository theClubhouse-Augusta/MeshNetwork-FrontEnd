/**
*
* Footer
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class Footer extends React.PureComponent {
  render() {
    return (
     <footer>       
       <div className="global-footer-menu">
          <ul>
            <li><a href="http://">home</a></li>
            <li><a href="http://">community</a></li>
            <li><a href="http://">events</a></li>
            { /*<li><a href="http://">jobs</a></li> */ }  
            <li><a href="http://">about</a></li>
            <li><a href="http://">contact</a></li>
          </ul>
       </div>

       <div className="global-footer-brand-block">
        <img src="https://placeholdit.co//i/125x125" alt="mesh network logo" />

        <div className="social-media-icon-row">

        </div>
        
        <p>i'm too lazy too look up the proper copyright tag atm</p>
       </div>
     </footer>
    );
  }
}

Footer.contextTypes = {
  router: React.PropTypes.object
};
