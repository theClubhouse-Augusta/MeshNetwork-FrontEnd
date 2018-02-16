/*
 *
 * Detail
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header';

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

  componentWillMount() {
    this.getDetail();
  }

  componentWillReceiveProps(app) {
    this.setState({
      app:app.app
    }, function() {
      this.forceUpdate();
    })
  }

  getDetail = () => {
    fetch("https://innovationmesh.com/api/showTeam/"+this.props.match.params.id, {
      method:'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        team:json.team,
        members:json.members
      })
    }.bind(this))
  }

  joinTeam = () => {
    let _this = this;
    fetch("https://innovationmesh.com/api/joinTeam/" + this.state.team.id, {
      method:'GET',
      headers: {'Authorization':'Bearer ' + this.state.token}
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if(json.error) {
        _this.showSnack(json.error);
      }
      else {
        _this.showSnack(json.success);
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
      <FlatButton onClick={this.props.app.handleAuth} style={{background:'#32b6b6', color:'#FFFFFF', marginBottom:'15px', width:'100%'}}>Join Team</FlatButton>
    }
  }

  render() {
    return (
      <div className="container">
        <Helmet title="Detail" meta={[ { name: 'description', content: 'Description of Detail' }]}/>

        <header>
          <Header app={this.state.app}/>
        </header>

        <main className="challenges_mainContainer">
          <div className="challenges_contentContainer">
            <div className="challenges_detailColumnOne">
              <div className="challenges_detailBlock">
                <div className="challenges_detailAvatarContainer">
                  <img className="challenges_detailAvatar" src={this.state.team.teamImage}/>
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
                      <Link to={'/Challenges/challenge/' + u.challengeSlug} className="challenges_feedBlock" key={i}>
                        <img className="challenges_feedImage" src={u.challengeImage}/>
                        <div className="challenges_feedInfo">
                          <div className="challenges_feedTitle">{u.challengeTitle}</div>
                          <div className="challenges_feedContent" dangerouslySetInnerHTML={{ __html: u.challengeContent }} />
                          <div className="challenges_feedTags">
                            {u.categories.map((c, j) => (
                              <div className="challenges_tagBlock" key={j}>{c.categoryName}</div>
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
                  <div className="challenges_participantBlock" key={i}>
                    <img className="challenges_participantImage" src={m.avatar} />
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
