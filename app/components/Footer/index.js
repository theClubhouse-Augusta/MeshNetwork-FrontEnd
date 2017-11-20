/**
*
* Footer
*
*/

import React from 'react';
import {
  TiSocialAtCircular,   
  TiSocialFacebookCircular,
  TiSocialInstagramCircular,
  TiSocialTwitterCircular
} from 'react-icons/lib/ti';

import './style.css';
import './styleM.css';

export default class Footer extends React.PureComponent {
  render() {
    return (
     <footer className="footerContent">
        <div className="copyrightText">
          Powered by theClubhou.se
        </div>
        <div className="socialIconRow">
          <TiSocialAtCircular className="socialIcon"/>
          <TiSocialFacebookCircular className="socialIcon" />
          <TiSocialInstagramCircular className="socialIcon"/>
          <TiSocialTwitterCircular className="socialIcon"/>
        </div>
     </footer>
    );
  }
}
