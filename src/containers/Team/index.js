/*
 *
 * Detail
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from '../../components/Header';

import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

import './style.css';
import './styleM.css';

export default class Team extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      token:localStorage.getItem('challengeToken'),
      team:"",
      members:[],
      challenges:[],
      snack: false,
      msg: "",
      app:this.props.app
    }
  }

  handleRequestClose = () => { this.setState({ snack: false, msg: "" }); };
  showSnack = (msg) => { this.setState({ snack: true, msg: msg }); };

  componentDidMount() {
    this.getDetail();
  }

  componentWillReceiveProps(app) {
    this.setState({
      app:app.app
    }, () => {
      this.forceUpdate();
    })
  }

  getDetail = () => {
    fetch("https://suggestify.io/api/showTeam/"+this.props.match.params.id, {
      method:'GET'
    })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      this.setState({
        team:json.team,
        members:json.members
      })
    })
  }

  joinTeam = () => {
    fetch("https://suggestify.io/api/joinTeam/" + this.state.team.id, {
      method:'GET',
      headers: {'Authorization':'Bearer ' + this.state.token}
    })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      if(json.error) {
        this.showSnack(json.error);
      }
      else {
        this.showSnack(json.success);
      }
    })
  }

  renderJoinButton = () => {
    if(this.state.token)
    {
      return(
        <FlatButton onClick={this.joinTeam} style={{background:'#32b6b6', color:'#FFFFFF', marginBottom:'15px', width:'100%'}}>Join Team</FlatButton>
      )
    }
    else {
      return (
        <FlatButton onClick={this.props.app.handleAuth} style={{background:'#32b6b6', color:'#FFFFFF', marginBottom:'15px', width:'100%'}}>Join Team</FlatButton>
      );
    }
  }

  render() {
    return (
      <div className="container">
        <Helmet title="Detail" meta={[ { name: 'description', content: 'Description of Detail' }]}/>

        <header>
          <Header app={this.state.app} space={this.props.spaceName}/>
        </header>

        <main className="challenges_mainContainer">
          <div className="challenges_contentContainer">
            <div className="challenges_detailColumnOne">
              <div className="challenges_detailBlock">
                <div className="challenges_detailAvatarContainer">
                  <img alt="" className="challenges_detailAvatar" src={this.state.team.teamImage}/>
                </div>
                <div className="challenges_detailInfo" style={{justifyContent:'center'}}>
                  <div className="challenges_detailTitle">{this.state.team.teamName}</div>
                  <div className="challenges_tagBlock" style={{background:'#FFFFFF', border:'none'}}>{this.state.team.teamLocation}</div>
                </div>
              </div>
              <div className="challenges_detailContent" dangerouslySetInnerHTML={{ __html: this.state.team.teamContent }} />
              <div style={{width:'100%', marginTop:'15px'}}>
                <div className="challenges_feedContainer">
                  <div className="challenges_feedHeader">Challenges</div>
                  <div className="challenges_feedList">
                    {this.state.challenges.map((u, i) => (
                      <Link to={'/Challenges/challenge/' + u.challengeSlug} className="challenges_feedBlock" key={`TeamFeedBlock${i}`}>
                        <img alt="" className="challenges_feedImage" src={u.challengeImage}/>
                        <div className="challenges_feedInfo">
                          <div className="challenges_feedTitle">{u.challengeTitle}</div>
                          <div className="challenges_feedContent" dangerouslySetInnerHTML={{ __html: u.challengeContent }} />
                          <div className="challenges_feedTags">
                            {u.categories.map((c, j) => (
                              <div className="challenges_tagBlock" key={`TeamTagBlock${j}`}>{c.categoryName}</div>
                            ))}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="challenges_detailColumnTwo">
              {this.renderJoinButton()}
              <div className="challenges_detailSideBlock">
                <div className="challenges_categoryTitle">Members</div>
                {this.state.members.map((m, i) => (
                  <div className="challenges_participantBlock" key={`TeamMembers${i}`}>
                    <img  alt="" className="challenges_participantImage" src={m.avatar} />
                    <div className="challenges_participantName">{m.profileName}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

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
