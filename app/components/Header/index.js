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
      <header className="headerBlock">
        
        <div id="logo" className="globalHeaderLogo"> <a href="/">
          <img src="https://placeholdit.co//i/125x125" alt="mesh network logo" height="100%" />
          </a></div>

        <div className="globalHeaderCenter"> 
          <nav className="globalHeaderNav">
            <ul className="globalHeaderNavLinks"> 
              <li className="navItem">community
                 { /* <ul> 
                    <li><a href="/locations"> tech spaces </a></li>
                    <li><a href="/member-search"> members</a></li>
                  </ul> */ } 
              </li>
              <li className="navItem"><a href="">events</a></li>
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
