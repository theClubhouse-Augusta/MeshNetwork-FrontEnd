/*
 *
 * AddEvent
 *
 */
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from "./RaisedButton";
import FlatButton from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import { ListItemText } from 'material-ui/List';
import MdFileUpload from 'react-icons/lib/md/file-upload';
import Header from '../../components/Header';
import { MdInsertDriveFile } from 'react-icons/lib/md';
import DateTimeSelect from '../../components/DateTimeSelect';
import { SelectedSponsors } from './SelectedSponsors';
import Spinner from '../../components/Spinner';

import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

import authenticate from '../../utils/Authenticate';
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

export default class AddEvent extends PureComponent {
    state = {
        loading: true,
        dateError: '',
        modalMessage: '',
        snackBar: false,
        // event
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
        // sponsors
        sponsors: '',
        checkNewSponsors: '',
        // add new Sponsor form values
        sponsorNames: '',
        sponsorLogos: '',
        sponsorWebsites: '',
        // date/time
        // tags
        loadedTags: '',
        checkedRadio: null,
        logo: '',
        logoPreview: '',
        eventImg: '',
        eventImgPreview: '',
        tag: new Set(),
        selectedOrganizers: new Set(),
        selectedSponsors: new Set(),
    };

    async componentDidMount() {
        const authorized = await authenticate(localStorage['token']);
        if (!authorized.error) {
            this.getOrganizers();
            this.getSponsors();
            this.loadSkills();
            this.setState({ loading: false });
        } else {
            this.props.history.push('/');
        }
    }

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
                alert(`error in fetching data from server: ${error}`); // eslint-disable-line
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
                alert(`error in fetching data from server: ${error}`); // eslint-disable-line
            });
    }

    loadSkills = () => {
        fetch('https://innovationmesh.com/api/skills/all', {
            headers: { Authorization: `Bearer ${localStorage['token']}` },
        })
            .then(response => response.json())
            .then(json => { this.setState({ loadedTags: json }) })
            .catch(error => {
                alert(`error in fetching data from server: ${error}`);
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

    selectDate = (e, index) => {
        if (typeof index !== 'number') {
            if (formatSelectedDate(e.target.value) >= formatTodaysDate()) {
                this.setState({ day: e.target.value }, () => {
                    if (this.state.day && this.state.start && this.state.end) {
                        const error = timeError(this.state.start, this.state.end, this.state.day);
                        if (error) this.setState({ modalMessage: "Invalid Date", dateError: "Please check the order of your dates" })
                        else this.setState({ dateError: '' })
                    } else {
                        this.setState({ dateError: '' });
                    }
                });
            } else {
                this.setState({ dateError: "Please check the order of your dates" });
            }
        }
    }

    selectStart = (e, index) => {
        if (typeof index !== 'number') {
            this.setState({ start: e.target.value }, () => {
                if (this.state.day && this.state.start && this.state.end) {
                    const error = timeError(this.state.start, this.state.end, this.state.day);
                    if (error) this.setState({ dateError: "Please check your start and end times" });
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
                    if (error) this.setState({ dateError: "Please check your start and end times" });
                    else this.setState({ dateError: '' });
                }
            });
        }
    }

    selectDateMulti = (e, index) => {
        if (typeof index === 'number') {
            if (formatTodaysDate() > formatSelectedDate(e.target.value)) {
                this.setState({ dateError: "Please check the order of your dates" });
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
                    if (dateErrors(this.state.dateMulti)) this.setState({ dateError: "Please check the order of your dates" });
                    else this.setState({ dateError: '' });
                });
            } else if (typeof removeDate === 'number') {
                dates.splice(removeDate, 1);
                dates.push(date);
                this.setState({ dateMulti: dates }, () => {
                    if (dateErrors(this.state.dateMulti)) this.setState({ dateError: "Please check the order of your dates" });
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
                        this.setState({ dateError: 'Check you start and end times', });
                    } else {
                        this.setState({ dateError: '' });
                    }
                });
            } else if (typeof removeTime === 'number') {
                startTimes.splice(removeTime, 1);
                startTimes.push(time);
                this.setState({ startMulti: startTimes }, () => {
                    if (multiDayTimeErrors(this.state.startMulti, this.state.endMulti, this.state.dateMulti)) {
                        this.setState({ dateError: 'Check your start and end times', });
                    } else {
                        this.setState({ dateError: '' });
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
                        this.setState({ dateError: 'Check you start and end times', });
                    } else {
                        this.setState({ dateError: '' });
                    }
                });
            } else if (typeof removeTime === 'number') {
                endTimes.splice(removeTime, 1);
                endTimes.push(time);
                this.setState({ endMulti: endTimes }, () => {
                    if (multiDayTimeErrors(this.state.startMulti, this.state.endMulti, this.state.dateMulti)) {
                        this.setState({ dateError: 'Check you start and end times', });
                    } else {
                        this.setState({ dateError: '' })
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

    eventName = event => this.setState({ name: event.target.value.replace(/\s\s+/g, ' ').trim() });
    eventUrl = event => this.setState({ url: event.target.value.trim() });
    eventDays = event => this.setState({ days: event.target.value });

    selectSponsor = (selectedSponsor) => this.setState({ selectedSponsors: selectedSponsor });
    selectOrganizer = (selectedOrganizer) => this.setState({ selectedOrganizers: selectedOrganizer });
    eventDescription = e => this.setState({ description: e.target.value });

    handleTagChange = event => {
        this.setState({ tag: new Set(event.target.value) });
    };

    handleOrganizerChange = event => {
        this.setState({ selectedOrganizers: new Set(event.target.value) });
    };

    handleSponsorChange = event => {
        this.setState({ selectedSponsors: new Set(event.target.value) });
    };

    // handleSponsors = event => {
    //     this.setState({ selectedSponsors: event.target.value });
    // };

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
                this.toggleSnackBar("Sponsor name already taken!");
            }
        }
    }

    Submit = () => {
        let {
            newSponsors,
            endMulti,
            startMulti,
            dateMulti,
            day,
            start,
            end,
            description,
        } = this.state;

        let data = new FormData();
        data.append('description', description);
        data.append('tags', JSON.stringify(this.state.tag));
        this.state.eventFiles.forEach((file, index) => data.append(`files${index}`, file));
        data.append('compEvent', 0);
        data.append('name', this.state.name);
        data.append('image', this.state.eventImg);
        data.append('url', this.state.url);
        data.append('organizers', JSON.stringify(this.state.selectedOrganizers));
        data.append('sponsors', JSON.stringify(this.state.selectedSponsors));

        if (!!newSponsors.length) {
            data.append('newSponsors', JSON.stringify(newSponsors));
            newSponsors.forEach((file, index) => data.append(`logos${index}`, file.logo));
        }
        if (!!!dateMulti.length) {
            console.log('one')
            if (day) data.append('day', JSON.stringify(day));
            if (start) data.append('start', JSON.stringify(start));
            if (end) data.append('end', JSON.stringify(end));
        } else {
            console.log('two')
            const days = dateMulti.findIndex(previous => previous.day === '');
            const starts = startMulti.findIndex(previous => previous.start === '');
            const ends = endMulti.findIndex(previous => previous.end === '');
            if (days === -1 && starts === -1 && ends === -1) {
                data.append('dateMulti', JSON.stringify(dateMulti));
                data.append('startMulti', JSON.stringify(startMulti));
                data.append('endMulti', JSON.stringify(endMulti));
            }
        }

        fetch(`https://innovationmesh.com/api/event`, {
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
                    Add an Event Image
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
        day: '',
        start: '',
        end: ''
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
            snackBarMessage,
            dateError,
            snackBar,
            selectedTags,
            selectedSponsors,
            newSponsors, eventFiles,
            organizers,
            selectedOrganizers,
            sponsors,
            checkNewSponsors,
            loadedTags,
            days,
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
                <div className="container">
                    <Helmet>
                        <title>Create Event Form</title>
                        <meta name="description" content="Description of Create event form" />
                    </Helmet>
                    <Header />

                    <div className="addEventBanner">
                        <div className="homeHeaderContentTitle">Add a New Event</div>
                        <div className="homeHeaderContentSubtitle">Create an Event for your Space</div>
                    </div>
                    <main className="spaceSignUpMain">

                        <div className="spaceSignUpTitle">Submit an Event</div>
                        <div className="spaceSignUpContainer">

                            <TextField label="Event name" onChange={this.eventName} type="text" name="eventName" margin="normal" />
                            <TextField onChange={this.eventUrl} type="url" label="Event url" margin="normal" />
                            <TextField label="Brief description" value={this.state.description} margin="normal" multiline onChange={this.eventDescription} />

                            {loadedTags &&
                                <FormControl style={{ marginTop: 24 }}>
                                    <InputLabel htmlFor="tags-select">Relevant Tags</InputLabel>
                                    <Select
                                        multiple
                                        value={[...this.state.tag]}
                                        onChange={this.handleTagChange}
                                        input={<Input id="tag-multiple" />}
                                        renderValue={selected => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {loadedTags.map(tag => (
                                            <MenuItem key={tag} value={tag}>
                                                <Checkbox checked={this.state.tag.has(tag)} />
                                                <ListItemText primary={tag} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            }

                            {organizers &&
                                <FormControl style={{ marginTop: 24 }}>
                                    <InputLabel htmlFor="organizers-select">Organizers</InputLabel>
                                    <Select
                                        multiple
                                        value={[...this.state.selectedOrganizers]}
                                        onChange={this.handleOrganizerChange}
                                        input={<Input id="tag-multiple" />}
                                        renderValue={selected => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {organizers.map(organizer => (
                                            <MenuItem key={organizer} value={organizer}>
                                                <Checkbox checked={this.state.selectedOrganizers.has(organizer)} />
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
                                        value={[...this.state.selectedSponsors]}
                                        onChange={this.handleSponsorChange}
                                        input={<Input id="tag-multiple" />}
                                        renderValue={selected => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {sponsors.map(sponsor => (
                                            <MenuItem key={sponsor} value={sponsor}>
                                                <Checkbox checked={this.state.selectedSponsors.has(sponsor)} />
                                                <ListItemText primary={sponsor} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            }

                            {dateError && <p style={{ textAlign: 'center', margin: 0, padding: 0, color: 'red', }}>{dateError}</p>}
                            {/* {(timeError && !checkMultiday) && <p style={{ textAlign: 'center', margin: 0, padding: 0, color: 'red', }}>{dateError}</p>} */}
                            {dateError && <p style={{ textAlign: 'center', margin: 0, padding: 0, color: 'red', }}>{dateError}</p>}
                            {/* {(timeError && checkMultiday) && <p style={{ textAlign: 'center', margin: 0, padding: 0, color: 'red', }}>{dateError}</p>} */}

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
                                />}

                            <input multiple id="event-files" type="file" style={{ display: 'none' }} onChange={this.eventFiles} />
                            <label htmlFor="event-files">
                                <div style={{ display: 'flex', color: 'rgba(0,0,0,0.54)', flexDirection: 'column', marginBottom: 16, textAlign: 'center' }}>
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

                            <FlatButton style={{ backgroundColor: '#ff4d58', padding: '10px', marginTop: '15px', color: '#FFFFFF', fontWeight: 'bold' }} onClick={this.Submit}>
                                Submit Event
                            </FlatButton>
                        </div>
                    </main>
                    <footer className="homeFooterContainer">
                        Copyright © 2018 theClubhou.se  • 540 Telfair Street  •  Tel: (706) 723-5782
                    </footer>
                    <Snackbar
                        open={snackBar}
                        message={snackBarMessage}
                        autoHideDuration={4000}
                        onClose={this.handleRequestClose}
                    />
                </div>
        );
    }
}
