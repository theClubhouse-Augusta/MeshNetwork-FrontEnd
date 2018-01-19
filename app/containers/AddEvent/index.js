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
import RaisedButton from "./RaisedButton";

import MdFileUpload from 'react-icons/lib/md/file-upload';

// compononents,
import Header from 'components/Header';
import Footer from 'components/Footer';
import ErrorModal from '../../components/ErrorModal';
import { MdInsertDriveFile } from 'react-icons/lib/md';
import DateTimeSelect from '../../components/DateTimeSelect';
import { Organizers } from './Organizers';
import { Sponsors } from './Sponsors';
import { SelectedSponsors } from './SelectedSponsors';
import { SelectedOrganizers } from './SelectedOrganizers';

import {
    removeDuplicateDate,
    removeDuplicateStart,
    removeDuplicateEnd,
    dateErrors,
    multiDayTimeErrors,
    timeError,
    formatSelectedDate,
    formatTodaysDate
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
        description: '',
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
        showOrganizers: false,
        selectedOrganizers: [],
        // sponsors
        sponsors: '',
        checkNewSponsors: '',
        // add new Sponsor form values
        sponsorNames: '',
        sponsorLogos: '',
        sponsorWebsites: '',
        // date/time
        checkMultiday: false,
        // tags
        loadedTags: '',
        tagFocused: false,
        sponsorFocused: false,
        organizerFocused: false,
        checkedRadio: null,
        logo: '',
        logoPreview: '',
        eventImg: '',
        eventImgPreview: '',
    };

    componentDidMount() {
        this.getSponsors();
        this.getOrganizers();
        this.loadSkills();
    }

    authenticate = (token) => {
        if (!token)
            this.props.history.push('/');

        fetch(`http://localhost:8000/api/authorize`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => response.json())
            .then(authorized => {
                if (!authorized.error)
                    this.setState({ loading: false, });
                else
                    this.props.history.push('/');
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
                if (!Sponsors.error)
                    this.setState({ sponsors: Sponsors });
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
                    this.setState({ organizers: Organizers });
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
            .then(json => { this.setState({ loadedTags: json }) })
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
                this.setState({ selectedOrganizers: organizers });
            }
        }
    }

    removeSponsor = (sponsor) => {
        if (sponsor) {
            const sponsors = this.state.selectedSponsors.slice();
            const remove = sponsors.findIndex(previous => previous === sponsor);
            if (remove !== -1) {
                sponsors.splice(remove, 1);
                this.setState({ selectedSponsors: sponsors });
            }
        }
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

    selectDate = (e, index) => {
        if (typeof index !== 'number') {
            if (formatSelectedDate(e.target.value) >= formatTodaysDate()) {
                this.setState({ day: e.target.value }, () => {
                    if (this.state.day && this.state.start && this.state.end) {
                        const error = timeError(this.state.start, this.state.end, this.state.day);
                        if (error) this.setState({ modalMessage: "Invalid Date", dateError: "1Please check the order of your dates" })
                        else this.setState({ dateError: '' })
                    } else {
                        this.setState({ dateError: '' });
                    }
                });
            } else {
                this.setState({ dateError: "2Please check the order of your dates" });
            }
        }
    }

    selectStart = (e, index) => {
        if (typeof index !== 'number') {
            this.setState({ start: e.target.value }, () => {
                if (this.state.day && this.state.start && this.state.end) {
                    const error = timeError(this.state.start, this.state.end, this.state.day);
                    if (error) this.setState({ dateError: "3Please check your start and end times" });
                    else this.setState({ dateError: '' });
                }
            });
        }
    }

    selectEnd = (e, index) => {
        if (typeof index !== 'number') {
            this.setState({ end: e.target.value }, () => {
                if (this.state.day && this.state.start && this.state.end) {
                    const error = timeError(this.state.start, this.state.end, this.state.day);
                    if (error) this.setState({ dateError: "4Please check your start and end times" });
                    else this.setState({ dateError: '' });
                }
            });
        }
    }

    selectDateMulti = (e, index) => {
        if (typeof index === 'number') {
            if (formatTodaysDate() > formatSelectedDate(e.target.value)) {
                this.setState({ dateError: "5Please check the order of your dates" });
                return;
            } else {
                this.setState({ dateError: '' })
            }
            const dates = this.state.dateMulti.slice();
            const date = { day: e.target.value, index: index, };
            const removeDate = removeDuplicateDate(dates, date);

            if (typeof removeDate !== 'number') {
                dates.push(date);
                this.setState({ dateMulti: dates }, () => {
                    if (dateErrors(this.state.dateMulti)) this.setState({ dateError: "6Please check the order of your dates" });
                    else this.setState({ dateError: '' });
                });
            } else if (typeof removeDate === 'number') {
                dates.splice(removeDate, 1);
                dates.push(date);
                this.setState({ dateMulti: dates }, () => {
                    if (dateErrors(this.state.dateMulti)) this.setState({ dateError: "7Please check the order of your dates" });
                    else this.setState({ dateError: '' });
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
                this.setState({ startMulti: startTimes }, () => {
                    if (multiDayTimeErrors(this.state.startMulti, this.state.endMulti, this.state.dateMulti)) {
                        this.setState({ timeError: 'Check you start and end times', });
                    } else {
                        this.setState({ timeError: '' });
                    }
                });
            } else if (typeof removeTime === 'number') {
                startTimes.splice(removeTime, 1);
                startTimes.push(time);
                this.setState({ startMulti: startTimes }, () => {
                    if (multiDayTimeErrors(this.state.startMulti, this.state.endMulti, this.state.dateMulti)) {
                        this.setState({ timeError: 'Check your start and end times', });
                    } else {
                        this.setState({ timeError: '' });
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
                this.setState({ endMulti: endTimes }, () => {
                    if (multiDayTimeErrors(this.state.startMulti, this.state.endMulti, this.state.dateMulti)) {
                        this.setState({ timeError: 'Check you start and end times', });
                    } else {
                        this.setState({ timeError: '' });
                    }
                });
            } else if (typeof removeTime === 'number') {
                endTimes.splice(removeTime, 1);
                endTimes.push(time);
                this.setState({ endMulti: endTimes }, () => {
                    if (multiDayTimeErrors(this.state.startMulti, this.state.endMulti, this.state.dateMulti)) {
                        this.setState({ timeError: 'Check you start and end times', });
                    } else {
                        this.setState({ timeError: '' })
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
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'space-around' }}
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
    checkKey = event => e.keyCode === 13 ? this.setState({ searchEnter: true }) : null

    toggleCompEvent = () => this.setState({ checkCompEvent: !this.state.checkCompEvent });
    eventName = event => this.setState({ name: event.target.value.replace(/\s\s+/g, ' ').trim() });
    eventUrl = event => this.setState({ url: event.target.value.trim() });
    eventDays = event => this.setState({ days: event.target.value });

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
    eventDescription = e => this.setState({ description: e.target.value });

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
    }

    toggleNewSponsors = () => this.setState({ checkNewSponsors: !this.state.checkNewSponsors });

    toggleSnackBar = (message) =>
        this.setState({
            snackBar: !this.state.snackBar,
            snackBarMessage: message
        });

    handleRequestClose = () => { this.setState({ snack: false, msg: "" }); };

    sponsorName = event => this.setState({ sponsorNames: event.target.value });
    sponsorUrl = event => this.setState({ sponsorWebsites: event.target.value });

    onNewSponsorSubmit = (e) => {
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
                this.toggleSnackBar("Sponsor name already taken!");
            }
        }
    }

    Submit = () => {
        let {
            name,
            newSponsors,
            endMulti,
            startMulti,
            dateMulti,
            day,
            start,
            end,
            checkMultiday,
            description,
            selectedSponsors
        } = this.state;

        let data = new FormData();
        data.append('description', description);
        data.append('tags', JSON.stringify(this.state.selectedTags));
        this.state.eventFiles.forEach((file, index) => data.append(`files${index}`, file));
        data.append('compEvent', !!this.state.checkCompEvent);
        data.append('name', this.state.name);
        data.append('image', this.state.eventImg);
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
                this.props.history.push(`/event/${eventID}`)
            })
    }

    closeModal = () => this.setState({ modalMessage: '' });
    onTagFocus = () => this.setState({ tagFocused: true });
    onTagBlur = () => this.setState({ tagFocused: false });

    onOrganizerFocus = () => this.setState({ organizerFocused: true });
    onOrganizerBlur = () => this.setState({ organizerFocused: false });

    onSponsorFocus = () => this.setState({ sponsorFocused: true });
    onSponsorBlur = () => this.setState({ sponsorFocused: false });

    renderLogoImage = () => {
        if (this.state.logo !== "")
            return <img src={this.state.logoPreview} className="spaceLogoImagePreview" />
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

    renderEventImage = () => {
        if (this.state.eventImg !== "") {
            return (
                <img src={this.state.eventImgPreview} className="spaceLogoImagePreview" />
            )
        }
    }

    renderEventImageText = () => {
        if (this.state.eventImgPreview === "" || this.state.eventImgPreview === undefined || this.state.eventImgPreview === null) {
            return (
                <span style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                    Add an image for the event page
          <span style={{ fontSize: '0.9rem', marginTop: '5px' }}>For Best Size Use: 512 x 512</span>
                </span>
            )
        }
    }
    changeRadio = e => this.setState({
        checkedRadio: e.target.value,
        days: '',
        dateMulti: [],
        endMulti: [],
        startMulti: [],
        dateError: '',
        timeError: '',
        checkMultiday: true,
    });

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

    handleEventImage = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                eventImg: file,
                eventImgPreview: reader.result
            });
        }

        reader.readAsDataURL(file);
    };
    render() {

        const {
      snackBarMessage, dateError, modalMessage,
            snackBar, checkCompEvent, days,
            description, selectedTag, selectedTags,
            selectedSponsors, newSponsors, eventFiles,
            organizers, showOrganizers, selectedOrganizers,
            sponsors, checkNewSponsors, sponsorNames,
            sponsorLogos, checkMultiday, loadedTags,
            tagFocused, sponsorFocused, organizerFocused,
            checkedRadio,
    } = this.state;

        const Helper = new StyleHelpers;
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
            this.loading()
                ?
                <h1>spinner here!</h1>
                :
                <div className="container">
                    <Helmet title="AddEvent" meta={[{ name: 'description', content: 'Description of AddEvent' }]} />
                    <Header />

                    <main className="spaceSignUpMain">

                        <div className="spaceSignUpTitle">Submit an Event</div>
                        <div className="spaceSignUpContainer">

                            <TextField label="Event name" onChange={this.eventName} type="text" name="eventName" margin="normal" />
                            <TextField onChange={this.eventUrl} type="url" label="Event url" margin="normal" />
                            <TextField label="Breif description" value={this.state.description} margin="normal" multiline onChange={this.eventDescription} />

                            <label
                                style={{
                                    marginTop: Helper.getLabelStyle(tagFocused, selectedTags)[0],
                                    color: Helper.getLabelStyle(tagFocused, selectedTags)[1],
                                }}
                                className={Helper.getLabelClassName(tagFocused, selectedTags)}
                            >
                                event tags
                    </label>

                            {this.state.loadedTags &&
                                <Select.Creatable
                                    className={Helper.getSelectStyle(tagFocused, selectedTags)}
                                    placeholder={!tagFocused && !!!selectedTags.length ? 'Choose or create some tags that describe your event ' : ''}
                                    multi
                                    style={{
                                        background: '#fff',
                                        border: 'none',
                                        boxShadow: 'none',
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
                                additional organizers
              </label>

                            {organizers &&
                                <Select
                                    className={Helper.getSelectStyle(organizerFocused, selectedOrganizers)}
                                    placeholder={!organizerFocused && !!!selectedOrganizers.length ? 'Event Organizers' : ''}
                                    multi
                                    style={{ background: '#fff', border: 'none', boxShadow: 'none' }}
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
                                    className={Helper.getLabelClassName(sponsorFocused, selectedSponsors)}
                                >
                                    selected sponsors
                </label>,
                                <Select
                                    className={Helper.getSelectStyle(sponsorFocused, selectedSponsors)}
                                    placeholder={!sponsorFocused && !!!selectedSponsors.length ? 'Search Sponsors' : ''}
                                    key={`sponsors`}
                                    multi
                                    style={{ background: '#fff', border: 'none', boxShadow: 'none' }}
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

                            {(dateError && !checkMultiday) && <p style={{ textAlign: 'center', margin: 0, padding: 0, color: 'red', }}>{dateError}</p>}
                            {(timeError && !checkMultiday) && <p style={{ textAlign: 'center', margin: 0, padding: 0, color: 'red', }}>{timeError}</p>}
                            {(dateError && checkMultiday) && <p style={{ textAlign: 'center', margin: 0, padding: 0, color: 'red', }}>{dateError}</p>}
                            {(timeError && checkMultiday) && <p style={{ textAlign: 'center', margin: 0, padding: 0, color: 'red', }}>{timeError}</p>}

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 50,
                                    color: 'rgba(0,0,0,0.54)',
                                    justifyContent: 'space-between',
                                    marginBottom: parseInt(this.state.checkedRadio) === 1 ? 32 : '',
                                    marginTop: 32
                                }}
                            >
                                {options.map((item, i) =>
                                    <label key={`l${item.id}`} className="radio-inline">
                                        <input
                                            type="radio"
                                            checked={this.state.checkedRadio == i}
                                            ref={(el) => this["myRadioRef" + i] = el}
                                            value={item.id}
                                            onChange={this.changeRadio}
                                            onKeyDown={(e) => e.keyCode === 13 ? this.changeRadio() : null}
                                        />
                                        <span style={{ paddingLeft: 8 }}>{item.nm}</span>
                                    </label>
                                )}
                            </div>

                            {parseInt(this.state.checkedRadio) === 1 &&
                                <TextField
                                    label="How many days?"
                                    onChange={this.eventDays}
                                    value={this.state.days}
                                    type="text"
                                />}

                            {parseInt(this.state.checkedRadio) === 0 && [
                                <label key="singleDay" className="addEventFormLabel"> date & time </label>,
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

                            {(parseInt(this.state.checkedRadio) === 1 && days) && this.multiDay(days)}

                            <div style={{ display: 'flex', marginTop: '32px', marginBottom: '72px' }}>

                                <input
                                    id="newSponsors"
                                    type="checkbox"
                                    onKeyDown={(e) => e.keyCode === 13 ? this.toggleNewSponsors() : null} onChange={this.toggleNewSponsors} checked={checkNewSponsors}
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
                                />}

                            <input multiple id="event-files" type="file" style={{ display: 'none' }} onChange={this.eventFiles} />
                            <label htmlFor="event-files">
                                <div style={{ display: 'flex', color: 'rgba(0,0,0,0.54)', flexDirection: 'column', marginBottom: 16 }}>
                                    <MdFileUpload size="40px" />
                                    Upload any other relevant documents
              </div>
                            </label>

                            <div style={{ marginTop: '40px', color: 'rgba(0,0,0,0.54)', }}>
                                {!!eventFiles.length ? [
                                    <h4 key="fileh4" style={{ marginBottom: 10 }}> Uploaded files </h4>,
                                    <ol key="fileol" style={{ height: '100%', display: 'flex', flexDirection: 'column', marginBottom: '60px', }}>
                                        {eventFiles.map((file, key) => [
                                            <li style={{ height: '30px', borderBottom: '2px solid rgba(0,0,0,0.54)', paddingBottom: 20, paddingTop: 20 }} key={`file${key}`}>
                                                <MdInsertDriveFile size="40px" />
                                                {file.name}
                                            </li>
                                        ])}
                                    </ol>
                                ] : null}
                            </div>

                            <div style={{ display: 'flex', marginBottom: 32 }}>
                                <input
                                    type="checkBox"
                                    id="comprehensive-event"
                                    onKeyDown={(e) => e.keyCode === 13 ? this.toggleCompEvent() : null} onChange={this.toggleCompEvent} checked={checkCompEvent}
                                />

                                <label style={{ color: 'rgba(0,0,0,0.54)' }} htmlFor="comprehensive-event">
                                    &nbsp;&nbsp;comprehensive event
              </label>

                            </div>

                            <div className="spaceLogoMainImageRow">
                                <label htmlFor="event-image" className="spaceLogoMainImageBlock">
                                    {this.renderEventImageText()}
                                    {this.renderEventImage()}
                                    <input
                                        type="file"
                                        onChange={this.handleEventImage}
                                        id="event-image"
                                        style={{ display: 'none' }}
                                        accept="image/png, image/jpg, image/jpeg"
                                    />
                                </label>
                            </div>

                            <RaisedButton
                                style={{ backgroundColor: '#3399cc', padding: '10px', marginTop: '15px', color: '#FFFFFF', fontWeight: 'bold' }}
                                onSubmit={this.Submit}
                            />
                        </div>
                    </main>
                    <Snackbar
                        open={snackBar}
                        message={snackBarMessage}
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                    />
                    <Footer />
                    <ErrorModal message={modalMessage} closeModal={this.closeModal} />
                </div>
        );
    }
}
