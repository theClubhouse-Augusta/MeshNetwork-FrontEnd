/*
 *
 * Challenges
 *
 */

import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

import Header from "components/Header";
// import Banner from 'components/Banner';
import SideNav from "components/SideNav";
import RightBar from "components/RightBar";

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

  /* componentWillMount() {
    if(this.props.match.params.id) {
      this.showCategories(this.props.match.params.id);
    }
    //this.getChallenges();
  } */

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
      "http://localhost:8000/api/showCategory/" + categoryID + "/Challenges",
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
            method: "GET";
          }
        })
        .then(function(response) {
          return response.json();
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
    return (
      <div className="container">
        <Helmet
          title="Discover"
          meta={[{ name: "description", content: "Description of Discover" }]}
        />

        <header>
          <Header app={this.state.app} space={this.props.spaceName} />
        </header>

        <main className="challenges_mainContainer">
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
                style={{ marginBottom: "15px" }}
              />
              <div className="challenges_feedContainer">
                <div className="challenges_feedHeader">Challenges</div>
                <div className="challenges_feedList">
                  {this.state.challenges.map((u, i) => (
                    <Link
                      to={"/Challenges/challenge/" + u.challengeSlug}
                      className="challenges_feedBlock"
                      key={i}
                    >
                      <div className="challenges_feedImageContainer">
                        <img
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
                            <div className="challenges_tagBlock" key={j}>
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
              <RightBar app={this.state.app} />
            </div>
          </div>
        </main>

        <footer />
      </div>
    );
  }
}
