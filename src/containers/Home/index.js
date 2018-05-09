import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import FlatButton from "material-ui/Button";

import "./style.css";
import "./styleM.css";

export default class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      user: '',
      quote: '',
    };
  };
  componentDidMount() {
    this.getUser();
    this.getQuote();
  };
  getUser = () => {
    fetch(`http://localhost:8000/api/user/auth`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` },
    })
      .then(response => response.json())
      .then(({ user }) => {
        if (user) {
          this.setState(() => ({ user }));
        }
      })
  };

  getQuote = () => {
    fetch(
      "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1",
      {
        method: "GET",
        headers: {
          "X-Mashape-Key": "3q4u3rgPbBmsh9W05tFAIGURztVzp1EQKTQjsn7MOO0DmFOcqn"
        }
      }
    )
      .then(response => response.json())
      .then(json => {
        this.setState({
          quote: json
        });
      });
  };

  renderSignIn = () => {
    if (!this.state.token && !this.state.user) {
      return (
        <div className="homeHeaderContent">
          <div className="homeHeaderContentTitle">
            Discover Great Collaborative Spaces
          </div>
          <div className="homeHeaderContentSubtitle">
            Find amazing places to work, network, and innovate.
        </div>
          <div className="homeHeaderContentSearchBar">
            <div className="homeSignButtons">
              <Link
                to={"/spaces"}
                style={{ margin: "7.5px", minWidth: "200px" }}
              >
                <FlatButton
                  style={{
                    width: "100%",
                    background: "#FFFFFF",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    color: "#ff4d58",
                    fontWeight: "bold"
                  }}
                >
                  Sign Up
                </FlatButton>
              </Link>
              <Link
                to={"/signIn"}
                style={{ margin: "7.5px", minWidth: "200px" }}
              >
                <FlatButton
                  style={{
                    width: "100%",
                    background: "#ff4d58",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    color: "#FFFFFF",
                    fontWeight: "bold"
                  }}
                >
                  Sign In
                </FlatButton>
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="homeHeaderContent">
          <div className="homeHeaderContentTitle">
            Hey There,{" "}
            <span style={{ color: "#ff4d58" }}>{this.state.user.name}!</span>
          </div>
          <div
            className="homeHeaderContentSubtitle"
            style={{ margin: "1em 2em", textAlign: "center" }}
          >
            {this.state.quote.quote}
            <span
              style={{
                marginLeft: "10px",
                fontSize: "0.9em",
                fontStyle: "italic"
              }}
            >
              - {this.state.quote.author}
            </span>
          </div>
        </div>
      );
    }
  };
  render() {
    const { spaceName } = this.props;
    return (
      <div className="container">
        <Helmet>
          <title>Mesh Network of Innovation</title>
          <meta name="description" content="Description of Home" />
        </Helmet>
        <header className="homeHeaderContainer">
          <div className="homeHeaderBar">
            <Header textColor="#FFFFFF" space={spaceName} />
          </div>
          {this.renderSignIn()}
        </header>

        <main>
          <div className="homeMainSection">
            <div className="homeMainSectionTitle">
              What are you interested in?
            </div>
            <div className="homeMainSectionSubtitle">
              Explore some of the best features of collaboration from our
              partners and friends.
            </div>
            <div className="homeMainSectionContent">
              <div
                className="homeMainSectionBlockOne"
                style={{
                  background:
                    "linear-gradient(rgba(0, 0, 0, 0.65),rgba(0, 0, 0, 0.65)),url(https://s3.us-east-2.amazonaws.com/suggestify/7e9818_-11-15.05.27.jpg)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center center"
                }}
              >
                <img
                  alt=""
                  src="https://s3.us-east-2.amazonaws.com/suggestify/093903_cowork.PNG"
                  sizes="(max-width: 425px) 200px, auto"
                />
                <div
                  className="homeMainSectionBlockTitle"
                  style={{ color: "#FFFFFF" }}
                >
                  CoWork
                </div>
              </div>
              <div
                className="homeMainSectionBlockOne"
                style={{
                  background:
                    "linear-gradient(rgba(0, 0, 0, 0.65),rgba(0, 0, 0, 0.65)),url(https://s3.us-east-2.amazonaws.com/suggestify/67b755_fablabpng.jpg)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center center"
                }}
              >
                <img alt="" src="https://s3.us-east-2.amazonaws.com/suggestify/2b608a_hack.PNG" />
                <div
                  className="homeMainSectionBlockTitle"
                  style={{ color: "#FFFFFF" }}
                >
                  Code
                </div>
              </div>
              <div
                className="homeMainSectionBlockOne"
                style={{
                  background:
                    "linear-gradient(rgba(0, 0, 0, 0.65),rgba(0, 0, 0, 0.65)),url(https://s3.us-east-2.amazonaws.com/suggestify/4f56fa_ebridge2_660.jpg)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center center"
                }}
              >
                <img alt="" src="https://s3.us-east-2.amazonaws.com/suggestify/6d9807_3Dprinting.PNG" />
                <div
                  className="homeMainSectionBlockTitle"
                  style={{ color: "#FFFFFF" }}
                >
                  Make
                </div>
              </div>
              <div
                className="homeMainSectionBlockOne"
                style={{
                  background:
                    "linear-gradient(rgba(0, 0, 0, 0.65),rgba(0, 0, 0, 0.65)),url(https://s3.us-east-2.amazonaws.com/suggestify/7e9818_-11-15.05.27.jpg)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center center"
                }}
              >
                <img alt="" src="https://s3.us-east-2.amazonaws.com/suggestify/0cf50f_studio.PNG" />
                <div
                  className="homeMainSectionBlockTitle"
                  style={{ color: "#FFFFFF" }}
                >
                  Create
                </div>
              </div>
            </div>
          </div>
          <div className="homeMainSection" style={{ background: "#EEEEEE" }}>
            <div className="homeMainSectionTitle">See How It Works</div>
            <div className="homeMainSectionSubtitle">
              Discover how the Mesh Network can help you find everything you
              want!
            </div>
            <div className="homeMainSectionContentTwo">
              <div className="homeMainSectionBlockTwo">
                <img alt="" src="https://s3.us-east-2.amazonaws.com/suggestify/af1a08_how1.PNG" />
                <div className="homeMainSectionBlockTitle">
                  Choose What You Do
                </div>
                <div className="homeMainSectionBlockContent">
                  Creating a new workspace? Whether you are just starting out or
                  joining your local community, the Mesh Network has something
                  to offer.
                </div>
              </div>
              <div className="homeMainSectionBlockTwo">
                <img alt="" src="https://s3.us-east-2.amazonaws.com/suggestify/3889d9_how2.PNG" />
                <div className="homeMainSectionBlockTitle">
                  Find What You Want
                </div>
                <div className="homeMainSectionBlockContent">
                  Search and filter hundreds of listings, read reviews, explore
                  photos and find the perfect spot.
                </div>
              </div>
              <div className="homeMainSectionBlockTwo">
                <img alt="" src="https://s3.us-east-2.amazonaws.com/suggestify/79caa9_how3.PNG" />
                <div className="homeMainSectionBlockTitle">
                  Explore Awesome Places
                </div>
                <div className="homeMainSectionBlockContent">
                  Go and have a productive time or even make a booking directly
                  from the listing page. All of those, thanks to the Mesh
                  Network!
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="homeFooterContainer">
          Copyright © 2018 theClubhou.se • 540 Telfair Street • Tel: (706)
          723-5782
        </footer>
      </div>
    );
  }
}