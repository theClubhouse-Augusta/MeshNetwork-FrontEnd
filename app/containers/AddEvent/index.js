/*
 *
 * AddEvent
 *
 */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import MdInsertDriveFile from 'react-icons/lib/md/insert-drive-file';
import Snackbar from 'material-ui/Snackbar'; 
import Select from 'react-select';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-select/dist/react-select.css';

// compononents,
import OptionModal from '../../components/OptionModal';
import Header from '../../components/Header'; 
import Footer from '../../components/Footer'; 
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
    .then(json => {
      this.setState({	snackBarMessage: {json} });
    })
  }

  closeModal = () => this.setState(() => ({ modalMessage: '' }))

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
      searchEnter
    } = this.state;

    return (
      this.loading()
        ?
          <h1>spinner here!</h1>
        :
          <div className="container">
            <Helmet title="AddEvent" meta={[ { name: 'description', content: 'Description of AddEvent' }]}/>
            <Header />

            <div>
              <div className="addEventBanner"></div>
              <div className="addEventBody">
                <h2 className="addEventTitle"> Submit An Event </h2> 

                <div className="addEventInstructions">
                  <p> a bunch of submission instructions & stuff</p>
                  <ul className="addEventDesList"> 
                    <li className="listItemReset">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </li>
                    <li className="listItemReset">Maecenas mollis, turpis ut malesuada sodales, ex purus suscipit augue, quis viverra felis leo quis diam.</li>
                    <li className="listItemReset">Ut congue ex dolor, ut semper odio viverra nec.</li>
                    <li className="listItemReset">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vulputate ultrices tortor a egestas. Morbi cursus placerat nibh, sed finibus quam molestie tincidunt. </li>
                  </ul> 
                </div>              

                <div className="addEventForm"> 
                  {/* checkbox for comprehensive event */}
                  <div style={{display:'flex', alignSelf: 'flex-start', marginLeft: '10%', marginBottom: 30}}>
                    <input type="checkBox" id="comprehensive-event" onKeyDown={(e) => e.keyCode === 13 ? this.toggleCompEvent() : null} onChange={this.toggleCompEvent} checked={checkCompEvent} />
                    <label htmlFor="comprehensive-event"> &nbsp;&nbsp;comprehensive event </label>
                  </div>
                  {/* event name */}
                  <label htmlFor="eventName" style={{alignSelf: 'flex-start', margin: '0 0 0 10%',}}> Event name </label>
                  <div className="addEventNameInput"> 

                    <input onChange={this.eventName} type="text" name="" id="eventName" style={{width: '100%', marginTop: 10, height: '35px', border: '1px solid black'}} />
                  </div>

                  {/* event url */}
                  <p className="addEventDateTime"> 
                    <label htmlFor="eventUrl" style={{textAlign: 'justify', width: '60%'}}> Add any relevant outside URL </label>
                    <span> <small>(such as Github repo or official challenge page)</small> </span> 
                    <input onChange={this.eventUrl} type="url" name="eventUrl" id="event outside url" style={{width: '100%', marginTop: 10, height: '35px', border: '1px solid black'}} />
                  </p>

                  <div className="addEventTagContainer">                 
                    <label className="addEventFormLabel"> Add any keywords or topics that best describe your event </label>
                    {/* event tags */}
                    {loadedTags && <Select.Creatable multi={true} options={loadedTags} onChange={this.selectTag} value={selectedTags} />}
                  </div> 

                  <div className="addEventUserSelect"> 
                    <label className="addEventFormLabel"> Event Organizers</label>
                    {/* Organizer Select */}
                    {organizers && <Select key={`orgSelect`} multi={true} options={organizers} onChange={this.selectOrganizer} value={selectedOrganizers} />}
                    {/* selected organizers */}
                    {!!selectedOrganizers.length && <SelectedOrganizers selectedOrganizers={selectedOrganizers} removeOrganizer={this.removeOrganizer} />}
                  </div>

                  {/* Sponsors */}
                  <div className="addEventSponsorContainer">
                    {/* Sponsor select form */}
                    <div className="addEventOrganizerBlock">
                      {!!sponsors.length && [
                      <label className="addEventFormLabel" key={`label$`}> Event Sponsors </label>,
                      <Select key={`sponsors`} multi={true} options={sponsors} onChange={this.selectSponsor} value={selectedSponsors} />
                      ]}
                    </div>

                    {/* Selected Sponsors*/}
                    {!!selectedSponsors.length && <SelectedSponsors selectedSponsors={selectedSponsors} removeSponsor={this.removeSponsor} newSponsor={false} />}
                  </div>

                  {/* Add new Sponsor check box */}
                  <label htmlFor="newSponsors" style={{alignSelf: 'flex-start', margin: '10px 0 0 9%'}}>&nbsp;&nbsp;Add new sponsor</label>
                  <div style={{ display: 'flex', alignSelf: 'flex-start', margin: '0 0 0 10%'}}>
                    <input id="newSponsors" type="checkbox" onKeyDown={(e) => e.keyCode === 13 ? this.toggleNewSponsors() : null} onChange={this.toggleNewSponsors} checked={checkNewSponsors} />
                  </div>
                  {/* new Sponsor form */}
                  <div className={checkNewSponsors ? 'addEventDateTime' : 'addEventTimeHide' }> 
                      {checkNewSponsors && 
                        <NewSponsorForm 
                          onFormSubmit={this.onNewSponsorSubmit}
                      />}
                  </div> 
                  {/* New Sponsors*/}
                  <div className="addEventSponsorContainer">
                    {!!newSponsors.length && <SelectedSponsors selectedSponsors={newSponsors} removeSponsor={this.removeNewSponsor} newSponsor={true} />}
                  </div> 

                  {/* Event Date/Time */}
                  <div className="" style={{width: '80%'}}> 
                    {/* Single day event */}
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

                    {/* checkbox for multi-day */}
                    <input style={{marginTop:50}} type="checkBox" id="multi-day-event"  onChange={this.toggleMultiday} checked={checkMultiday} onKeyDown={(e) => e.keyCode === 13 ? this.toggleMultiday() : null} />
                    <label htmlFor="multi-day-event"> &nbsp;&nbsp;multi-day event </label>
                    {/* text form "how many days?"" */}
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

                    {/* error messages for invalid date selections */}
                    {(dateError && checkMultiday) && <p style={{textAlign: 'center', margin: 0, padding: 0, color: 'red',}}>{dateError}</p>}
                    {(timeError && checkMultiday) && <p style={{textAlign: 'center', margin: 0, padding: 0, color: 'red',}}>{timeError}</p>}
                    {/* multiday event forms */}
                    {(checkMultiday && days) && this.multiDay(days) }          
                  </div>              

                  {/* event description */}
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


                    <p style={{display: 'flex', flexDirection: 'column', width: '80%', marginTop: 30}}>  
                      <label htmlFor="event-files">Upload any other relevant documents</label>
                      <input 
                        multiple
                        onChange={this.eventFiles}
                        id="event-files" 
                        type="file" 
                        style={{width: '100%', marginTop: 10, height: '35px'}} 
                      />
                    </p>

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
                  
                  <div 
                  className="addEventSubmit"
                  >
                    {/* submit form */}
                    <button label="Submit" 
                    className="addEventSubmitButton" 
                    onClick={this.Submit}
                    > Submit </button> 
                    <Snackbar open={snackBar} message={snackBarMessage} autoHideDuration={4000} onRequestClose={this.toggleSnackBar} />
                  </div>
                
                </div> 
              </div>          
            </div>  

            <Footer />
            <OptionModal message={modalMessage} closeModal={this.closeModal} />          
          </div>
    );
  }
}
