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
          <div>  

          </div>      
        </div>

         <div> 
          <ul className="tempNavLinks"> 
              <li className="tempNavItem"><a href="/About">About</a></li>
              <li className="tempNavItem"><a href="/Booking">Booking</a></li>
              <li className="tempNavItem"><a href="/BusinessSearch">BusinessSearch</a></li>
              <li className="tempNavItem"><a href="/Contact">Contact</a></li>
              <li className="tempNavItem"><a href="/EventDetail">EventDetail</a></li>
              <li className="tempNavItem"><a href="/Events">Events</a></li>
              <li className="tempNavItem"><a href="/Sponsors">Sponsors</a></li>
              <li className="tempNavItem"><a href="/Spaces">Spaces</a></li>
              <li className="tempNavItem"><a href="/Learning">Learning</a></li>
              <li className="tempNavItem"><a href="/detail">LearningDetail</a></li>
              <li className="tempNavItem"><a href="/Auth">Login/SignUp</a></li>
              <li className="tempNavItem"><a href="/NewEvent">NewEvent</a></li>
              <li className="tempNavItem"><a href="/SpaceProfile">SpaceProfile</a></li>
              <li className="tempNavItem"><a href="/UserProfile">UserProfile</a></li>                
            </ul> 
        </div>         
      
      </header>     
    );
  }
}


Header.contextTypes = {
  router: React.PropTypes.object
};


