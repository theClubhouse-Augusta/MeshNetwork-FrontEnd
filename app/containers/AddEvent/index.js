/*
 *
 * AddEvent
 *
 */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Snackbar from 'material-ui/Snackbar'; 
import Select from 'react-select';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/Button';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-select/dist/react-select.css';

// compononents,
import Header from 'components/Header'; 
import Footer from 'components/Footer'; 
import ErrorModal from '../../components/ErrorModal';
import { MdInsertDriveFile } from 'react-icons/lib/md'; 
import DateTimeSelect from '../../components/DateTimeSelect'; 
import { Organizers } from './Organizers';
import { Sponsors } from './Sponsors';
import { NewSponsorForm } from './NewSponsorForm';
import { SelectedOrganizers } from './SelectedOrganizers';
import { SelectedSponsors } from './SelectedSponsors';

// validation
import { 
  removeDuplicateDate,
  removeDuplicateStart,
  removeDuplicateEnd,
  dateErrors,
  multiDayTimeErrors,
  timeError
} from './dateUtils';

// styles
import StyleHelpers from '../../utils/StyleHelpers';
import './style.css';
import './styleM.css';

export default class AddEvent extends Component {
  state = {
    searchEnter: '',
    loading: false,
    dateError: '',
    modalMessage: '',
    snackBar: false,
    // event
    checkCompEvent: '',
    name: '',
    url: '',
    days: '',
    description: EditorState.createEmpty(),
    selectedTag: '',
    selectedTags: [],
    selectedSponsors: [],
    day: '',
    start: '',
    end: '',
    dateMulti: [],
    startMulti: [],
    endMulti: [],
    newSponsors: [],
    eventFiles: [],
    // organizers 
    organizers: '',
    organizerQuery: '',
    showOrganizers: false, 
    selectedOrganizers: [],
    // sponsors
    sponsors: '',
    checkNewSponsors: '',
    // add new Sponsor form values
    sponsorNames: '',
    sponsorLogos: '',
    imagePreviewUrl: '',
    sponsorWebsites: '',
    // date/time
    checkMultiday: '',
    multidayComponent: '',
    // tags
    loadedTags: '',
    tagFocused: false,
    sponsorFocused: false,
    organizerFocused: false,
  };

  // componentWillMount() {
  //   this.authenticate(localStorage['token']);
  // }

  componentDidMount() {
    this.getSponsors();
    this.getOrganizers();
    this.loadSkills();
  }

  authenticate = (token) => {
    if (!token) {
      this.props.history.push('/');
    }
    fetch(`http://localhost:8000/api/authorize`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => response.json())
    .then(authorized => {
      if (!authorized.error) {
        this.setState({ loading: false, });
      } else {
        this.props.history.push('/');
      }
    })
    .catch(error => {
      alert(`error!: ${error.message}`);
    });
  }

  loading = () => this.state.loading;

