/*
 *
 * Teams
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import SideNav from '../../components/SideNav';
import RightBar from '../../components/RightBar';

import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {
  EditorState,
  // ContentState, 
  // convertFromHTML, 
  convertToRaw
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Waypoint from 'react-waypoint';

import './style.css';
import './styleM.css';

export default class Teams extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('challengeToken'),
      teams: [],
      snack: false,
      msg: "",
      teamOpen: false,
      teamName: "",
      teamLocation: "",
      teamImage: "",
      teamImagePreview: "",
      teamContent: EditorState.createEmpty(),
      nextPage: 1,
      currentPage: 0,
      lastPage: 1,
      searchContent: "",
      app: this.props.app
    }
  }

  handleRequestClose = () => { this.setState({ snack: false, msg: "" }); };
  showSnack = (msg) => { this.setState({ snack: true, msg: msg }); };

  teamDialog = () => { this.setState({ teamOpen: !this.state.teamOpen }) }

  handleSearch = (event) => {
    this.setState({
      searchContent: event.target.value
    }, () => {
      if (this.state.searchContent.length >= 3) {
        this.search();
      }
    })
  }

  handleTeamName = (event) => { this.setState({ teamName: event.target.value }) }
  handleTeamLocation = (event) => { this.setState({ teamLocation: event.target.value }) }
  handleTeamContent = (editorState) => { this.setState({ teamContent: editorState, editorState: editorState }) };
  handleTeamImage = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        teamImage: file,
        teamImagePreview: reader.result
      })
    }
    reader.readAsDataURL(file);
  }


  componentDidMount() {
    //this.getTeams();
  }

  componentWillReceiveProps(app) {
    this.setState({
      app: app.app
    }, () => {
      this.forceUpdate();
    })
  }

  getTeams = () => {
    var nextPage = this.state.nextPage;
    var teams = this.state.teams;
    if (this.state.currentPage !== this.state.lastPage) {
      fetch("https://suggestify.io/api/getTeams/30?page=" + this.state.nextPage, {
        method: 'GET'
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          if (json.teams.current_page !== json.teams.last_page) {
            nextPage = nextPage + 1;
          }
          for (var i = 0; i < json.teams.data.length; i++) {
            teams.push(json.teams.data[i]);
          }
          this.setState({
            nextPage: nextPage,
            lastPage: json.teams.last_page,
            currentPage: json.teams.current_page,
            teams: teams,
          })
        })
    }
  }

  storeTeam = () => {
    let data = new FormData();

    data.append('teamName', this.state.teamName);
    data.append('teamLocation', this.state.teamLocation);
    data.append('teamContent', draftToHtml(convertToRaw(this.state.teamContent.getCurrentContent())));
    data.append('teamImage', this.state.teamImage);

    fetch("https://suggestify.io/api/storeTeam", {
      method: 'POST',
      body: data,
      headers: { 'Authorization': 'Bearer ' + this.state.token }
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.error) {
          if (json.error === 'token_expired') {
            this.props.app.signOut(0, 'Your session has expired.');
            this.props.app.handleAuth();
          } else {
            this.showSnack(json.error);
          }
        }
        else if (json.success) {
          this.showSnack(json.success);
          this.teamDialog();
        }
      })
  }

  search = () => {
    let data = new FormData();

    data.append('searchContent', this.state.searchContent);

    fetch("https://suggestify.io/api/searchTeams", {
      method: 'POST',
      body: data
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          nextPage: 1,
          currentPage: 0,
          lastPage: 1,
          teams: json.teams,
        })
      })
  }

  renderTeamImageText = () => {
    if (this.state.teamImagePreview === "" || this.state.teamImagePreview === undefined || this.state.teamImagePreview === null) {
      return (
        <span style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
          Upload Team Image
          <span style={{ fontSize: '0.9rem', marginTop: '5px' }}>For Best Size Use: 1280 x 720</span>
        </span>
      )
    }
  }

  renderTeamImage = () => {
    if (this.state.teamImage !== "") {
      return (
        <img alt="" src={this.state.teamImagePreview} className="challenges_newChallengeImagePreview" />
      )
    }
  }

  renderWaypoint = () => {
    if (this.state.searchContent < 3) {
      return (
        <Waypoint onEnter={this.getTeams} />
      )
    }
  }

  render() {
    return (
      <div className="container">
        <Helmet title="Teams" meta={[{ name: 'description', content: 'Description of Teams' }]} />

        <header>
          <Header app={this.state.app} space={this.props.spaceName} />
        </header>

        <main className="challenges_mainContainer">
          <div className="challenges_contentContainer">
            <div className="challenges_categoryContainer">
              <SideNav app={this.state.app} />
            </div>
            <div className="challenges_challengeFeed">
              <div className="challenges_myTeamBlock">
                <div className="challenges_myTeamText">Create or Join a Team</div>
                <FlatButton style={{ background: '#32b6b6', color: '#FFFFFF' }} onClick={this.teamDialog}>Create Team</FlatButton>
              </div>
              <TextField value={this.state.searchContent} onChange={this.handleSearch} fullWidth placeholder="Search For Teams" style={{ marginTop: '15px' }} />
              <div className="challenges_teamList">
                {this.state.teams.map((t, i) => (
                  <Link to={'/Challenges/team/' + t.id} className="challenges_feedBlock" key={`Teams${i}`}>
                    <div className="challenges_feedImageContainer">
                      <img alt="" className="challenges_feedImage" src={t.teamImage} />
                    </div>
                    <div className="challenges_feedInfo">
                      <div className="challenges_feedTitle">{t.teamName}</div>
                      <div className="challenges_feedContent" dangerouslySetInnerHTML={{ __html: t.teamContent }} />
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        {t.members.map((m, j) => (
                          <img alt="" className="challenges_memberAvatar" key={`teamsAvatar${j}`} src={m.avatar} />
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
                {this.renderWaypoint()}
              </div>
            </div>
            <div className="challenges_sideBar">
              <RightBar app={this.state.app} />
            </div>
          </div>
        </main>

        <Dialog open={this.state.teamOpen} onClose={this.teamDialog}>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '15px' }}>
            <TextField
              label="Team Name"
              value={this.state.teamName}
              onChange={this.handleTeamName}
              margin="normal"
            />
            <TextField
              label="Team Location"
              value={this.state.teamLocation}
              onChange={this.handleTeamLocation}
              margin="normal"
            />
            <div>
              <label htmlFor="team-image" className="challenges_challengeImageBlock">
                {this.renderTeamImageText()}
                {this.renderTeamImage()}
              </label>
              <input type="file" onChange={this.handleTeamImage} id="team-image" style={{ display: 'none' }} />
            </div>
            <Editor
              editorState={this.state.teamContent}
              toolbarclassName="challenges_question-toolbar"
              wrapperclassName="challenges_question-wrapper"
              editorclassName="challenges_question-editor-main"
              onEditorStateChange={this.handleTeamContent}
              placeholder="Type your Team Description Here..."
              toolbar={{
                inline: { inDropdown: true },
                fontSize: { className: "toolbarHidden", },
                fontFamily: { className: "toolbarHidden", },
                list: { inDropdown: true, options: ['unordered', 'ordered'] },
                textAlign: { inDropdown: true, options: ['left', 'center', 'right'] },
                link: { inDropdown: true },
                remove: { className: "toolbarHidden", },
                emoji: { className: "toolbarHidden", },
                history: { className: "toolbarHidden", },
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <FlatButton style={{ width: "100%", maxWidth: '75%', backgroundColor: "#32b6b6", color: "#FFFFFF" }} onClick={this.storeTeam}>Submit Team</FlatButton>
              <FlatButton style={{ width: "100%", maxWidth: '50%', marginTop: '20px', color: "#FFFFFF", backgroundColor: "#CCCCCC" }} onClick={this.teamDialog}>Close</FlatButton>
            </div>
          </div>
        </Dialog>

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
