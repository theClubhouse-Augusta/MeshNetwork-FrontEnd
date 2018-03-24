/**
 *
 * RightBar
 *
 */

import React from "react";
import { Link } from "react-router-dom";

import Snackbar from "material-ui/Snackbar";
import Dialog from "material-ui/Dialog";
// import { DialogTitle } from 'material-ui/Dialog';
import FlatButton from "material-ui/Button";
import TextField from "material-ui/TextField";

import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import Select from "react-select";
import "react-select/dist/react-select.css";
import Slide from "material-ui/transitions/Slide";

import CloseIcon from "react-icons/lib/md/close";

import "./style.css";
import "./styleM.css";

export default class RightBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      challengeOpen: false,
      challengeTitle: "",
      challengeCategories: "",
      challengeContent: EditorState.createEmpty(),
      challengeImage: "",
      challengeImagePreview: "",
      challengeFiles: [],
      startDate: "",
      endDate: "",
      questionOpen: false,
      questionTitle: "",
      questionContent: EditorState.createEmpty(),
      snack: false,
      msg: "",
      categories: [],
      confirmStatus: "Confirm",
      app: this.props.app
    };
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

  handleRequestClose = () => {
    this.setState({ snack: false, msg: "" });
  };
  showSnack = msg => {
    this.setState({ snack: true, msg: msg });
  };

  challengeDialog = () => {
    this.setState({ challengeOpen: !this.state.challengeOpen }, () => {
      this.getCategories();
    });
  };
  questionDialog = () => {
    this.setState({ questionOpen: !this.state.questionOpen });
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
  handleStartDate = event => {
    this.setState({ startDate: event.target.value });
  };
  handleEndDate = event => {
    this.setState({ endDate: event.target.value });
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

    let challengeFiles = this.state.challengeFiles;

    for (let i = 0; i < files.length; i++) {
      let fileData = { fileData: files[i], id: 0 };
      challengeFiles.push(fileData);

      reader.onloadend = () => {
        this.setState(
          {
            challengeFiles: challengeFiles
          },
          () => {
            this.forceUpdate();
          }
        );
      };
      reader.readAsDataURL(files[i]);
    }
  };

  handleQuestionTitle = event => {
    this.setState({ questionTitle: event.target.value });
  };
  handleQuestionContent = editorState => {
    this.setState({ questionContent: editorState, editorState: editorState });
  };

  getCategories = () => {
    fetch("https://innovationmesh.com/api/selectCategories", {
      method: 'GET'
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          categories: json.categories
        });
      });
  };

  deleteFile = i => {
    let challengeFiles = this.state.challengeFiles;

    challengeFiles.splice(i, 1);

    this.setState(
      {
        challengeFiles: challengeFiles
      },
      () => {
        this.forceUpdate();
      }
    );
  };

  storeChallenge = () => {
    this.setState({
      confirmStatus: "Uploading..."
    });

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

    fetch("https://innovationmesh.com/api/storeChallenge", {
      method: "POST",
      body: data,
      headers: { Authorization: "Bearer " + this.state.token }
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          if (json.error === "token_expired") {
            this.showSnack("Your session has expired. Please log back in.");
          } else {
            this.showSnack(json.error);
            this.setState({
              confirmStatus: "Confirm"
            });
          }
        } else if (json.challenge) {
          if (this.state.challengeFiles.length > 0) {
            for (let i = 0; i < this.state.challengeFiles.length; i++) {
              let fileData = new FormData();
              fileData.append("challengeID", json.challenge);
              fileData.append(
                "challengeFile",
                this.state.challengeFiles[i].fileData
              );

              fetch("https://innovationmesh.com/api/uploadFile", {
                method: "POST",
                body: fileData,
                headers: { Authorization: "Bearer " + this.state.token }
              })
                .then(response => response.json())
                .then(json => {
                  if (json.error) {
                    this.showSnack(json.error);
                    this.setState({
                      confirmStatus: "Confirm"
                    });
                  }
                });
            }
          }
          this.showSnack("Challenge Saved");
          this.challengeDialog();
          setTimeout(() => {
            this.props.history.push(`/Challenges/challenge/${json.challenge}`);
          }, 2000);
        }
      });
  };

  storeQuestion = () => {
    let data = new FormData();

    data.append("questionTitle", this.state.questionTitle);
    data.append(
      "questionContent",
      draftToHtml(convertToRaw(this.state.questionContent.getCurrentContent()))
    );

    fetch("https://innovationmesh.com/api/storeQuestion", {
      method: 'POST',
      body: data,
      headers: { Authorization: "Bearer " + this.state.token }
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          if (json.error === "token_expired") {
            this.props.app.signOut(0, "Your session has expired.");
            this.props.app.handleAuth();
          } else {
            this.showSnack(json.error);
          }
        } else if (json.success) {
          this.showSnack(json.success);
          this.questionDialog();
        }
      });
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

  renderCreateButtons = () => {
    if (this.state.token) {
      return (
        <div>
          {/*<FlatButton
            onClick={this.challengeDialog}
            style={{
              background: "#32b6b6",
              color: "#FFFFFF",
              width: "100%",
              marginBottom: "10px"
            }}
          >
            New Challenge
          </FlatButton>*/}
          {/*<FlatButton onClick={this.questionDialog} style={{background:'#b63232', color:'#FFFFFF', width:'100%', marginBottom:'10px'}}>New Question</FlatButton>*/}
        </div>
      );
    } else {
      return (
        <Link to={"/signIn"}>
          <FlatButton
            style={{
              background: "#32b6b6",
              color: "#FFFFFF",
              width: "100%",
              marginBottom: "10px"
            }}
          >
            New Challenge
          </FlatButton>
          {/*<FlatButton onClick={this.props.app.handleAuth} style={{background:'#b63232', color:'#FFFFFF', width:'100%', marginBottom:'10px'}}>New Question</FlatButton>*/}
        </Link>
      );
    }
  };

  transition = props => {
    return <Slide direction="up" {...props} />;
  };

  render() {
    return (
      <div>
        {/*this.renderCreateButtons()*/}
        <FlatButton
          href="http://southeaststartupchallenge.com/challenge-rules/"
          target="_blank"
          style={{
            background: "#32b6b6",
            color: "#FFFFFF",
            width: "100%",
            marginBottom: "10px"
          }}
        >
          Event Rules
        </FlatButton>
        <FlatButton
          href="http://southeaststartupchallenge.com/submission-guidelines/"
          target="_blank"
          style={{
            background: "#32b6b6",
            color: "#FFFFFF",
            width: "100%",
            marginBottom: "10px"
          }}
        >
          Submission Guide
        </FlatButton>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderTop: "1px solid #DDDDDD"
          }}
        />
        {/*<div className="challenges_newsLetterBlock">
          <img className="challenges_newsLetterImage" src="https://challenges.innovationmesh.com/assets/newsletter.png"/>
          <div className="challenges_categoryTitle" style={{width:'100%', textAlign:'center', marginTop:'5px', marginBottom:'7px'}}>Join our Monthly Newsletter</div>
          <input type="text" placeholder="Your E-mail" className="challenges_newsLetterInput"/>
          <FlatButton style={{background:'#32b6b6', color:'#FFFFFF', width:'100%', marginTop:'7px'}}>Subscribe</FlatButton>
        </div>*/}
        <div className="challenges_newsLetterBlock">
          <img
            alt=""
            className="challenges_newsLetterImage"
            style={{
              width: "auto",
              margin: "0 auto"
            }}
            src="https://challenges.innovationmesh.com/assets/guide.png"
          />
          <div
            className="challenges_specialCategoryTitle"
            style={{
              width: "100%",
              textAlign: "center",
              margin: ".5em 0",
              fontSize: "1.25em"
            }}
          >
            Creating a Challenge
          </div>
          <FlatButton
            style={{
              background: "#32b6b6",
              color: "#FFFFFF",
              width: "100%",
              marginTop: "7px"
            }}
          >
            Coming Soon
          </FlatButton>
        </div>
        <Dialog
          onClose={this.challengeDialog}
          open={this.state.challengeOpen}
          fullScreen
          transition={this.transition}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                width: "30%",
                display: "flex",
                flexDirection: "column",
                padding: "15px"
              }}
            >
              <TextField
                id="challengetitle"
                label="Challenge Title"
                value={this.state.challengeTitle}
                onChange={this.handleChallengeTitle}
                margin="normal"
                fullWidth={true}
                style={{ marginBottom: "15px" }}
              />
              <Select
                name="categories-select"
                value={this.state.challengeCategories}
                removeSelected={false}
                multi={true}
                onChange={this.handleChallengeCategories}
                options={this.state.categories}
              />
              <div>
                <label
                  htmlFor="challenge-image"
                  className="challenges_challengeImageBlock"
                >
                  {this.renderChallengeImageText()}
                  {this.renderChallengeImage()}
                </label>
                <input
                  type="file"
                  onChange={this.handleChallengeImage}
                  id="challenge-image"
                  style={{ display: "none" }}
                />
              </div>
              {this.state.challengeFiles.map((file, index) => (
                <div key={`rightBarChallenge${index}`}>
                  <div className="challenges_newFileBlock">
                    <span />
                    {file.fileData.name}{" "}
                    <CloseIcon
                      size={25}
                      style={{
                        color: "#777777",
                        padding: "5px",
                        cursor: "pointer"
                      }}
                      onClick={() => this.deleteFile(index)}
                    />
                  </div>
                </div>
              ))}
              <div>
                <label
                  htmlFor="challenge-file"
                  className="challenges_newFileAdd"
                >
                  Upload New Resource (Excel, JSON, Word)
                </label>
                <input
                  type="file"
                  onChange={this.handleChallengeFile}
                  id="challenge-file"
                  style={{ display: "none" }}
                />
              </div>
              <FlatButton
                style={{
                  background: "#32b6b6",
                  color: "#FFFFFF",
                  marginTop: "15px"
                }}
                onClick={this.storeChallenge}
              >
                {this.state.confirmStatus}
              </FlatButton>
              <FlatButton
                style={{
                  background: "#BBBBBB",
                  color: "#FFFFFF",
                  margin: "0 auto",
                  marginTop: "15px",
                  width: "90%"
                }}
                onClick={this.challengeDialog}
              >
                Close
              </FlatButton>
            </div>
            <div
              style={{
                width: "70%",
                display: "flex",
                flexDirection: "column",
                padding: "15px"
              }}
            >
              <Editor
                editorState={this.state.challengeContent}
                toolbarclassName="challenges_home-toolbar"
                wrapperclassName="challenges_home-wrapper"
                editorclassName="challenges_rdw-editor-main"
                onEditorStateChange={this.handleChallengeContent}
                placeholder="Type the Challenge Information Here..."
                toolbar={{
                  inline: { inDropdown: true },
                  fontSize: { className: "challenges_toolbarHidden" },
                  fontFamily: { className: "challenges_toolbarHidden" },
                  list: { inDropdown: true, options: ["unordered", "ordered"] },
                  textAlign: {
                    inDropdown: true,
                    options: ["left", "center", "right"]
                  },
                  link: { inDropdown: true },
                  remove: { className: "challenges_toolbarHidden" },
                  emoji: { className: "challenges_toolbarHidden" },
                  history: { className: "challenges_toolbarHidden" }
                }}
              />
            </div>
          </div>
        </Dialog>
        <Dialog open={this.state.questionOpen} onClose={this.questionDialog}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "15px"
            }}
          >
            <TextField
              style={{ marginBottom: "15px" }}
              value={this.state.questionTitle}
              placeholder="Question Title"
              onChange={this.handleQuestionTitle}
            />
            <Editor
              editorState={this.state.questionContent}
              toolbarclassName="challenges_question-toolbar"
              wrapperclassName="challenges_question-wrapper"
              editorclassName="challenges_question-editor-main"
              onEditorStateChange={this.handleQuestionContent}
              placeholder="Type your Question Here..."
              toolbar={{
                inline: { inDropdown: true },
                fontSize: { className: "toolbarHidden" },
                fontFamily: { className: "toolbarHidden" },
                list: { inDropdown: true, options: ["unordered", "ordered"] },
                textAlign: {
                  inDropdown: true,
                  options: ["left", "center", "right"]
                },
                link: { inDropdown: true },
                remove: { className: "toolbarHidden" },
                emoji: { className: "toolbarHidden" },
                history: { className: "toolbarHidden" }
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <FlatButton
                style={{
                  width: "100%",
                  maxWidth: "75%",
                  backgroundColor: "#32b6b6",
                  color: "#FFFFFF"
                }}
                onClick={this.storeQuestion}
              >
                Submit Question
              </FlatButton>
              <FlatButton
                style={{
                  width: "100%",
                  maxWidth: "50%",
                  marginTop: "20px",
                  color: "#FFFFFF",
                  backgroundColor: "#CCCCCC"
                }}
                onClick={this.questionDialog}
              >
                Close
              </FlatButton>
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
