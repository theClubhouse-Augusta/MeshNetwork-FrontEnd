/*
 *
 * About
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class About extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="About" meta={[ { name: 'description', content: 'Description of About' }]}/>

        <header>

        </header>

        <main className="mainProfile">
          <div className="aboutColumns">
            <div className="aboutLeft">
              <div className="aboutTextHeader"></div>
              <div className="aboutContent"></div>
              <div className="aboutTextHeader"></div>
              <div className="aboutFaq"></div>
            </div>

            <div className="aboutRight">
              <div className="aboutImages">
                <div className="aboutImageRow">
                  <div className="aboutImageLeft"></div>
                </div>
                <div className="aboutImageRow">
                  <div className="aboutImageRight"></div>
                </div>
                <div className="aboutImageRow">
                  <div className="aboutImageLeft"></div>
                </div>
              </div>
              <div className="aboutButtons">
                <div className="aboutSignUp"></div>
                <div className="aboutContact"></div>
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

About.contextTypes = {
  router: React.PropTypes.object
};
