/*
 *
 * Events
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class Events extends React.PureComponent {
  

  render() {
    return (
      <div className="container">
        <Helmet title="Events" meta={[ { name: 'description', content: 'Description of Events' }]}/>

        <header>

        </header>

        <main>
          <div className="profileHeader">
            <div className="profileAvatar"></div>
            <div className="profileInfo">
              <div className="profileName"></div>
              <div className="profileTitle"></div>
              <div className="profileSpace"></div>
            </div>
          </div>
          <div className="profileColumns">
            <div className="profileColumnLeft">
              <div className="profileTagCloud"></div>
              <div className="profileMentorship"></div>
              <div className="profileEvents"></div>
            </div>
            <div className="profileColumnRight">
              <div className="profileLinks"></div>
              <div className="profileSocial"></div>
              <div className="profileBio"></div>
              <div className="profileAttending"></div>
            </div>

          </div>
        </main>

        <footer>

        </footer>

      </div>
    );
  }
}

Events.contextTypes = {
  router: React.PropTypes.object
};
