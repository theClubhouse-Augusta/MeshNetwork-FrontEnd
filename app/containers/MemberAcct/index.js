/*
 *
 * MemberAcct
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header'; 
import Footer from 'components/Footer'; 
import Tabs, { Tab } from 'material-ui/Tabs'; 
import ProfileSettings from '../../components/ProfileSettings'; 
import AccountSettings from '../../components/AccountSettings';
import SecurityNotifSettings from '../../components/SecurityNotifSettings'; 

import './style.css';
import './styleM.css';

export default class MemberAcct extends React.PureComponent {
  state= {
    value: 0, 
  }; 

  handleChange = (event, value) => {
    this.setState({ value }); 
  }; 

 render() {
   const { value } = this.state; 
    return (
      <div className="container">
        <Helmet title="MemberAcct" meta={[ { name: 'description', content: 'Description of MemberAcct' }]}/>
        <Header /> 

        <main> 
          <div className="acctBanner"> 
            <h2> account settings </h2>
          </div>

          <div className="acctBody"> 
            <Tabs 
            value={value} 
            style={{maxWidth: '1000px', margin: '0 auto'}} onChange={this.handleChange}
            centered > 
              <Tab label="Profile"> </Tab>
              <Tab label="Account"> </Tab>
              <Tab label="Security & Notifications"> </Tab> 
            </Tabs>

          {value === 0 && <ProfileSettings />}  
          {value === 1 &&  <AccountSettings /> }       
          {value === 2 &&   <SecurityNotifSettings /> }      

          </div>   
        </main> 

        <Footer />         
      </div>
    );
  }
}
