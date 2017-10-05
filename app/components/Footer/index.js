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
       { /*      
       <div className="globalFooterNavBar">
          <ul className="globalFooterNav">
            <li className="navItem"><a href="/">home</a></li>
            <li className="navItem"><a href="">community</a></li>
            <li className="navItem"><a href="/Events">events</a></li>
            <li><a href="http://">jobs</a></li>   
            <li className="navItem"><a href="/About">about</a></li>
            <li className="navItem"><a href="/Contact">contact</a></li>
          </ul>
       </div>
        */ }
      
                
        <div className="socialIconRow">
          <TiSocialAtCircular className="socialIcon"/>
          <TiSocialFacebookCircular className="socialIcon" />
          <TiSocialInstagramCircular className="socialIcon"/>
          <TiSocialTwitterCircular className="socialIcon"/>   
        </div>
        
        <p className="copyright"> a copyright my guy </p>


     </footer>
    );
  }
}

Footer.contextTypes = {
  router: React.PropTypes.object
};
