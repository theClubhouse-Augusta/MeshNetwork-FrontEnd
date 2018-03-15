/*
 *
 * UserProfile
 *
 */
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Header from "components/Header";

import Chip from "material-ui/Chip";

import FacebookIcon from "react-icons/lib/fa/facebook-square";
import TwitterIcon from "react-icons/lib/fa/twitter-square";
import LinkedInIcon from "react-icons/lib/fa/linkedin-square";
import InstagramIcon from "react-icons/lib/fa/instagram";
import GithubIcon from "react-icons/lib/fa/github-square";
import BehanceIcon from "react-icons/lib/fa/behance-square";

import Spinner from "../../components/Spinner";
import authenticate from "../../utils/Authenticate";

import "./style.css";
import "./styleM.css";

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: JSON.parse(localStorage.getItem("user")),
      user: "",
      space: "",
      skills: [],
      token: localStorage.getItem("token"),
      loading: true
    };
  }

  async componentDidMount() {
    let authorized;
    try {
      authorized = await authenticate(
        localStorage["token"],
        this.props.history
      );
    } finally {
      if (authorized !== undefined) {
        if (!authorized.error && authorized) {
          this.getUser();
          this.setState({ loading: false });
        } else if (authorized.error) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          this.props.history.push("/signin");
        }
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.props.history.push("/");
      }
    }
  }

  getUser = () => {
    fetch(
      "https://innovationmesh.com/api/user/profile/" +
      this.props.match.params.id,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage["token"]}` }
      }
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({
          user: json.user,
          space: json.space,
          skills: json.skills ? json.skills : []
        });
      });
  };

  renderTag = (skill, i) => {
    let chipStyle = {
      color: "#FFFFFF",
      margin: "5px"
    };

    let rand = Math.random() * (10 - 1) + 1;

    chipStyle.animation =
      "profileFlicker " + rand + "s ease alternate infinite";

    return <Chip style={chipStyle} key={`userProfile${i}`} label={skill} />;
  };

  renderEdit = () => {
    if (this.state.auth) {
      if (this.state.auth.id == this.props.match.params.id) {
        return (
          <Link to={"/account"} className="profileSpaceBlock">
            Edit Profile
          </Link>
        );
      }
    }
  };

  renderSocial = () => {
    let facebook = (
      <a href={this.state.user.facebook}>
        <FacebookIcon className="profileIconStyle" />
      </a>
    );
    let twitter = (
      <a href={this.state.user.twitter}>
        <TwitterIcon className="profileIconStyle" />
      </a>
    );
    let instagram = (
      <a href={this.state.user.instagram}>
        <InstagramIcon className="profileIconStyle" />
      </a>
    );
    let linkedin = (
      <a href={this.state.user.linkedin}>
        <LinkedInIcon className="profileIconStyle" />
      </a>
    );
    let github = (
      <a href={this.state.user.github}>
        <GithubIcon className="profileIconStyle" />
      </a>
    );
    let behance = (
      <a href={this.state.user.behance}>
        <BehanceIcon className="profileIconStyle" />
      </a>
    );

    if (!this.state.user.facebook || this.state.user.facebook == "null") {
      facebook = "";
    }
    if (!this.state.user.twitter || this.state.user.twitter == "null") {
      twitter = "";
    }
    if (!this.state.user.instagram || this.state.user.instagram == "null") {
      instagram = "";
    }
    if (!this.state.user.linkedin || this.state.user.linkedin == "null") {
      linkedin = "";
    }
    if (!this.state.user.github || this.state.user.github == "null") {
      github = "";
    }
    if (!this.state.user.behance || this.state.user.behance == "null") {
      behance = "";
    }

    return (
      <div className="profileSocialList">
        {facebook}
        {twitter}
        {instagram}
        {linkedin}
        {github}
        {behance}
      </div>
    );
  };
  render() {
    return this.state.loading ? (
      <Spinner loading={this.state.loading} />
    ) : (
        <div className="container">
          <Helmet
            title={this.state.user.name}
            meta={[
              { name: "description", content: "Description of UserProfile" }
            ]}
          />
          <header>
            <Header space={this.props.spaceName} />
          </header>

          <main className="mainProfile">
            <div className="profileWrapper">
              <div className="profileHeader">
                <img
                  alt=""
                  src={this.state.user.avatar}
                  className="profileHeaderImg"
                />
                <div className="profileHeaderTitle">{this.state.user.name}</div>
                <div className="profileSubTitle">
                  {!!this.state.user.title !== "null"
                    ? this.state.user.title
                    : false}
                </div>
              </div>
              <div className="profileContact">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row"
                  }}
                >
                  <Link
                    to={"/space/" + this.state.user.spaceID}
                    className="profileSpaceBlock"
                  >
                    {this.state.space.name}
                  </Link>
                  {this.renderEdit()}
                </div>
                {this.renderSocial()}
              </div>
              <div className="profileSkillsList">
                {this.state.skills.map((skill, i) => this.renderTag(skill, i))}
              </div>
            </div>
          </main>

          <footer />
        </div>
      );
  }
}

UserProfile.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
