/**
*
* EventDash
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper'; 
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui'; 

import './style.css';
import './styleM.css';
import {DragHandle} from 'material-ui-icons';

export default class EventDash extends React.PureComponent {
  constructor(props) { 
    super(props); 

    this.state = {
      //spaceEvents: [], 
      columns: [
        { name:'status', title: 'Status', getCellValue: row => (row.event ? row.event.status : undefined)}, 
        { name:'title', title: 'Event Name', getCellValue: row => (row.event ? row.event.title : undefined)},
        //userID => user name as profile url? or email mailto? 
        { name:'creator', title: 'Created By', getCellValue: row => (row.event ? row.event.creator : undefined)},
        //array from eventorg api => Name list as links
        { name:'organizers', title: 'Organizers', getCellValue: row => (row.event ? row.event.organizers : undefined)},
        //pull event dates - make strings?? => string or array list
        { name:'dateTime', title: 'Date(s) & Time(s)', getCellValue: row => (row.event ? row.event.dateTime : undefined)},
        { name:'description', title: 'description', getCellValue: row => (row.event ? row.event.description : undefined)},
      ], 
      rows: [
        {event: {status: 1, title:'pynight', creator: 'sally sue', organizers: 'sally sue, bob bobert', dateTime: '1/12/2018 6p-9p', description: 'yay its python, as always newbie corner', }}, 
      ]
    }
  }


  componentWillMount() {
    this.loadSpaceEvents(); 
  }

  loadSpaceEvents= (props) => { 
    fetch('http://localhost:8000/api/workevents/' + this.props.id, {
      method: 'GET'
    })
    .then(function(response) {
      return response.json(); 
    })
    .then(function(json) { 
      this.setState({
        spaceEvents:json
      }, function() {
        console.log(this.state.spaceEvents); 
      })
    }.bind(this))
  }

//eventID param
  getEventOrganizers= () => { 

  }

//eventID Param 
  getEventDateTime = () => { 

  }


  //UPDATE HANDLE
  
  //DELETEHANDLE 
  render() {
    const { rows, columns } = this.state; 

    return (
      <div className="eventDashContainer">
        <Paper> 
          <Grid
            rows={rows} 
            columns={columns}> 
            <Table />
            <TableHeaderRow />
          </Grid>
        </Paper>
      </div>
    );
  }
}

EventDash.contextTypes = {
  router: PropTypes.object
};
