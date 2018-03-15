import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncComponent from '../../components/AsyncComponent';
import authenticate from '../../utils/Authenticate';

const Home = asyncComponent(() => import('../Home'));
const About = asyncComponent(() => import('../About'));
const Booking = asyncComponent(() => import('../Booking'));
const EventDetail = asyncComponent(() => import('../EventDetail'));
const Spaces = asyncComponent(() => import('../Spaces'));
const MemberAcct = asyncComponent(() => import('../MemberAcct'));
const MemberSearch = asyncComponent(() => import('../MemberSearch'));
const AddEvent = asyncComponent(() => import('../AddEvent'));
const SpaceProfile = asyncComponent(() => import('../SpaceProfile'));
const UserProfile = asyncComponent(() => import('../UserProfile'));
const Kiosk = asyncComponent(() => import('../Kiosk'));
const NotFound = asyncComponent(() => import('../NotFound'));
const SpaceDash = asyncComponent(() => import('../SpaceDash'));
const SpaceSignUp = asyncComponent(() => import('../SpaceSignUp'));
const UserSignUp = asyncComponent(() => import('../Checkout'));
const UserSignIn = asyncComponent(() => import('../UserSignIn'));

const Discover = asyncComponent(() => import('../Discover'));
const Ask = asyncComponent(() => import('../Ask'));
const Replies = asyncComponent(() => import('../Replies'));
const Detail = asyncComponent(() => import('../Detail'));
const Team = asyncComponent(() => import('..//Team'));
const Teams = asyncComponent(() => import('../Teams'));

