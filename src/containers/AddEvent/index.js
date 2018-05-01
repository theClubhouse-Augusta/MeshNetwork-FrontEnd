import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import FlatButton from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import React, { Component } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Helmet from 'react-helmet';
import CloseIcon from "react-icons/lib/md/close";
import DateRangePickerWithGaps from '../../components/DateRangePickerWithGaps';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import authenticate from '../../utils/Authenticate';
import RaisedButton from "./RaisedButton";
import { SelectedSponsors } from './SelectedSponsors';
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

export default class AddEvent extends Component {
  state = {
    token: localStorage.getItem('token'),
    loading: true,
    dateError: '',
    modalMessage: '',
    msg: "",
    snack: false,
    // event
    name: '',
    url: '',
    days: '',
    description: EditorState.createEmpty(),
    location: '',
    selectedTag: '',
    selectedTags: [],
    selectedSponsors: [],
    newSponsors: [],
    eventFiles: [],
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
    eventImg: '',
    eventImgPreview: '',
    tag: [],
    selectedOrganizers: [],
    dates: [],
    changeLocation: false,
    address: '',
    city: '',
    state: '',
    challenges: [],
  };
  singleDay = 0;
  multipleDays = 1;
  handleRequestClose = () => {
    this.setState(() => ({
      snack: false,
      msg: ""
    }));
  };
  showSnack = msg => {
    this.setState(() => ({
      snack: true,
      msg: msg
    }));
  };
  async componentDidMount() {
    let authorized;
    try {
      authorized = await authenticate(localStorage['token']);
    } finally {
      if (authorized !== undefined) {
        const { error, user } = authorized;
        if (user) {
          if (user.roleID !== 2 && user.roleID !== 5) {
            this.props.history.push('/');
          }
          this.getOrganizers();
          this.getSponsors();
          this.loadSkills();
          this.setState({ loading: false });
        } else if (error) {
          localStorage.removeItem('token');
          this.props.history.push('/signin');
        }
      } else {
        this.props.history.push('/');
      }
    }
  };
  getSponsors = () => {
    fetch(`http://localhost:8000/api/sponsors`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    })
      .then(response => response.json())
      .then(Sponsors => {
        if (!Sponsors.error)
          this.setState({ sponsors: Sponsors });
      })
      .catch(error => {
        alert(`GetSponsors()error in fetching data from server: ${error}`); // eslint-disable-line
      });
  };
  getOrganizers = () => {
    fetch(`http://localhost:8000/api/organizers/events`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    })
      .then(response => response.json())
      .then(Organizers => {
        if (!Organizers.error) {
          this.setState({ organizers: Organizers });
        }
      })
      .catch(error => {
        alert(`GetOrganizers()error in fetching data from server: ${error}`); // eslint-disable-line
      });
  };
  loadSkills = () => {
    fetch('http://localhost:8000/api/skills/all', {
      headers: { Authorization: `Bearer ${localStorage['token']}` },
    })
      .then(response => response.json())
      .then(json => { this.setState({ loadedTags: json }) })
      .catch(error => {
        alert(`loadSkills()error in fetching data from server: ${error}`);
      });
  };
  removeNewSponsor = (sponsor) => {
    if (sponsor) {
      const sponsors = this.state.newSponsors.slice();
      const remove = sponsors.findIndex(previous => previous === sponsor);
      if (remove !== -1) {
        sponsors.splice(remove, 1);
        this.setState({ newSponsors: sponsors });
      }
    }
  };
  eventName = event => {
    this.setState({
      name: event.target.value.replace(/\s\s+/g, ' ').trim()
    });
  };
  eventUrl = event => {
    this.setState({
      url: event.target.value.trim()
    });
  };
  eventDays = event => {
    this.setState({
      days: event.target.value
    });
  };
  selectSponsor = selectedSponsor => {
    this.setState({ selectedSponsors: selectedSponsor });
  };
  selectOrganizer = selectedOrganizer => {
    this.setState({ selectedOrganizers: selectedOrganizer });
  };
  eventDescription = description => {
    this.setState({ description });
  };
  eventLocation = e => {
    this.setState({ location: e.target.value });
  };
  handleOrganizerChange = event => {
    this.setState({ selectedOrganizers: event.target.value });
  };
  handleSponsorChange = event => {
    this.setState({ selectedSponsors: event.target.value });
  };
  handleSkillTags = event => {
    this.setState({ selectedTags: event.target.value });
  };
  eventFiles = event => {
    event.preventDefault();
    let file = event.target.files[0];
    let reader = new FileReader();
    const files = this.state.eventFiles.slice();
    reader.onload = () => {
      files.push(file)
      this.setState({ eventFiles: files });
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  toggleNewSponsors = () => {
    this.setState({ checkNewSponsors: !this.state.checkNewSponsors });
  };
  sponsorName = event => {
    this.setState({ sponsorNames: event.target.value });
  };
  sponsorUrl = event => {
    this.setState({ sponsorWebsites: event.target.value });
  };
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
        this.setState({ newSponsors });
      } else {
        this.showSnack("Sponsor name already taken!");
      }
    }
  };
  createChallenge = () => {
    let challenges = [...this.state.challenges];
    let newChallenge = {
      challengeTitle: '',
      challengeContent: EditorState.createEmpty(),
      challengeImage: '',
      challengeImagePreview: '',
      challengeFiles: [],
      show: false
    };
    challenges.push(newChallenge);
    this.setState({ challenges });
  };
  handleChallengeTitle = (i, event) => {
    let challenges = [...this.state.challenges];
    challenges[i].challengeTitle = event.target.value;
    this.setState({
      challenges
    });
  };
  handleChallengeContent = (i, editorState) => {
    let challenges = [...this.state.challenges];
    challenges[i].challengeContent = editorState;
    this.setState({ challenges });
  };
  handleChallengeImage = (i, event) => {
    let challenges = [...this.state.challenges];
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      challenges[i].challengeImage = file;
      challenges[i].challengeImagePreview = reader.result;
      this.setState({ challenges });
    };
    reader.readAsDataURL(file);
  };
  handleChallengeFile = (index, event) => {
    let challenges = [...this.state.challenges];
    event.preventDefault();
    let reader = new FileReader();
    let files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      let fileData = { fileData: files[i], id: 0 };
      challenges[index].challengeFiles.push(fileData);
      reader.onloadend = () => {
        this.setState({ challenges });
      };
      reader.readAsDataURL(files[i]);
    }
  };
  deleteFile = (i, j) => {
    let challenges = [...this.state.challenges];
    challenges[i].challengeFiles.splice(j, 1);
    this.setState({ challenges });
  };
  Submit = () => {
    this.setState({ confirmStatus: "Uploading..." });
    let {
      newSponsors,
      selectedTags,
      description,
      location,
      dates,
      name,
      url,
      selectedOrganizers,
      selectedSponsors,
      city,
      state,
      address
    } = this.state;
    let data = new FormData();
    data.append('description', draftToHtml(convertToRaw(description.getCurrentContent())));
    data.append('location', location);
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
    fetch(`http://localhost:8000/api/event`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` },
      method: 'post',
      body: data,
    })
      .then((response) => {
        return response.json();
      })
      .then(({ success, error, eventID }) => {
        if (error) {
          this.showSnack(error);
        }
        else if (success) {
          for (let c = 0; c < this.state.challenges.length; c++) {
            this.storeChallenge(eventID, this.state.challenges[c]);
          }

          let result = { success: success, eventID: eventID }
          return (result);
        }
      })
      .then((result) => {
        this.showSnack(result.success);
        setTimeout(() => {
          this.props.history.push(`/event/${result.eventID}`)
        }, 2000);
      })
  };
  storeChallenge = (eventID, challenge) => {
    let data = new FormData();
    data.append("challengeTitle", challenge.challengeTitle);
    data.append("challengeContent", draftToHtml(convertToRaw(challenge.challengeContent.getCurrentContent())));
    data.append("challengeImage", challenge.challengeImage);
    data.append("challengeFiles", challenge.challengeFiles);
    data.append("eventID", eventID);
    fetch("http://localhost:8000/api/storeChallenge", {
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
              fetch("http://localhost:8000/api/uploadFile", {
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
        }
      });
  };
  closeModal = () => {
    this.setState({ modalMessage: '' });
  };
  renderLogoImage = () => {
    if (this.state.logo !== "") {
      return <img alt="" src={this.state.logoPreview} className="spaceLogoImagePreview" />
    }
  };
  renderLogoImageText = () => {
    if (this.state.logoPreview === "" || this.state.logoPreview === undefined || this.state.logoPreview === null) {
      return (
        <span style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
          Select a Logo
          <span style={{ fontSize: '0.9rem', marginTop: '5px' }}>For Best Size Use: 512 x 512</span>
        </span>
      )
    }
  };
  renderEventImage = () => {
    if (this.state.eventImg !== "") {
      return (
        <img alt="" src={this.state.eventImgPreview} className="spaceLogoImagePreview" />
      )
    }
  };
  renderEventImageText = () => {
    if (this.state.eventImgPreview === "" || this.state.eventImgPreview === undefined || this.state.eventImgPreview === null) {
      return (
        <span style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
          Add an Event Image
          <span style={{ fontSize: '0.9rem', marginTop: '5px' }}>For Best Size Use: 512 x 512</span>
        </span>
      )
    }
  };
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
  };
  handleLogo = event => {
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
  multiDay = days => {
    const dates = this.state.dates.slice();
    let count = 0;
    while (count < days) {
      dates.push({
        day: moment().add(count, 'd'),
        start: '',
        end: ''
      })
      count++;
    }
    return dates;
  };
  changeLocation = () => {
    this.setState({ changeLocation: !this.state.changeLocation });
  };
  renderChallengeImageText = (i) => {
    let challenges = [...this.state.challenges];
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
    let challenges = [...this.state.challenges];
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
  render() {
    const {
      newSponsors,
      organizers,
      sponsors,
      checkNewSponsors,
      loadedTags,
      days,
      dates,
      checkedRadio,
      changeLocation,
    } = this.state;
    const options = [
      {
        id: 0,
        nm: "one day event"
      },
      {
        id: 1, nm:
          "multi-day event"
      }
    ];
    return (
      this.state.loading
        ?
        <Spinner loading={this.state.loading} />
        :
        <div className="container" style={{ background: '#F6F6F6' }}>
          <Helmet>
            <title>Create Event Form</title>
            <meta name="description" content="Description of Create event form" />
          </Helmet>
          <Header space={this.props.spaceName} />
          <div className="addEventBanner">
            <div className="homeHeaderContentTitle">Add a New Event</div>
            <div className="homeHeaderContentSubtitle">Create an Event for your Space</div>
          </div>
          <main className="spaceSignUpMain">
            <div className="spaceSignUpTitle">Submit an Event</div>
            <div className="spaceSignUpContainer">
              <TextField label="Event name" onChange={this.eventName} type="text" name="eventName" margin="normal" />
              <TextField onChange={this.eventUrl} type="url" label="Event url" margin="normal" />
              <Editor
                editorState={this.state.description}
                toolbarclassName="challenges_question-toolbar"
                wrapperclassName="challenges_question-wrapper"
                editorclassName="challenges_question-editor-main"
                onEditorStateChange={this.eventDescription}
                placeholder="Brief Description"
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
                    <span style={{ paddingLeft: 8 }}>{item.nm}</span>
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
                  <DateRangePickerWithGaps
                    dates={dates.length ? dates : [{
                      day: moment(),
                      start: '',
                      end: '',
                    }]}
                    handleDate={dates => {
                      this.setState(() => ({ dates }));
                    }}
                  />
                </React.Fragment>
              }
              {checkedRadio === this.multipleDays && days > 1 &&
                <div>
                  <DateRangePickerWithGaps
                    dates={dates.length ? dates : this.multiDay(days)}
                    handleDate={dates => {
                      this.setState(() => ({ dates }));
                    }}
                  />
                </div>
              }
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 32, marginBottom: 32 }}>
                <input
                  id="newSponsors"
                  type="checkbox"
                  onKeyDown={(e) => e.keyCode === 13 ? this.toggleNewSponsors() : null}
                  onChange={this.toggleNewSponsors}
                  checked={checkNewSponsors}
                />
                <label style={{ color: 'rgba(0,0,0,0.54)' }} htmlFor="newSponsors">
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
                    backgroundColor: '#CCCCCC',
                    marginBottom: 64,
                    padding: '10px',
                    marginTop: '15px',
                    color: '#FFFFFF',
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
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: changeLocation ? 16 : 72 }}>
                <input
                  id="newSponsors"
                  type="checkbox"
                  onKeyDown={(e) => e.keyCode === 13 ? this.changeLocation() : null}
                  onChange={this.changeLocation}
                  checked={changeLocation}
                />
                <label style={{ color: 'rgba(0,0,0,0.54)' }} htmlFor="newSponsors" >/
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
              {this.state.challenges.map((challenge, i) => (
                <div className="eventChallengeBlock" style={{ marginTop: '15px' }} key={i}>
                  <TextField label="Challenge Title" onChange={(event) => this.handleChallengeTitle(i, event)} type="text" margin="normal" style={{ width: '100%' }} />
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
                      htmlFor={"challenge-image-" + i}
                      className="challenges_challengeImageBlock"
                    >
                      {this.renderChallengeImageText(i)}
                      {this.renderChallengeImage(i)}
                    </label>
                    <input
                      type="file"
                      onChange={(event) => this.handleChallengeImage(i, event)}
                      id={"challenge-image-" + i}
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
                    <label htmlFor={"challenge-file-" + i} className="challenges_newFileAdd">
                      Upload New Resource (Excel, JSON, Word, PDF)
                    </label>
                    <input
                      type="file"
                      onChange={(event) => this.handleChallengeFile(i, event)}
                      id={"challenge-file-" + i}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              ))}
              <FlatButton
                onClick={this.createChallenge}
                style={{ background: '#DDDDDD', marginTop: '30px' }}
              >Add Challenges</FlatButton>
              <FlatButton
                style={{
                  backgroundColor: "#ff4d58",
                  padding: "10px",
                  marginTop: "15px",
                  color: "#FFFFFF",
                  fontWeight: "bold"
                }}
                onClick={this.Submit}
              >Submit Event</FlatButton>
            </div>
          </main>
          <footer className="homeFooterContainer">
            Copyright © 2018 theClubhou.se • 540 Telfair Street • Tel: (706)
            723-5782
          </footer>
          <Snackbar
            open={this.state.snack}
            message={this.state.msg}
            autoHideDuration={5000}
            onClose={this.handleRequestClose}
          />
        </div>
    );
  }
}
