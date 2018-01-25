
/*
 *
 * SpaceDash
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import SpaceInformation from '../../components/SpaceInformation';

import { AppearanceByMonthYear } from '../../components/DataViz/AppearanceByMonthYear';
import { AllAppearances } from '../../components/DataViz/AllAppearances';
import { AllJoins } from '../../components/DataViz/AllJoins';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import FlatButton from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';

import Header from 'components/Header';
import Spinner from '../../components/Spinner';
import authenticate from '../../utils/Authenticate';

import './style.css';
import './styleM.css';

const getUsersAPI = 'https://innovationmesh.com/api/users/';

const spaceInfoAPI = 'https://innovationmesh.com/api/workspace/';

export default class SpaceDash extends React.PureComponent {
    state = {
        token: localStorage.getItem('token'),
        activeMenu: 0,
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
    }
    async componentDidMount() {
        const authorized = await authenticate(localStorage['token'], this.props.history);
        if (!authorized.error) {
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
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                this.setState({
                    spaceUsers: json
                });
            }.bind(this))
    }

    loadSpaceDescription = () => {
        fetch(spaceInfoAPI + this.props.match.params.id, {
            method: 'GET'
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                this.setState({
                    spaceDescription: json.description,
                    spaceID: json.id
                }, function () {
                    this.loadSpaceUsers(json.id);
                    this.getSpaceStats(json.id);
                    this.getSpaceEvents(json.id);
                    this.getPhotoGallery(json.id);
                    this.getResources(json.id);
                })
            }.bind(this))
    }

    getSpaceStats = (id) => {
        fetch('https://innovationmesh.com/api/space/metrics/' + id, {
            method: 'GET',
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                this.setState({
                    memberCount: json.memberCount,
                    eventCount: json.eventCount,
                    checkinCount: json.checkinCount,
                    thisMonthCheckIns: json.thisMonthCheckIns,
                })
            }.bind(this))
    }

    getSpaceEvents = (id) => {
        fetch('https://innovationmesh.com/api/events/' + id, {
            method: 'GET',
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                this.setState({
                    spaceEvents: json.data
                })
            }.bind(this))
    }

    changeMenu = (id) => {
        this.setState({
            activeMenu: id
        })
    }

    getPhotoGallery = (id) => {
        fetch('https://innovationmesh.com/api/photos/' + id, {
            method: 'GET',
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                this.setState({
                    photoGallery: json.photos
                })
            }.bind(this))
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
        let _this = this;
        let photoGallery = this.state.photoGallery;
        let data = new FormData();

        data.append('spaceID', this.state.spaceID);
        data.append('photo', file);
        fetch('https://innovationmesh.com/api/photos', {
            method: 'POST',
            body: data,
            headers: { 'Authorization': 'Bearer ' + this.state.token }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                if (json.error) {
                    _this.showSnack(json.error);
                }
                else if (json.success) {
                    _this.showSnack(json.success);
                    photoGallery.push(json.photo);
                    _this.setState({
                        photoGallery: photoGallery
                    })
                }
            }.bind(this))
    }

    deletePhoto = (id, i, spaceID) => {
        let photoGallery = this.state.photoGallery;
        console.log(i);
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
                    this.setState({ photoGallery: photoGallery }, function () {
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

    getResources = (id) => {
        fetch('https://innovationmesh.com/api/resources/' + id, {
            method: 'GET',
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                this.setState({
                    resources: json
                })
            }.bind(this))
    };

    storeResource = () => {
        let _this = this;
        let resources = this.state.resources;
        let data = new FormData();
        data.append('spaceID', this.state.spaceID);
        data.append('resourceName', this.state.resourceName);
        data.append('resourceEmail', this.state.resourceEmail);

        fetch('https://innovationmesh.com/api/resource', {
            method: 'POST',
            body: data,
            headers: { 'Authorization': 'Bearer ' + this.state.token }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                if (json.error) {
                    _this.showSnack(json.error);
                }
                else if (json.success) {
                    _this.showSnack(json.success);
                    resources.push(json.resource);
                    this.setState({
                        resources: resources,
                        resourceName: "",
                        resourceEmail: ""
                    })
                }
            }.bind(this))
    };

    deleteResource = (id, i) => {
        let _this = this;
        let resource = this.state.resources;

        fetch('https://innovationmesh.com/api/resource/' + id, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.state.token }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                if (json.error) {
                    _this.showSnack(json.error);
                }
                else if (json.success) {
                    _this.showSnack(json.success);
                    resource.splice(i, 1);
                    this.setState({
                        resource: resource
                    })
                }
            }.bind(this))
    }


    renderDashContent = () => {
        if (this.state.activeMenu === 0) {
            return (
                <div className="spaceDashContent">
                    <Header />
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
                        <h2 className="spaceDashDataTitleGraph">Check-ins range</h2>
                        <AppearanceByMonthYear {...this.props} />

                        <div className="spaceDashTotalGraphs">
                            <div className="spaceDashTotalGraphsSection">

                                <h2 className="spaceDashDataTitleGraph">Total Check-ins</h2>
                                <AllAppearances height={600} width={600} {...this.props} />
                            </div>

                            <div className="spaceDashTotalGraphsSection">
                                <div className="spaceDashDataTitleGraph">member sign-ups</div>
                                <AllJoins height={600} width={600} {...this.props} />
                            </div>

                        </div>
                    </div>
                    <div className="spaceDashOptions">
                        <Link to={'/addEvent'} style={{ width: '10%', margin: '10px' }}><FlatButton style={{ width: '100%', background: '#ff4d58', paddingTop: '10px', paddingBottom: '10px', color: '#FFFFFF', fontWeight: 'bold' }}>Add an Event</FlatButton></Link>
                    </div>
                    <div className="spaceDashColumnsContainer">
                        <div className="spaceDashColumn">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Full Name</TableCell>
                                        <TableCell>E-mail</TableCell>
                                        <TableCell>Title</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.spaceUsers.map((user, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.title}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="spaceDashColumn">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Event Name</TableCell>
                                        <TableCell>Location</TableCell>
                                        <TableCell>Start Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.spaceEvents.map((e, i) => (
                                        <TableRow>
                                            <TableCell>{e.title}</TableCell>
                                            <TableCell>{e.space.city}, {e.space.state}</TableCell>
                                            <TableCell>{e.date.start}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.activeMenu === 1) {
            return (
                <div className="spaceDashContent">
                    <Header />
                    <SpaceInformation id={this.props.match.params.id} spaceID={this.state.spaceID} description={this.state.spaceDescription} />
                </div>
            )
        }
        else if (this.state.activeMenu === 2) {
            return (
                <div className="spaceDashContent">
                    <Header />
                    <div className="spaceDashOptions">
                        <label htmlFor="photo-file" style={{ width: '10%', margin: '10px' }}>
                            <div style={{ fontFamily: 'Noto Sans', textTransform: 'uppercase', fontSize: '0.9em', textAlign: 'center', width: '100%', background: '#ff4d58', paddingTop: '10px', paddingBottom: '10px', color: '#FFFFFF', fontWeight: 'bold' }} >Upload Photo</div>
                        </label>
                        <input type="file" accept="image/*" onChange={this.handleGalleryPhoto} id="photo-file" style={{ display: 'none' }} />
                    </div>
                    <div className="spaceDashPhotoGallery">
                        {this.state.photoGallery.map((photo, i) => (
                            <React.Fragment key={`gallery${i}`} >
                                <div className="spaceDashPhotoBlock">
                                    <img src={photo.photoThumbnail} />

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
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )
        }
        else if (this.state.activeMenu === 3) {
            return (
                <div className="spaceDashContent">
                    <Header />
                    <div className="spaceDashOptions">
                        <TextField value={this.state.resourceName} onChange={this.handleResourceName} label="Resource Name" style={{ marginRight: '10px' }} />
                        <TextField value={this.state.resourceEmail} onChange={this.handleResourceEmail} label="Resource E-mail" style={{ marginRight: '10px' }} />
                        <label style={{ width: '10%', margin: '10px' }}>
                            <div onClick={this.storeResource} style={{ fontFamily: 'Noto Sans', textTransform: 'uppercase', fontSize: '0.9em', textAlign: 'center', width: '100%', background: '#ff4d58', paddingTop: '10px', paddingBottom: '10px', color: '#FFFFFF', fontWeight: 'bold', cursor: 'pointer' }} >Add Resource</div>
                        </label>
                    </div>
                    <div className="spaceDashResources">
                        {this.state.resources.map((res, i) => (
                            <div className="spaceDashResourceBlock">
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
                            <div className="spaceDashMenuItem" onClick={() => this.changeMenu(0)}>Dashboard</div>
                            <div className="spaceDashMenuItem" onClick={() => this.changeMenu(1)}>Space Information</div>
                            <div className="spaceDashMenuItem" onClick={() => this.changeMenu(2)}>Photo Gallery</div>
                            <div className="spaceDashMenuItem" onClick={() => this.changeMenu(3)}>Resources</div>
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
