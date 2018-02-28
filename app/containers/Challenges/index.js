/*
 *
 * Challenge Home
 *
 */

import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

// import FlatButton from 'material-ui/Button';

import Header from "components/Header";
import Banner from "components/Banner";
import SideNav from "components/SideNav";
import RightBar from "components/RightBar";

import "./style.css";
import "./styleM.css";

export default class Challenges extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      challenges: [],
      questions: [],
      teams: [],
      app: this.props.app
    };
  }

  componentWillMount() {
    this.getChallenges();
    //this.getQuestions();
    //this.getTeams();
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

  getChallenges = () => {
    fetch("https://innovationmesh.com/api/getChallenges/5", {
      method: "GET"
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          challenges: json.challenges.data
        });
      });
  };

  getQuestions = () => {
    fetch("https://innovationmesh.com/api/getQuestions/5", {
      method: "GET"
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          questions: json.questions.data
        });
      });
  };

  getTeams = () => {
    fetch("https://innovationmesh.com/api/getTeams/5", {
      method: "GET"
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          teams: json.teams.data
        });
      })
      .then(response => response.json())
      .then(json => {
        this.setState({
          teams: json.teams.data
        });
      });
  };

  render() {
    return (
      <div className="container">
        <Helmet
          title="Home"
          meta={[{ name: "description", content: "Description of Home" }]}
        />

        <header>
          <Header app={this.state.app} space={this.props.spaceName} />
        </header>

        <main className="challenges_mainContainer">
          <Banner app={this.state.app} />

          <div className="challenges_contentsContainer">
            <div className="categoryContainer">
              <SideNav app={this.state.app} />
            </div>
            <div className="challenges_challengeFeed">
              <div className="challenges_feedContainer">
                <div className="challenges_feedHeader">Challenges</div>
                <div className="challenges_feedList">
                  {this.state.challenges.map((u, i) => (
                    <Link
                      to={"/Challenges/challenge/" + u.challengeSlug}
                      className="challenges_feedBlock"
                      key={`challengeFeedBlock${i}`}
                    >
                      <img
                        alt=""
                        className="challenges_feedImage"
                        src={u.challengeImage}
                      />
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
                              key={`challengesCategory${j}`}
                            >
                              {c.categoryName}
                            </div>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="challenges_feedContainer">
                <div className="challenges_feedHeader">Questions</div>
                <div className="challenges_questionContainer">
                  {this.state.questions.map((q, i) => (
                    <Link
                      to={"/Challenges/Ask/" + q.questionSlug}
                      className="challenges_questionBlock"
                      key={`challengeQuestionBloclLink${i}`}
                    >
                      <div className="challenges_questionHeader">
                        <div className="challenges_questionAvatar">
                          <img
                            className="challenges_questionAvatarImg"
                            src={q.avatar}
                          />
                        </div>
                        <div className="challenges_questionName">
                          {q.profileName}
                        </div>
                        <div className="challenges_questionWho">
                          {q.profileTitle}
                          <img
                            alt=""
                            className="challenges_questionAvatarImg"
                            src={q.avatar}
                          />
                        </div>
                      </div>
                      <div className="challenges_feedInfo">
                        <div className="challenges_feedTitle">
                          {q.questionTitle}
                        </div>
                        <div
                          className="challenges_feedContent"
                          dangerouslySetInnerHTML={{
                            __html: q.questionContent
                          }}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="challenges_feedContainer">
                <div className="challenges_feedHeader">Teams</div>
                {this.state.teams.map((t, i) => (
                  <Link
                    to={"/Challenges/team/" + t.id}
                    className="challenges_feedBlock"
                    key={`challenges_fb${i}`}
                  >
                    <div className="challenges_feedImageContainer">
                      <img
                        alt=""
                        className="challenges_feedImage"
                        src={t.teamImage}
                      />
                    </div>
                    <div className="challenges_feedInfo">
                      <div className="challenges_feedTitle">{t.teamName}</div>
                      <div
                        className="challenges_feedContent"
                        dangerouslySetInnerHTML={{ __html: t.teamContent }}
                      />
                      {t.members.map((m, j) => (
                        <img
                          alt=""
                          className="challenges_memberAvatar"
                          key={`challengesAvatar${j}`}
                          src={m.avatar}
                        />
                      ))}
                    </div>
                  </Link>
                ))}
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
