/**
 *
 * EventInformation
 *
 */
import React, { PureComponent } from 'react';
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
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

import RaisedButton from '../../containers/AddEvent/RaisedButton';
// import DateTimeSelect from '../DateTimeSelect';
import { SelectedSponsors } from '../../containers/AddEvent/SelectedSponsors';

import authenticate from '../../utils/Authenticate';
import {
    // removeDuplicateDate,
    // removeDuplicateStart,
    // removeDuplicateEnd,
    // dateErrors,
    // multiDayTimeErrors,
    timeError,
    formatSelectedDate,
    formatTodaysDate
} from '../../containers/AddEvent/dateUtils';

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

export default class EventInformation extends PureComponent {
    state = {
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
        dateMulti: [],
        end: '',
        startMulti: [],
        endMulti: [],
        newSponsors: [],
        // organizers
        organizers: [],
        showOrganizers: false,
        // sponsors
        sponsors: [],
        checkNewSponsors: '',
        // add new Sponsor form values
        sponsorNames: '',
        sponsorLogos: '',
        sponsorWebsites: '',
        // date/time
        // tags
        loadedTags: [],
        checkedRadio: null,
        logo: '',
        logoPreview: '',
        eventImg: '',
        eventImgPreview: '',
        tag: [],
        selectedOrganizers: [],
        eventSponsors: [],
        eventOrganizers: [],
        eventDates: [],
        changeDateMulti: [],
        changeStartMulti: [],
        changeEndMulti: [],
        // eventDescription: '',
        focusedInput: false,
        startDate: moment(),
        endDate: moment(),
    };

    async componentDidMount() {
        const authorized = await authenticate(localStorage['token']);
        if (!authorized.error && authorized) {
            this.getOrganizers();
            this.getSponsors();
            this.loadSkills();
            this.getEvent(this.props.id);
            // this.previousOrganizers();
            // this.previousSponsors();
            // this.previousDates();
        } else {
            this.props.history.push('/');
        }
    }

    // componentDidUpdate(prevState) {
        // if (this.state.event !== prevState.event) {
            // console.log('foo');
            // this.previosOrganizers();
            // this.previosSponsors();
            // this.previousDates();
        // }       
    // }

