import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from 'containers/Home';
import About from 'containers/About';
import BookingSystem from 'containers/BookingSystem';
import BusinessSearch from 'containers/BusinessSearch';
import Contact from 'containers/Contact';
import EventDetail from 'containers/EventDetail';
import Events from 'containers/Events';
import Spaces from 'containers/Spaces';
import Sponsors from 'containers/Sponsors';
/* import LearningHome from 'containers/LearningHome';
   import LearningDetail from 'containers/LearningDetail'; */
import LogInSignUp from 'containers/LogInSignUp';
import MemberAcct from 'containers/MemberAcct'; 
import MemberSearch from 'containers/MemberSearch';
import MemberDash from 'containers/MemberDash';
import AddEvent from 'containers/AddEvent';
import SpaceProfile from 'containers/SpaceProfile';
import UserProfile from 'containers/UserProfile';
import KioskSystem from 'containers/KioskSystem';
import LoggedInUserProfile from 'containers/LoggedInUserProfile';
import NotFound from 'containers/NotFound';


export default class App extends Component {

static propTypes = { children: React.PropTypes.node };

  constructor() {
    super();
    this.state = {
      user: '',
      redirect: '',
      loading: true,
    };
  }

  /**
   * @param {string} jwt 
   * @param {Object} [getLoggedInUser] - optional, get logged in user
   * @param {Object} [checkAuth] - optional, ensure user credentials
   */
  checkToken = (token, { getLoggedInUser, checkAuth } ) => {

    if (!token) {
      this.setState({ redirect: <Redirect to='/' /> });
    } else if (token && getLoggedInUser) {
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
        alert(`in checkToken: ${error}`); // eslint-disable-line
      });

    } else if (token && checkAuth) {
      fetch('http://localhost:8000/api/checkAuth', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response =>
        response.json()
      )
      .then(loggedIn => {
        if (loggedIn) {
          this.setState({ loggedIn: true});
        } else {
          this.setState({ redirect: <Redirect to='/' /> });
        }
      })
      .catch(error => {
        alert(`in checkToken: ${error}`); // eslint-disable-line
      });
    } 
  }

  login = (email, password) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);

    fetch('http://localhost:8000/api/login', {
      method: 'post',
      body: data,
    })
    .then(response =>
      response.json()
    )
    .then(json => {
      if (json.token === false) {
        alert('invalid credentials'); // eslint-disable-line
      } else if (json.token !== false) {
        alert('Welcome Back!'); // eslint-disable-line
        localStorage.setItem('token', json.token);
        this.setState({
          user: {
            user: json.user, 
            skills: json.skills,
            space: json.space,
            events: json.events,
            upcoming: json.upcoming,
          },
          redirect: <Redirect to={`/UserProfile/me/${json.user.id}`} />,
          loading: false,
        });
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
            render={() => <Home />}
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
        
        { /*
          <Route
            path="/Learning"
            component={LearningHome}
          />
        */ } 


          <Route
            path="/detail"
            render={() => <LearningDetail />}
          />

          <Route
            path="/Auth"
            render={() => (
              <LogInSignUp
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
                checkToken={this.checkToken} 
                redirect={this.state.redirect}
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
                checkToken={this.checkToken}
                loading={this.state.loading}
              />
            )}
          />

          <Route
            path="/UserProfile"
            render={(props) => (
              <UserProfile
                {...props}
                checkToken={this.checkToken}
                //user={this.state.user}
              />
            )}
          />
          <Route path="/kiosk"
            render={() => <KioskSystem />}
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