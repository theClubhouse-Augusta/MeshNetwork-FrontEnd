import { ContentState, EditorState, convertFromHTML, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import FlatButton from "material-ui/Button";
import Snackbar from "material-ui/Snackbar";
import TextField from "material-ui/TextField";
import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import "react-select/dist/react-select.css";
import Header from "../../components/Header";
import "./style.css";
import "./styleM.css";

export default class Detail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      challengeOpen: false,
      challenge: "",
      challengeTitle: "",
      challengeCategories: "",
      challengeContent: EditorState.createEmpty(),
      challengeImage: "",
      challengeImagePreview: "",
      challengeFiles: [],
      confirmStatus: "Confirm",
      workSpace: "",
      startDate: "",
      endDate: "",
      eventDates: [],
      cats: [],
      categories: [],
      uploads: [],
      teams: [],
      participant: false,
      space: "",
      snack: false,
      msg: "",
      submissions: [],
      submissionTitle: "",
      submissionDescription: "",
      submissionVideo: "",
      submissionGithub: "",
      submissionFile: "",
      confirmSubmission: "Confirm Submission"
    };
  };
  componentDidMount() {
    this.getDetail();
  };
  handleRequestClose = () => {
    this.setState({
      snack: false,
      msg: ""
    });
  };
  showSnack = msg => {
    this.setState({
      snack: true,
      msg: msg
    });
  };
  challengeDialog = () => {
    this.setState({ challengeOpen: !this.state.challengeOpen }, () => {
      this.getCategories();
    });
  };
  handleChallengeTitle = event => {
    this.setState({ challengeTitle: event.target.value });
  };
  handleChallengeContent = editorState => {
    this.setState({ challengeContent: editorState });
  };
  handleChallengeCategories = challengeCategories => {
    this.setState({ challengeCategories });
  };
  handleChallengeImage = event => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        challengeImage: file,
        challengeImagePreview: reader.result
      });
    };
    reader.readAsDataURL(file);
  };
  handleChallengeFile = event => {
    event.preventDefault();
    let reader = new FileReader();
    let files = event.target.files;
    let challengeFiles = [...this.state.challengeFiles];
    for (let i = 0; i < files.length; i++) {
      let fileData = { fileData: files[i], id: 0 };
      challengeFiles.push(fileData);
      reader.onloadend = () => {
        this.setState(() => ({
          challengeFiles,
        }));
      };
      reader.readAsDataURL(files[i]);
    }
  };
  handleSubmissionTitle = event => {
    this.setState({ submissionTitle: event.target.value });
  };
  handleSubmissionDescription = event => {
    this.setState({ submissionDescription: event.target.value })
  };
  handleSubmissionVideo = event => {
    this.setState({ submissionVideo: event.target.value })
  };
  handleSubmissionGithub = event => {
    this.setState({ submissionGithub: event.target.value })
  };
  handleSubmissionFile = event => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        submissionFile: file,
      });
    }
    reader.readAsDataURL(file);
  };
  getSubmissions = (id) => {
    fetch(`http://localhost:8000/api/getSubmissions/${id}`)
      .then(response => response.json())
      .then(({ submissions }) => {
        this.setState(() => ({ submissions }));
      })
  };
  storeSubmission = () => {
    this.setState(() => ({ confirmSubmission: "Uploading..." }));
    let data = new FormData();
    data.append('challengeID', this.state.challenge.id);
    data.append('submissionTitle', this.state.submissionTitle);
    data.append('submissionDescription', this.state.submissionDescription);
    data.append('submissionVideo', this.state.submissionVideo);
    data.append('submissionGithub', this.state.submissionGithub);
    data.append('submissionFile', this.state.submissionFile);
    fetch('http://localhost:8000/api/storeSubmission', {
      method: 'POST',
      body: data,
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    })
      .then(response => response.json())
      .then(({
        error,
        success
      }) => {
        if (error) {
          this.showSnack(error);
          this.setState(() => ({ confirmSubmission: "Confirm Submission" }));
        }
        else if (success) {
          this.showSnack(success);
          this.setState(() => ({
            confirmSubmission: "Confirm Submission"
          }));
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
  };
  deleteSubmission = id => {
    fetch(`http://localhost:8000/api/deleteSubmission/${id}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    })
      .then(response => response.json())
      .then(({ success }) => {
        this.showSnack(success);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
  };
  getCategories = () => {
    fetch("http://localhost:8000/api/selectCategories")
      .then(response => response.json())
      .then(({ categories: cats }) => {
        this.setState(() => ({ cats }));
      });
  };
  deleteFile = i => {
    let challengeFiles = [...this.state.challengeFiles];
    challengeFiles.splice(i, 1);
    this.setState(() => ({ challengeFiles }));
  };
  updateChallenge = () => {
    this.setState(() => ({ confirmStatus: "Uploading..." }));
    let data = new FormData();
    data.append("challengeTitle", this.state.challengeTitle);
    data.append(
      "challengeContent",
      draftToHtml(convertToRaw(this.state.challengeContent.getCurrentContent()))
    );
    data.append(
      "challengeCategories",
      JSON.stringify(this.state.challengeCategories)
    );
    data.append("challengeImage", this.state.challengeImage);
    data.append("challengeFiles", this.state.challengeFiles);
    data.append("startDate", this.state.startDate);
    data.append("endDate", this.state.endDate);
    fetch(`http://localhost:8000/api/updateChallenge/${this.state.challenge.id}`, {
      method: "POST",
      body: data,
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    })
      .then(response => response.json())
      .then(({
        error,
        challenge,
      }) => {
        if (error) {
          if (error === "token_expired") {
            this.showSnack("Your session has expired. Please sign back in to continue.");
          } else {
            this.showSnack(error);
            this.setState(() => ({
              confirmStatus: "Confirm"
            }));
          }
        } else if (challenge) {
          // (this.state.challengeFiles.length);
          if (this.state.challengeFiles.length > 0) {
            for (let i = 0; i < this.state.challengeFiles.length; i++) {
              let fileData = new FormData();
              fileData.append("challengeID", challenge);
              fileData.append(
                "challengeFile",
                this.state.challengeFiles[i].fileData
              );
              fetch("http://localhost:8000/api/uploadFile", {
                method: "POST",
                body: fileData,
                headers: { Authorization: `Bearer ${localStorage['token']}` }
              })
                .then(response => response.json())
                .then(({ error }) => {
                  if (error) {
                    this.showSnack(error);
                    this.setState({
                      confirmStatus: "Confirm"
                    });
                  }
                });
            }
          }
          this.showSnack("Challenge Updated.");
          this.challengeDialog();
        }
      });
  };
  // deleteChallenge = () => { };
  getDetail = () => {
    fetch(`http://localhost:8000/api/showChallenge/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(({
        challenge,
        uploads,
        teams,
        participant,
        categoriesArray: challengeCategories,
        eventDates,
        workspace: workSpace,
      }) => {
        this.setState({
          challenge,
          categories: challenge.categories,
          uploads: uploads,
          teams,
          participant,
          challengeTitle: challenge.challengeTitle,
          challengeContent: EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(challenge.challengeContent)
            )
          ),
          challengeCategories,
          challengeImagePreview: challenge.challengeImage,
          eventDates,
          workSpace
        },
          () => {
            this.getSpace();
            this.getSubmissions(this.state.challenge.id);
          }
        );
      });
  };
  getSpace = () => {
    fetch(`http://localhost:8000/api/workspace/${this.state.challenge.spaceID}`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          space: json
        });
      });
  };
  joinChallenge = () => {
    fetch(`http://localhost:8000/api/joinChallenge/${this.state.challenge.id}`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    })
      .then(response => response.json())
      .then(({
        error,
        success,
      }) => {
        if (error) {
          this.showSnack(error);
        } else {
          this.showSnack(success);
        }
      });
  };
  renderJoinButton = () => {
    if (localStorage['token']) {
      return (
        <FlatButton
          onClick={this.joinChallenge}
          style={{
            background: "#32b6b6",
            color: "#FFFFFF",
            marginBottom: "15px",
            width: "100%"
          }}
        >
          Start Challenge
        </FlatButton>
      );
    } else {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              background: "#DDDDDD",
              fontSize: "0.9em",
              fontFamily: "Noto Sans",
              padding: "5px",
              marginBottom: "10px",
              borderRadius: "5px",
              color: "#555555"
            }}
          >
            You must join a workspace before starting a challenge.
          </div>
          <Link
            to={"/join/" + this.state.space.slug}
            style={{ textDecoration: "none", width: "100%" }}
          >
            <FlatButton
              style={{
                background: "#32b6b6",
                color: "#FFFFFF",
                marginBottom: "15px",
                width: "100%"
              }}
            >Join Space & Challenge</FlatButton>
          </Link>
        </div>
      );
    }
  };
  renderUpdateButtons = () => {
    if (localStorage['token']) {
      if (this.state.user) {
        if (
          this.state.user.spaceID === this.state.challenge.spaceID &&
          this.state.user.roleID === 2
        ) {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%"
              }}
            >
              <FlatButton
                onClick={this.challengeDialog}
                style={{
                  background: "#32b6b6",
                  color: "#FFFFFF",
                  marginBottom: "15px",
                  width: "100%"
                }}
              >
                Edit Challenge
              </FlatButton>
              {/*<FlatButton onClick={this.deleteChallenge} style={{background:'#32b6b6', color:'#FFFFFF', marginBottom:'15px', width:'100%'}}>Delete Challenge</FlatButton>*/}
            </div>
          );
        }
      }
    }
  };

  renderChallengeImageText = () => {
    if (
      this.state.challengeImagePreview === "" ||
      this.state.challengeImagePreview === undefined ||
      this.state.challengeImagePreview === null
    ) {
      return (
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center"
          }}
        >
          Upload Challenge Image
          <span style={{ fontSize: "0.9rem", marginTop: "5px" }}>
            For Best Size Use: 1280 x 720
          </span>
        </span>
      );
    }
  };

  renderChallengeImage = () => {
    if (this.state.challengeImage === "") {
      return (
        <img
          alt=""
          src={this.state.challengeImagePreview}
          className="challenges_newChallengeImagePreview"
        />
      );
    } else {
      return (
        <img
          alt=""
          src={this.state.challengeImagePreview}
          className="challenges_newChallengeImagePreview"
        />
      );
    }
  };

  createMarkup() {
    let content = this.state.challenge.challengeContent;
    return { __html: content };
  }

  renderUploads = () => {
    if (this.state.uploads.length > 0) {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {this.state.uploads.map((u, i) => (
            <a
              href={u.fileData}
              target="_blank"
              className="challenges_uploadBlock"
              rel="noopener noreferrer"
            >
              {u.fileName}
            </a>
          ))}
        </div>
      );
    } else {
      return (
        <div style={{ fontSize: "0.9em", textAlign: "center" }}>
          There are no resources available.
        </div>
      );
    }
  };

  renderLocation = () => {
    if (!this.state.challenge.address) {
      return (
        <div className="homeHeaderContentSubtitle" style={{ color: "#FFFFFF" }}>
          {this.state.workSpace.address} {this.state.workSpace.city},{" "}
          {this.state.workSpace.state} {this.state.workSpace.zipcode}
        </div>
      );
    } else {
      return (
        <div className="homeHeaderContentSubtitle" style={{ color: "#FFFFFF" }}>
          {this.state.challenge.address}, {this.state.challenge.city},{" "}
          {this.state.challenge.state}
        </div>
      );
    }
  };

  attendEvent = () => {
    fetch(`http://localhost:8000/api/attend/${this.state.challenge.eventID}`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.error) {
          this.showSnack("Session Expired. Please Log in Again.");
        } else if (json.success) {
          this.showSnack(json.success);
        } else if (json.duplicate) {
          this.showSnack(json.duplicate);
        }
      });
  };

  renderJoin = () => {
    if (!localStorage['token']) {
      return (
        <Link
          to={"/join/" + this.state.workSpace.slug}
          style={{ margin: "15px", width: "45%" }}
        >
          <FlatButton
            style={{
              width: "100%",
              background: "#ff4d58",
              paddingTop: "10px",
              paddingBottom: "10px",
              color: "#FFFFFF",
              fontWeight: "bold"
            }}
          >
            Sign Up
          </FlatButton>
        </Link>
      );
    } else {
      return (
        <FlatButton
          onClick={this.attendEvent}
          style={{
            margin: "15px",
            background: "#ff4d58",
            paddingTop: "10px",
            paddingBottom: "10px",
            color: "#FFFFFF",
            fontWeight: "bold"
          }}
        >
          Attend Event
        </FlatButton>
      );
    }
  };

  renderSubmissionForm = () => {
    if (localStorage['token']) {
      return (
        <div className="eventDetailSectionContent">
          <div className="eventDetailSubmissionBlock">
            <div className="eventDetailSubtitle">New Submission</div>
            <TextField
              label="Submission Title"
              value={this.state.submissionTitle}
              onChange={this.handleSubmissionTitle}
              margin="normal"
              fullWidth={true}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Submission Description"
              value={this.state.submissionDescription}
              onChange={this.handleSubmissionDescription}
              margin="normal"
              fullWidth={true}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Video Link (Optional)"
              value={this.state.submissionVideo}
              onChange={this.handleSubmissionVideo}
              margin="normal"
              fullWidth={true}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Github Link (Optional)"
              value={this.state.submissionGithub}
              onChange={this.handleSubmissionGithub}
              margin="normal"
              fullWidth={true}
              style={{ marginBottom: "10px" }}
            />
            <div className="eventDetailSubtitle" style={{ marginTop: '15px', marginBottom: '7px' }}>Upload a ZIP</div>
            <input type="file" onChange={this.handleSubmissionFile} />
            <FlatButton onClick={this.storeSubmission} style={{ marginTop: '15px', background: "#ff4d58", color: '#FFFFFF', fontWeight: 'bold' }}>{this.state.confirmSubmission}</FlatButton>
          </div>
        </div>
      )
    }
  }

  renderSubmission = (submission, i) => {

    let submissionVideo = "";
    let submissionGithub = "";
    let remove = "";

    if (submission.submissionVideo) {
      submissionVideo = <a href={submission.submissionVideo} className="eventSubmissionButton">Video</a>;
    }

    if (submission.submissionGithub) {
      submissionGithub = <a href={submission.submissionGithub} className="eventSubmissionButton">Github</a>;
    }

    if (this.state.user) {
      if (this.state.user.id == submission.userID || this.state.user.roleID == 2) {
        remove = <a onClick={() => this.deleteSubmission(submission.id)} className="eventSubmissionButton">Remove</a>;
      }
    }

    return (
      <div className="eventDetailSubmissionBlock">
        <div className="eventSubmissionTitle">{submission.submissionTitle}</div>
        <div className="eventSubmissionDescription">{submission.submissionDescription}</div>
        <div className="eventSubmissionLinks">
          <a href={submission.submissionFile} className="eventSubmissionButton">Files</a>
          {submissionVideo}
          {submissionGithub}
          {remove}
        </div>
        <div className="eventSubmissionAuthor">Submitted by: {submission.name}</div>
      </div>
    )
  }

  renderNoSubs = () => {
    if (this.state.submissions.length === 0) {
      return (
        <div style={{ fontSize: "0.9em", textAlign: "center" }}>There are No Submissions.</div>
      )
    }
  }


  render() {
    return (
      <div className="eventDetailContainer">
        <Helmet
          title={this.state.challenge.challengeTitle}
          meta={[
            { name: "description", content: "Description of EventDetail" }
          ]}
        />
        <header style={{ background: "#FFFFFF" }}>
          <Header space={this.props.spaceName} />
          <div className="eventDetailBanner" style={{ background: "#ff4d58" }}>
            <div className="homeHeaderContentTitle">
              {this.state.challenge.challengeTitle}
            </div>
            <div
              className="homeHeaderContentSubtitle"
              style={{ color: "#FFFFFF" }}
            >
              {this.renderLocation()}
            </div>
          </div>
        </header>

        <main className="eventDetailMain">
          <div className="spaceSignUpUser">
            <img
              alt=""
              src={this.state.challenge.challengeImage}
              style={{ width: "100%" }}
            />
          </div>

          <div className="spaceSignUpContainer">
            <div className="eventDetailSection">
              <div className="eventDetailSectionTitle">Time & Days</div>
              <div className="eventDetailSectionContent">
                <div className="eventDetailDates">
                  {this.state.eventDates.map((date, i) => (
                    <div
                      key={`eventDates${i}`}
                      className="eventDetailsDateBlock"
                    >
                      {date.startFormatted} -- {date.endFormatted}
                    </div>
                  ))}
                </div>
                <div className="eventDetailSignUpRow">
                  <div className="homeSignButtons">
                    {this.renderJoin()}
                    <Link
                      to={"/space/" + this.state.workSpace.slug}
                      style={{ margin: "15px" }}
                    >
                      <FlatButton
                        style={{
                          width: "100%",
                          background: "#FFFFFF",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          color: "#ff4d58",
                          fontWeight: "bold",
                          border: "1px solid #DDDDDD"
                        }}
                      >
                        About the Space
                      </FlatButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="eventDetailSection">
              <div className="eventDetailSectionTitle">Description</div>
              <div className="eventDetailSectionContent">
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.challenge.challengeContent
                  }}
                />
              </div>
            </div>
          </div>
          <div className="eventDetailSection">
            <div className="eventDetailSectionTitle">Resources</div>
            <div className="eventDetailSectionContent">
              {this.renderUploads()}
            </div>
          </div>
          <div className="eventDetailSection">
            <div className="eventDetailSectionTitle">Submissions</div>
            {this.renderSubmissionForm()}
            <div className="eventDetailSectionContent">
              {this.state.submissions.map((submission, i) => (
                this.renderSubmission(submission, i)
              ))}
              {this.renderNoSubs()}
            </div>
          </div>
          <Snackbar
            open={this.state.snack}
            message={this.state.msg}
            autoHideDuration={3000}
            onClose={this.handleRequestClose}
          />
        </main>
      </div>
    );
  }
}
