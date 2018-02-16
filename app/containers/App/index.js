import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncComponent from '../../components/AsyncComponent';

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

// const Challenges = asyncComponent(() => import('../Challenges'));
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
const LMSDash = asyncComponent(() => import('containers/LMSDash'));

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            token: localStorage.getItem('token'),
            user: JSON.parse(localStorage.getItem('user')),
        };
    }

    render() {
        return (
            <Switch>
                <Route
                    exact path="/" // eslint-disable-line
                    render={props => <Home {...props} />}
                />

                <Route
                    path="/About"
                    render={() => <About />}
                />

                <Route
                    path="/booking/:id"
                    render={(props) => <Booking {...props} />}
                />

                <Route
                    path="/newSpace"
                    render={(props) => <SpaceSignUp {...props} />}
                />

                <Route
                    path="/join/:id"
                    render={(props) => <UserSignUp {...props} />}
                />

                <Route
                    path="/signIn"
                    render={(props) =>
                        <UserSignIn
                            {...props}
                        />
                    }
                />

                <Route
                    path="/event/:id"
                    render={(props) => <EventDetail {...props} />}
                />

                <Route
                    path="/Spaces"
                    component={Spaces}
                />

                <Route
                    path="/account"
                    render={(props) => <MemberAcct {...props} />}
                />

                <Route
                    path="/members"
                    render={(props) =>
                        <MemberSearch
                            {...props}
                        />
                    }
                />

                <Route
                    path="/AddEvent"
                    render={(props) =>
                        <AddEvent
                            {...props}
                        />
                    }
                />

                <Route
                    path="/space/:id"
                    render={(props) => <SpaceProfile {...props} />}
                />

                <Route
                    path="/user/:id"
                    render={(props) => (
                        <UserProfile
                            {...props}
                        />
                    )}
                />
                <Route path="/kiosk/:id"
                    render={(props) => <Kiosk {...props} />}
                />

                <Route
                    path="/spacedash/:id"
                    render={(props) => <SpaceDash {...props} />}
                />

                {/*<Route exact path='/Challenges' render={() => <Challenges app={this} />} />*/}
                <Route exact path='/Challenges' render={(props) => <Discover {...props} app={this} />} />
                <Route path='/Challenges/Category/:id' render={(props) => <Discover {...props} app={this} />} />
                <Route path='/Challenges/Challenge/:id' render={(props) => <Detail {...props} />} />
                <Route exact path='/Challenges/Ask' render={() => <Ask app={this} />} />
                <Route path='/Challenges/Ask/:id' render={(props) => <Replies {...props} app={this} />} />
                <Route path='/Challenges/Teams' render={() => <Teams app={this} />} />
                <Route path='/Challenges/Team/:id' render={(props) => <Team {...props} app={this} />} />

                <Route exact path='/LMS' render={(props) => <LMS {...props} app={this}/> } />
                <Route path='/LMS/Courses' render={(props) => <Courses {...props} app={this}/> } />
                <Route path='/LMS/Course/:id' render={(props) => <Course {...props} app={this}/> } />
                <Route path='/LMS/CourseInfo/:id' render={(props) => <CourseInfo {...props} app={this}/> } />
                <Route path='/LMS/NewCourse' render={(props) => <NewCourse {...props} app={this}/> } />
                <Route exact path='/LMS/Lesson/:id' render={(props) => <Lessons {...props} app={this}/> } />
                <Route path='/LMS/Lesson/:id/:lid' render={(props) => <Lessons {...props}  app={this}/>}/>
                {/* <Route path='/LMS/Update/:id' render={(props) => <New {...props}  app={this}/>}/> */}
                <Route path='/LMS/Enroll/:id' render={(props) => <Enroll {...props}  app={this}/>}/>
                <Route path='/LMS/MyLMS' render={(props) => <LMSDash {...props}  app={this}/>}/>

                <Route component={NotFound} />
            </Switch>
        );
    }
}
