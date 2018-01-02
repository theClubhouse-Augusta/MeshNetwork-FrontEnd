/*
 *
 * UserProfile
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from 'components/Header';

import './style.css';
import './styleM.css';

export default class UserProfile extends React.Component {
  state = {
    user: '',
    skills: '',
    space: '',
    events: '',
    upcoming: '',
    loading: true,
  };
  path = this.props.location.pathname.split('/');
  userID = this.path[this.path.length - 1];
  token = localStorage['token']

  componentWillMount() {
    if (isNaN(this.userID)) {
      this.props.history.push('/');
    } else {
      this.loadUser(this.token);
    }
  }

  componentDidMount() {
  }

  loadUser = token => {
    if (!token) {
      this.props.history.push('/');
    }
    fetch(`http://localhost:8000/api/user/${this.userID}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => response.json())
    .then(getUser => {
      if (!getUser.error) {
        this.setState({
          user: getUser.user,
          skills: getUser.skills,
          space: getUser.space,
          events: getUser.events,
          upcoming: getUser.upcoming,
          loading: false,
       });
      } else if (getUser.error) {
        this.props.history.push('/');
      }
    })
    .catch(error => {
      alert(`error!: ${error.message}`);
    });
  }

  loading = () => this.state.loading;

  render() {

    const {
      user, 
      skills, 
      space,
      events, 
      upcoming, 
    } = this.state;

    return (
      this.loading()
        ?
          <h1>spinner here!</h1>
        :
          <div className={"UP-container"}>
            <Helmet title="UserProfile" meta={[{ name: 'description', content: 'Description of UserProfile' }]} />
            <Header />
            <div className="mainProfile">
              <section className="profileHeader">
                {user.avatar && <img src={user.avatar} alt="avatar" />}
                {!user.avatar && <div className="profilePicturePreview" />}
                <ul className="profileInfo">
                  <li className="profileName">{user.name}</li>
                  <li className="profileTitle">{user.title ? user.title : 'title:'}</li>
                  <li className="profileSpace">{space.name}</li>
                  <li className="profileSocial">social</li>
                </ul>
              </section>

              <div className="profileColumns">

                <aside className="profileColumnLeft">

                  <h3 style={{textAlign:'center'}}>Skills</h3>

                  {skills && 
                  <ul className="profileTagCloud">
                    {skills.map((skill, index) => 
                      <li key={`${skill.name}${index}`} className="profileTag"> {skill.name} </li> 
                  )}
                  </ul>}

                  <div className="profileMentorship">
                  </div>

                  <div className="profileEvents">
                    upcoming events

                    {events && 
                    <ul className="profileTagCloud">
                      {events.map((event, index) => 
                        <li 
                          onClick={() => {this.props.history.push(`/EventDetail/${event.id}`)}}
                          key={`${event.title}${index}`} 
                          className="EventTag"
                        >
                          {event.title}
                        </li>
                      )}
                    </ul>}
                  </div>

                </aside>

                <div className="profileColumnRight">

                  <div className="profileBio">
                    {!!user.name && <h1>About {user.name}</h1>}
                    {!!!user.name && <About />}
                    {/*<div className="profileBioContent">
                      <p
                        dangerouslySetInnerHTML={{__html: user.bio}}
                      >
                      </p>
                    </div>*/}
                  </div>

                  <aside className="profileAttending">
                    <h2>Attending</h2>

                    {upcoming && 
                    <ul className="profileAttendingContent">
                      {upcoming.map((attend, index) => 
                        <li 
                          onClick={() => {this.props.history.push(`/EventDetail/${attend.id}`)}}
                          key={`${attend.title}${index}`} 
                          className="profileAttendingItem"
                        >
                          {attend.title}
                        </li>
                      )}
                    </ul>}

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

UserProfile.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
  