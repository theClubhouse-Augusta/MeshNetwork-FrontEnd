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
const MemberDash = asyncComponent(() => import('../MemberDash'));
const AddEvent = asyncComponent(() => import('../AddEvent'));
const SpaceProfile = asyncComponent(() => import('../SpaceProfile'));
const UserProfile = asyncComponent(() => import('../UserProfile'));
const Kiosk = asyncComponent(() => import('../Kiosk'));
const NotFound = asyncComponent(() => import('../NotFound'));
const SpaceDash = asyncComponent(() => import('../SpaceDash'));
const SpaceSignUp = asyncComponent(() => import('../SpaceSignUp'));
const UserSignUp = asyncComponent(() => import('../Checkout'));
const UserSignIn = asyncComponent(() => import('../UserSignIn'));

export default class App extends Component {
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
                    path="/account/:id"
                    render={(props) => <MemberAcct {...props} />}
                />

                <Route
                    path="/dashboard"
                    component={MemberDash}
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

                <Route component={NotFound} />
            </Switch>
        );
    }
}
