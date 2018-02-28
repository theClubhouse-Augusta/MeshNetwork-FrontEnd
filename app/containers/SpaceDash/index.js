
/*
 *
 * SpaceDash
 *
 */
import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table, {
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    TableFooter
} from 'material-ui/Table';
import SpaceInformation from '../../components/SpaceInformation';
import EventInformation from '../../components/EventInformation';
import { AppearanceByMonthYear } from '../../components/DataViz/AppearanceByMonthYear';
import { AllAppearances } from '../../components/DataViz/AllAppearances';
import { AllJoins } from '../../components/DataViz/AllJoins';
import FlatButton from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

import Header from 'components/Header';
import Spinner from '../../components/Spinner';
import authenticate from '../../utils/Authenticate';

import './style.css';
import './styleM.css';

const getUsersAPI = 'http://localhost:8000/api/users/';

const spaceInfoAPI = 'http://localhost:8000/api/workspace/';

export default class SpaceDash extends React.PureComponent {
    state = {
        token: localStorage.getItem('token'),
        activeMenu: 'main',
        spaceUsers: [],
        spaceDescription: '',
        spaceID: 0,
        memberCount: 0,
        eventCount: 0,
        checkinCount: 0,
        spaceEvents: [],
        photoGallery: [],
        resources: [],
        resourceName: "",
        resourceEmail: "",
        msg: "",
        snack: false,
        loading: true,
        thisMonthCheckIns: 0,
        userPage: 0,
        userRowsPerPage: 10,
        eventPage: 0,
        eventRowsPerPage:10,
        resourceDays:'',
        resourceMonday:0,
        resourceTuesday:0,
        resourceWednesday:0,
        resourceThursday:0,
        resourceFriday:0,
        resourceStartTime:'',
        resourceEndTime:'',
        resourceIncrement:0,
        pageContent: [],
        editEventID: '',
    }
    async componentDidMount() {
        const authorized = await authenticate(localStorage['token'], this.props.history);
        if (!authorized.error && authorized) {
            this.loadSpaceDescription();
            this.setState({ loading: false });
        } else {
            this.props.history.push('/');
        }
    }

    handleRequestClose = () => { this.setState({ snack: false, msg: "" }); };
    showSnack = (msg) => { this.setState({ snack: true, msg: msg }); };

    loadSpaceUsers = (id) => {
        fetch(getUsersAPI + id, {
            method: 'GET'
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({
                    spaceUsers: json
                });
            })
    }

    loadSpaceDescription = () => {
        fetch(spaceInfoAPI + this.props.match.params.id, {
            method: 'GET'
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({
                    spaceDescription: json.description,
                    spaceID: json.id
                },  () => {
                    this.loadSpaceUsers(json.id);
                    this.getSpaceStats(json.id);
                    this.getSpaceEvents(json.id);
                    this.getPhotoGallery(json.id);
                    this.getResources(json.id);
                })
            })
    }

    getSpaceStats = (id) => {
        fetch('https://innovationmesh.com/api/space/metrics/' + id, {
            method: 'GET',
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({
                    memberCount: json.memberCount,
                    eventCount: json.eventCount,
                    checkinCount: json.checkinCount,
                    thisMonthCheckIns: json.thisMonthCheckIns,
                })
            })
    }

    getSpaceEvents = (id) => {
        fetch('https://innovationmesh.com/api/events/' + id, {
            method: 'GET',
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({
                    spaceEvents: json
                })
            })
    }

    changeMenu = (page) => {
        this.setState({
            activeMenu: page
        })
    }

    getPhotoGallery = (id) => {
        fetch('https://innovationmesh.com/api/photos/' + id, {
            method: 'GET',
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({
                    photoGallery: json.photos
                })
            })
    }

