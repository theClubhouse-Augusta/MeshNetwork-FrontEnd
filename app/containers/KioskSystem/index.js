/*
 *
 * KioskSystem
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import UserSelect from 'components/UserSelect';
import KioskFlowTwo from 'components/KioskFlowTwo'; 

import './style.css';
import './styleM.css';

export default class KioskSystem extends React.PureComponent {
  render() {
    return (
      <div className="kioskContainer">
        <Helmet title="KioskSystem" meta={[ { name: 'description', content: 'Description of KioskSystem' }]}/>

        <main> 
          <div className="kioskBody">
            <div className="kioskLogoBlock">
              <div className="kioskLogoWrapper"></div>
            </div>

            <div className="kioskFormContainer">
              <UserSelect />
              <KioskFlowTwo />
            </div>          
          </div> 

          <div className="kioskRedirectNav">
              <small> <a href="/home"> mesh network home </a></small>
            </div>         
        </main>
      </div>
    );
  }
}

KioskSystem.contextTypes = {
  router: React.PropTypes.object
};