  getSponsors = () => {
    fetch(`http://localhost:8000/api/sponsors`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    })
    .then(response => response.json())
    .then(Sponsors => {
      if (!Sponsors.error) {
        this.setState({	sponsors: Sponsors });
      }
    })
    .catch(error => {
      alert(`error in fetching data from server: ${error}`); // eslint-disable-line
    });
  }

  getOrganizers = () => {
    fetch(`http://localhost:8000/api/organizers/all`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    })
    .then(response => response.json())
    .then(Organizers => {
      if (!Organizers.error) {
        this.setState({	organizers: Organizers });
      }
    })
    .catch(error => {
      alert(`error in fetching data from server: ${error}`); // eslint-disable-line
    });
  }

  loadSkills = () => {
    fetch('http://localhost:8000/api/skills/all', {
      headers: { Authorization: `Bearer ${localStorage['token']}` },
    })
    .then(response => response.json())
    .then(json => {this.setState({ loadedTags:json })})
    .catch(error => {
      alert(`error in fetching data from server: ${error}`);
    });
  }

  removeOrganizer = (organizer) => {
    if (organizer) {
      const organizers = this.state.selectedOrganizers.slice();
      const remove = organizers.findIndex(previous => previous === organizer);
      if (remove !== -1) {
        organizers.splice(remove, 1);
        this.setState({	selectedOrganizers: organizers });
      }
    }
  }

  removeSponsor = (sponsor) => {
    if (sponsor) {
      const sponsors = this.state.selectedSponsors.slice();
      const remove = sponsors.findIndex(previous => previous === sponsor);
      if (remove !== -1) {
        sponsors.splice(remove, 1);
        this.setState({	selectedSponsors: sponsors });
      }
    }
  }

  removeNewSponsor = (sponsor) => {
    if (sponsor) {
      const sponsors = this.state.newSponsors.slice();
      const remove = sponsors.findIndex(previous => previous === sponsor);
      if (remove !== -1) {
        sponsors.splice(remove, 1);
        this.setState({	newSponsors: sponsors });
      }
    }
  }

  selectDate = (e, index) => {
    if (typeof index !== 'number') {
      const today = new Date();
      const selectedDate = new Date(e.target.value);
      if (today.valueOf() < selectedDate.valueOf()) {
        this.setState({	day: e.target.value }, () => {
          if (this.state.day && this.state.start && this.state.end) {
            const error = timeError(this.state.start, this.state.end, this.state.day);
            if (error) { 
              this.setState({	modalMessage: "Invalid Date", dateError: "Please Cheack the order of your dates" })
            } else {
              this.setState({	dateError: ''})
            }
          } else {
            this.setState({	dateError: '' });
          }
        });
      } else {
        this.setState({	dateError: "Please Cheack the order of your dates" });
      }
    }
  }

  selectStart = (e, index) => {
    if (typeof index !== 'number') {
      this.setState({	start: e.target.value }, () => {
        if (this.state.day && this.state.start && this.state.end) {
          const error = timeError(this.state.start, this.state.end, this.state.day);
            error ? this.setState({	dateError: "Please check your start and end times" })
                  : this.setState({	dateError: ''})
        }
      });
    }
  }

  selectEnd = (e, index) => {
    if (typeof index !== 'number') {
      this.setState({	end: e.target.value }, () => {
          if (this.state.day && this.state.start && this.state.end) {
            const error = timeError(this.state.start, this.state.end, this.state.day);
            error ? this.setState({	dateError: "Please check your start and end times" })
                  : this.setState({	dateError: ''})
          }
        });
    }
  }

  selectDateMulti = (e, index) => {
    if (typeof index === 'number') {

      const today = new Date();
      const selectedDate = new Date(e.target.value);

      if (today.valueOf() > selectedDate.valueOf()) {
        this.setState({	dateError: "Please Cheack the order of your dates" });
        return;
      }

      const dates = this.state.dateMulti.slice(); 
      const date = { day: e.target.value, index: index, };
      const removeDate = removeDuplicateDate(dates, date);

      if (typeof removeDate !== 'number') {
        dates.push(date);
        this.setState({	dateMulti: dates }, () => {
          if (dateErrors(this.state.dateMulti)) {
            this.setState({	dateError: "Please Cheack the order of your dates" });
          } else {
            this.setState({	dateError: '' });
          }
        });
      } else if (typeof removeDate === 'number')  {
        dates.splice(removeDate, 1);
        dates.push(date);
        this.setState({	dateMulti: dates }, () => {
          if (dateErrors(this.state.dateMulti)) {
            this.setState({	dateError: "Please Cheack the order of your dates" });
          } else {
            this.setState({	dateError: '' });
          }
        });
      } 
    }
  }

  selectStartMulti = (e, index) => {
    if (typeof index === 'number') {
      const startTimes = this.state.startMulti.slice();
      const endTimes = this.state.endMulti.slice(); 
      const time = { start: e.target.value, index: index, };
      const removeTime = removeDuplicateStart(startTimes, time);
      if (typeof removeTime !== 'number') {
        startTimes.push(time);
        this.setState({	startMulti: startTimes }, () => {
          if (multiDayTimeErrors(this.state.startMulti, this.state.endMulti, this.state.dateMulti)) {
             this.setState({	timeError: 'Check you start and end times', });
           } else { 
             this.setState({	timeError: '' }) 
           }
        });
      } else if (typeof removeTime === 'number')  {
        startTimes.splice(removeTime, 1);
        startTimes.push(time);
        this.setState({	startMulti: startTimes }, () => {
          if (multiDayTimeErrors(this.state.startMulti, this.state.endMulti, this.state.dateMulti)) {
             this.setState({	timeError: 'Check you start and end times',  });
           } else { 
             this.setState({	timeError: '' }) 
           }
        });
      } 
    }
  }

  selectEndMulti = (e, index) => {
    if (typeof index === 'number') {
      const startTimes = this.state.startMulti.slice();
      const endTimes = this.state.endMulti.slice(); 
      const time = { end: e.target.value, index: index, };
      const removeTime = removeDuplicateEnd(endTimes, time);
      if (typeof removeTime !== 'number') {
        endTimes.push(time);
        this.setState({	endMulti: endTimes }, () => {
          if (multiDayTimeErrors(this.state.startMulti, this.state.endMulti, this.state.dateMulti)) {
             this.setState({	timeError: 'Check you start and end times', });
           } else { 
             this.setState({	timeError: '' }) 
           }
        });
      } else if (typeof removeTime === 'number')  {
        endTimes.splice(removeTime, 1);
        endTimes.push(time);
        this.setState({	endMulti: endTimes }, () => {
          if (multiDayTimeErrors(this.state.startMulti, this.state.endMulti, this.state.dateMulti)) {
             this.setState({	timeError: 'Check you start and end times', });
           } else { 
             this.setState({	timeError: '' }) 
           }
        });
      } 
    }
  }

  multiDay = (days) => {
    const multidayComponent = [];
    for (let i = 0; i < days; i++) {
      const dayComponent =
      <DateTimeSelect 
        key={`multiday${i}`}
        index={i}
        style={{display: 'flex', flexDirection: 'column', alignItems: 'space-around'}} 
        dateLabel={`Day ${i + 1}`}
        startTimeLabel="event start"
        endTimeLabel="event end"
        multiday={true}
        selectDateMulti={this.selectDateMulti}
        selectStartMulti={this.selectStartMulti}
        selectEndMulti={this.selectEndMulti}
      />
      multidayComponent.push(dayComponent);
    }
    return multidayComponent;
  }

  // submit form if 'enter' is pressed
  checkKey = (e) => e.keyCode === 13 ? this.setState({	searchEnter: true }) : null 

  toggleCompEvent =  () => this.setState({ checkCompEvent: !this.state.checkCompEvent });
  eventName = (e) => this.setState({ name: e.target.value.replace(/\s\s+/g, ' ').trim() });
  eventUrl = (e) => this.setState({ url: e.target.value.trim() });
  eventDays = (e) => this.setState({ days: e.target.value });
	selectTag = (selectedTag) => {
    const copy = selectedTag.slice(-1)[0];
    if (copy !== undefined) {
      copy.value = copy.value.replace(/\s\s+/g, ' ').trim();
      copy.label = copy.label.replace(/\s\s+/g, ' ').trim();
      this.setState({ selectedTags: selectedTag });
    } else {
      this.setState({ selectedTags: selectedTag });
    }
  }

	selectSponsor = (selectedSponsor) => this.setState({ selectedSponsors: selectedSponsor });
  selectOrganizer = (selectedOrganizer) => this.setState({ selectedOrganizers: selectedOrganizer });
  eventDescription = (editorState) => {this.setState({ description: editorState });}
  eventFiles = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    const files = this.state.eventFiles.slice();
    reader.onload = () => {
      files.push(file)
      this.setState({ eventFiles: files });
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  toggleNewSponsors =  () => this.setState({ checkNewSponsors: !this.state.checkNewSponsors });
  toggleMultiday =  () => this.setState({     
    checkMultiday: !this.state.checkMultiday,
    days: '',
    dateMulti: [], 
    endMulti: [],
    startMulti: [],
    dateError: '',
    timeError: ''
  });

  toggleSnackBar = (message) => 
    this.setState({	
      snackBar: !this.state.snackBar, 
      snackBarMessage: message
    });

  onNewSponsorSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const url = e.target.elements.url.value;
    let logo = e.target.elements.logo.files[0];
    if (logo && name && url) {
      let reader = new FileReader();
      reader.onload = () => {
        this.setState({
          sponsorLogos: logo,
          imagePreviewUrl: reader.result,
          sponsorNames: name.replace(/\s\s+/g, ' ').trim(), 
          sponsorWebsites: url.trim(), 
        }, () => {
          if (this.state.sponsorLogos && this.state.sponsorNames && this.state.sponsorWebsites) {
            const newSponsors = this.state.newSponsors.slice();
            const oldSponsors = this.state.sponsors.slice();
            const sponsor = {
              name: this.state.sponsorNames,
              website: this.state.sponsorWebsites,
              logo: this.state.sponsorLogos,
              imagePreviewUrl: this.state.imagePreviewUrl,
            };
            const duplicateNew = newSponsors.findIndex(previous => previous.name === sponsor.name);
            const duplicateOld = oldSponsors.findIndex(previous => previous.label === sponsor.name);
            if (duplicateNew === -1 && duplicateOld === -1) {
              newSponsors.push(sponsor);
              this.setState({	newSponsors: newSponsors}); 
            } else {
              this.toggleSnackBar("Sponsor name already taken!");
            }
          }
        });
      };
      reader.readAsDataURL(logo);
    }
  }

  Submit = () => {
    // this.toggleSnackBar("Thanks, your event has been submitted for approval");
    const { 
      newSponsors, 
      endMulti, 
      startMulti, 
      dateMulti, 
      day, 
      start, 
      end, 
      checkMultiday, 
    } = this.state;

    let data = new FormData();
    data.append('description', draftToHtml(convertToRaw(this.state.description.getCurrentContent())));
    data.append('tags', JSON.stringify(this.state.selectedTags));
    this.state.eventFiles.forEach((file, index) => data.append(`files${index}`, file));
    data.append('compEvent', !!this.state.checkCompEvent);
    data.append('name', this.state.name);
    data.append('url', this.state.url);
    data.append('organizers', JSON.stringify(this.state.selectedOrganizers));
    data.append('sponsors', JSON.stringify(this.state.selectedSponsors));
    if (!!newSponsors.length) {
      data.append('newSponsors', JSON.stringify(newSponsors));
      newSponsors.forEach((file, index) => data.append(`logos${index}`, file.logo));
    }
    if (!checkMultiday) {
      if (day) data.append('day', JSON.stringify(day));
      if (start) data.append('start', JSON.stringify(start));
      if (end) data.append('end', JSON.stringify(end));
    } else {
      const days = dateMulti.findIndex(previous => previous.day === '');
      const starts = startMulti.findIndex(previous => previous.start === '');
      const ends = endMulti.findIndex(previous => previous.end === '');
      if (days === -1 && starts === -1 && ends === -1) {
        data.append('dateMulti', JSON.stringify(dateMulti));
        data.append('startMulti', JSON.stringify(startMulti));
        data.append('endMulti', JSON.stringify(endMulti));
      }
    } 

    fetch(`http://localhost:8000/api/event`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` },
      method: 'post',
      body: data,
    })
    .then(response => response.json())
    .then(eventID => {
      this.props.history.push(`/eventDetail/${eventID}`)
    })
  }

  closeModal = () => this.setState(() => ({ modalMessage: '' }))
  onTagFocus = () => this.setState({ tagFocused: true });
  onTagBlur = () => this.setState({ tagFocused: false });

  onOrganizerFocus = () => this.setState({ organizerFocused: true });
  onOrganizerBlur = () => this.setState({ organizerFocused: false });

  onSponsorFocus = () => this.setState({ sponsorFocused: true });
  onSponsorBlur = () => this.setState({ sponsorFocused: false });

  render() {

		const { 
      selectedTags, 
      selectedOrganizers,
      newSponsors,
      selectedSponsors,
      description,
      eventFiles,
      organizers,
      sponsors,
      loadedTags,
      days,
      checkNewSponsors, 
      checkMultiday,
      checkCompEvent,
      dateError,
      timeError,
      snackBar,
      snackBarMessage,
      modalMessage,
      searchEnter,
      tagFocused,
      organizerFocused,
      sponsorFocused,
    } = this.state;

    const Helper = new StyleHelpers;

    return (
      this.loading()
        ?
          <h1>spinner here!</h1>
        :
          <div className="container">
            <Helmet title="AddEvent" meta={[ { name: 'description', content: 'Description of AddEvent' }]}/>
            <Header />

            <main className="spaceSignUpMain">

              <div className="spaceSignUpTitle">Submit an Event</div>
              <div className="spaceSignUpContainer">

                <TextField 
                  label="Event name" 
                  onChange={this.eventName} 
                  type="text" 
                  name="eventName" 
                  margin="normal"
                  //style={{width: '100%', marginTop: 10, height: '35px', border: '1px solid black'}} 
                />
                <TextField 
                  onChange={this.eventUrl}
                  type="url" 
                  label="Event url" 
                  margin="normal"
                />

                <label
                  style={{    
                    marginTop: Helper.getLabelStyle(tagFocused, selectedTags)[0],
                    color: Helper.getLabelStyle(tagFocused, selectedTags)[1],
                  }} 
                  className={Helper.getLabelClassName(tagFocused, selectedTags)}
                >
                  Skills
                </label>
                {loadedTags && 
                <Select.Creatable 
                  className={Helper.getSelectStyle(tagFocused, selectedTags)}
                  placeholder={!tagFocused && !!!selectedTags.length ? 'Skills' : ''} 
                  multi 
                  style={{
                    background: '#f8f8f8', 
                    border: 'none', 
                    boxShadow: 'none'
                  }}
                  options={loadedTags} 
                  onChange={this.selectTag} 
                  value={selectedTags} 
                  onFocus={this.onTagFocus} 
                  onBlur={this.onTagBlur}
                />}

                <label
                  style={{    
                    marginTop: Helper.getLabelStyle(organizerFocused, selectedOrganizers)[0],
                    color: Helper.getLabelStyle(organizerFocused, selectedOrganizers)[1],
                  }} 
                  className={Helper.getLabelClassName(organizerFocused, selectedOrganizers)}
                >
                 Event Organizer 
                </label>

                {organizers && 
                <Select 
                  className={Helper.getSelectStyle(organizerFocused, selectedOrganizers)}
                  placeholder={!organizerFocused && !!!selectedOrganizers.length ? 'Event Organizers' : ''} 
                  multi
                  style={{background: '#f8f8f8', border: 'none', boxShadow: 'none'}}
                  options={organizers} 
                  onChange={this.selectOrganizer} 
                  value={selectedOrganizers} 
                  onFocus={this.onOrganizerFocus} 
                  onBlur={this.onOrganizerBlur}
                />}

                {!!selectedOrganizers.length && <SelectedOrganizers selectedOrganizers={selectedOrganizers} removeOrganizer={this.removeOrganizer} />}
                {!!sponsors.length && [
                  <label 
                    style={{    
                      marginTop: Helper.getLabelStyle(sponsorFocused, selectedSponsors)[0],
                      color: Helper.getLabelStyle(sponsorFocused, selectedSponsors)[1],
                    }} 
                    key={`label$`} 
                    className={Helper.getLabelClassName(sponsorsFocused, selectedSponsors)}
                  >
                    Event Sponsors 
                  </label>,
                  <Select 
                    className={Helper.getSelectStyle(sponsorFocused, selectedSponsors)}
                    placeholder={!sponsorsFocused && !!!selectedSponsors.length ? 'Event Sponsors' : ''} 
                    key={`sponsors`} 
                    multi
                    style={{background: '#f8f8f8', border: 'none', boxShadow: 'none'}}
                    options={sponsors} 
                    onChange={this.selectSponsor} 
                    value={selectedSponsors} 
                    onFocus={this.onSponsorFocus} 
                    onBlur={this.onSponsorBlur}
                  />
                ]}

                {!!selectedSponsors.length && 
                <SelectedSponsors 
                  selectedSponsors={selectedSponsors} 
                  removeSponsor={this.removeSponsor} 
                  newSponsor={false} 
                />}

                <label htmlFor="newSponsors" >
                  &nbsp;&nbsp;Add new sponsor
                </label>

                <input 
                  id="newSponsors" 
                  type="checkbox" 
                  onKeyDown={(e) => e.keyCode === 13 ? this.toggleNewSponsors() : null} onChange={this.toggleNewSponsors} checked={checkNewSponsors} 
                />

                <div className={checkNewSponsors ? 'addEventDateTime' : 'addEventTimeHide' }> 
                  {checkNewSponsors && <NewSponsorForm onFormSubmit={this.onNewSponsorSubmit} />}
                </div> 

                  {!!newSponsors.length && <SelectedSponsors selectedSponsors={newSponsors} removeSponsor={this.removeNewSponsor} newSponsor={true} />}

                  <div className="" style={{width: '80%'}}> 
                    {(dateError && !checkMultiday) && <p style={{textAlign: 'center', margin: 0, padding: 0, color: 'red',}}>{dateError}</p>}
                    {(timeError && !checkMultiday) && <p style={{textAlign: 'center', margin: 0, padding: 0, color: 'red',}}>{timeError}</p>}
                    {!checkMultiday && [
                    <label key="singleDay" className="addEventFormLabel">Choose a date & time </label>,
                    <DateTimeSelect 
                      key="singleDay2"
                      dateLabel="Start date"
                      startTimeLabel="event start"
                      endTimeLabel="event end"
                      multiday={false}
                      selectDate={this.selectDate}
                      selectStart={this.selectStart}
                      selectEnd={this.selectEnd}
                    />
                    ]} 

                    <input style={{marginTop:50}} type="checkBox" id="multi-day-event"  onChange={this.toggleMultiday} checked={checkMultiday} onKeyDown={(e) => e.keyCode === 13 ? this.toggleMultiday() : null} />
                    <label htmlFor="multi-day-event"> &nbsp;&nbsp;multi-day event </label>
                    {(checkMultiday && !days) &&         
                    <p style={{display: 'flex', flexDirection: 'column'}}>  
                      <label htmlFor="event-days">How many days?</label>
                      <input 
                        id="event-days" 
                        onKeyDown={(e) => e.keyCode === 13 ? this.eventDays(e) : null}  
                        onBlur={this.eventDays} 
                        type="number" 
                        name="" 
                        style={{width: '100%', marginTop: 10, height: '35px', border: '1px solid black'}} 
                      />
                    </p>}

                    {(dateError && checkMultiday) && <p style={{textAlign: 'center', margin: 0, padding: 0, color: 'red',}}>{dateError}</p>}
                    {(timeError && checkMultiday) && <p style={{textAlign: 'center', margin: 0, padding: 0, color: 'red',}}>{timeError}</p>}

                    {/* multiday event forms */}
                    {(checkMultiday && days) && this.multiDay(days) }          
                  </div>              

                  <div className="addEventDesContainer">
                    <label className="addEventFormLabel"> Event Description</label>
                    <div style={{ border: '1px solid black', height: '200px', margin: '0 auto', width: '100%'}}>
                      <Editor 
                        editorState={description}
                        // toolbarClassName="home-toolbar"
                        // wrapperClassName="home-wrapper"
                        // editorClassName="rdw-editor-main"
                        onEditorStateChange={this.eventDescription}
                        placeholder="Event Description"
                        toolbar={{
                          inline: { inDropdown: true },
                          fontSize: { className: 'toolbarHidden' },
                          fontFamily: { className: 'toolbarHidden' },
                          list: { className: 'toolbarHidden' },
                          textAlign: { inDropdown: true, options: [ 'left', 'center', 'right' ] },
                          link: { inDropdown: true },
                          remove: { className: 'toolbarHidden' },
                          emoji: { className: 'toolbarHidden' },
                          history: { className: 'toolbarHidden' },
                        }}
                      />
                    </div>
                  </div>

                <div style={{
                  display: 'flex',
                  marginTop: '32px',
                  marginBottom: '32px'
                }}>    
                  <input
                    type="checkBox" 
                    id="comprehensive-event" 
                    onKeyDown={(e) => e.keyCode === 13 ? this.toggleCompEvent() : null} onChange={this.toggleCompEvent} checked={checkCompEvent} 
                  />
                  <label 
                    htmlFor="comprehensive-event"> 
                      &nbsp;&nbsp;comprehensive event 
                  </label>
                </div>

                    {/* <p style={{display: 'flex', flexDirection: 'column', width: '80%', marginTop: 30}}>   */}
                      <label htmlFor="event-files">Upload any other relevant documents</label>
                      <input 
                        multiple
                        onChange={this.eventFiles}
                        id="event-files" 
                        type="file" 
                        style={{width: '100%', marginTop: 10, height: '35px'}} 
                      />
                    {/* </p> */}

                    <div style={{marginTop: '40px', width: '80%'}}>
                      <h4 style={{marginBottom: 10}}> Uploaded files </h4>
                      {!!eventFiles.length ? 
                        <ol style={{ height: '100%', display:'flex', flexDirection: 'column',  marginBottom: '60px', borderTop: '3px solid black', }}>
                          {eventFiles.map((file, key) => [
                            <li style={{height:'30px', borderBottom:'3px solid black', paddingBottom: 20, paddingTop: 20}} key={`file${key}`}> 
                              <MdInsertDriveFile size="40px" /> 
                              {file.name}
                            </li>
                          ])}
                        </ol> : null}

                      {!!!eventFiles.length ? 
                        <ol style={{ height: '100%', display:'flex', flexDirection: 'column',  marginBottom: '60px', borderTop: '3px solid black', }}>
                          <li style={{height:'30px', borderBottom:'3px solid black', paddingBottom: 20, paddingTop: 20}}> 
                             <MdInsertDriveFile size="40px" />   
                            No files uploaded
                          </li>
                        </ol> : null}
                    </div>
                  
                  {/* <div 
                  className="addEventSubmit"
                  > */}
                    {/* submit form */}
                    {/* <button label="Submit" 
                    className="addEventSubmitButton" 
                    onClick={this.Submit}
                    > Submit </button>  */}
                  {/* </div> */}
                
                {/* </div>  */}
              </div>          
            </main>  

            <Snackbar open={snackBar} message={snackBarMessage} autoHideDuration={4000} onRequestClose={this.toggleSnackBar} />
            <Footer />
            <ErrorModal message={modalMessage} closeModal={this.closeModal} />          
          </div>
    );
  }
}
