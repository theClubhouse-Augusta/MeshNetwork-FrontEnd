/*
 *
 * Challenges
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import Header from 'components/Header';
import SideNav from 'components/SideNav';
import RightBar from 'components/RightBar';

import TextField from 'material-ui/TextField';

import Waypoint from 'react-waypoint';

import './style.css';
import './styleM.css';

export default class Ask extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      questions:[],
      nextPage:1,
      currentPage:0,
      lastPage:1,
      searchContent:"",
      app:this.props.app
    }
  }

  componentWillMount() {
    //this.getQuestions();
  }

  componentWillReceiveProps(app) {
    this.setState({
      app:app.app
    }, () => {
      this.forceUpdate();
    })
  }

  handleSearch = (event) => {
    this.setState({
      searchContent:event.target.value
    }, () => {
      if(this.state.searchContent.length >= 3) {
        this.search();
      }
    })
  }

  getQuestions = () => {
    var nextPage = this.state.nextPage;
    var questions = this.state.questions;
    if(this.state.currentPage !== this.state.lastPage)
    {
      fetch("http://localhost:8000/api/getQuestions/30?page=" + this.state.nextPage, {
        method:'GET',
      })
      .then(response => response.json())
      .then(json => {
        if(json.questions.current_page !== json.questions.last_page)
        {
           nextPage = nextPage + 1;
        }
        for(var i = 0; i < json.questions.data.length; i++)
        {
          questions.push(json.questions.data[i]);
        }
        this.setState({
          nextPage: nextPage,
          lastPage: json.questions.last_page,
          currentPage: json.questions.current_page,
          questions: questions,
        })
      })
    }
  }

  search = () => {
    let data = new FormData();

    data.append('searchContent', this.state.searchContent);

    fetch("http://localhost:8000/api/searchQuestions", {
      method:'POST',
      body:data
    })
    .then(response => response.json())
    .then(json => {
      this.setState({
        nextPage:1,
        currentPage:0,
        lastPage:1,
        questions: json.questions,
      })
    })
  }

  renderWaypoint = () => {
    if(this.state.searchContent < 3)
    {
      return(
        <Waypoint onEnter={this.getQuestions} />
      )
    }
  }

  render() {
    return (
      <div className="container">
        <Helmet title="Discover" meta={[ { name: 'description', content: 'Description of Discover' }]}/>

        <header>
          <Header app={this.state.app}/>
        </header>

        <main className="challenges_mainContainer">

          <div className="challenges_contentContainer">
            <div className="challenges_categoryContainer">
              <SideNav app={this.state.app}/>
            </div>
            <div className="challenges_challengeFeed">
              <TextField value={this.state.searchContent} onChange={this.handleSearch} fullWidth placeholder="Search For Questions" style={{marginBottom:'15px'}}/>
              <div className="challenges_feedContainer">
                <div className="challenges_feedHeader">Questions</div>
                <div className="challenges_questionContainer">
                  {this.state.questions.map((q, i) => (
                    <Link to={'/Challenges/Ask/' + q.questionSlug} className="challenges_questionBlock" key={i}>
                      <div className="challenges_questionHeader">
                        <div className="challenges_questionAvatar">
                          <img alt="" className="challenges_questionAvatarImg" src={q.avatar} />
                        </div>
                        <div className="challenges_questionName">{q.profileName}</div>
                        <div className="challenges_questionWho">{q.profileTitle}</div>
                      </div>
                      <div className="challenges_feedInfo">
                        <div className="challenges_feedTitle">{q.questionTitle}</div>
                        <div className="challenges_feedContent" dangerouslySetInnerHTML={{ __html: q.questionContent }} />
                      </div>
                    </Link>
                  ))}
                  {this.renderWaypoint()}
                </div>
              </div>
            </div>
            <div className="challenges_sideBar">
              <RightBar app={this.state.app}/>
            </div>
          </div>

        </main>

        <footer>

        </footer>
      </div>
    );
  }
}