    handleGalleryPhoto = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.storePhoto(file);
        }
        reader.readAsDataURL(file);
    }

    storePhoto = (file) => {
        let photoGallery = this.state.photoGallery;
        let data = new FormData();

        data.append('spaceID', this.state.spaceID);
        data.append('photo', file);
        fetch('https://innovationmesh.com/api/photos', {
            method: 'POST',
            body: data,
            headers: { 'Authorization': 'Bearer ' + this.state.token }
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.error) {
                    this.showSnack(json.error);
                }
                else if (json.success) {
                    this.showSnack(json.success);
                    photoGallery.push(json.photo);
                    this.setState({
                        photoGallery: photoGallery
                    })
                }
            })
    }

    deletePhoto = (id, i, spaceID) => {
        let photoGallery = this.state.photoGallery;
        // console.log(i);
        let data = new FormData();
        data.append("_method", "DELETE");
        // data.append("spaceID", spaceID);
        fetch(`https://innovationmesh.com/api/photos/${id}`, {
            headers: { 'Authorization': 'Bearer ' + this.state.token },
            method: "POST",
            body: data,
        })
            .then(response => response.json())
            .then(json => {
                if (json.success) {
                    photoGallery.splice(i, 1);
                    // const remove = photoGallery.findIndex(previous => previous.id === id);

                    // if (remove !== -1 && photoGallery.length !== 1) {
                    // this.showSnack(json.success);
                    //this.setState({ photoGallery: photoGallery.splice(-i, 1) });
                    this.setState({ photoGallery: photoGallery }, () => {
                        this.forceUpdate();
                    })
                    // } else {
                    // this.setState({ photoGallery: [] });
                    // }
                }
                else
                    this.showSnack(json.error);
            })
    }

    handleResourceName = (event) => {
        this.setState({
            resourceName: event.target.value
        })
    };

    handleResourceEmail = (event) => {
        this.setState({
            resourceEmail: event.target.value
        })
    };

    handleStartDay = (event) => {
        this.setState({
            resourceStartDay: event.target.value
        })
    };

    handleEndDay = (event) => {
        this.setState({
            resourceEndDay: event.target.value
        })
    };

    handleStartTime = (event) => {
        this.setState({
            resourceStartTime: event.target.value
        })
    };

    handleStartEnd = (event) => {
        this.setState({
            resourceEndTime: event.target.value
        })
    };

    handleIncrement = (event) => {
        this.setState({
            resourceIncrement: event.target.value
        })
    };

    getResources = (id) => {
        fetch('https://innovationmesh.com/api/resources/' + id, {
            method: 'GET',
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({
                    resources: json
                })
            })
    };

    handleResourceMonday = (event) => {
        this.setState({ resourceMonday: event.target.checked });
    }
    handleResourceTuesday = (event) => {
        this.setState({ resourceTuesday: event.target.checked });
    }
    handleResourceWednesday = (event) => {
        this.setState({ resourceWednesday: event.target.checked });
    }
    handleResourceThursday = (event) => {
        this.setState({ resourceThursday: event.target.checked });
    }
    handleResourceFriday = (event) => {
        this.setState({ resourceFriday: event.target.checked });
    }

    storeResource = () => {
        let resources = this.state.resources;
        let resourceDays = [];

        if(this.state.resourceMonday === 1) {
            resourceDays.push(this.state.resourceMonday);
        }
        if(this.state.resourceTuesday === 2) {
            resourceDays.push(this.state.resourceTuesday);
        }
        if(this.state.resourceWednesday === 3) {
            resourceDays.push(this.state.resourceWednesday);
        }
        if(this.state.resourceThursday === 4) {
            resourceDays.push(this.state.resourceThursday);
        } 
        if(this.state.resourceFriday === 5) {
            resourceDays.push(this.state.resourceFriday);
        } 

        let data = new FormData();
        data.append('spaceID', this.state.spaceID);
        data.append('resourceName', this.state.resourceName);
        data.append('resourceEmail', this.state.resourceEmail);
        data.append('resourceStartTime', this.state.resourceStartTime);
        data.append('resourceStartEnd', this.state.resourceStartTime);
        data.append('resourceEndTime', this.state.resourceEndTime);
        data.append('resourceIncrement', this.state.resourceIncrement);
        data.append('resourceDays', JSON.stringify(resourceDays));

        fetch('https://innovationmesh.com/api/resource', {
            method: 'POST',
            body: data,
            headers: { 'Authorization': 'Bearer ' + this.state.token }
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.error) {
                    this.showSnack(json.error);
                }
                else if (json.success) {
                    this.showSnack(json.success);
                    resources.push(json.resource);
                    this.setState({
                        resources: resources,
                        resourceName: "",
                        resourceEmail: ""
                    })
                }
            })
    };

    deleteResource = (id, i) => {
        let resource = this.state.resources;

        fetch('https://innovationmesh.com/api/resource/' + id, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.state.token }
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.error) {
                    this.showSnack(json.error);
                }
                else if (json.success) {
                    this.showSnack(json.success);
                    resource.splice(i, 1);
                    this.setState({
                        resource: resource
                    })
                }
            })
    }

    handleUserChangePage = (event, page) => {
      this.setState({ userPage:page });
    };

     handleUserChangeRowsPerPage = event => {
      this.setState({ userRowsPerPage: event.target.value });
    };

    handleEventChangePage = (event, page) => {
      this.setState({ eventPage:page });
    };

     handleEventChangeRowsPerPage = event => {
      this.setState({ eventRowsPerPage: event.target.value });
    };
    editEventID = id => this.setState({ editEventID: id });

    renderDashContent = () => {
        if (this.state.activeMenu === 'main') {

            return (
                <div className="spaceDashContent">
                    <Header space={this.props.spaceName}/>
                    <div className="spaceDashDataRow">
                        <div className="spaceDashDataBlock">
                            <div className="spaceDashDataTitle">Members</div>
                            <div className="spaceDashDataContent">{this.state.memberCount}</div>
                        </div>
                        <div className="spaceDashDataBlock">
                            <div className="spaceDashDataTitle">Events</div>
                            <div className="spaceDashDataContent">{this.state.eventCount}</div>
                        </div>
                        <div className="spaceDashDataBlock">
                            <div className="spaceDashDataTitle">Check-Ins this month</div>
                            <div className="spaceDashDataContent">{this.state.thisMonthCheckIns}</div>
                        </div>
                        <div className="spaceDashDataBlock">
                            <div className="spaceDashDataTitle">Total Check-Ins</div>
                            <div className="spaceDashDataContent">{this.state.checkinCount}</div>
                        </div>
                    </div>
                    <div className="spaceDashMetricsContainer">
                        <div className="spaceDashDataTitleGraph">Check-ins range</div>
                        <AppearanceByMonthYear {...this.props} />

                        <div className="spaceDashTotalGraphs">
                            <div className="spaceDashTotalGraphsSection">
                                <div className="spaceDashDataTitleGraph">Member Engagement</div>
                                <AllAppearances height={600} width={600} {...this.props} />
                            </div>

                            <div className="spaceDashTotalGraphsSection">
                                <div className="spaceDashDataTitleGraph">Member Onboarding</div>
                                <AllJoins height={600} width={600} {...this.props} />
                            </div>

                        </div>
                    </div>

                    <div className="spaceDashColumnsContainer">
                        <div className="spaceDashColumn">
                        <div className="spaceDashDataTitleGraph">Members</div>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Full Name</TableCell>
                                        <TableCell>E-mail</TableCell>
                                        <TableCell>Title</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                  {this.state.spaceUsers.slice(this.state.userPage * this.state.userRowsPerPage, this.state.userPage * this.state.userRowsPerPage + this.state.userRowsPerPage).map((user, key) => {
                                    return(
                                      <TableRow key={`user${key}`}>
                                          <TableCell>{user.name}</TableCell>
                                          <TableCell>{user.email}</TableCell>
                                          <TableCell>{user.title}</TableCell>
                                      </TableRow>
                                    )
                                  })}
                                </TableBody>
                                <TableFooter>
                                  <TableRow>
                                    <TablePagination
                                      colSpan={6}
                                      count={this.state.spaceUsers.length}
                                      rowsPerPage={this.state.userRowsPerPage}
                                      page={this.state.userPage}
                                      backIconButtonProps={{
                                        'aria-label': 'Previous Page',
                                      }}
                                      nextIconButtonProps={{
                                        'aria-label': 'Next Page',
                                      }}
                                      onChangePage={this.handleUserChangePage}
                                      onChangeRowsPerPage={this.handleUserChangeRowsPerPage}
                                    />
                                  </TableRow>
                                </TableFooter>
                            </Table>
                        </div>
                        <div className="spaceDashColumn">
                        <div className="spaceDashDataTitleGraph">Events</div>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Event Name</TableCell>
                                        <TableCell>Location</TableCell>
                                        <TableCell>Start Date</TableCell>
                                        <TableCell>Edit</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                  {this.state.spaceEvents.slice(
                                      this.state.eventPage * this.state.eventRowsPerPage, 
                                      this.state.eventPage * this.state.eventRowsPerPage + this.state.eventRowsPerPage
                                    ).map((e, key) => {
                                    return(
                                      <TableRow key={`event${key}`}>
                                            <TableCell><a href={`/event/${e.id}`}>{e.title}</a></TableCell>
                                            <TableCell>{e.space.city}, {e.space.state}</TableCell>
                                            <TableCell>{e.date}</TableCell>
                                            <TableCell 
                                                className="editEventRow"
                                                onClick={() => { 
                                                    this.changeMenu('editEvent'); 
                                                    this.editEventID(e.id); 
                                                }}
                                            >
                                                update&nbsp;{e.title}
                                            </TableCell>
                                        </TableRow>
                                    )
                                  })}
                                </TableBody>
                                <TableFooter>
                                  <TableRow>
                                    <TablePagination
                                      colSpan={6}
                                      count={this.state.spaceEvents.length}
                                      rowsPerPage={this.state.eventRowsPerPage}
                                      page={this.state.eventPage}
                                      backIconButtonProps={{
                                        'aria-label': 'Previous Page',
                                      }}
                                      nextIconButtonProps={{
                                        'aria-label': 'Next Page',
                                      }}
                                      onChangePage={this.handleEventChangePage}
                                      onChangeRowsPerPage={this.handleEventChangeRowsPerPage}
                                    />
                                  </TableRow>
                                </TableFooter>

                            </Table>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.activeMenu === 'updateSpace') {
            return (
                <div className="spaceDashContent">
                    <Header  space={this.props.spaceName} />
                    <SpaceInformation id={this.props.match.params.id} spaceID={this.state.spaceID} description={this.state.spaceDescription} />
                </div>
            )
        }
        else if (this.state.activeMenu === 'updatePhotos') {
            return (
                <div className="spaceDashContent">
                    <Header space={this.props.spaceName} />
                    <div className="spaceDashOptions">
                        <label htmlFor="photo-file" style={{ width: '10%', margin: '10px' }}>
                            <div style={{ fontFamily: 'Noto Sans', textTransform: 'uppercase', fontSize: '0.9em', textAlign: 'center', width: '100%', background: '#ff4d58', paddingTop: '10px', paddingBottom: '10px', color: '#FFFFFF', fontWeight: 'bold' }} >Upload Photo</div>
                        </label>
                        <input type="file" accept="image/*" onChange={this.handleGalleryPhoto} id="photo-file" style={{ display: 'none' }} />
                    </div>
                    <div className="spaceDashPhotoGallery">
                        {this.state.photoGallery.map((photo, i) => (
                                <div key={`photoGallery${i}`} className="spaceDashPhotoBlock">
                                    <img alt="" src={photo.photoThumbnail} />

                                    <FlatButton
                                        style={{
                                            width: '100%',
                                            background: '#ff4d58',
                                            paddingTop: '10px',
                                            paddingBottom: '10px',
                                            color: '#FFFFFF',
                                            fontWeight: 'bold',
                                            alignSelf: 'center'
                                        }}
                                        onClick={() => this.deletePhoto(photo.id, i, this.state.spaceID)}
                                    >
                                        Delete photo
                                    </FlatButton>

                                </div>
                        ))}
                    </div>
                </div>
            )
        }
        else if (this.state.activeMenu === 'editResources') {
            return (
                <div className="spaceDashContent">
                    <Header space={this.props.spaceName} />
                    <div className="spaceDashOptions">
                        <TextField  value={this.state.resourceName} onChange={this.handleResourceName} label="Resource Name" style={{ marginRight: '10px', marginTop: 32  }} />
                        <TextField  value={this.state.resourceEmail} onChange={this.handleResourceEmail} label="Resource E-mail" style={{ marginRight: '10px', marginTop: 32 }} />
                        <FormGroup style={{marginTop: 32}} row>
                            <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.resourceMonday}
                                    onChange={this.handleResourceMonday}
                                    value={1}
                                />
                            }
                            label="Monday"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.resourceTuesday}
                                        onChange={this.handleResourceTuesday}
                                        value={2}
                                    />
                                }
                            label="Tuesday"
                            />
                            <FormControlLabel
                            control={
                                <Checkbox
                                checked={this.state.resourceWednesday}
                                onChange={this.handleResourceWednesday}
                                value={3}
                                />
                            }
                            label="Wednesday"
                            />
                            <FormControlLabel
                            control={
                                <Checkbox
                                checked={this.state.resourceThursday}
                                onChange={this.handleResourceThursday}
                                value={4}
                                />
                            }
                            label="Thursday"
                            />
                            <FormControlLabel
                            control={
                                <Checkbox
                                checked={this.state.resourceFriday}
                                onChange={this.handleResourceFriday}
                                value={5}
                                />
                            }
                            label="Friday"
                            />
                        </FormGroup>
                        <label style={{marginTop: 32}} htmlFor="startTime">Start Time</label>
                        <TextField 
                            id="startTime"
                            value={this.state.resourceStartTime} 
                            type="time"
                            onChange={this.handleStartTime} 
                            //label="Start Time" 
                            placeholder="8:00am" 
                            style={{ marginRight: '10px', marginBottom: 32 }} 
                        />
                        <label htmlFor="endTime">End Time </label>
                        <TextField 
                            id="endTime"
                            value={this.state.resourceEndTime} 
                            type="time"
                            onChange={this.handleStartEnd} 
                            //label="End Time" 
                            placeholder="8:00pm" 
                            style={{ marginRight: '10px', marginBottom: 32 }} 
                        />
                        <TextField value={this.state.resourceIncrement} onChange={this.handleIncrement} label="Max booking time in minutes" placeholder="Minutes" style={{ marginRight: '10px' }} />
                        <label style={{ width: '10%', margin: '10px' }}>
                            <div 
                                onClick={this.storeResource} 
                                style={{ 
                                    fontFamily: 'Noto Sans', 
                                    textTransform: 'uppercase', 
                                    fontSize: '0.9em', 
                                    textAlign: 'center', 
                                    width: '100%', 
                                    background: '#ff4d58', 
                                    paddingTop: '10px', 
                                    paddingBottom: '10px', 
                                    color: '#FFFFFF', 
                                    fontWeight: 'bold', 
                                    cursor: 'pointer', 
                                    marginTop: 32,
                                    marginLeft: '30vw'
                                }} >Add Resource</div>
                        </label>
                    </div>
                    <div className="spaceDashResources">
                        {this.state.resources.map((res, i) => (
                            <div key={`resources${i}`} className="spaceDashResourceBlock">
                                <div className="spaceDashResourceTitle">{res.resourceName}</div>
                                <div className="spaceDashResourceContact">
                                    {res.resourceEmail}
                                    <span style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => this.deleteResource(res.id, i)}>&middot; Remove</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
        else if (this.state.activeMenu === 'editEvent') {
            return (
                <div className="spaceDashContent">
                    <Header space={this.props.spaceName} />
                    <EventInformation 
                        {...this.props}
                        id={this.state.editEventID} 
                    />
                </div>
            )
        }
    }

    render() {

        return (
            this.state.loading
                ?
                <Spinner loading={this.state.loading} />
                :
                <div className="container">
                    <Helmet title="Space Dashboard" meta={[{ name: 'description', content: 'Description of SpaceDashboard' }]} />

                    <header>

                    </header>

                    <main className="spaceDashMain">
                        <div className="spaceDashMenu">
                            <div className="spaceDashMenuItem" onClick={() => this.changeMenu('main')}>Dashboard</div>
                            <div className="spaceDashMenuItem" onClick={() => this.changeMenu('updateSpace')}>Space Information</div>
                            <div className="spaceDashMenuItem" onClick={() => this.changeMenu('updatePhotos')}>Photo Gallery</div>
                            <div className="spaceDashMenuItem" onClick={() => this.changeMenu('editResources')}>Resources</div>
                            <Link to={'/addEvent'}><div className="spaceDashMenuItem">Add an Event</div></Link>
                        </div>
                        {this.renderDashContent()}

                    </main>
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

SpaceDash.contextTypes = {
    router: PropTypes.object
};
