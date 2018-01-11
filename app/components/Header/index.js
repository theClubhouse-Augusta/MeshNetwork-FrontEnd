/**
*
* Header
*
*/

import React from 'react';
import { Link } from 'react-router-dom';
import Bars from 'react-icons/lib/fa/bars';

import './style.css';
import './styleM.css';

export default class Header extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      menuOpen:false
    }
  }

  handleMenu = () => {
    if(this.state.menuOpen === true)
    {
      this.setState({
        menuOpen:false
      })
    }
    else if(this.state.menuOpen === false)
    {
      this.setState({
        menuOpen:true
      })
    }
  }

  renderMenu() {
    if(this.state.menuOpen === true) {
      return(
        <nav className="navMobile">
          <Link to="/" className="navButton">Home</Link>
          <Link to="/spaces" className="navButton">Discover</Link>
          <Link to="/about" className="navButton">About</Link>
          {/*<Link to="/events" className="navButton">Events</Link>*/}
          <a href="http://challenges.innovationmesh.com" target="_blank" className="navButton">Challenges</a>
          <a href="http://lms.localhost:8000" target="_blank" className="navButton">Education</a>
        </nav>
      )
    }
  }

  render() {
    return (
      <div className="headerComponent">
        <div className="navBar">
          <div className="siteName">
            Mesh Network
          </div>

          <nav className="nav">
            <Link to="/" className="navButton">Home</Link>
            <Link to="/spaces" className="navButton">Discover</Link>
            <Link to="/about" className="navButton">About</Link>
            <Link to="/members" className="navButton">Search</Link>
            {/*<Link to="/events" className="navButton">Events</Link>*/}
            <a href="http://challenges.innovationmesh.com" target="_blank" className="navButton">Challenges</a>
            <a href="http://lms.innovationmesh.com" target="_blank" className="navButton">Education</a>
          </nav>

          <Bars className="menuIcon" onClick={this.handleMenu}/>

        </div>

        {this.renderMenu()}
      </div>


    );
  }
}
