/*
 *
 * SpaceDash
 *
 */

import React from 'react';
import PropTypes from 'prop-types'; 

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
  state ={
    value: 0,
  }


  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  
  render() {
    const { value } = this.state;

    return (
      <div className="container">
      

       <div className="spaceDashBody">
       <AppBar position="static">
          <Tabs value={value} onChange={this.handleTabChange}>
            <Tab label="User Management" />
            <Tab label="Space Information"  />
            <Tab label="Event Management" />
            <Tab label="Metrics" />
            
          </Tabs>
        </AppBar>
          

        <div className="spaceDashMain">
        {value === 3 && <SpaceInformation id={this.props.match.params.id}/> }
        {value === 1 && <EventDash id={this.props.match.params.id}/>}
        {value === 2 && <Metrics id={this.props.match.params.id}/> }
        {value === 0 && <UserDash id={this.props.match.params.id}/> }
        
        </div>
       </div>
      </div>
    );
  }
}

SpaceDash.contextTypes = {
  router: PropTypes.object
};
