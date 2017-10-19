/*
 *
 * Spaces
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header'; 
import {TiSocialAtCircular,   TiSocialFacebookCircular,
  TiSocialInstagramCircular,
  TiSocialTwitterCircular} from 'react-icons/lib/ti';
import Footer from 'components/Footer'; 


import './style.css';
import './styleM.css';

export default class Spaces extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="Spaces" meta={[ { name: 'description', content: 'Description of Spaces' }]}/>
        <Header />
        <div className="spacesBodyWrapper">
          <h2 className="spacesTitle">Participating Spaces</h2>

          <div className="spacesMap"> </div>

          <div className="spacesList">
            <div className="spaceListing">
              <h3> the Clubhou.se</h3>
              <h4 className="spaceLocation"> 540 Telfair St <br />
               Augusta, GA</h4>
              <p className="spaceDescription"> here is a v cool & short description of the clubhou.se</p>
              <div className="spaceListingSocial"> 
                <TiSocialAtCircular className="socialIcon"/>
                <TiSocialFacebookCircular className="socialIcon" />
                <TiSocialInstagramCircular className="socialIcon"/>
                <TiSocialTwitterCircular className="socialIcon"/>   
              </div>
            </div> 

            <div className="spaceListing">
              <h3> Four Athens</h3>
              <h4 className="spaceLocation"> 540 Telfair St <br />
              Augusta, GA</h4>
              <p className="spaceDescription"> here is a v cool & short description of the four athens</p>
              <div className="spaceListingSocial"> 
                <TiSocialAtCircular className="socialIcon"/>
                <TiSocialFacebookCircular className="socialIcon" />
                <TiSocialInstagramCircular className="socialIcon"/>
                <TiSocialTwitterCircular className="socialIcon"/>   
              </div>
            </div>

            <div className="spaceListing">
                  <h3> Super Cool Space</h3>
                  <h4 className="spaceLocation"> 789 Granger St <br />
                  Rando, GA</h4>
                  <p className="spaceDescription"> here is a v cool & short description of the space</p>
                  <div className="spaceListingSocial"> 
                    <TiSocialAtCircular className="socialIcon"/>
                    <TiSocialFacebookCircular className="socialIcon" />
                    <TiSocialInstagramCircular className="socialIcon"/>
                    <TiSocialTwitterCircular className="socialIcon"/>   
                  </div>
            </div>          
          </div>

          <div className="spaceJoinInterest"> 
            <h3> Interested in joining mesh?</h3>
            <p className="spaceDescription"> partnership opps are available for space organizers, researchers & individuals</p>
            <button className="joinInterestButton"> Contact </button>
          </div>
        </div> 
        <Footer />
      </div>
    );
  }
}

Spaces.contextTypes = {
  router: React.PropTypes.object
};
