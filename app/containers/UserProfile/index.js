/*
 *
 * UserProfile
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class UserProfile extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      token:sessionStorage.getItem("token"),
      profile:""
    }
  }

  componetWillMount() {
    //this.getProfile();
  }

  getProfile = () => {
    fetch("", {
      method:'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        profile:json.profile
      })
    }.bind(this))
  }

  render() {
    return (
      <div className="container">
        <Helmet title="UserProfile" meta={[ { name: 'description', content: 'Description of UserProfile' }]}/>
        <header>

        </header>

        <main className="mainProfile">
          <div className="profileHeader">
            <div className="profileAvatar"></div>
            <div className="profileInfo">
              <div className="profileName"></div>
              <div className="profileTitle"></div>
              <div className="profileSpace"></div>
              <div className="profileSocial"></div>
            </div>
          </div>
          <div className="profileColumns">
            <div className="profileColumnLeft">
              <div className="profileTagCloud">
                <div className="profileTag"></div>
                <div className="profileTag"></div>
                <div className="profileTag"></div>
                <div className="profileTag"></div>
              </div>
              <div className="profileMentorship"></div>
              <div className="profileEvents"></div>
            </div>
            <div className="profileColumnRight">
              <div className="profileBio">
                <div className="profileBioHeader"></div>
                <div className="profileBioContent"></div>
              </div>
              <div className="profileAttending">
                <div className="profileAttendingHeader"></div>
                <div className="profileAttendingContent">
                  <div className="profileAttendingItem"></div>
                  <div className="profileAttendingItem"></div>
                  <div className="profileAttendingItem"></div>
                </div>
              </div>
            </div>

          </div>
        </main>

        <footer>

        </footer>
      </div>
    );
  }
}

UserProfile.contextTypes = {
  router: React.PropTypes.object
};
