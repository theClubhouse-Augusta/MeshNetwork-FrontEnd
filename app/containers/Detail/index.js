/*
 *
 * Detail
 *
 */

import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Header from "components/Header";

import FlatButton from "material-ui/Button";
import Snackbar from "material-ui/Snackbar";

// import Dialog, { DialogTitle } from 'material-ui/Dialog';

import {
    EditorState,
    ContentState,
    convertToRaw,
    // convertFromRaw,
    convertFromHTML
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "react-select/dist/react-select.css";
// import Slide from 'material-ui/transitions/Slide';


import "./style.css";
import "./styleM.css";

export default class Detail extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem("token"),
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
            msg: ""
        };
        //      app:this.props.app
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
                        // console.log(this.state.challengeFiles);
                        this.forceUpdate();
                    }
                );
            };
            reader.readAsDataURL(files[i]);
        }
    };

    componentWillMount() {
        this.getDetail();
    }

    getCategories = () => {
        fetch("https://innovationmesh.com/api/selectCategories", {
            method: "GET"
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({
                    cats: json.categories
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

    updateChallenge = () => {
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

        fetch(
            "https://innovationmesh.com/api/updateChallenge/" +
            this.state.challenge.id,
            {
                method: "POST",
                body: data,
                headers: { Authorization: "Bearer " + this.state.token }
            }
        )
            .then(response => {
                return response.json();
            })
            .then(json => {
                if (json.error) {
                    if (json.error === "token_expired") {
                        this.showSnack(
                            "Your session has expired. Please sign back in to continue."
                        );
                    } else {
                        this.showSnack(json.error);
                        this.setState({
                            confirmStatus: "Confirm"
                        });
                    }
                } else if (json.challenge) {
                    // console.log(this.state.challengeFiles.length);
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
                                .then(response => {
                                    return response.json();
                                })
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
                    this.showSnack("Challenge Updated.");
                    this.challengeDialog();
                }
            });
    };

    deleteFile = () => { };

    deleteChallenge = () => { };

    /*componentWillReceiveProps(app) {
      this.setState({
        app:app.app
      }, () => {
        this.forceUpdate();
      })
    }*/

    getDetail = () => {
        fetch(
            "https://innovationmesh.com/api/showChallenge/" +
            this.props.match.params.id,
            {
                method: "GET"
            }
        )
            .then(response => response.json())
            .then(json => {
                this.setState(
                    {
                        challenge: json.challenge,
                        categories: json.challenge.categories,
                        uploads: json.uploads,
                        teams: json.teams,
                        participant: json.participant,
                        challengeTitle: json.challenge.challengeTitle,
                        challengeContent: EditorState.createWithContent(
                            ContentState.createFromBlockArray(
                                convertFromHTML(json.challenge.challengeContent)
                            )
                        ),
                        challengeCategories: json.categoriesArray,
                        challengeImagePreview: json.challenge.challengeImage,
                        eventDates: json.eventDates,
                        workSpace: json.workspace
                    },
                    () => {
                        this.getSpace();
                    }
                );
            });
    };

    getSpace = () => {
        fetch(
            "https://innovationmesh.com/api/workspace/" +
            this.state.challenge.spaceID,
            {
                method: "GET"
            }
        )
            .then(response => response.json())
            .then(json => {
                this.setState({
                    space: json
                });
            });
    };

    joinChallenge = () => {
        fetch(
            "https://innovationmesh.com/api/joinChallenge/" + this.state.challenge.id,
            {
                method: "GET",
                headers: { Authorization: "Bearer " + this.state.token }
            }
        )
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    this.showSnack(json.error);
                } else {
                    this.showSnack(json.success);
                }
            });
    };

    renderJoinButton = () => {
        if (this.state.token) {
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
                            color: "#444444",
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
                        >
                            Join Space & Challenge
            </FlatButton>
                    </Link>
                </div>
            );
        }
    };

    renderUpdateButtons = () => {
        if (this.state.token) {
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
        fetch('https://innovationmesh.com/api/attend/' + this.state.challenge.eventID, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.state.token
            }
        }
        )
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
        if (!this.state.token) {
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
                    <Snackbar
                        open={this.state.snack}
                        message={this.state.msg}
                        autoHideDuration={3000}
                        onClose={this.handleRequestClose}
                    />
                </main>
                {/*<div className="container">
        <Helmet
          title={this.state.challenge.challengeTitle}
          meta={[{ name: "description", content: "Description of Detail" }]}
        />
    */}

                {/*<header>
          <Header space={this.props.spaceName} />
        </header>

        <main className="challenges_mainContainer">
          <div className="challenges_contentContainer">
            <div className="challenges_detailColumnOne">
              <div className="challenges_detailBlock">
                <div className="challenges_detailInfo">
                  <div className="challenges_detailTitle">
                    {this.state.challenge.challengeTitle}
                  </div>

                  <div className="challenges_feedTags">
                    {this.state.categories.map((c, j) => (
                      <div
                        className="challenges_tagBlock"
                        key={`detailChallenges${j}`}
                      >
                        {c.categoryName}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="challenges_detailImageContainer">
                <img
                  alt=""
                  className="challenges_detailImage"
                  src={this.state.challenge.challengeImage}
                />
              </div>
              <div
                style={{
                  fontFamily: "Noto Sans",
                  fontWeight: "200",
                  color: "#555555",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  lineHeight: "35px"
                }}
                className="challenges_detailContent"
                dangerouslySetInnerHTML={this.createMarkup()}
              />
            </div>
            <div className="challenges_detailColumnTwo">
              {this.renderUpdateButtons()}
              {this.renderJoinButton()}
              {this.renderUploads()}
              <div className="challenges_detailSideBlock">
                <div className="challenges_categoryTitle">Participants</div>
                {this.state.teams.map((t, i) => (
                  <div className="challenges_participantBlock">
                    <img
                      alt=""
                      className="challenges_participantImage"
                      src={t.avatar}
                    />
                    <div className="challenges_participantName">{t.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <footer className="homeFooterContainer">
          Copyright © 2018 theClubhou.se • 540 Telfair Street • Tel: (706)
          723-5782
        </footer>

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
                options={this.state.cats}
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
                <div key={`detailFiles${index}`}>
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
                onClick={this.updateChallenge}
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

        
              </div>*/}
            </div>
        );
    }
}
