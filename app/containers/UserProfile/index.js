/*
 *
 * UserProfile
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
// relative imports
import Header from '../../components/Header';

import './style.css';
import './styleM.css';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      redirect: '',
    };
  }

  // this is to ensure
  componentWillMount() {
    this.props.checkToken(localStorage.getItem('token'));
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.user) {
      this.setState({ redirect: <Redirect to="/" /> });
    }
  }

  render() {
    return (
      <div className="UP-container">
        {this.state.redirect}
        <Helmet title="UserProfile" meta={[{ name: 'description', content: 'Description of UserProfile' }]} />
        <Header />

        <div className="mainProfile">
          <section className="profileHeader">
            <img
              src="https://cdn-images-1.medium.com/fit/c/80/80/0*GCZdPPcsr8kr0q8x.png"
              alt="avatar"
            />

            <ul className="profileInfo">
              <li className="profileName">name</li>
              <li className="profileTitle">title</li>
              <li className="profileSpace">space</li>
              <li className="profileSocial">social</li>
            </ul>
          </section>

          <div className="profileColumns">

            <aside className="profileColumnLeft">
              <ul className="profileTagCloud">
                <li className="profileTag">one</li>
                <li className="profileTag">to</li>
                <li className="profileTag">three</li>
                <li className="profileTag">four</li>
              </ul>

              <div className="profileMentorship">
              </div>

              <div className="profileEvents">
                upcoming events
              </div>

            </aside>

            <div className="profileColumnRight">

              <div className="profileBio">
                <h1>About name</h1>
                <div className="profileBioContent">
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa delectus maiores doloribus, odio ullam explicabo aliquam totam voluptatem velit aperiam. Totam corrupti eaque architecto tempora impedit in excepturi sit debitis.</p>
                </div>
              </div>

              <aside className="profileAttending">
                <h2>Attending</h2>
                <ul className="profileAttendingContent">
                  <li className="profileAttendingItem">one</li>
                  <li className="profileAttendingItem">two</li>
                  <li className="profileAttendingItem">three</li>
                </ul>
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
  user: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  checkToken: PropTypes.func.isRequired,
};
