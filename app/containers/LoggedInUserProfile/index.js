/*
 *
 * UserProfile
 *
 */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
// relative imports
import { Skills, Events, Attending } from 'components/UserProfileAssets';
import Header from 'components/Header';

import './style.css';
import './styleM.css';

export default class LoggedInUserProfile extends Component {
  state = {
    user: this.props.user['user'], // eslint-disable-line
    skills: this.props.user['skills'],
    space: this.props.user['space'],
    events: this.props.user['events'],
    upcoming: this.props.user['upcoming'],
    loading: this.props.loading,
  };

  path = this.props.location.pathname.split('/');
  userID = this.path[this.path.length - 1];

  token = localStorage.getItem('token');

  componentDidMount() {
    /**
     * url path must end with numeric character
     * invalid: /User/Profile/me/
     * valid: /UserProfile/me/  
    */
    if ((isNaN(this.userID) && !this.state.user)) {
      this.props.history.push('/');
    }

    if (this.token === null) {
      this.props.history.push('/');
    } 
    else if (typeof this.props.user['user'] !== 'object') {
      console.log(JSON.stringify(this.props.user));
      this.props.getLoggedInUser(localStorage['token']);
    }
  }

  componentWillReceiveProps(nextProps) {
    // url/path/id must match loggedInUser.id
    if (!nextProps.user) {
      this.props.history.push('/');
    } else if (nextProps.user.user.id != this.userID) { // eslint-disable-line
      this.props.history.push('/');
    } else {
      this.setState({ 
        user: nextProps.user.user, 
        skills: nextProps.user.skills,
        space: nextProps.user.space,
        events: nextProps.user.events,
        upcoming: nextProps.user.upcoming,
      }, () => {
        this.setState({	loading: false });
      });
    }
  }

  // prevent profile from partiallally rendering
  // for non-authenticated users
  loading = () => {
    if (this.state.loading) {
      return true;
    } else {
      return  false;
    }
  }

  render() {
    const user = this.state.user;
    const skills = this.state.skills;
    const space = this.state.space; 
    const events = this.state.events; 
    const upcoming = this.state.upcoming;

    return (
      this.loading()
        ?
          <h1>
            spinner here!
          </h1>
        :
          <div className='UP-container'>
            <Helmet title="UserProfile" meta={[{ name: 'description', content: 'Description of UserProfile' }]} />
            <Header />
            <div className="mainProfile">

              <section className="profileHeader">
                <img
                  src="https://cdn-images-1.medium.com/fit/c/80/80/0*GCZdPPcsr8kr0q8x.png"
                  alt="avatar"
                />

                <ul className="profileInfo">

                  <li className="profileName">
                    {user.name}
                  </li>

                  <li className="profileTitle">
                    {user.title}
                  </li>

                  <li className="profileSpace">
                    {space.name}
                  </li>

                  <li className="profileSocial">
                    social
                  </li>
                </ul>
              </section>

              <div className="profileColumns">

                <aside className="profileColumnLeft">
                  <h3 style={{textAlign:'center'}}>Skills</h3>
                  {this.state.skills && <Skills skills={skills} />}

                  <div className="profileMentorship">
                  </div>

                  <div className="profileEvents">
                    upcoming events
                    {this.state.events && <Events history={this.props.history} events={events} />}
                  </div>

                </aside>

                <div className="profileColumnRight">

                  <div className="profileBio">
                    <h1>About name</h1>
                    <div className="profileBioContent">
                      <p>
                        {user.bio}
                      </p>
                    </div>
                  </div>

                  <aside className="profileAttending">
                    <h2>Attending</h2>
                    {this.state.upcoming && <Attending history={this.props.history} attending={upcoming} />}
                  </aside>

                </div>
              </div>
            </div>

            <footer>

            </footer>

          </div>
    );
  }
}

LoggedInUserProfile.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  getLoggedInUser: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};
