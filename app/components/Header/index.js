/**
*
* Header
*
*/

import React from 'react';
import { Link } from 'react-router-dom';
import Bars from 'react-icons/lib/fa/bars';
import Snackbar from 'material-ui/Snackbar';

import './style.css';
import './styleM.css';

export default class Header extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            token:localStorage.getItem('token'),
            user:JSON.parse(localStorage.getItem('user')),
            menuOpen:false,
            textColor:"#000000",
            backgroundColor:"transparent",
            headerTitle:"Mesh Network",
            msg: "",
            snack: false,
        }
    }

    handleRequestClose = () => { this.setState({ snack: false, msg: "" }); };
    showSnack = (msg) => { this.setState({ snack: true, msg: msg });};

    componentWillMount() {
        if(this.props.textColor) {
            this.setState({
                textColor:this.props.textColor
            })
        }
        if(this.props.backgroundColor) {
            this.setState({
                backgroundColor:this.props.backgroundColor
            })
        }
        if(this.props.headerTitle) {
            this.setState({
                headerTitle:this.props.headerTitle
            })
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
                    <a href="http://challenges.innovationmesh.com" target="_blank" rel="noopener noreferrer" className="navButton">Challenges</a>
                    <a href="http://lms.innovationmesh.com" target="_blank" rel="noopener noreferrer" className="navButton">Education</a>
                </nav>
            )
        }
    }

    signOut = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.showSnack("Thanks for Visiting!");
      this.setState({
         token:"",
         user:"",
       }, function() {
         setTimeout(function(){_this.props.history.push('/')}, 2000);
       })
    }

    renderSignOut = () => {
      if(this.state.user && this.state.token)
      {
        return(
          <div onClick={this.signOut} className="navButton" style={{color:this.state.textColor}}>Sign Out</div>
        )
      }
    }

    render() {
        let headerTitle = <span>Mesh <span style={{color:'#ff4d58'}}> Network</span></span>;
        if(this.state.headerTitle != "Mesh Network") {
            headerTitle = this.state.headerTitle;
        }
        return (
            <div className="headerComponent" style={{background:this.state.backgroundColor}}>
                <div className="navBar">
                    <div className="siteName" style={{color:this.state.textColor}}>
                        {headerTitle}
                    </div>

                    <nav className="nav">
                        <Link to="/" className="navButton" style={{color:this.state.textColor}}>Home</Link>
                        <Link to="/spaces" className="navButton" style={{color:this.state.textColor}}>Explore</Link>
                        <Link to="/about" className="navButton" style={{color:this.state.textColor}}>About</Link>
                        <Link to="/members" className="navButton" style={{color:this.state.textColor}}>Search</Link>
                        {/*<Link to="/events" className="navButton">Events</Link>*/}
                        <a href="http://challenges.innovationmesh.com" target="_blank" rel="noopener noreferrer" className="navButton" style={{ color: this.state.textColor }}>Challenges</a>
                        <a href="http://lms.innovationmesh.com" target="_blank" rel="noopener noreferrer" className="navButton" style={{ color: this.state.textColor }}>Education</a>
                        {this.renderSignOut()}
                      </nav>

                    <Bars className="menuIcon" onClick={this.handleMenu}/>

                </div>

                {this.renderMenu()}

                <Snackbar
                    open={this.state.snack}
                    message={this.state.msg}
                    autoHideDuration={3000}
                    onClose={this.handleRequestClose}
                />
            </div>


        );
    }
}
