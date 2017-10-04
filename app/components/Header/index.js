/**
*
* Header
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class Header extends React.PureComponent {
  render() {
    return (      
      <header className="header-block">
        
        <div className="global-header-logo" id="logo">
          <img src="https://placeholdit.co//i/125x125" alt="mesh network logo" />
        </div>

        <div className="global-header-center"> 
          <nav className="global-header-nav">
            <ul className="global-header-nav-links"> 
              <li className="nav-item">community
                 { /* <ul> 
                    <li><a href="/locations"> tech spaces </a></li>
                    <li><a href="/member-search"> members</a></li>
                  </ul> */ } 
              </li>
              <li className="nav-item"><a href="">events</a></li>
              { /*  <li>jobs</li> */ } 
            </ul>           
          </nav>        

        </div>
       
      </header>     
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object
};
