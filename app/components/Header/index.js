/**
 *
 * Header
 *
 */

import React from "react";
import { Link, Redirect } from "react-router-dom";
import Bars from "react-icons/lib/fa/bars";
import MdExplore from "react-icons/lib/md/explore";
import MdInfoOutline from "react-icons/lib/md/info-outline";
import MdSearch from "react-icons/lib/md/search";
import MdAssessment from "react-icons/lib/md/assessment";
import MdSchool from "react-icons/lib/md/school";
import MdPerson from "react-icons/lib/md/person";
import MdExitToApp from "react-icons/lib/md/exit-to-app";
// import Divider from "material-ui/Divider";

import Menu, { MenuItem } from "material-ui/Menu";

import Snackbar from "material-ui/Snackbar";

import "./style.css";
import "./styleM.css";

export default class Header extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      token: localStorage.getItem("token"),
      user: JSON.parse(localStorage.getItem("user")),
      menuOpen: false,
      textColor: "#000000",
      backgroundColor: "transparent",
      headerTitle: "Mesh Network",
      challengeMenu: null,
      educationMenu: null,
      accountMenu: null,
      msg: "",
      snack: false,
      redirect: null
    };
  }

  handleRequestClose = () => {
    this.setState({ snack: false, msg: "" });
  };
  showSnack = msg => {
    this.setState({ snack: true, msg: msg });
  };

  handleChallengeMenu = event => {
    this.setState({ challengeMenu: event.currentTarget });
  };

  handleChallengeMenuClose = () => {
    this.setState({ challengeMenu: null });
  };

  handleEducationMenu = event => {
    this.setState({ educationMenu: event.currentTarget });
  };

  handleEducationMenuClose = () => {
    this.setState({ educationMenu: null });
  };

  handleAccountMenu = event => {
    this.setState({ accountMenu: event.currentTarget });
  };

  handleAccountMenuClose = event => {
    this.setState({ accountMenu: null });
  };

  componentWillMount() {
    if (this.props.textColor) {
      this.setState({ textColor: this.props.textColor });
    }
    if (this.props.backgroundColor) {
      this.setState({ backgroundColor: this.props.backgroundColor });
    }
    if (this.props.headerTitle) {
      this.setState({ headerTitle: this.props.headerTitle });
    }
  }

  handleMenu = () => {
    if (this.state.menuOpen === true) {
      this.setState({ menuOpen: false });
    } else if (this.state.menuOpen === false) {
      this.setState({ menuOpen: true });
    }
  };

  renderAccountMenu = () => {
    if (this.state.user && this.state.token) {
      return (
        <span
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "2.5%"
          }}
        >
          <Link
            to={"/space/" + this.state.user.spaceID}
            className="navButton"
            style={{
              color: this.state.textColor,
              fontSize: "75%"
            }}
          >
            Homespace
          </Link>
          <div
            className="navMemberAcct"
            style={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            <MdPerson
              aria-owns={this.state.accountMenu ? "account-menu" : null}
              aria-haspopup="true"
              onClick={this.handleAccountMenu}
              style={{
                color: this.state.textColor,
                height: "1.25em",
                width: "1.25em"
              }}
            />
            <Menu
              id="account-menu"
              anchorEl={this.state.accountMenu}
              open={Boolean(this.state.accountMenu)}
              onClose={this.handleAccountMenuClose}
            >
              <Link
                to={"/account"}
                className="navButton"
                style={{
                  color: this.state.textColor
                }}
              >
                <MenuItem onClick={this.handleAccountMenuClose}>
                  Account Settings
                </MenuItem>
              </Link>
              <Link
                to={"/user/" + this.state.user.id}
                className="navButton"
                style={{
                  color: this.state.textColor
                }}
              >
                <MenuItem onClick={this.handleAccountMenuClose}>
                  Profile
                </MenuItem>
              </Link>
              <Link
                to=""
                className="navButton"
                style={{
                  color: this.state.textColor
                }}
                onClick={this.signOut}
              >
                <MenuItem onClick={this.handleAccountMenuClose}>
                  Sign Out
                </MenuItem>
              </Link>
            </Menu>
          </div>
        </span>
      );
    }
  };

  renderMenu() {
    if (this.state.menuOpen === true) {
      return (
        <nav className="navMobile">
          <Link
            to="/spaces"
            className="navMenuButton"
            style={{
              color: this.state.textColor
            }}
          >
            <MdExplore className="navIcon" />
            <span className="navLink">Explore</span>
          </Link>
          <Link
            to="/about"
            className="navMenuButton"
            style={{
              color: this.state.textColor
            }}
          >
            <MdInfoOutline className="navIcon" />
            <span className="navLink">About</span>
          </Link>
          <Link
            to="/members"
            className="navMenuButton"
            style={{
              color: this.state.textColor
            }}
          >
            <MdSearch className="navIcon" />
            <span className="navLink">Search</span>
          </Link>
          {/*<Link to="/events" className="navButton">Events</Link>*/}
          <Link
            to={"/Challenges"}
            className="navMenuButton"
            style={{
              color: this.state.textColor
            }}
          >
            <MdAssessment className="navIcon" />
            <span className="navLink">Challenges</span>
          </Link>
          <Link
            to={"/LMS"}
            className="navMenuButton"
            style={{
              color: this.state.textColor
            }}
          >
            <MdSchool className="navIcon" />
            <span className="navLink">Education</span>
          </Link>
          {this.renderMobileSignOut()}
        </nav>
      );
    }
  }

  signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("lmsToken");
    localStorage.removeItem("lmsUser");
    localStorage.removeItem("challengeToken");
    this.showSnack("Thanks for Visiting!");
    this.setState(
      {
        token: "",
        user: ""
      },
      () => {
        setTimeout(() => {
          this.setState({ redirect: <Redirect to="/" /> });
        }, 2000);
      }
    );
  };

  renderMobileSignOut = () => {
    if (this.state.user && this.state.token) {
      return (
        <div className="navMobileSignOut">
          <Link
            to={"/user/" + this.state.user.id}
            className="navMenuProfButton"
            style={{
              color: this.state.textColor
            }}
          >
            <MdPerson className="navIcon" />
            <span className="navProfLink">Profile</span>
          </Link>
          <div
            onClick={this.signOut}
            className="navMenuProfButton"
            style={{
              color: this.state.textColor
            }}
          >
            <MdExitToApp className="navIcon" />
            <span className="navProfLink">Sign Out</span>
          </div>
        </div>
      );
    }
  };

  renderMyCourses = () => {
    if (this.state.token) {
      return (
        <Link to={'/LMS/MyLMS'}><MenuItem style={{ margin: '0' }} onClick={this.handleEducationMenuClose}>My Courses</MenuItem></Link>
      )
    } else {
      return (
        <Link to={'/signIn'}><MenuItem style={{ margin: '0' }} onClick={this.handleEducationMenuClose}>My Courses</MenuItem></Link>
      )
    }
  }

  renderSignOut = () => {
    if (this.state.user && this.state.token) {
      let space = 'Workspace';
      if (this.props.space) {
        space = this.props.space
      }

      return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Link to={'/space/' + this.state.user.spaceID} className="navButton" style={{ color: this.state.textColor }}>{space}</Link>
          <Link to={'/user/' + this.state.user.id} className="navButton" style={{ color: this.state.textColor }}>Profile</Link>
          <div onClick={this.signOut} className="navButton" style={{ color: this.state.textColor }}>Sign Out</div>
        </div>
      )
    } else {
      return (
        <Link to={'/signIn'} className="navButton" style={{ background: '#ff4d58', color: '#FFFFFF', paddingTop: '5px', paddingBottom: '5px', paddingLeft: '10px', paddingRight: '10px', borderRadius: '3px' }}>Sign In</Link>
      )
    }
  }

  render() {
    let headerTitle = (
      <Link
        to="/"
        style={{
          color: this.state.textColor
        }}
      >
        Mesh
        <span
          style={{
            color: "#ff4d58"
          }}
        >
          Network
        </span>
      </Link>
    );
    if (this.state.headerTitle !== "Mesh Network") {
      headerTitle = this.state.headerTitle;
    }
    /*let headerTitle = (
      <Link to="/" className="logoNav" style={{ color: "#000000" }}>
        <h1 style={{ fontSize: "1em" }}>
          Mesh <span style={{ color: "#ff4d58" }}> Network</span>
        </h1>
      </Link>
    );*/
    return (
      <div
        className="headerComponent"
        style={{
          background: this.state.backgroundColor
        }}
      >
        {this.state.redirect}
        <div className="navBar">
          <div
            className="siteName"
            style={{
              color: this.state.textColor
            }}
          >
            {headerTitle}
          </div>

          <nav className="nav">
            <Link
              to="/spaces"
              className="navButton"
              style={{
                color: this.state.textColor
              }}
            >
              <MdExplore className="navIcon" />
              <span className="navLink">Explore</span>
            </Link>
            <Link
              to="/about"
              className="navButton"
              style={{
                color: this.state.textColor
              }}
            >
              <MdInfoOutline className="navIcon" />
              <span className="navLink">About</span>
            </Link>
            <Link
              to="/members"
              className="navButton"
              style={{
                color: this.state.textColor
              }}
            >
              <MdSearch className="navIcon" />
              <span className="navLink">Search</span>
            </Link>
            <a
              href="/Challenges"
              className="navButton"
              style={{ color: this.state.textColor }}
            >
              <MdAssessment className="navIcon" />
              <span className="navLink">Challenges</span>
            </a>
            {/*<Link to="/events" className="navButton">Events</Link>*/}

            {/*<span className="navButton">
              <Link
                to="/Challenges"
                style={{
                  color: this.state.textColor,
                  marginRight: "5px"
                }}
              >
                <MdAssessment className="navIcon" />
                <span className="navLink">Challenges</span>
              </Link>
              <DownArrow
                aria-owns={this.state.challengeMenu ? "challenge-menu" : null}
                aria-haspopup="true"
                onClick={this.handleChallengeMenu}
                style={{
                  color: this.state.textColor
                }}
              />
              <Menu
                id="challenge-menu"
                anchorEl={this.state.challengeMenu}
                open={Boolean(this.state.challengeMenu)}
                onClose={this.handleChallengeMenuClose}
              >
                <Link to={'/Challenges/Ask'}><MenuItem onClick={this.handleChallengeMenuClose}>Ask</MenuItem></Link>
                <Link to={'/Challenges'}><MenuItem onClick={this.handleChallengeMenuClose}>Browse</MenuItem></Link>
                <Link to={'/Challenges/Teams'}><MenuItem onClick={this.handleChallengeMenuClose}>Teams</MenuItem></Link>
              </Menu>
            </span>*/}

            {/*<span className="navButton">
              <Link
                to="/LMS"
                style={{
                  color: this.state.textColor,
                  marginRight: "5px"
                }}
              >
                <MdSchool className="navIcon" />
                <span className="navLink">Education</span>
              </Link>
              <DownArrow
                aria-owns={this.state.educationMenu ? "education-menu" : null}
                aria-haspopup="true"
                onClick={this.handleEducationMenu}
                style={{
                  color: this.state.textColor
                }}
              />
              <Menu
                id="education-menu"
                anchorEl={this.state.educationMenu}
                open={Boolean(this.state.educationMenu)}
                onClose={this.handleEducationMenuClose}
              >
                <Link to={'/LMS/Courses'}><MenuItem style={{margin:'0'}} onClick={this.handleEducationMenuClose}>Courses</MenuItem></Link>
                {this.renderMyCourses()}
              </Menu>
              </span>*/}
            {/*this.renderAccountMenu()*/}
            {this.renderSignOut()}
          </nav>

          <Bars className="menuIcon" onClick={this.handleMenu} />
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
