import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../Home';
import About from '../About';
import Booking from '../Booking';
import BusinessSearch from '../BusinessSearch';
//import Contact from '../Contact';
import EventDetail from '../EventDetail';
//import Events from '../Events';
import Spaces from '../Spaces';
//import Sponsors from '../Sponsors';
import MemberAcct from '../MemberAcct';
import MemberSearch from '../MemberSearch';
import MemberDash from '../MemberDash';
import AddEvent from '../AddEvent';
import SpaceProfile from '../SpaceProfile';
import UserProfile from '../UserProfile';
import Kiosk from '../Kiosk';
import NotFound from '../NotFound';
import SpaceDash from '../SpaceDash';
import SpaceSignUp from '../SpaceSignUp';
import UserSignUp from '../UserSignUp';
import UserSignIn from '../UserSignIn';

export default class App extends Component {

  state = {

  };



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
            render={(props) => <Booking {...props}/>}
          />

          <Route
            path="/newSpace"
            render={(props) => <SpaceSignUp {...props}/>}
          />

          <Route
            path="/join/:id"
            render={(props) => <UserSignUp {...props}/>}
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
            path="/BusinessSearch"
            render={(props) =>
              <BusinessSearch
                {...props}
              />
            }
          />

          {/*<Route
            path="/Contact"
            render={() => <Contact />}
          />
          */}

          <Route
            path="/event/:id"
            render={(props) => <EventDetail {...props} />}
          />

          {/*<Route
            path="/events"
            render={() => <Events />}
          />*/}

          {/*<Route
            path="/Sponsors"
            component={Sponsors}
          />*/}

          <Route
            path="/Spaces"
            component={Spaces}
          />

          <Route
            path="/account"
            component={MemberAcct}
          />

          <Route
            path="/dashboard"
            component={MemberDash}
          />

          <Route
            path="/MemberSearch"
            render={(props) =>
              <MemberSearch
                {...props}
                getLoggedInUser={this.getLoggedInUser}
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
