/**
*
* Header
*
*/

import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';
import './styleM.css';

import Bars from 'react-icons/lib/fa/bars';

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
          <Link to="/contact" className="navButton">Contact</Link>
          <a href="https://github.com/Technpoathic" className="navButton">Github</a>
        </nav>
      )
    }
  }

  render() {
    return (
      <div className="headerComponent">
        <div className="navBar">
          <div className="siteName">
            MESH NETWORK <br/>
            OF INNOVATION
          </div>

          <nav className="nav">
            <Link to="/" className="navButton">Home</Link>
            <Link to="/about" className="navButton">About</Link>
            <Link to="/contact" className="navButton">Contact</Link>
            <Link to="/sponsors" className="navButton">Sponsors</Link>
            <Link to="/spaces" className="navButton">Spaces</Link>
            <Link to="/learning" className="navButton">Education</Link>
            <Link to="/auth" className="navButton">Login / SignUp</Link>
          </nav>

          <Bars className="menuIcon" onClick={this.handleMenu}/>
    
        </div>

        {this.renderMenu()}
      </div>      
      
      </header>     
    );
  }
}


Header.contextTypes = {
  router: React.PropTypes.object
};


