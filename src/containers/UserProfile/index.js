import Chip from "material-ui/Chip";
import PropTypes from "prop-types";
import React from "react";
import Helmet from "react-helmet";
import BehanceIcon from "react-icons/lib/fa/behance-square";
import FacebookIcon from "react-icons/lib/fa/facebook-square";
import GithubIcon from "react-icons/lib/fa/github-square";
import InstagramIcon from "react-icons/lib/fa/instagram";
import LinkedInIcon from "react-icons/lib/fa/linkedin-square";
import TwitterIcon from "react-icons/lib/fa/twitter-square";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
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
      authorized = await authenticate(localStorage["token"]);
    } finally {
      if (authorized !== undefined) {
        const { error, user } = authorized;
        if (user) {
          this.getUser();
          this.setState({ loading: false });
        } else if (error) {
          localStorage.removeItem("token");
          this.props.history.push("/signin");
        }
      } else {
        localStorage.removeItem("token");
        this.props.history.push("/");
      }
    }
  }

  getUser = () => {
    fetch(`http://localhost:8000/api/user/profile/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${localStorage["token"]}` }
    })
      .then(response => response.json())
      .then(({
        user,
        skills,
        space,
      }) => {
        this.setState(() => ({
          user,
          space,
          skills: skills ? skills : []
        }));
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
    return (
      <Chip
        style={chipStyle}
        key={`userProfile${i}`}
        label={skill}
      />
    );
  };

  isUser = () => (
    this.state.auth && (this.state.auth.id === parseInt(this.props.match.params.id, 10))
  );


  render() {
    const { auth } = this.state;
    const {
      facebook,
      twitter,
      instagram,
      linkedin,
      github,
      behance,
    } = this.state.user;
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
                  {this.isUser() &&
                    <React.Fragment>
                      <Link to={"/account"} className="profileSpaceBlock">
                        Edit&nbsp;Profile
                     </Link>
                      <Link to={"/company"} className="profileSpaceBlock">
                        Add&nbsp;Company&nbsp;Info
                     </Link>
                      <Link to={`/memberDash/${this.state.user.id}`} className="profileSpaceBlock">
                        Dashboard
                     </Link>
                    </React.Fragment>
                  }
                </div>
                <div className="profileSocialList">
                  {facebook &&
                    <a href={this.state.user.facebook}>
                      <FacebookIcon className="profileIconStyle" />
                    </a>
                  }

                  {twitter &&
                    <a href={this.state.user.twitter}>
                      <TwitterIcon className="profileIconStyle" />
                    </a>
                  }
                  {instagram &&
                    <a href={this.state.user.instagram}>
                      <InstagramIcon className="profileIconStyle" />
                    </a>
                  }
                  {linkedin &&
                    <a href={this.state.user.linkedin}>
                      <LinkedInIcon className="profileIconStyle" />
                    </a>
                  }
                  {github &&
                    <a href={this.state.user.github}>
                      <GithubIcon className="profileIconStyle" />
                    </a>
                  }
                  {behance &&
                    <a href={this.state.user.behance}>
                      <BehanceIcon className="profileIconStyle" />
                    </a>
                  }
                </div>
              </div>
              <div className="profileSkillsList">
                {this.state.skills.map((skill, i) =>
                  this.renderTag(skill, i)
                )}
              </div>
            </div>
          </main>

        </div>
      );
  }
}

UserProfile.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
