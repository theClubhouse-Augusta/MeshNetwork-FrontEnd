import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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
import LearningHome from 'containers/LearningHome';
import LearningDetail from 'containers/LearningDetail';
import LogInSignUp from 'containers/LogInSignUp';
import MemberAcct from 'containers/MemberAcct'; 
import MemberSearch from 'containers/MemberSearch';
import AddEvent from 'containers/AddEvent';
import AddCompEvent from 'containers/AddCompEvent';
import SpaceProfile from 'containers/SpaceProfile';
import UserProfile from 'containers/UserProfile';
import NotFound from 'containers/NotFound';
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      redirect: '',
    };
  }

  static propTypes = { children: React.PropTypes.node,};
  static childContextTypes = { muiTheme: React.PropTypes.object };
  getChildContext() {var theme = getMuiTheme(); return { muiTheme: theme }};
  

  checkToken = (token) => {
    if (token) {
      fetch('http://localhost:8000/api/showuser', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) =>
        response.json()
      )
      .then((authUser) => {
        if (!authUser.error) {
          this.setState({ user: authUser });
        } else {
          this.setState({ user: '' });
        }
      })
      .catch((error) => {
        alert(`error: ${error}`); // eslint-disable-line
      });
    } else {
      this.setState({ user: '' });
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
    .then((response) =>
      response.json()
    )
    .then((json) => {
      if (json.error) {
        alert(json.error); // eslint-disable-line
      } else if (json.token === false) {
        alert('invalid credentials'); // eslint-disable-line
      } else if (json.token !== false) {
        alert('Welcome Back!'); // eslint-disable-line
        localStorage.setItem('token', json.token);
        this.setState({
          user: json.user,
          redirect: <Redirect to="/UserProfile" />,
        });
      }
    });
  }

  render() {
    return (
      <MuiThemeProvider>
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
            render={() => <BusinessSearch />}
          />

          <Route
            path="/Contact"
            render={() => <Contact />}
          />

          <Route
            path="/EventDetail"
            render={() => <EventDetail />}
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
            path="/Learning"
            component={LearningHome}
          />

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
            path="/MemberSearch"
            render={() => (
              <MemberSearch checkToken={this.checkToken} />
            )}
          />

          <Route
            path="/AddEvent"
            render={() => <AddEvent />}
          />

          <Route
            path="/AddCompEvent"
            render={() => <AddCompEvent />}
          />

          <Route
            path="/SpaceProfile"
            render={() => <SpaceProfile />}
          />

          <Route
            path="/UserProfile"
            render={() => (
              <UserProfile
                user={this.state.user}
                checkToken={this.checkToken}
              />
            )}
          />

          <Route
            path="/clubhouse"
            component={() => { window.location = 'https://theclubhou.se'; }}
          />

          <Route component={NotFound} />
        </Switch>
      </MuiThemeProvider>
    );
  }
}
