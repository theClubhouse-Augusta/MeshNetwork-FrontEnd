/*
 *
 * MemberAcct
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header'; 
import Footer from 'components/Footer'; 
import { Tabs, Tab } from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import ProfileSettings from 'components/ProfileSettings'; 
import AccountSettings from 'components/AccountSettings';
import SecurityNotifSettings from 'components/SecurityNotifSettings'; 

import './style.css';
import './styleM.css';

export default class MemberAcct extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="MemberAcct" meta={[ { name: 'description', content: 'Description of MemberAcct' }]}/>
        <Header /> 

        <main> 
          <div className="acctBanner"> 
            <h2> account settings </h2>
          </div>

          <div className="acctBody"> 
            <Tabs style={{maxWidth: '1000px', margin: '0 auto'}}> 
              <Tab label="Profile"> <ProfileSettings /> </Tab>
              <Tab label="Account"> <AccountSettings /> </Tab>
              <Tab label="Security & Notifications"> <SecurityNotifSettings /> </Tab> 
            </Tabs>
          </div>   
        </main> 

        <Footer />         
      </div>
    );
  }
}