const LMS = asyncComponent(() => import('containers/LMS'));
const Courses = asyncComponent(() => import('containers/Courses'));
const Course = asyncComponent(() => import('containers/Course'));
const CourseInfo = asyncComponent(() => import('containers/CourseInfo'));
const NewCourse = asyncComponent(() => import('containers/NewCourse'));
const Lessons = asyncComponent(() => import('containers/Lessons'));
const Enroll = asyncComponent(() => import('containers/Enroll'));
const LMSDash = asyncComponent(() => import('../LMSDash'));
const LMSReport = asyncComponent(() => import('containers/StudentReport'));

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            token: localStorage.getItem('token'),
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '',
            spaceName: '',
        };
    }

    async componentDidMount() {
        let authorized;
        try {
            authorized = await authenticate(localStorage['token']);
        } finally {
            if (authorized !== undefined) {
                if (!authorized.error && authorized) {
                    this.getSpaceName(this.state.user.spaceID, this.state.token);
                } else if (authorized.error) {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                }
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                this.setState(() => ({ token: '' }))
                this.setState(() => ({ user: '' }))
            }
        }
    };

    getSpaceName = (spaceID, token) => {
        fetch(`https://innovationmesh.com/api/spacename/${spaceID}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(({ spaceName, error }) => {
                if (spaceName) {
                    this.setState(() => ({ spaceName }));
                } else if (error) {
                    //
                }
            })
            .catch(error => {
                // 
            })
    }
    render() {
        return (
            <Switch>
                <Route
                    exact path="/" // eslint-disable-line
                    render={props =>
                        <Home
                            {...props}
                            spaceName={this.state.spaceName}
                        />
                    }
                />

                <Route
                    path="/About"
                    render={() =>
                        <About
                            spaceName={this.state.spaceName}
                        />
                    }
                />


                <Route
                    path="/booking/:id"
                    render={(props) =>
                        <Booking
                            {...props}
                            spaceName={this.state.spaceName}
                        />
                    }
                />

                <Route
                    path="/newSpace"
                    render={(props) =>
                        <SpaceSignUp
                            {...props}
                            spaceName={this.state.spaceName}
                        />
                    }
                />

                <Route
                    path="/join/:id"
                    render={(props) =>
                        <UserSignUp
                            {...props}
                            spaceName={this.state.spaceName}
                        />
                    }
                />

                <Route
                    path="/signIn"
                    render={(props) =>
                        <UserSignIn
                            {...props}
                            spaceName={this.state.spaceName}
                        />
                    }
                />

                <Route
                    path="/event/:id"
                    render={(props) =>
                        <EventDetail
                            {...props}
                            spaceName={this.state.spaceName}
                        />
                    }
                />

                <Route
                    path="/Spaces"
                    component={Spaces}
                    spaceName={this.state.spaceName}
                />

                <Route
                    path="/account"
                    render={(props) =>
                        <MemberAcct
                            {...props}
                            spaceName={this.state.spaceName}
                        />
                    }
                />

                <Route
                    path="/members"
                    render={(props) =>
                        <MemberSearch
                            {...props}
                            spaceName={this.state.spaceName}
                        />
                    }
                />

                <Route
                    path="/AddEvent"
                    render={(props) =>
                        <AddEvent
                            {...props}
                            spaceName={this.state.spaceName}
                        />
                    }
                />

                <Route
                    path="/space/:id"
                    render={(props) =>
                        <SpaceProfile
                            {...props}
                            spaceName={this.props.spaceName}
                        />
                    }
                />

                <Route
                    path="/user/:id"
                    render={(props) => (
                        <UserProfile
                            {...props}
                            spaceName={this.state.spaceName}
                        />
                    )}
                />
                <Route path="/kiosk/:id"
                    render={(props) => <Kiosk {...props} spaceName={this.state.spaceName} />}
                />

                <Route
                    path="/spacedash/:id"
                    render={(props) =>
                        <SpaceDash
                            {...props}
                            spaceName={this.state.spaceName}
                        />
                    }
                />

                {/*<Route exact path='/Challenges' render={() => <Challenges app={this} />} />*/}
                <Route
                    exact path='/Challenges'
                    render={(props) =>
                        <Discover
                            {...props}
                            app={this}
                            spaceName={this.state.spaceName}
                        />
                    }
                />

                <Route
                    path='/Challenges/Category/:id'
                    render={(props) =>
                        <Discover
                            {...props}
                            app={this}
                            spaceName={this.state.spaceName}
                        />
                    }
                />
                <Route
                    path='/Challenges/Challenge/:id'
                    render={(props) =>
                        <Detail
                            {...props}
                            spaceName={this.state.spaceName}
                        />
                    }
                />

                <Route
                    exact path='/Challenges/Ask'
                    render={() =>
                        <Ask
                            app={this}
                            spaceName={this.state.spaceName}
                        />
                    }
                />
                <Route
                    path='/Challenges/Ask/:id'
                    render={(props) =>
                        <Replies {...props}
                            app={this}
                            spaceName={this.state.spaceName}
                        />
                    }
                />
                <Route
                    path='/Challenges/Teams'
                    render={() =>
                        <Teams
                            app={this}
                            spaceName={this.state.spaceName}
                        />
                    }
                />
                <Route
                    path='/Challenges/Team/:id'
                    render={(props) =>
                        <Team
                            {...props}
                            app={this}
                            spaceName={this.state.spaceName}
                        />
                    }
                />

                <Route
                    exact path='/LMS'
                    render={(props) =>
                        <LMS
                            {...props}
                            app={this}
                            spaceName={this.state.spaceName}
                        />
                    }
                />
                <Route
                    path='/LMS/Courses'
                    render={(props) =>
                        <Courses
                            {...props}
                            app={this}
                            spaceName={this.state.spaceName}
                        />
                    }
                />
                <Route
                    path='/LMS/Course/:id'
                    render={(props) =>
                        <Course
                            {...props}
                            app={this}
                            spaceName={this.state.spaceName}
                        />
                    }
                />
                <Route
                    path='/LMS/CourseInfo/:id/:uid'
                    render={(props) =>
                        <CourseInfo
                            {...props}
                            app={this}
                            spaceName={this.state.spaceName}
                        />
                    }
                />
                <Route
                    path='/LMS/NewCourse'
                    render={(props) =>
                        <NewCourse
                            {...props}
                            app={this}
                            spaceName={this.state.spaceName}
                        />
                    }
                />
                <Route
                    exact path='/LMS/Lesson/:id/:uid'
                    render={(props) =>
                        <Lessons
                            {...props}
                            app={this}
                            spaceName={this.state.spaceName}
                        />
                    }
                />

                <Route
                    path='/LMS/Report/:id/:uid'
                    render={(props) =>
                        <Lessons
                            {...props}
                            app={this}
                            spaceName={this.state.spaceName}
                        />
                    }
                />

                <Route
                    path='/LMS/Lesson/:id/:lid/:uid'
                    render={(props) =>
                        <Lessons
                            {...props}
                            app={this}
                            spaceName={this.state.spaceName}
                        />
                    }
                />
                <Route path='/LMS/Update/:id' render={(props) => <NewCourse {...props} app={this} spaceName={this.state.spaceName} />} />
                <Route
                    path='/LMS/Enroll/:id'
                    render={(props) =>
                        <Enroll
                            {...props}
                            app={this}
                            spaceName={this.state.spaceName}
                        />
                    }
                />
                <Route
                    path='/LMS/MyLMS'
                    render={(props) =>
                        <LMSDash
                            {...props}
                            app={this}
                            spaceName={this.state.spaceName}
                        />
                    }
                />

                <Route
                    render={props =>
                        <NotFound
                            {...props}
                            spaceName={this.state.spaceName}
                        />
                    }
                />
            </Switch>
        );
    }
}
