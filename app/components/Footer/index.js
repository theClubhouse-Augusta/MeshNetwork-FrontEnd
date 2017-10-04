/**
*
* Footer
*
*/

import React from 'react';
import {TiSocialAtCircular,   TiSocialFacebookCircular,
TiSocialInstagramCircular,
TiSocialTwitterCircular} from 'react-icons/lib/ti'

import './style.css';
import './styleM.css';

export default class Footer extends React.PureComponent {
  render() {
    return (
     <footer>       
       <div className="global-footer-nav-bar">
          <ul className="global-footer-nav">
            <li className="nav-item"><a href="http://">home</a></li>
            <li className="nav-item"><a href="http://">community</a></li>
            <li className="nav-item"><a href="http://">events</a></li>
            { /*<li><a href="http://">jobs</a></li> */ }  
            <li className="nav-item"><a href="http://">about</a></li>
            <li className="nav-item"><a href="http://">contact</a></li>
          </ul>
       </div>

      
                
        <div className="social-media-icon-row">
          <TiSocialAtCircular className="social-icon"/>
          <TiSocialFacebookCircular className="social-icon" />
          <TiSocialInstagramCircular className="social-icon"/>
          <TiSocialTwitterCircular className="social-icon"/>   
        </div>
        
        <p className="copyright"> a copyright my guy </p>


     </footer>
    );
  }
}

Footer.contextTypes = {
  router: React.PropTypes.object
};
