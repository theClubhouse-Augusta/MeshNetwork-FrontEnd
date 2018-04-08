/*
 *
 * Challenges
 *
 */

import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
// import Banner from 'components/Banner';
import SideNav from "../../components/SideNav";
import RightBar from "../../components/RightBar";

import TextField from "material-ui/TextField";

import Waypoint from "react-waypoint";

import "./style.css";
import "./styleM.css";

export default class Discover extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      challenges: [],
      nextPage: 1,
      currentPage: 0,
      lastPage: 1,
      searchContent: "",
      app: this.props.app
    };
  }

  componentDidMount() {
    /*if(this.props.match.params.id) {
      this.showCategories(this.props.match.params.id);
    }*/
    //this.getChallenges();
  }

  componentWillReceiveProps(app) {
    this.setState(
      {
        app: app.app
      },
      () => {
        this.forceUpdate();
      }
    );
  }

  handleSearch = event => {
    this.setState(
      {
        searchContent: event.target.value
      },
      () => {
        if (this.state.searchContent.length >= 3) {
          this.search();
        }
      }
    );
  };

  showCategories = categoryID => {
    fetch(
      "http://localhost:8000/api/showCategory/" +
      categoryID +
      "/Challenges",
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(json => {
        this.setState({
          challenges: json.challenges
        });
      });
  };

  getChallenges = () => {
    var nextPage = this.state.nextPage;
    var challenges = this.state.challenges;

    if (this.state.currentPage !== this.state.lastPage) {
      fetch(
        "http://localhost:8000/api/getChallenges/30?page=" +
        this.state.nextPage,
        {
          method: "GET"
        }
      )
        .then(response => response.json())
        .then(json => {
          if (json.challenges.current_page !== json.challenges.last_page) {
            nextPage = nextPage + 1;
          }
          for (var i = 0; i < json.challenges.data.length; i++) {
            challenges.push(json.challenges.data[i]);
          }
          this.setState({
            nextPage: nextPage,
            lastPage: json.challenges.last_page,
            currentPage: json.challenges.current_page,
            challenges: challenges
          });
        });
    }
  };

  search = () => {
    let data = new FormData();

    data.append("searchContent", this.state.searchContent);

    fetch("http://localhost:8000/api/searchChallenges", {
      method: "POST",
      body: data
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          nextPage: 1,
          currentPage: 0,
          lastPage: 1,
          challenges: json.challenges
        });
      });
  };

  renderWaypoint = () => {
    if (this.state.searchContent < 3) {
      if (this.props.match.params.id) {
        return (
          <Waypoint
            onEnter={() => this.showCategories(this.props.match.params.id)}
          />
        );
      } else {
        return <Waypoint onEnter={this.getChallenges} />;
      }
    }
  };

  render() {
    let headerTitle = (
      <Link
        to="/"
        style={{
          color: "#000000"
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
        &nbsp;- Challenges
      </Link>
    );

    return (
      <div className="container">
        <Helmet
          title="Discover"
          meta={[{ name: "description", content: "Description of Discover" }]}
        />

        <header>
          <Header headerTitle={headerTitle} app={this.state.app} />
        </header>

        <main className="challenges_mainContainer">
          <div
            style={{
              width: "90%",
              maxWidth: "1200px",
              margin: "0 auto",
              fontFamily: "Noto Sans",
              textAlign: "justify"
            }}
          >
            <div
              style={{
                fontFamily: "Lato",
                fontSize: "2em",
                fontVariant: "small-caps",
                borderBottom: "1px solid #BBBBBB",
                padding: "20px",
                textAlign: "center"
              }}
            >
              WHAT IS THE SOUTHEAST STARTUP CHALLENGE?
            </div>
            <p>
              The Southeast Startup Challenge is a 5 city hackathon for
              entrepreneurs. We’ve done the hard work of finding critical
              partners and first customers that have identified specific
              problems they believe that technology startups can solve.
            </p>
            <p>
              Midsize cities have distinct differences from large cities which
              provide a unique opportunity for entrepreneurs to innovate from a
              different perspective. 40% of the nation lives in mid and small
              size communities, which provides a huge and mostly untapped market
              for companies to grow.
            </p>
            <p>
              Join the Southeast Startup Challenge and you could finish the
              weekend with your first customer, and an invite to pitch in June
              for over $25,000 in cash and services to help your business grow!
            </p>
          </div>
          <div className="challenges_contentContainer">
            <div className="challenges_categoryContainer">
              <SideNav app={this.state.app} />
            </div>
            <div className="challenges_challengeFeed">
              <TextField
                value={this.state.searchContent}
                onChange={this.handleSearch}
                fullWidth
                placeholder="Search For Challenges"
                style={{ margin: "30px 0" }}
              />
              <div className="challenges_feedContainer">
                <div className="challenges_feedHeader">Challenges</div>
                <div className="challenges_feedList">
                  {this.state.challenges.map((u, i) => (
                    <Link
                      to={"/Challenges/challenge/" + u.challengeSlug}
                      className="challenges_feedBlock"
                      key={`challengesBlockLink${i}`}
                    >
                      <div className="challenges_feedImageContainer">
                        <img
                          alt=""
                          className="challenges_feedImage"
                          src={u.challengeImage}
                        />
                      </div>
                      <div className="challenges_feedInfo">
                        <div className="challenges_feedTitle">
                          {u.challengeTitle}
                        </div>
                        <div
                          className="challenges_feedContent"
                          dangerouslySetInnerHTML={{
                            __html: u.challengeContent
                          }}
                        />
                        <div className="challenges_feedTags">
                          {u.categories.map((c, j) => (
                            <div
                              className="challenges_tagBlock"
                              key={`challengestagblock${j}`}
                            >
                              {c.categoryName}
                            </div>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                  {this.renderWaypoint()}
                </div>
              </div>
            </div>
            <div className="challenges_sideBar">
              <RightBar app={this.state.app} history={this.props.history} />
            </div>
          </div>
        </main>

        <footer />
      </div>
    );
  }
}
