/*
 *
 * Detail
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from 'components/Header';

import FlatButton from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

import './style.css';
import './styleM.css';

export default class Detail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      token:localStorage.getItem('token'),
      challenge:"",
      categories:[],
      uploads:[],
      teams:[],
      participant:false,
      space:"",
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
    }, () => {
      this.forceUpdate();
    })
  }*/

  getDetail = () => {
    fetch("http://localhost:8000/api/showChallenge/"+this.props.match.params.id, {
      method:'GET'
    })
    .then(response => response.json())
    .then(json => {
      this.setState({
        challenge:json.challenge,
        categories:json.challenge.categories,
        uploads:json.uploads,
        teams:json.teams,
        participant:json.participant
      }, () => {
        this.getSpace();
      })
    })
  }

  getSpace = () => {
    fetch("http://localhost:8000/api/workspace/" + this.state.challenge.spaceID, {
        method: "GET"
      }
    )
    .then(response => response.json())
    .then(json => {
        this.setState({
          space: json
        });
    });
  }

  joinChallenge = () => {
    fetch("http://localhost:8000/api/joinChallenge/" + this.state.challenge.id, {
      method:'GET',
      headers: {'Authorization':'Bearer ' + this.state.token}
    })
    .then(response => response.json())
    .then(json => {
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
        <FlatButton onClick={this.joinChallenge} style={{background:'#32b6b6', color:'#FFFFFF', marginBottom:'15px', width:'100%'}}>Join Challenge</FlatButton>
      )
    }
    else {
      return(
       <Link to={'/join/'+this.state.space.slug} style={{textDecoration:'none', width:'100%'}}><FlatButton style={{background:'#32b6b6', color:'#FFFFFF', marginBottom:'15px', width:'100%'}}>Join Challenge</FlatButton></Link>
      )
    }
  }

  createMarkup() {
    let content = this.state.challenge.challengeContent;
    return {__html: content};
  }

  render() {
    return (
      <div className="container">
        <Helmet title={this.state.challenge.challengeTitle} meta={[ { name: 'description', content: 'Description of Detail' }]}/>

        <header>
          <Header/>
        </header>

        <main className="challenges_mainContainer">
          <div className="challenges_contentContainer">
            <div className="challenges_detailColumnOne">
              <div className="challenges_detailBlock">
                {/*<div className="challenges_detailAvatarContainer">
                  <img className="challenges_detailAvatar" src={this.state.challenge.avatar}/>
    </div>*/}
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
                <img alt="" className="challenges_detailImage" src={this.state.challenge.challengeImage} />
              </div>
              <div style={{fontFamily:'Noto Sans', fontWeight:'200', color:'#555555', paddingTop:'5px', paddingBottom:'5px', lineHeight:'35px'}} className="challenges_detailContent" dangerouslySetInnerHTML={this.createMarkup()} />
            </div>
            <div className="challenges_detailColumnTwo">
              {this.renderJoinButton()}
              <div className="challenges_detailSideBlock">
                <div className="challenges_categoryTitle">Uploads</div>
                {this.state.uploads.map((u, i) => (
                  <a href={u.fileData} target="_blank" className="challenges_uploadBlock">{u.fileName}</a>
                ))}
              </div>
              <div className="challenges_detailSideBlock">
                <div className="challenges_categoryTitle">Participants</div>
                {this.state.teams.map((t, i) => (
                  <div className="challenges_participantBlock">
                    <img alt="" className="challenges_participantImage" src={t.teamImage}/>
                    <div className="challenges_participantName">{t.teamName}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <footer className="homeFooterContainer">
          Copyright © 2018 theClubhou.se  • 540 Telfair Street  •  Tel: (706) 723-5782
      </footer>

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
