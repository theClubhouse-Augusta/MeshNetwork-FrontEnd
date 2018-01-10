/**
*
* EventDash
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper'; 
import { EditingState } from '@devexpress/dx-react-grid'; 
import { Grid, Table, TableHeaderRow, TableEditRow, TableEditColumn } from '@devexpress/dx-react-grid-material-ui'; 


import './style.css';
import './styleM.css';


/* TO DO 
    -ROW GENERATOR 
    -POSTS 
    
    ??? eventOrganizer & eventDates APIs 
    -approval button 
    -   
    
    L8R
*/ 

const eventUpdateAPI = 'http://innovationmesh.com/api/eventUpdate'; 

const getRowId = row => row.id;

export default class EventDash extends React.PureComponent {
  constructor(props) { 
    super(props); 

    this.state = {
      columns: [
        //attempting to keep name values === api obj keys             
//ICON RENDERS 
        //approved, denied
        { name: 'status', title: 'Status' }, 
        { name: 'title', title: 'Event Name'},
//this is where we can't pull straight from api anymore 
        //userID => query name 
        { name: 'creator', title: 'Created By' },        
        //was name added to event organizers either? 
        { name: 'organizers', title: 'Organizers' }, 
        // grab from whichever api & make human readable       
        { name: 'dateTime', title: 'Date(s) & Time' },

        //back to straight api 
        { name: 'description', title: 'Description' },
      ],
      rows: [
        {id: '1', status: '', title: 'PyNight', creator: '', organizers:'', dateTime: '', description: ''},
        {id: '2', status: '', title: '1 mil cups', creator: '', organizers:'', dateTime: '', description: ''},
        {id: '3', status: '', title: 'JS Meetup', creator: '', organizers:'', dateTime: '', description: ''},
        
      ],
      editingRows: [],
      addedRows: [],
      changedRows: {},
    };
    this.changeAddedRows = this.changeAddedRows.bind(this);
    this.changeEditingRows = this.changeEditingRows.bind(this);
    this.changeChangedRows = this.changeChangedRows.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingRowsChange = this.onEditingRowsChange.bind(this); 
  }

  changeAddedRows(addedRows) {
    this.setState({ addedRows });
  }
  changeEditingRows(editingRows) {
    this.setState({ editingRows });
  }
  changeChangedRows(changedRows) {
    this.setState({ changedRows });
  }

  onEditingRowsChange(editingRows) {
    this.setState({
      editingRows
    });
  }


/*
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
    fetch('http://localhost:8000/api/')
  }
*/

commitChanges({ added, changed, deleted }) {
  let rows = this.state; 

  data.append()

  fetch(eventUpdateAPI, {
    method: 'POST', 
    body: data, 
  })
  .then(response => response.json())
  .catch(error => {
    console.log(error); 
  })
}






  render() {
    const { rows, columns, editingRows, addedRows, changedRows } = this.state;


    return (
      <div className="eventDashContainer">
        <Paper> 
          <Grid
            rows={rows} 
            columns={columns}
            getRowId={getRowId}
            > 
            <EditingState
              onCommitChanges={this.commitChanges}
              editingRows={editingRows}
              onEditingRowsChange={this.onEditingRowsChange}
          />
          <Table />
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn
            showAddCommand
            showEditCommand
            showDeleteCommand
            allowEditing={!editingRows.length}
          />
          </Grid>
        </Paper>
      </div>
    );
  }
}

EventDash.contextTypes = {
  router: PropTypes.object
};
