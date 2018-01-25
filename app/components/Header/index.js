/**
 *
 * Header
 *
 */

import React from "react";
import { Link } from "react-router-dom";
import Bars from "react-icons/lib/fa/bars";
import MdExplore from "react-icons/lib/md/explore";
import MdInfoOutline from "react-icons/lib/md/info-outline";
import MdSearch from "react-icons/lib/md/search";
import MdAssessment from "react-icons/lib/md/assessment";
import MdSchool from "react-icons/lib/md/school";
import MdPerson from "react-icons/lib/md/person";
import MdExitToApp from "react-icons/lib/md/exit-to-app";

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
      msg: "",
      snack: false
    };
  }

  handleRequestClose = () => {
    this.setState({ snack: false, msg: "" });
  };
  showSnack = msg => {
    this.setState({ snack: true, msg: msg });
  };

  componentWillMount() {
    if (this.props.textColor) {
      this.setState({
        textColor: this.props.textColor
      });
    }
    if (this.props.backgroundColor) {
      this.setState({
        backgroundColor: this.props.backgroundColor
      });
    }
    if (this.props.headerTitle) {
      this.setState({
        headerTitle: this.props.headerTitle
      });
    }
  }

  handleMenu = () => {
    if (this.state.menuOpen === true) {
      this.setState({
        menuOpen: false
      });
    } else if (this.state.menuOpen === false) {
      this.setState({
        menuOpen: true
      });
    }
  };

  renderMenu() {
    if (this.state.menuOpen === true) {
      return (
        <nav className="navMobile">
          <Link
            to="/spaces"
            className="navMenuButton"
            style={{ color: this.state.textColor }}
          >
            <MdExplore className="navIcon" />
            <span className="navLink">Explore</span>
          </Link>
          <Link
            to="/about"
            className="navMenuButton"
            style={{ color: this.state.textColor }}
          >
            <MdInfoOutline className="navIcon" />
            <span className="navLink">About</span>
          </Link>
          <Link
            to="/members"
            className="navMenuButton"
            style={{ color: this.state.textColor }}
          >
            <MdSearch className="navIcon" />
            <span className="navLink">Search</span>
          </Link>
          {/*<Link to="/events" className="navButton">Events</Link>*/}
          <a
            href="http://challenges.innovationmesh.com"
            target="_blank"
            rel="noopener noreferrer"
            className="navMenuButton"
            style={{ color: "#000000" }}
          >
            <MdAssessment className="navIcon" />
            <span className="navLink"> Challenges</span>
          </a>
          <a
            href="http://lms.innovationmesh.com"
            target="_blank"
            rel="noopener noreferrer"
            className="navMenuButton"
            style={{ color: this.state.textColor }}
          >
            <MdSchool className="navIcon" />
            <span className="navLink">Education</span>
          </a>
          {this.renderSignOut()}
        </nav>
      );
    }
  }

  signOut = () => {
    let _this = this;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.showSnack("Thanks for Visiting!");
    this.setState(
      {
        token: "",
        user: ""
      },
      function() {
        setTimeout(function() {
          _this.props.history.push("/");
        }, 2000);
      }
    );
  };

  renderSignOut = () => {
    if (this.state.user && this.state.token) {
      return (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Link
            to={"/user/" + this.state.user.id}
            className="navMenuProfButton"
            style={{ color: this.state.textColor }}
          >
            <MdPerson className="navIcon" />
            <span className="navLink" style={{ marginLeft: ".5em" }}>
              Profile
            </span>
          </Link>
          <div
            onClick={this.signOut}
            className="navMenuProfButton"
            style={{ color: this.state.textColor }}
          >
            <MdExitToApp className="navIcon" />
            <span className="navLink"> Sign Out</span>
          </div>
        </div>
      );
    }
  };

  render() {
    let headerTitle = (
      <Link to="/" className="logoNav" style={{ color: "white" }}>
        <h1 style={{ fontSize: "1em" }}>
          Mesh <span style={{ color: "#ff4d58" }}> Network</span>
        </h1>
      </Link>
    );
    if (this.state.headerTitle != "Mesh Network") {
      headerTitle = this.state.headerTitle;
    }
    return (
      <div
        className="headerComponent"
        style={{ background: this.state.backgroundColor }}
      >
        <div className="navBar">
          <div className="siteName" style={{ color: this.state.textColor }}>
            {headerTitle}
          </div>

          <nav className="nav">
            <Link
              to="/spaces"
              className="navButton"
              style={{ color: this.state.textColor }}
            >
              <MdExplore className="navIcon" />
              <span className="navLink">Explore</span>
            </Link>
            <Link
              to="/about"
              className="navButton"
              style={{ color: this.state.textColor }}
            >
              <MdInfoOutline className="navIcon" />
              <span className="navLink">About</span>
            </Link>
            <Link
              to="/members"
              className="navButton"
              style={{ color: this.state.textColor }}
            >
              <MdSearch className="navIcon" />
              <span className="navLink">Search</span>
            </Link>
            {/*<Link to="/events" className="navButton">Events</Link>*/}
            <a
              href="http://challenges.innovationmesh.com"
              target="_blank"
              rel="noopener noreferrer"
              className="navButton"
              style={{ color: this.state.textColor }}
            >
              <MdAssessment className="navIcon" />
              <span className="navLink"> Challenges</span>
            </a>
            <a
              href="http://lms.innovationmesh.com"
              target="_blank"
              rel="noopener noreferrer"
              className="navButton"
              style={{ color: this.state.textColor }}
            >
              <MdSchool className="navIcon" />
              <span className="navLink">Education</span>
            </a>
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