    getEvent = eventID => {
        fetch(`http://localhost:8000/api/event/${eventID}`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    event: json.event,
                    eventSponsors: json.sponsors,
                    eventOrganizers: json.organizers,
                    description: json.event.description,
                    url: json.event.url,
                    name: json.event.title,
                    eventDates: json.dates,
                    eventImgPreview: json.event.image,
                    selectedTags: json.tags
                }, () => {
                    this.previousSponsors();
                    this.previousOrganizers();
                    // this.previousDates();
                });
            })
        }

        previousSponsors = () => {
            if (this.state.eventSponsors.length) {
                this.state.eventSponsors.forEach(sponsor => {
                    const selectedSponsors = this.state.selectedSponsors.slice();
                    selectedSponsors.push(sponsor.name);
                    this.setState({ selectedSponsors: selectedSponsors });
                })
            }
        }

        previousOrganizers = () => {
            if (this.state.eventOrganizers.length) {
                this.state.eventOrganizers.forEach(organizer => {
                    const selectedOrganizers = this.state.selectedOrganizers.slice();
                    selectedOrganizers.push(organizer.email);
                    this.setState({ selectedOrganizers: selectedOrganizers });
                })
            }
        }

        previousDates = () => {
            if (this.state.eventDates.length) {
                if (this.state.eventDates.length > 1 && !!!this.state.checkedRadio) {
                    this.setState({
                        checkedRadio: 1, 
                        days: this.state.eventDates.length,
                    });
                    this.state.eventDates.forEach((date, i) => {
                        let start = date.start.split(' ');
                        let end = date.end.split(' ');

                        this.setState((prevState) => {
                            const dateMulti = prevState.dateMulti.slice();
                            dateMulti.push({ 
                                day: start[0],
                                index: i 
                            })
                            return {dateMulti: dateMulti};
                        });

                        this.setState((prevState) => {
                            const startMulti = prevState.startMulti.slice();
                            let seconds = start[1].lastIndexOf(':');
                            let startTime = start[1].slice(0, seconds);
                            startMulti.push({
                                start: startTime,
                                index: i
                            })
                            return {startMulti: startMulti};
                        });
  
                        this.setState((prevState) => {
                            const endMulti = prevState.endMulti.slice();
                            let seconds = end[1].lastIndexOf(':');
                            let endTime = end[1].slice(0, seconds);
                            endMulti.push({
                                end: endTime,
                                index: i
                            })
                            return {endMulti: endMulti};
                        });
                    })
                }
            }
        }

    // getEvent = eventID => {
    //     fetch(`http://localhost:8000/api/event/${eventID}`)
    //         .then(response => response.json())
    //         .then(json => {
    //             console.log('d', json.description)
    //             this.setState({
    //                 event: json.event,
    //                 eventSponsors: json.sponsors,
    //                 eventOrganizers: json.organizers,
    //                 description: json.event.description,
    //                 url: json.event.url,
    //                 name: json.event.title,
    //                 eventDates: json.dates,
    //                 eventImgPreview: json.event.image,
    //                 selectedTags: json.tags
    //             }, () => {
    //                 if (this.state.eventSponsors.length) {
    //                     this.state.eventSponsors.forEach(sponsor => {
    //                         const selectedSponsors = this.state.selectedSponsors.slice();
    //                         selectedSponsors.push(sponsor.name);
    //                         this.setState({ selectedSponsors: selectedSponsors });
    //                     })
    //                 }
    //                 if (this.state.eventOrganizers.length) {
    //                     this.state.eventOrganizers.forEach(organizer => {
    //                         const selectedOrganizers = this.state.selectedOrganizers.slice();
    //                         selectedOrganizers.push(organizer.email);
    //                         this.setState({ selectedOrganizers: selectedOrganizers });
    //                     })
    //                 }
    //                 if (this.state.eventDates.length) {
    //                     if (this.state.eventDates.length > 1) {
    //                         this.setState({
    //                             checkedRadio: 1, 
    //                             days: this.state.eventDates.length 
    //                         });
    //                         this.state.eventDates.forEach((date, i) => {
    //                             console.log('count', i);
    //                             const dateMulti = this.state.dateMulti.slice();
    //                             console.log('dateMultiOne', dateMulti);
    //                             const startMulti = this.state.startMulti.slice();
    //                             console.log('startMultiOne', startMulti);
    //                             const endMulti = this.state.endMulti.slice();
    //                             const start = date.start.split(' ');
    //                             const end = date.end.split(' ');
    //                             dateMulti.push({ 
    //                                 day: start[0],
    //                                 index: i 
    //                             })
    //                             startMulti.push({
    //                                 start: start[1],
    //                                 index: i
    //                             })
    //                             endMulti.push({
    //                                 end: end[1],
    //                                 index: i
    //                             })
    //                             this.setState({
    //                                 dateMulti: dateMulti,
    //                                 startMulti: startMulti,
    //                                 endMulti: endMulti
    //                             }, () => {

    //                             console.log('dateMulti', dateMulti);

    //                             console.log('startMulti', startMulti);
    //                             })
    //                         })
    //                     }
    //                 }
    //             })
                    
    //         })
    // }

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
                alert(`GetSponsors(): error in fetching data from server: ${error}`); // eslint-disable-line
            });
    }

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
                alert(`getOrganizers(): error in fetching data from server: ${error} message: ${error.message}`); // eslint-disable-line
            });
    }

    loadSkills = () => {
        fetch('http://localhost:8000/api/skills/all', {
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

    // selectDateMulti = (e, index) => {
    //     if (typeof index === 'number') {
    //         if (formatTodaysDate() > formatSelectedDate(e.target.value)) {
    //             this.setState({ dateError: "Please check the order of your dates" });
    //             return;
    //         } else {
    //             const changeDateMulti = this.state.dateMulti.slice();
    //             changeDateMulti.push({
    //                 change: index 
    //             })
    //             this.setState({ 
    //                 dateError: '',
    //                changeDateMulti: changeDateMulti 
    //             })
    //             const dates = this.state.dateMulti.slice();
    //             const date = { day: e.target.value, index: index, };
    //             const removeDate = removeDuplicateDate(dates, date);

    //             if (typeof removeDate !== 'number') {
    //                 dates.push(date);
    //                 this.setState({ dateMulti: dates }, () => {
    //                     if (dateErrors(this.state.dateMulti)) this.setState({ dateError: "Please check the order of your dates" });
    //                     else this.setState({ dateError: '' });
    //                 });
    //             } else if (typeof removeDate === 'number') {
    //                 dates.splice(removeDate, 1);
    //                 dates.push(date);
    //                 this.setState({ dateMulti: dates }, () => {
    //                     if (dateErrors(this.state.dateMulti)) this.setState({ dateError: "Please check the order of your dates" });
    //                     else this.setState({ dateError: '' });
    //                 });
    //             }
    //         }
    //     }
    // }

    // selectStartMulti = (e, index) => {
    //     const changeStartMulti = this.state.changeStartMulti.slice();
    //     changeStartMulti.push({
    //         index: index 
    //     })
    //     this.setState({ 
    //         dateError: '',
    //         changeStartMulti: changeStartMulti 
    //     })
    //     if (typeof index === 'number') {
    //         const startTimes = this.state.startMulti.slice();
    //         // const endTimes = this.state.endMulti.slice();
    //         const time = { start: e.target.value, index: index, };
    //         const removeTime = removeDuplicateStart(startTimes, time);
    //         if (typeof removeTime !== 'number') {

    //             startTimes.push(time);
    //             this.setState({ startMulti: startTimes }, () => {
    //                 if (multiDayTimeErrors(this.state.startMulti, this.state.endMulti, this.state.dateMulti)) {
    //                     this.setState({ dateError: 'Check you start and end times', });
    //                 } else {
    //                     this.setState({ dateError: '' });
    //                 }
    //             });
    //         } else if (typeof removeTime === 'number') {
    //             startTimes.splice(removeTime, 1);
    //             startTimes.push(time);
    //             this.setState({ startMulti: startTimes }, () => {
    //                 if (multiDayTimeErrors(this.state.startMulti, this.state.endMulti, this.state.dateMulti)) {
    //                     this.setState({ dateError: 'Check your start and end times', });
    //                 } else {
    //                     this.setState({ dateError: '' });
    //                 }
    //             });
    //         }
    //     }
    // }

    // selectEndMulti = (e, index) => {
    //     if (typeof index === 'number') {
    //         // const startTimes = this.state.startMulti.slice();
    //         const endTimes = this.state.endMulti.slice();
    //         const time = { end: e.target.value, index: index, };
    //         const removeTime = removeDuplicateEnd(endTimes, time);
    //         if (typeof removeTime !== 'number') {
    //             endTimes.push(time);
    //             this.setState({ endMulti: endTimes }, () => {
    //                 if (multiDayTimeErrors(this.state.startMulti, this.state.endMulti, this.state.dateMulti)) {
    //                     this.setState({ dateError: 'Check you start and end times', });
    //                 } else {
    //                     this.setState({ dateError: '' });
    //                 }
    //             });
    //         } else if (typeof removeTime === 'number') {
    //             endTimes.splice(removeTime, 1);
    //             endTimes.push(time);
    //             this.setState({ endMulti: endTimes }, () => {
    //                 if (multiDayTimeErrors(this.state.startMulti, this.state.endMulti, this.state.dateMulti)) {
    //                     this.setState({ dateError: 'Check you start and end times', });
    //                 } else {
    //                     this.setState({ dateError: '' })
    //                 }
    //             });
    //         }
    //     }
    // }

    // multiDay = days => {
    //     const multidayComponent = [];
    //     let dayComponent;
    //     const {
    //         // changeDateMulti,
    //         changeEndMulti,
    //         changeStartMulti,
    //         // dateMulti,
    //     } = this.state;
    //     for (let i = 0; i < days; i++) {
    //         dayComponent =
    //         <DateTimeSelect
    //             key={`multiday${i}`}
    //             index={i}
    //             style={{ display: 'flex', flexDirection: 'column', alignItems: 'space-around' }}
    //             dateLabel={`Day ${i + 1}`}
    //             startTimeLabel="event start"
    //             endTimeLabel="event end"
    //             multiday={true}
    //             selectDateMulti={this.selectDateMulti}
    //             selectStartMulti={this.selectStartMulti}
    //             selectEndMulti={this.selectEndMulti}
    //             dayValue={this.state.dateMulti[i].day}
    //             startValue={!!changeStartMulti[i].index ? false : this.state.startMulti[i].start}
    //             endValue={!!changeEndMulti[i].index ? false : this.state.endMulti[i].end}
    //         />
    //         multidayComponent.push(dayComponent);
    //     }
    //     return multidayComponent;
    // }

    eventName = event => this.setState({ name: event.target.value.replace(/\s\s+/g, ' ').trim() });
    eventUrl = event => this.setState({ url: event.target.value.trim() });
    eventDays = event => this.setState({ days: event.target.value });

    selectSponsor = (selectedSponsor) => this.setState({ selectedSponsors: selectedSponsor });
    selectOrganizer = (selectedOrganizer) => this.setState({ selectedOrganizers: selectedOrganizer });
    eventDescription = e => this.setState({ description: e.target.value });

    handleOrganizerChange = event => {
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
            snackBar: !this.state.snackBar,
            snackBarMessage: message
        });

    handleRequestClose = () => { this.setState({ snackBar: false, snackBarMessage: "" }); };

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
        data.append('tags', this.state.selectedTags);
        data.append('compEvent', 0);
        data.append('name', this.state.name);
        data.append('image', this.state.eventImg);
        data.append('url', this.state.url);
        data.append('organizers', this.state.selectedOrganizers);
        data.append('sponsors', this.state.selectedSponsors);

        if (!!newSponsors.length) {
            data.append('newSponsors', JSON.stringify(newSponsors));
            newSponsors.forEach((file, index) => data.append(`logos${index}`, file.logo));
        }
        if (!!!dateMulti.length) {
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
                if (eventID.error) {
                   this.toggleSnackBar(eventID.error); 
                } else {
                    this.props.history.push(`/event/${eventID}`)
                }
            })
            .catch(error => {
                // console.log(error);
            })
    }

    closeModal = () => this.setState({ modalMessage: '' });

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

    renderEventImage = () => {
        if (this.state.eventImg || this.state.eventImgPreview) {
            return (
                <img alt="" src={this.state.eventImgPreview} className="spaceLogoImagePreview" />
            )
        }
    }

    renderEventImageText = () => {
        if (!this.state.eventImgPreview) {
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
            newSponsors, 
            organizers,
            sponsors,
            checkNewSponsors,
            loadedTags,
            // days,
            // dateMulti,
            // startMulti,
            // endMulti
        } = this.state;

        const options = [
            {
                id: 0,
                option: "one day event"
            },
            {
                id: 1, 
                option: "multi-day event"
            }
        ];
        return (
                <div>
                            <DateRangePicker
                                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                            />

                </div>
        );
    }
}
 
                // {/* <div className="container">
                //     <Helmet>
                //         <title>Create Event Form</title>
                //         <meta name="description" content="Description of Create event form" />
                //     </Helmet>

                //     <div className="addEventBanner">
                //         <div className="homeHeaderContentTitle">Add a New Event</div>
                //         <div className="homeHeaderContentSubtitle">Create an Event for your Space</div>
                //     </div>
                //     <main className="spaceSignUpMain">

                //         <div className="spaceSignUpTitle">Submit an Event</div>
                //         <div className="spaceSignUpContainer">

                //             <TextField label="Event name" onChange={this.eventName} value={this.state.name} type="text" name="eventName" margin="normal" />
                //             <TextField onChange={this.eventUrl} type="url" value={this.state.url} label="Event url" margin="normal" />
                //             <TextField label="Brief description" value={this.state.description} margin="normal" multiline onChange={this.eventDescription} />

                //             {!!loadedTags.length &&
                //                 <FormControl style={{ marginTop: 24 }}>
                //                     <InputLabel htmlFor="tags-select">Relevant Tags</InputLabel>
                //                     <Select
                //                         multiple
                //                         value={this.state.selectedTags}
                //                         onChange={this.handleSkillTags}
                //                         input={<Input id="tag-multiple" />}
                //                         renderValue={selected => selected.join(',')}
                //                         MenuProps={MenuProps}
                //                     >
                //                         {loadedTags.map((tag, key) => (
                //                             <MenuItem key={`${key}tag`} value={tag}>
                //                                 <Checkbox checked={(this.state.selectedTags.indexOf(tag) > -1)} />
                //                                 <ListItemText primary={tag} />
                //                             </MenuItem>
                //                         ))}
                //                     </Select>
                //                 </FormControl>
                //             }

                //             {!!organizers.length &&
                //                 <FormControl style={{ marginTop: 24 }}>
                //                     <InputLabel htmlFor="organizers-select">Organizers</InputLabel>
                //                     <Select
                //                         multiple
                //                         value={this.state.selectedOrganizers}
                //                         onChange={this.handleOrganizerChange}
                //                         input={<Input id="tag-multiple" />}
                //                         renderValue={selected => selected.join(',')}
                //                         MenuProps={MenuProps}
                //                     >
                //                         {organizers.map(organizer => (
                //                             <MenuItem key={organizer} value={organizer}>
                //                                 <Checkbox checked={this.state.selectedOrganizers.indexOf(organizer) > -1} />
                //                                 <ListItemText primary={organizer} />
                //                             </MenuItem>
                //                         ))}
                //                     </Select>
                //                 </FormControl>
                //             }

                //             {!!sponsors.length &&
                //                 <FormControl style={{ marginTop: 24 }}>
                //                     <InputLabel htmlFor="sponsors-select">Sponsors</InputLabel>
                //                     <Select
                //                         multiple
                //                         value={this.state.selectedSponsors}
                //                         onChange={this.handleSponsorChange}
                //                         input={<Input id="tag-multiple" />}
                //                         renderValue={selected => selected.join(',')}
                //                         MenuProps={MenuProps}
                //                     >
                //                         {sponsors.map(sponsor => (
                //                             <MenuItem key={sponsor} value={sponsor}>
                //                                 <Checkbox checked={this.state.selectedSponsors.indexOf(sponsor) > -1} />
                //                                 <ListItemText primary={sponsor} />
                //                             </MenuItem>
                //                         ))}
                //                     </Select>
                //                 </FormControl>
                //             }

                //             {dateError && <p style={{ textAlign: 'center', margin: 0, padding: 0, color: 'red', }}>{dateError}</p>}
                //             {/* {(timeError && !checkMultiday) && <p style={{ textAlign: 'center', margin: 0, padding: 0, color: 'red', }}>{dateError}</p>} */}
                //             {dateError && <p style={{ textAlign: 'center', margin: 0, padding: 0, color: 'red', }}>{dateError}</p>}
                //             {/* {(timeError && checkMultiday) && <p style={{ textAlign: 'center', margin: 0, padding: 0, color: 'red', }}>{dateError}</p>} */}

                //             <div
                //                 style={{
                //                     display: 'flex',
                //                     flexDirection: 'column',
                //                     height: 50,
                //                     color: 'rgba(0,0,0,0.54)',
                //                     justifyContent: 'space-between',
                //                     marginBottom: parseInt(this.state.checkedRadio, 10) === 1 ? 32 : '',
                //                     marginTop: 32
                //                 }}
                //             >
                //                 {options.map((item, i) =>
                //                     <label key={`l${item.id}`} className="radio-inline">
                //                         <input
                //                             type="radio"
                //                             checked={this.state.checkedRadio === i.toString()}
                //                             ref={(el) => this["myRadioRef" + i] = el}
                //                             value={item.id}
                //                             onChange={this.changeRadio}
                //                             onKeyDown={(event) => event.keyCode === 13 ? this.changeRadio(event) : null}
                //                         />
                //                         <span style={{ paddingLeft: 8 }}>{item.option}</span>
                //                     </label>
                //                 )}
                //             </div>

                //             {/* {parseInt(this.state.checkedRadio, 10) === 1 &&
                //                 <TextField
                //                     label="How many days?"
                //                     onChange={this.eventDays}
                //                     value={this.state.days}
                //                     type="text"
                //                 />} */}

                //             {/* {parseInt(this.state.checkedRadio, 10) === 0 && [
                //                 <label key="singleDay" className="addEventFormLabel"> date & time </label>,
                //                 <DateTimeSelect
                //                     key="singleDay2"
                //                     dateLabel="Start date"
                //                     startTimeLabel="event start"
                //                     endTimeLabel="event end"
                //                     multiday={false}
                //                     selectDate={this.selectDate}
                //                     selectStart={this.selectStart}
                //                     selectEnd={this.selectEnd}
                //                 />
                //             ]} */}

                //             {/* {(
                //                 parseInt(this.state.checkedRadio, 10) === 1 
                //                     && days 
                //                     && dateMulti.length === days
                //                     && startMulti.length === days
                //                     && endMulti.length === days
                //                 ) && this.multiDay(days)
                //             } */}
                //             <DateRangePicker
                //                 startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                //                 startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                //                 endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                //                 endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                //                 onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                //                 focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                //                 onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                //             />

                //             <div style={{ display: 'flex', marginTop: '32px', marginBottom: '72px' }}>
                //                 <input
                //                     id="newSponsors"
                //                     type="checkbox"
                //                     onKeyDown={(e) => e.keyCode === 13 ? this.toggleNewSponsors() : null}
                //                     onChange={this.toggleNewSponsors}
                //                     checked={checkNewSponsors}
                //                 />

                //                 <label style={{ color: 'rgba(0,0,0,0.54)' }} htmlFor="newSponsors" >
                //                     &nbsp;&nbsp;Add new sponsor
                //                 </label>

                //             </div>

                //             {checkNewSponsors && [
                //                 <TextField
                //                     key="newSponTF1"
                //                     label="name"
                //                     onChange={this.sponsorName}
                //                     value={this.state.sponsorNames}
                //                     type="text"
                //                     margin="normal"
                //                 />,

                //                 <TextField
                //                     key="newSponTF2"
                //                     label="website"
                //                     onChange={this.sponsorUrl}
                //                     value={this.state.sponsorWebsites}
                //                     type="url"
                //                     margin="normal"
                //                 />,

                //                 <div key="newSponTF3" className="spaceLogoMainImageRow">
                //                     <label htmlFor="logo-image" className="spaceLogoMainImageBlock">
                //                         {this.renderLogoImageText()}
                //                         {this.renderLogoImage()}
                //                         <input
                //                             type="file"
                //                             onChange={this.handleLogo}
                //                             id="logo-image"
                //                             style={{ display: 'none' }}
                //                             accept="image/png, image/jpg, image/jpeg"
                //                         />
                //                     </label>
                //                 </div>,

                //                 <RaisedButton
                //                     key="newSponTF4"
                //                     onSubmit={this.onNewSponsorSubmit}
                //                     sponsor
                //                     style={{
                //                         backgroundColor: '#3399cc',
                //                         marginBottom: 64,
                //                         padding: '10px',
                //                         marginTop: '15px',
                //                         color: 'rgba(0,0,0,0.54)',
                //                         fontWeight: 'bold'
                //                     }}
                //                 />
                //             ]}

                //             {!!newSponsors.length &&
                //                 <SelectedSponsors
                //                     selectedSponsors={newSponsors}
                //                     removeSponsor={this.removeNewSponsor}
                //                     newSponsor={true}
                //                 />}

                //             <div className="spaceLogoMainImageRow">
                //                 <label htmlFor="event-image" className="spaceLogoMainImageBlock">
                //                     {this.renderEventImageText()}
                //                     {this.renderEventImage()}
                //                     <input
                //                         type="file"
                //                         onChange={this.handleEventImage}
                //                         id="event-image"
                //                         style={{ display: 'none' }}
                //                         accept="image/png, image/jpg, image/jpeg"
                //                     />
                //                 </label>
                //             </div>

                //             <FlatButton style={{ backgroundColor: '#ff4d58', padding: '10px', marginTop: '15px', color: '#FFFFFF', fontWeight: 'bold' }} onClick={this.Submit}>
                //                 Submit Event
                //             </FlatButton>
                //         </div>
                //     </main>
                //     <footer className="homeFooterContainer">
                //         Copyright © 2018 theClubhou.se  • 540 Telfair Street  •  Tel: (706) 723-5782
                //     </footer>
                //     <Snackbar
                //         open={snackBar}
                //         message={snackBarMessage}
                //         autoHideDuration={4000}
                //         onClose={this.handleRequestClose}
                //     />
                // </div> */}