/**
 *
 * EventInformation
 *
 */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import { ListItemText } from 'material-ui/List';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import moment from 'moment';

import DateRangePickerWithGaps from '../DateRangePickerWithGaps';
import RaisedButton from '../../containers/AddEvent/RaisedButton';
import { SelectedSponsors } from '../../containers/AddEvent/SelectedSponsors';

import authenticate from '../../utils/Authenticate';

import {EditorState, ContentState, convertFromHTML, convertToRaw} from 'draft-js';
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import CloseIcon from "react-icons/lib/md/close";

// styles
import './style.css';
import './styleM.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default class EventInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token:localStorage.getItem('token'),
            eventID: props.id,
            modalMessage: '',
            msg: "",
            snack: false,
            name: '',
            url: '',
            days: '',
            description: '',
            selectedTag: '',
            selectedTags: [],
            selectedSponsors: [],
            newSponsors: [],
            organizers: [],
            showOrganizers: false,
            sponsors: [],
            checkNewSponsors: '',
            sponsorNames: '',
            sponsorLogos: '',
            sponsorWebsites: '',
            loadedTags: [],
            checkedRadio: null,
            logo: '',
            logoPreview: '',
            tag: [],
            selectedOrganizers: [],
            eventSponsors: [],
            eventOrganizers: [],
            eventDates: [],
            focusedInput: false,
            dates: [],
            changeLocation: false,
            address: '',
            city: '',
            state: '',
            challenges:[],
            oldChallenges:[],
            renderOld:false
        };
    }

    singleDay = 0;
    multipleDays = 1;

    handleRequestClose = () => {
        this.setState({ snack: false, msg: "" });
      };
    
    showSnack = msg => {
    this.setState({ snack: true, msg: msg });
    };

    async componentDidMount() {
        let authorized;
        try {
            authorized = await authenticate(localStorage['token']);
        } finally {
            if (authorized !== undefined) {
                if (!authorized.error && authorized) {
                    this.getOrganizers();
                    this.getSponsors();
                    this.loadSkills();
                    this.getEvent(this.props.id);
                } else {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    this.props.history.push('/');
                }
            } else {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                this.props.history.push('/');
            }
        }
    }

    getEvent = eventID => {
        fetch(`https://innovationmesh.com/api/event/${eventID}`)
            .then(response => response.json())
            .then(json => {
                let sponsors = json.sponsors;
                let organizers = json.organizers;

                let newSponsors = [];
                for(let i = 0; i < sponsors.length; i++)
                {
                    newSponsors.push(sponsors[i].name);
                }

                let newOrganizers = [];
                for(let i = 0; i < organizers.length; i++)
                {
                    newOrganizers.push(organizers[i].email);
                }

                this.setState({
                    event: json.event,
                    eventSponsors: newSponsors,
                    selectedSponsors:newSponsors,
                    eventOrganizers: newOrganizers,
                    selectedOrganizers:newOrganizers,
                    description: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(json.event.description))),
                    url: json.event.url,
                    name: json.event.title,
                    eventDates: json.dates,
                    selectedTags: json.tags,
                    oldChallenges:json.challenges
                }, () => {
                    const changeLocation = !!this.state.event.address; 
                    if (changeLocation) {
                        const { address, city, state } = this.state.event;
                        this.setState({ 
                            changeLocation,
                            address,
                            city,
                            state,
                         });
                    }
                    this.previousSponsors();
                    this.previousOrganizers();
                    this.previousDates();
                    this.setChallengeContent();
                });
            })
        };

    setChallengeContent = () => {
        let oldChallenges = this.state.oldChallenges;

        for(let i = 0; i < oldChallenges.length; i++)
        {
            oldChallenges[i].challengeContent = EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(oldChallenges[i].challengeContent)));
            oldChallenges[i].challengeImagePreview =  oldChallenges[i].challengeImage;
        }

        this.setState({
            oldChallenges:oldChallenges,
            renderOld:true
        })
    }

    previousSponsors = () => {
        if (this.state.eventSponsors.length) {
            this.state.eventSponsors.forEach(sponsor => {
                const selectedSponsors = this.state.selectedSponsors.slice();
                selectedSponsors.push(sponsor.name);
                this.setState(() => ({ selectedSponsors: selectedSponsors }));
            })
        }
    };

    previousOrganizers = () => {
        if (this.state.eventOrganizers.length) {
            this.state.eventOrganizers.forEach(organizer => {
                const selectedOrganizers = this.state.selectedOrganizers.slice();
                selectedOrganizers.push(organizer.email);
                this.setState(() => ({ selectedOrganizers: selectedOrganizers }));
            })
        }
    };

    previousDates = () => {
        if (this.state.eventDates.length) {
            if (this.state.eventDates.length > 1 && !!!this.state.checkedRadio) {
                this.setState({
                    checkedRadio: 1, 
                    days: this.state.eventDates.length,
                });
                this.state.eventDates.forEach(({ start: startDate, end: endDate, id }, i) => {
                    let start = startDate.split(' ');
                    const [ startDateString, startTimeString ] = start; 
                    const day = moment(startDateString);
                    const startTimeSeconds = startTimeString.lastIndexOf(':');
                    start = startTimeString.slice(0, startTimeSeconds);

                    let end = endDate.split(' ');
                    const [, endTimeString ] = end; 
                    const endTimeSeconds = endTimeString.lastIndexOf(':');
                    end = endTimeString.slice(0, endTimeSeconds);

                    this.setState((prevState) => {
                        const dates = prevState.dates.slice();
                        dates.push({ 
                            day,
                            start,
                            end,
                            id,
                        });
                        return { dates }    
                    });
                });
            } else if (this.state.eventDates.length === 1 && !!!this.state.checkedRadio) {
                this.setState({ checkedRadio: this.singleDay, });
                let [ dates ] = this.state.eventDates.slice();
                const { start: startDate, end: endDate, id } = dates;

                let start = startDate.split(' ');
                const [ dateString, startTimeString ] = start; 
                const day = moment(dateString);
                const startTimeWithSeconds = startTimeString.lastIndexOf(':');
                start = startTimeString.slice(0, startTimeWithSeconds);

                let end = endDate.split(' ');
                const [, endTimeString ] = end; 
                const endTimeWithSeconds = endTimeString.lastIndexOf(':');
                end = endTimeString.slice(0, endTimeWithSeconds);

                dates = [{
                    day,
                    start,
                    end,
                    id,
                }];
                this.setState(() => ({ dates }));

            } 
        }
    };

    getSponsors = () => {
        fetch(`https://innovationmesh.com/api/sponsors`, {
            headers: { Authorization: `Bearer ${localStorage['token']}` }
        })
            .then(response => response.json())
            .then(Sponsors => {
                if (!Sponsors.error)
                    this.setState({ sponsors: Sponsors });
            })
            .catch(error => {
                alert(`GetSponsors(): error in fetching data from server: ${error}`); // eslint-disable-line
            });
    }

    getOrganizers = () => {
        fetch(`https://innovationmesh.com/api/organizers/events`, {
            headers: { Authorization: `Bearer ${localStorage['token']}` }
        })
            .then(response => response.json())
            .then(Organizers => {
                if (!Organizers.error) {
                    this.setState({ organizers: Organizers });
                }
            })
            .catch(error => {
                alert(`getOrganizers(): error in fetching data from server: ${error} message: ${error.message}`); // eslint-disable-line
            });
    }

    loadSkills = () => {
        fetch('https://innovationmesh.com/api/skills/all', {
            headers: { Authorization: `Bearer ${localStorage['token']}` },
        })
            .then(response => response.json())
            .then(json => { this.setState({ loadedTags: json }) })
            .catch(error => {
                alert(`loadSkills(): error in fetching data from server: ${error}`);
            });
    }

    removeNewSponsor = (sponsor) => {
        if (sponsor) {
            const sponsors = this.state.newSponsors.slice();
            const remove = sponsors.findIndex(previous => previous === sponsor);
            if (remove !== -1) {
                sponsors.splice(remove, 1);
                this.setState({ newSponsors: sponsors });
            }
        }
    }

    eventName = event => this.setState({ name: event.target.value.replace(/\s\s+/g, ' ').trim() });
    eventUrl = event => this.setState({ url: event.target.value.trim() });
    eventDays = event => this.setState({ days: event.target.value });

    selectSponsor = (selectedSponsor) => this.setState({ selectedSponsors: selectedSponsor });
    selectOrganizer = (selectedOrganizer) => {
        this.setState({ selectedOrganizers: selectedOrganizer })
        console.log(this.state.eventOrganizers);
    };
    //eventDescription = e => this.setState({ description: e.target.value });
    eventDescription = editorState => {
        this.setState({ description: editorState });
    };
    handleOrganizerChange = event => {
        console.log(this.state.eventOrganizers);
        this.setState({ selectedOrganizers: event.target.value });
    };

    handleSponsorChange = event => {
        this.setState({ selectedSponsors: event.target.value });
    };


    handleSkillTags = event => {
        this.setState({ selectedTags: event.target.value });
    };


    toggleNewSponsors = () => this.setState({ checkNewSponsors: !this.state.checkNewSponsors });

    toggleSnackBar = (message) =>
        this.setState({
            snackbar: !this.state.snackbar,
            snackbarMessage: message
        });

    handleRequestClose = () => { this.setState({ snackbar: false, snackbarMessage: "" }); };

    sponsorName = event => this.setState({ sponsorNames: event.target.value });
    sponsorUrl = event => this.setState({ sponsorWebsites: event.target.value });

    onNewSponsorSubmit = e => {
        e.preventDefault();
        let { sponsorNames, sponsorWebsites, logo } = this.state;
        if (logo && sponsorNames && sponsorWebsites) {
            const oldSponsors = this.state.sponsors.slice();
            const newSponsors = this.state.newSponsors.slice();
            const sponsor = {
                name: this.state.sponsorNames,
                website: this.state.sponsorWebsites,
                logo: this.state.logo,
                imagePreviewUrl: this.state.logoPreview,
            };
            const duplicateOld = oldSponsors.findIndex(previous => previous.label === sponsor.name);
            const duplicateNew = newSponsors.findIndex(previous => previous.name === sponsor.name);
            if (duplicateOld === -1 && duplicateNew === -1) {
                newSponsors.push(sponsor);
                this.setState({ newSponsors: newSponsors });
            } else {
                this.showSnack("Sponsor name already taken!");
            }
        }
    }

    Submit = () => {
        let {
            newSponsors,
            selectedTags,
            description,
            dates,
            eventID,
            name,
            url,
            selectedOrganizers,
            selectedSponsors,
            city,
            state,
            address
        } = this.state;

        let data = new FormData();

        data.append('eventID', eventID);
        data.append('description', draftToHtml(convertToRaw(description.getCurrentContent())));
        data.append('tags', selectedTags);
        data.append('dates', JSON.stringify(dates));
        data.append('name', name);
        data.append('url', url);
        data.append('organizers', selectedOrganizers);
        data.append('sponsors', selectedSponsors);

        if (city || address || state) {
            if (!city || !address || !state) {
                this.showSnack("Please add city, state, and address.");
                return;
            } else if (city && state && address) {
                data.append('city', city.trim());
                data.append('address', address.trim());
                data.append('state', state.trim());
            }
        }

        if (!!newSponsors.length) {
            data.append('newSponsors', JSON.stringify(newSponsors));
            newSponsors.forEach((file, index) => data.append(`logos${index}`, file.logo));
        }

        fetch(`https://innovationmesh.com/api/updateEvent`, {
            headers: { Authorization: `Bearer ${localStorage['token']}` },
            method: 'post',
            body: data,
        })
            .then(response => response.json())
            .then(({ success, error, eventID }) => {
                if (error) {
                   this.showSnack(error); 
                } else if (success) {
                    for(let c = 0; c < this.state.challenges.length; c++)
                    {
                        this.storeChallenge(eventID, this.state.challenges[c]);
                    }

                    for(let c = 0; c < this.state.oldChallenges.length; c++)
                    {   
                        this.updateChallenge(this.state.oldChallenges[c]);
                    }
                    
                    let result = {success: success, eventID: eventID};
                    this.showSnack(success);
                    return eventID;
                }
            })
            .then((eventID) => {
                setTimeout(() => {
                    this.props.history.push(`/event/${eventID}`)
                }, 2000);
            })
    };
    


    storeChallenge = (eventID, challenge) => {   
        let data = new FormData();
    
        data.append("challengeTitle", challenge.challengeTitle);
        data.append(
          "challengeContent",
          draftToHtml(convertToRaw(challenge.challengeContent.getCurrentContent()))
        );
        data.append("challengeImage", challenge.challengeImage);
        data.append("challengeFiles", challenge.challengeFiles);
        data.append("eventID", eventID);
    
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
              if (challenge.challengeFiles.length > 0) {
                for (let i = 0; i < challenge.challengeFiles.length; i++) {
                  let fileData = new FormData();
                  fileData.append("challengeID", json.challenge);
                  fileData.append(
                    "challengeFile",
                    challenge.challengeFiles[i].fileData
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
              /*this.showSnack("Challenge Saved");
              setTimeout(() => {
                this.props.history.push(`/Challenges/challenge/${json.challenge}`);
              }, 2000);*/
            }
          });
      };

      updateChallenge = (challenge) => {
        let data = new FormData();

        data.append("challengeTitle", challenge.challengeTitle);
        data.append(
            "challengeContent",
            draftToHtml(convertToRaw(challenge.challengeContent.getCurrentContent()))
        );
        data.append("challengeImage", challenge.challengeImage);
        data.append("challengeFiles", challenge.challengeFiles);

        fetch(
            "https://innovationmesh.com/api/updateChallenge/" +
            challenge.id,
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
                if (challenge.challengeFiles.length > 0) {
                    for (let i = 0; i < challenge.challengeFiles.length; i++) {
                        let fileData = new FormData();
                        fileData.append("challengeID", json.challenge);
                        fileData.append(
                            "challengeFile",
                            challenge.challengeFiles[i].fileData
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
                                }
                            });
                    }
                }
            }
        });
    };

    renderLogoImage = () => {
        if (this.state.logo !== "")
            return <img alt="" src={this.state.logoPreview} className="spaceLogoImagePreview" />
    }

    renderLogoImageText = () => {
        if (this.state.logoPreview === "" || this.state.logoPreview === undefined || this.state.logoPreview === null) {
            return (
                <span style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                    Select a Logo
                    <span style={{ fontSize: '0.9rem', marginTop: '5px' }}>For Best Size Use: 512 x 512</span>
                </span>
            )
        }
    }

    changeRadio = e => {
        const checkedRadio = parseInt(e.target.value, 10);
        if (checkedRadio === this.singleDay) {
            this.setState({
                checkedRadio,
                days: 1,
                dates: [],
            });
        } else {
            this.setState({
                checkedRadio,
                days: '',
                dates: [],
            });
        }
    }

    handleLogo = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                logo: file,
                logoPreview: reader.result
            });
        }

        reader.readAsDataURL(file);
    };

    changeLocation = () => {
        this.setState(() => ({ 
            changeLocation: !this.state.changeLocation,
            address: '',
            city: '',
            state: '', 
        }));
    };

    createChallenge = () => {
        let challenges = this.state.challenges;

        let newChallenge = {challengeTitle:'', challengeContent:EditorState.createEmpty(), challengeImage:'', challengeImagePreview:'', challengeFiles:[], show:false};

        challenges.push(newChallenge);

        this.setState({
            challenges:challenges
        })
    };


    handleChallengeTitle = (i, event) => {
        let challenges = this.state.challenges;

        challenges[i].challengeTitle = event.target.value;

        this.setState({
            challenges:challenges
        })
    }

    handleChallengeContent = (i, editorState) => {
        let challenges = this.state.challenges;

        challenges[i].challengeContent = editorState;

        this.setState({
            challenges:challenges
        })
    }

    handleChallengeImage = (i, event) => {
        console.log(i);
        let challenges = this.state.challenges;

        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
    
        reader.onloadend = () => {
            challenges[i].challengeImage = file;
            challenges[i].challengeImagePreview = reader.result;

          this.setState({
            challenges:challenges
          });
        };
        reader.readAsDataURL(file);
    }


    handleChallengeFile = (index, event) => {

        let challenges = this.state.challenges;

        event.preventDefault();
        let reader = new FileReader();
        let files = event.target.files;

        for (let i = 0; i < files.length; i++) {
        let fileData = { fileData: files[i], id: 0 };
        challenges[index].challengeFiles.push(fileData);

        reader.onloadend = () => {
            this.setState(
            {
                challenges: challenges
            },
            () => {
                this.forceUpdate();
            }
            );
        };
        reader.readAsDataURL(files[i]);
        }
    }

    handleOldChallengeTitle = (i, event) => {
        let challenges = this.state.oldChallenges;

        challenges[i].challengeTitle = event.target.value;

        this.setState({
            oldChallenges:challenges
        })
    }

    handleOldChallengeContent = (i, editorState) => {
        let challenges = this.state.oldChallenges;

        challenges[i].challengeContent = editorState;

        this.setState({
            oldChallenges:challenges
        })
    }

    handleOldChallengeImage = (i, event) => {
        console.log(i);
        let challenges = this.state.oldChallenges;

        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
    
        reader.onloadend = () => {
            challenges[i].challengeImage = file;
            challenges[i].challengeImagePreview = reader.result;

          this.setState({
            oldChallenges:challenges
          });
        };
        reader.readAsDataURL(file);
    }


    handleOldChallengeFile = (index, event) => {

        let challenges = this.state.challenges;

        event.preventDefault();
        let reader = new FileReader();
        let files = event.target.files;

        for (let i = 0; i < files.length; i++) {
        let fileData = { fileData: files[i], id: 0 };
        challenges[index].challengeFiles.push(fileData);

        reader.onloadend = () => {
            this.setState(
            {
                oldChallenges: challenges
            },
            () => {
                this.forceUpdate();
            }
            );
        };
        reader.readAsDataURL(files[i]);
        }
    }


    deleteFile = (i, j) => {
        let challenges = this.state.challenges;
    
        challenges[i].challengeFiles.splice(j, 1);
    
        this.setState(
          {
            challenges: challenges
          },
          () => {
            this.forceUpdate();
          }
        );
    };

    deleteOldFile = (i, j) => {
        let challenges = this.state.oldChallenges;
    
        challenges[i].challengeFiles.splice(j, 1);
    
        this.setState(
          {
            oldChallenges: challenges
          },
          () => {
            this.forceUpdate();
          }
        );
    };

    renderChallengeImageText = (i) => {

        let challenges = this.state.challenges;
        if (
          challenges[i].challengeImagePreview === "" ||
          challenges[i].challengeImagePreview === undefined ||
          challenges[i].challengeImagePreview === null
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
    
    renderChallengeImage = (i) => {
        let challenges = this.state.challenges;

        if (challenges[i].challengeImage === "") {
            return (
            <img
                alt=""
                src={challenges[i].challengeImagePreview}
                className="challenges_newChallengeImagePreview"
            />
            );
        } else {
            return (
            <img
                alt=""
                src={challenges[i].challengeImagePreview}
                className="challenges_newChallengeImagePreview"
            />
            );
        }
    };

    renderOldChallengeImageText = (i) => {

        let challenges = this.state.oldChallenges;
        if (
          challenges[i].challengeImagePreview === "" ||
          challenges[i].challengeImagePreview === undefined ||
          challenges[i].challengeImagePreview === null
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
    
    renderOldChallengeImage = (i) => {
        let challenges = this.state.oldChallenges;

        if (challenges[i].challengeImage === "") {
            return (
            <img
                alt=""
                src={challenges[i].challengeImagePreview}
                className="challenges_newChallengeImagePreview"
            />
            );
        } else {
            return (
            <img
                alt=""
                src={challenges[i].challengeImagePreview}
                className="challenges_newChallengeImagePreview"
            />
            );
        }
    };

    renderOldChallenges = () => {
        if(this.state.renderOld === true)
        {
            return(
                <div>
                    {this.state.oldChallenges.map((challenge, i) => (
                        <div className="eventChallengeBlock" style={{marginTop:'15px'}} key={i}>
                            <TextField label="Challenge Title" onChange={(event) => this.handleOldChallengeTitle(i, event)} type="text" margin="normal" style={{width:'100%'}} value={challenge.challengeTitle}/>
                            <Editor
                                editorState={this.state.oldChallenges[i].challengeContent}
                                toolbarclassName="challenges_home-toolbar"
                                wrapperclassName="challenges_home-wrapper"
                                editorclassName="challenges_rdw-editor-main"
                                onEditorStateChange={(editorState) => this.handleOldChallengeContent(i, editorState)}
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
                            <div>
                                <label
                                htmlFor={"challenge-image-"+i}
                                className="challenges_challengeImageBlock"
                                >
                                {this.renderOldChallengeImageText(i)}
                                {this.renderOldChallengeImage(i)}
                                </label>
                                <input
                                type="file"
                                onChange={(event) => this.handleOldChallengeImage(i, event)}
                                id={"challenge-image-"+i}
                                style={{ display: "none" }}
                                />
                            </div>
                            {challenge.challengeFiles.map((file, j) => (
                                <div key={`rightBarChallenge${j}`}>
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
                                    onClick={() => this.deleteOldFile(i, j)}
                                    />
                                </div>
                                </div>
                            ))}
                            <div>
                            <label
                                htmlFor={"challenge-file-"+i}
                                className="challenges_newFileAdd"
                            >
                                Upload New Resource (Excel, JSON, Word, PDF)
                            </label>
                            <input
                                type="file"
                                onChange={(event) => this.handleOldChallengeFile(i, event)}
                                id={"challenge-file-"+i}
                                style={{ display: "none" }}
                            />
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
    }

    renderSingleDate = () => {
        if(this.state.dates > 0)
        {
            return(
                <DateRangePickerWithGaps 
                    dates={this.state.dates}
                    handleDate={dates => {
                        this.setState(() => ({ dates })); 
                    }}
                />
            )
        } else {
            return(
                <DateRangePickerWithGaps
                    dates={this.state.dates.length ? this.state.dates : [{
                        day: moment(),
                        start: '',
                        end: '',
                    }]}
                    handleDate={dates => {
                        this.setState(() => ({ dates }));
                    }}
                />
            )
        }
    }

    render() {
        const {
            snackbarMessage,
            snackbar,
            newSponsors, 
            organizers,
            sponsors,
            checkNewSponsors,
            loadedTags,
            checkedRadio,
            days,
            dates,
            changeLocation,
        } = this.state;


        const options = [
            {
                id: this.singleDay,
                option: "one day event"
            },
            {
                id: this.multipleDays, 
                option: "multi-day event"
            }
        ];
        return (
            <div className="container">
                <Helmet>
                    <title>Create Event Form</title>
                    <meta name="description" content="Description of Create event form" />
                </Helmet>

                <div className="addEventBanner">
                    <div className="homeHeaderContentTitle">Add a New Event</div>
                    <div className="homeHeaderContentSubtitle">Create an Event for your Space</div>
                </div>
                <main className="spaceSignUpMain">

                    <div className="spaceSignUpTitle">Submit an Event</div>
                    <div className="spaceSignUpContainer">

                        <TextField label="Event name" onChange={this.eventName} value={this.state.name} type="text" name="eventName" margin="normal" />
                        <TextField onChange={this.eventUrl} type="url" value={this.state.url} label="Event url" margin="normal" />
                        <Editor
                            editorState={this.state.description}
                            toolbarclassName="challenges_home-toolbar"
                            wrapperclassName="challenges_home-wrapper"
                            editorclassName="challenges_rdw-editor-main"
                            onEditorStateChange={(editorState) => this.eventDescription(editorState)}
                            placeholder="Type the Event Information Here..."
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

                        {!!loadedTags.length &&
                            <FormControl style={{ marginTop: 24 }}>
                                <InputLabel htmlFor="tags-select">Relevant Tags</InputLabel>
                                <Select
                                    multiple
                                    value={this.state.selectedTags}
                                    onChange={this.handleSkillTags}
                                    input={<Input id="tag-multiple" />}
                                    renderValue={selected => selected.join(',')}
                                    MenuProps={MenuProps}
                                >
                                    {loadedTags.map((tag, key) => (
                                        <MenuItem key={`${key}tag`} value={tag}>
                                            <Checkbox checked={(this.state.selectedTags.indexOf(tag) > -1)} />
                                            <ListItemText primary={tag} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        }

                        {!!organizers.length &&
                            <FormControl style={{ marginTop: 24 }}>
                                <InputLabel htmlFor="organizers-select">Organizers</InputLabel>
                                <Select
                                    multiple
                                    value={this.state.selectedOrganizers}
                                    onChange={this.handleOrganizerChange}
                                    input={<Input id="tag-multiple" />}
                                    renderValue={selected => selected.join(',')}
                                    MenuProps={MenuProps}
                                >
                                    {organizers.map(organizer => (
                                        <MenuItem key={organizer} value={organizer}>
                                            <Checkbox checked={this.state.selectedOrganizers.indexOf(organizer) > -1} />
                                            <ListItemText primary={organizer} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        }

                        {!!sponsors.length &&
                            <FormControl style={{ marginTop: 24 }}>
                                <InputLabel htmlFor="sponsors-select">Sponsors</InputLabel>
                                <Select
                                    multiple
                                    value={this.state.selectedSponsors}
                                    onChange={this.handleSponsorChange}
                                    input={<Input id="tag-multiple" />}
                                    renderValue={selected => selected.join(',')}
                                    MenuProps={MenuProps}
                                >
                                    {sponsors.map(sponsor => (
                                        <MenuItem key={sponsor} value={sponsor}>
                                            <Checkbox checked={this.state.selectedSponsors.indexOf(sponsor) > -1} />
                                            <ListItemText primary={sponsor} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        }

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: 50,
                                color: 'rgba(0,0,0,0.54)',
                                justifyContent: 'space-between',
                                marginBottom: checkedRadio === this.multipleDays ? 32 : '',
                                marginTop: 32
                            }}
                        >
                            {options.map((item, i) =>
                                <label key={`l${item.id}`} className="radio-inline">
                                    <input
                                        type="radio"
                                        checked={checkedRadio === i}
                                        ref={(el) => this["myRadioRef" + i] = el}
                                        value={item.id}
                                        onChange={this.changeRadio}
                                        onKeyDown={(event) => event.keyCode === 13 ? this.changeRadio(event) : null}
                                    />
                                    <span style={{ paddingLeft: 8 }}>{item.option}</span>
                                </label>
                            )}
                        </div>

                        {checkedRadio === this.multipleDays &&
                            <TextField
                                label="How many days?"
                                onChange={this.eventDays}
                                value={this.state.days}
                                type="text"
                            />
                        } 

                         {checkedRadio === this.singleDay && 
                            <React.Fragment>
                                <label key="singleDay" className="addEventFormLabel"> date & time </label>
                                {this.renderSingleDate()}
                            </React.Fragment>
                        }

                         {(checkedRadio === this.multipleDays && days && dates.length === days) &&

                            <React.Fragment>
                                <DateRangePickerWithGaps 
                                    dates={dates}
                                    handleDate={dates => {
                                    this.setState(() => ({ dates })); 
                                }}
                            />

                            </React.Fragment>
                        } 

                         {(checkedRadio === this.multipleDays && days && dates.length !== days) &&
                            <React.Fragment>
                            <DateRangePickerWithGaps 
                                numberOfDates={days}
                                handleDate={dates => {
                                    this.setState(() => ({ dates })); 
                                }}
                            />

                            </React.Fragment>
                        } 

                        <div style={{ display: 'flex',  flexDirection:'row', alignItems:'center', marginTop: '32px', marginBottom: '72px' }}>
                            <input
                                id="newSponsors"
                                type="checkbox"
                                onKeyDown={(e) => e.keyCode === 13 ? this.toggleNewSponsors() : null}
                                onChange={this.toggleNewSponsors}
                                checked={checkNewSponsors}
                            />

                            <label style={{ color: 'rgba(0,0,0,0.54)' }} htmlFor="newSponsors" >
                                &nbsp;&nbsp;Add new sponsor
                            </label>

                        </div>

                        {checkNewSponsors && [
                            <TextField
                                key="newSponTF1"
                                label="name"
                                onChange={this.sponsorName}
                                value={this.state.sponsorNames}
                                type="text"
                                margin="normal"
                            />,

                            <TextField
                                key="newSponTF2"
                                label="website"
                                onChange={this.sponsorUrl}
                                value={this.state.sponsorWebsites}
                                type="url"
                                margin="normal"
                            />,

                            <div key="newSponTF3" className="spaceLogoMainImageRow">
                                <label htmlFor="logo-image" className="spaceLogoMainImageBlock">
                                    {this.renderLogoImageText()}
                                    {this.renderLogoImage()}
                                    <input
                                        type="file"
                                        onChange={this.handleLogo}
                                        id="logo-image"
                                        style={{ display: 'none' }}
                                        accept="image/png, image/jpg, image/jpeg"
                                    />
                                </label>
                            </div>,

                            <RaisedButton
                                key="newSponTF4"
                                onSubmit={this.onNewSponsorSubmit}
                                sponsor
                                style={{
                                    backgroundColor: '#3399cc',
                                    marginBottom: 64,
                                    padding: '10px',
                                    marginTop: '15px',
                                    color: 'rgba(0,0,0,0.54)',
                                    fontWeight: 'bold'
                                }}
                            />
                        ]}

                        {!!newSponsors.length &&
                            <SelectedSponsors
                                selectedSponsors={newSponsors}
                                removeSponsor={this.removeNewSponsor}
                                newSponsor={true}
                            />
                        }

                            <div style={{ display: 'flex', flexDirection:'row', alignItems:'center', marginBottom: changeLocation ? 16 : 72 }}>
                                <input
                                    id="newSponsors"
                                    type="checkbox"
                                    onKeyDown={(e) => e.keyCode === 13 ? this.changeLocation() : null}
                                    onChange={this.changeLocation}
                                    checked={changeLocation}
                                />

                                <label style={{ color: 'rgba(0,0,0,0.54)' }} htmlFor="newSponsors" >
                                    &nbsp;&nbsp; Remote Location?
                                </label>

                            </div>

                        {changeLocation && 
                            <React.Fragment>    
                                <TextField 
                                    label="Address" 
                                    value={this.state.address} 
                                    margin="normal" 
                                    onChange={e => {
                                        const address = e.target.value;
                                        this.setState(() => ({ address }))
                                    }} 
                                />

                                <TextField 
                                    label="City" 
                                    value={this.state.city} 
                                    margin="normal" 
                                    onChange={e => {
                                        const city = e.target.value;
                                        this.setState(() => ({ city }))
                                    }} 
                                />

                                <TextField 
                                    label="State" 
                                    value={this.state.state} 
                                    margin="normal" 
                                    onChange={e => {
                                        const state = e.target.value;
                                        this.setState(() => ({ state }))
                                    }} 
                                />

                            </React.Fragment>    
                        }

                        {this.renderOldChallenges()}

                        {this.state.challenges.map((challenge, i) => (
                            <div className="eventChallengeBlock" style={{marginTop:'15px'}} key={i}>
                                <TextField label="Challenge Title" onChange={(event) => this.handleChallengeTitle(i, event)} type="text" margin="normal" style={{width:'100%'}}/>
                                <Editor
                                    editorState={this.state.challenges[i].challengeContent}
                                    toolbarclassName="challenges_home-toolbar"
                                    wrapperclassName="challenges_home-wrapper"
                                    editorclassName="challenges_rdw-editor-main"
                                    onEditorStateChange={(editorState) => this.handleChallengeContent(i, editorState)}
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
                                <div>
                                    <label
                                    htmlFor={"challenge-image-"+i}
                                    className="challenges_challengeImageBlock"
                                    >
                                    {this.renderChallengeImageText(i)}
                                    {this.renderChallengeImage(i)}
                                    </label>
                                    <input
                                    type="file"
                                    onChange={(event) => this.handleChallengeImage(i, event)}
                                    id={"challenge-image-"+i}
                                    style={{ display: "none" }}
                                    />
                                </div>
                                {challenge.challengeFiles.map((file, j) => (
                                    <div key={`rightBarChallenge${j}`}>
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
                                          onClick={() => this.deleteFile(i, j)}
                                        />
                                      </div>
                                    </div>
                                ))}
                                <div>
                                <label
                                    htmlFor={"challenge-file-"+i}
                                    className="challenges_newFileAdd"
                                >
                                    Upload New Resource (Excel, JSON, Word, PDF)
                                </label>
                                <input
                                    type="file"
                                    onChange={(event) => this.handleChallengeFile(i, event)}
                                    id={"challenge-file-"+i}
                                    style={{ display: "none" }}
                                />
                                </div>
                            </div>
                        ))}

                        <FlatButton onClick={this.createChallenge} style={{background:'#DDDDDD', marginTop:'30px'}}>Add Challenges</FlatButton>


                        <FlatButton style={{ backgroundColor: '#ff4d58', padding: '10px', marginTop: '15px', color: '#FFFFFF', fontWeight: 'bold' }} onClick={this.Submit}>
                            Update Event
                        </FlatButton>
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
 