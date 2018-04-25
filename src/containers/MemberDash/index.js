import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Header from '../../components/Header';
import userProfileStyles from "../../variables/styles/tableStyle";

class MemberDash extends React.Component {
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
    const { classes } = this.props;

    return (
      this.loading()
        ?
        <h1>spinner here!</h1>
        :
        <div className={classes.UPcontainer}>
          <Helmet title="UserProfile" meta={[{ name: 'description', content: 'Description of UserProfile' }]} />
          <Header space={this.props.spaceName} />
          <div className={classes.mainProfile}>
            <section className={classes.profileHeader}>
              <img
                src="https://cdn-images-1.medium.com/fit/c/80/80/0*GCZdPPcsr8kr0q8x.png"
                alt="avatar"
                className={classes.avatar}
              />
              <ul className={classes.profileInfo}>
                <li className={classes.profileName}>
                  {user.name}
                </li>
                <li className={classes.profileTitle}>
                  title
                </li>
                <li className={classes.profileSpace}>
                  {space.name}
                </li>
                <li className={classes.profileSocial}>social</li>a
              </ul>
            </section>

            <div className={classes.profileColumns}>
              <aside className={classes.profileColumnLeft}>
                <h3 className={classes.tagHeader}>Skills</h3>

                {skills &&
                  <ul className={classes.profileTagCloud}>
                    {skills.map((skill, index) =>
                      <li key={`${skill.name}${index}`} className={classes.profileTag}> {skill.name} </li>
                    )}
                  </ul>}

                <div className={classes.profileMentorship}>
                </div>

                <div className={classes.profileEvents}>
                  upcoming events

                    {events &&
                    <ul className={classes.profileTagCloud}>
                      {events.map((event, index) =>
                        <li
                          onClick={() => { this.props.history.push(`/EventDetail/${event.id}`) }}
                          key={`${event.title}${index}`}
                          className={classes.EventTag}
                        >
                          {event.title}
                        </li>
                      )}
                    </ul>}
                </div>

              </aside>

              <div className={classes.profileColumnRight}>

                <div className={classes.profileBio}>
                  <h1 className={classes.bioHeader}>About name</h1>
                  <div className={classes.profileBioContent}>
                    <p
                      dangerouslySetInnerHTML={{ __html: user.bio }}
                    >
                    </p>
                  </div>
                </div>

                <aside className={classes.profileAttending}>
                  <h2 className={classes.profileAttendingHeader}>Attending</h2>

                  {upcoming &&
                    <ul className={classes.profileAttendingContent}>a
                      {upcoming.map((attend, index) =>
                        <li
                          onClick={() => { this.props.history.push(`/EventDetail/${attend.id}`) }}
                          key={`${attend.title}${index}`}
                          className={classes.profileAttendingItem}
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
export default withStyles(userProfileStyles)(MemberDash);

MemberDash.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
