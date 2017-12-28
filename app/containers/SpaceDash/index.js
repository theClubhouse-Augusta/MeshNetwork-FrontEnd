/*
 *
 * SpaceDash
 *
 */

import React from 'react';
import PropTypes from 'prop-types'; 
import Helmet from 'react-helmet'; 
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import UserDash from 'components/UserDash';
import EventDash from 'components/EventDash';
import Metrics from 'components/Metrics'; 
import SpaceInformation from 'components/SpaceInformation'; 

import './style.css';
import './styleM.css';



export default class SpaceDash extends React.PureComponent {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  
  render() {
    const { value } = this.state;

    return (
      <div className="container">
        <Helmet title="AdminDash" meta={[ { name: 'description', content: 'Description of AdminDash' }]}/>

       <div className="spaceDashBody">
       <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Space Information" />
            <Tab label="Event Management" />
            <Tab label="Metrics" />
            <Tab label="User Management" />
          </Tabs>
        </AppBar>
          

        <div className="spaceDashMain">
        {value === 0 && <SpaceInformation /> }
        {value === 1 && <EventDash />}
        {value === 2 && <Metrics /> }
        {value === 3 && <UserDash /> }
        
        </div>
       </div>
      </div>
    );
  }
}

SpaceDash.contextTypes = {
  router: React.PropTypes.object
};
