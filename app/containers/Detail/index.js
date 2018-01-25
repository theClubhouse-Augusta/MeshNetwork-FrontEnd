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

export default class Detail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      token:localStorage.getItem('challengeToken'),
      challenge:"",
      categories:[],
      uploads:[],
      teams:[],
      participant:false,
      snack: false,
      msg: "",
    }
    //      app:this.props.app
  }

  handleRequestClose = () => { this.setState({ snack: false, msg: "" }); };
  showSnack = (msg) => { this.setState({ snack: true, msg: msg }); };

  componentWillMount() {
    this.getDetail();
  }

  /*componentWillReceiveProps(app) {
    this.setState({
      app:app.app
    }, function() {
      this.forceUpdate();
    })
  }*/

  getDetail = () => {
    fetch("http://challenges.innovationmesh.com/api/showChallenge/"+this.props.match.params.id, {
      method:'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        challenge:json.challenge,
        categories:json.challenge.categories,
        uploads:json.uploads,
        teams:json.teams,
        participant:json.participant
      })
    }.bind(this))
  }

  joinChallenge = () => {
    fetch("http://challenges.innovationmesh.com/api/joinChallenge/" + this.state.challenge.id, {
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
        <FlatButton onClick={this.joinChallenge} style={{background:'#32b6b6', color:'#FFFFFF', marginBottom:'15px', width:'100%'}}>Join Challenge</FlatButton>
      )
    }
    else {
      <FlatButton onClick={this.props.app.handleAuth} style={{background:'#32b6b6', color:'#FFFFFF', marginBottom:'15px', width:'100%'}}>Join Challenge</FlatButton>
    }
  }

  render() {
    return (
      <div className="container">
        <Helmet title="Detail" meta={[ { name: 'description', content: 'Description of Detail' }]}/>

        <header>
          <Header/>
        </header>

        <main className="challenges_mainContainer">
          <div className="challenges_contentContainer">
            <div className="challenges_detailColumnOne">
              <div className="challenges_detailBlock">
                <div className="challenges_detailAvatarContainer">
                  <img className="challenges_detailAvatar" src={this.state.challenge.avatar}/>
                </div>
                <div className="challenges_detailInfo">
                  <div className="challenges_detailTitle">{this.state.challenge.challengeTitle}</div>

                  <div className="challenges_feedTags">
                    {this.state.categories.map((c, j) => (
                      <div className="challenges_tagBlock" key={j}>{c.categoryName}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="challenges_detailImageContainer">
                <img className="challenges_detailImage" src={this.state.challenge.challengeImage} />
              </div>
              <div className="challenges_detailContent" dangerouslySetInnerHTML={{ __html: this.state.challenge.challengeContent }} />
            </div>
            <div className="challenges_detailColumnTwo">
              {/*this.renderJoinButton()*/}
              <div className="challenges_detailSideBlock">
                <div className="challenges_categoryTitle">Uploads</div>
                {this.state.uploads.map((u, i) => (
                  <Link to={u.filePath} className="challenges_uploadBlock">{u.fileName}</Link>
                ))}
              </div>
              <div className="challenges_detailSideBlock">
                <div className="challenges_categoryTitle">Participants</div>
                {this.state.teams.map((t, i) => (
                  <div className="challenges_participantBlock">
                    <img className="challenges_participantImage" src={t.teamImage}/>
                    <div className="challenges_participantName">{t.teamName}</div>
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
