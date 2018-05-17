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
import { Grid, Typography, withStyles } from "material-ui";
import TextField from "material-ui/TextField";

import Waypoint from "react-waypoint";

import "./style.css";
import "./styleM.css";

const styles = theme => ({
  display1: {
    color: theme.typography.headline.color,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  body1: {
    fontSize: theme.typography.subheading.fontSize,
  },
});

class Discover extends React.PureComponent {
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
          <Grid container direction="column" alignContent="center">
            <Grid item xs={12} sm={12} md={8} >
              <Typography
                variant="display1"
                align="center"
                classes={{ display1: this.props.classes.display1 }}
                gutterBottom
              >
                What is the Southeast Startup Challenge?
              </Typography>
              <Typography
                variant="body1"
                paragraph
                gutterBottom
                classes={{ body1: this.props.classes.body1 }}
              >
                Join us for the Southeast Startup Challenge Summit on Monday, June 18th in Macon, Georgia (exact location TBA). Two finalists from each of the five participating Georgia cities will compete for $25,000 in cash and services by pitching businesses formed from their solutions to a series of health challenges posed by their local communities--in other words, business and tech coming together to do a lot of good.
              </Typography>
              <Typography
                variant="body1"
                paragraph
                gutterBottom
                classes={{ body1: this.props.classes.body1 }}
              >
                This event is FREE and open to the public. To register, visit <a href="www.SoutheastStartupChallenge.com" target="_blank" rel="noopener noreferrer">Southeast Startup Challenge</a>
              </Typography>
              <Typography
                variant="body1"
                paragraph
                gutterBottom
                classes={{ body1: this.props.classes.body1 }}
              >
                This summit is part of an effort funded by Robert Wood Johnson Foundation that strives to improve the health of mid-size communities by using their local collaborative spaces as a hub for startups, makers, and learners to make positive impacts for their communities.
              </Typography>
            </Grid>
          </Grid>
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
export default withStyles(styles)(Discover);