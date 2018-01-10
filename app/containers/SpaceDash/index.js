
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



const getUsersAPI = 'http://innovationmesh.com/api/users/space/'; 

export default class SpaceDash extends React.PureComponent {
  state ={
    value: 0,
    spaceUsers: {}, 
  }

  componentWillMount() {
    this.loadSpaceUsers(); 
  }

  loadSpaceUsers = () => {
    fetch( getUsersAPI + this.props.match.params.id, {
      method:'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        spaceUsers:json
      }, function() {
        console.log(this.state.spaceUsers);
      })
    }.bind(this))
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
            <Tab label="Space Information" />   
            <Tab label="Event Management" />
            <Tab label="User Management" />          
            <Tab label="Metrics" />     
                 
          </Tabs>
        </AppBar>

        <div className="spaceDashMain">
        {value === 0 && <SpaceInformation id={this.props.match.params.id}/>}
        {value === 1 && <EventDash id={this.props.match.params.id} 
                                   users={this.state.spaceUsesrs}/>}
        {value === 2 && <UserDash id={this.props.match.params.id} 
                                  users={this.state.spaceUsesrs}/> }
        {value === 3 && <Metrics id={this.props.match.params.id}
                                 users={this.state.spaceUsesrs}/> }
       
       
        
        
        </div>
       </div>
      </div>
    );
  }
}

SpaceDash.contextTypes = {
  router: PropTypes.object
};