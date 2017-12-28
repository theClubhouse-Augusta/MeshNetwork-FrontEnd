import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../Home';
import About from '../About';
import BookingSystem from '../BookingSystem';
import BusinessSearch from '../BusinessSearch';
import Contact from '../Contact';
import EventDetail from '../EventDetail';
import Events from '../Events';
import Spaces from '../Spaces';
import Sponsors from '../Sponsors';
import LogInSignUp from '../LogInSignUp';
import MemberAcct from '../MemberAcct';
import MemberSearch from '../MemberSearch';
import MemberDash from '../MemberDash';
import AddEvent from '../AddEvent';
import SpaceProfile from '../SpaceProfile';
import UserProfile from '../UserProfile';
import KioskSystem from '../KioskSystem';
import LoggedInUserProfile from '../LoggedInUserProfile';
import NotFound from '../NotFound';

export default class App extends Component {

  state = {
    user: '',
    redirect: '',
    loading: true,
  };

  /**
   * @param {string} jwt
   */
  getLoggedInUser = token => {
    if (!token) {
      this.setState({ redirect: <Redirect to='/' /> });
    } else {
      fetch('http://localhost:8000/api/showuser', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response =>
        response.json()
      )
      .then(authUser => {
        if (!authUser.error) {
          this.setState({ user: authUser });
        } else {
          this.setState({
            user: '',
            redirect: <Redirect to='/' />
          });
        }
      })
      .catch(error => {
        alert(`in getLoggedInUSer: ${error}`); // eslint-disable-line
      });
    }
  }


  login = (e, email, password) => {
    e.preventDefault();
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);

    fetch('http://localhost:8000/api/login', {
      method: 'post',
      body: data,
    })
    .then(response => response.json() )
    .then(loggedInUser => {
      if (loggedInUser.token === false || loggedInUser.error) {
        alert('invalid credentials'); // eslint-disable-line
      } else if (loggedInUser.token !== false) {
        localStorage.setItem('token', loggedInUser.token);
        this.setState({
          user: loggedInUser,
          loading: false,
          redirect: <Redirect to={`/UserProfile/me/${loggedInUser['user'].id}`} />
        });
       alert('welcom back');
      }
    })
    .catch(error => {
      alert(`in login: ${error}`); // eslint-disable-line
    })
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
            path="/Booking"
            render={() => <BookingSystem />}
          />

          <Route
            path="/BusinessSearch"
            render={(props) =>
              <BusinessSearch
                {...props}
              />
            }
          />

          <Route
            path="/Contact"
            render={() => <Contact />}
          />

          <Route
            path="/EventDetail"
            render={(props) => <EventDetail {...props} />}
          />

          <Route
            path="/Events"
            render={() => <Events />}
          />

          <Route
            path="/Sponsors"
            component={Sponsors}
          />

          <Route
            path="/Spaces"
            component={Spaces}
          />

          <Route
            path="/Auth"
            render={(props) => (
              <LogInSignUp
                {...props}
                login={this.login}
                redirect={this.state.redirect}
              />
            )}
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
            path="/SpaceProfile"
            render={(props) => <SpaceProfile {...props} />}
          />

          <Route
            path="/UserProfile/me"
            render={(props) => (
              <LoggedInUserProfile
                {...props}
                user={this.state.user}
                getLoggedInUser={this.getLoggedInUser}
                loading={this.state.loading}
              />
            )}
          />

          <Route
            path="/UserProfile"
            render={(props) => (
              <UserProfile
                {...props}
                //user={this.state.user}
              />
            )}
          />
          <Route path="/kiosk"
            render={(props) => <KioskSystem {...props} />}
          />


          <Route
            path="/clubhouse"
            component={() => { window.location = 'https://theclubhou.se'; }}
          />

          <Route component={NotFound} />
        </Switch>
    );
  }
}
