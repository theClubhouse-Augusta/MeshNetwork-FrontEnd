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
import { TableCell } from 'material-ui';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import DoneIcon from 'material-ui-icons/Done'; 
import QuestionAnswerIcon from 'material-ui-icons/QuestionAnswer'; 

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

const getEventsAPI = 'http://innovationmesh.com/api/workevents/'; 
const eventUpdateAPI = 'http://innovationmesh.com/api/eventUpdate';
const eventDateTimeAPI = ''; 





const Cell = (props) => {
  if (props.column.name === 'status') {
    return <EventApproveCell {...props} />;
  }
  return <Table.Cell {...props} />;
};
Cell.propTypes = {
  column: PropTypes.shape({ name: PropTypes.string }).isRequired,
};



const EventApproveCell = ({
  value 
}) => { 
  if (value === 0 ) { 
    // IconButtons have padding baked in 
    return (<TableCell style={{padding: '0'}}> 
              <ApprovalButton />
            </TableCell>) 
  }
  return (
            <TableCell style={{padding: '0'}}> 
              <RevokeApproveButton />
            </TableCell>
  )
}

const ApprovalButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Approve Event" aria-label="approve event button" style={{color: 'orange', margin: '0'}}>
      <QuestionAnswerIcon style={{height: '.75em', width: '.75em'}}/>
    </IconButton> 
); 
ApprovalButton.propTypes = {
  onExecute: PropTypes.func.isRequired,
}

const RevokeApproveButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Revoke Approval" aria-label="revoke event approval button" style={{color: 'green'}}>
    <DoneIcon />
  </IconButton> 
); 
RevokeApproveButton.propTypes = {
  onExecute: PropTypes.func.isRequired,
}


export default class EventDash extends React.PureComponent {
  constructor(props) { 
    super(props);    
    this.state = {
      rows: [
        { id: 1, status: 0, name: 'Bob', lastName: 'Brown', age: 21,  },
        { id: 2, status: 1, name: 'John', lastName: 'Smith', age: 35,  },
        { id: 3, status: 1, name: 'Mike', lastName: 'Mitchel', age: 28,  },
      ],
      columns: [
        // column order is DELIBERATE, pls do not adjust w/o UX consideration! 
        { name: 'status', title: 'Status'}, 
        { name: 'name', title: 'Name' },
        { name: 'lastName', title: 'Last Name' },
        { name: 'age', title: 'Age' },        
      ],
      editingRows: [],
      addedRows: [],
      changedRows: {},
    };

    this.changeAddedRows = this.changeAddedRows.bind(this);
    this.changeEditingRows = this.changeEditingRows.bind(this);
    this.changeChangedRows = this.changeChangedRows.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
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

  commitChanges() {
    // Commit logic
  }


 /* componentWillMount() {
    this.loadSpaceEvents();
    //this.getEventOrganizers(); 
    //this.getEventDateTime();  
  }

  loadSpaceEvents= () => { 
    fetch(getEventsAPI + this.props.id, {
      method: 'GET'
    })
    .then(function(response) {
      return response.json(); 
    })
    .then(function(json) { 
      this.setState({
        rows:json, 
      }, function() {
        console.log(this.state.rows); 
      })
    }.bind(this))
  }


/*
//eventID param
  getEventOrganizers= () => { 
   match this.props.users 
   get name offa that obj 
  }
*/

//reassign id => eventid:? 
/*
  getEventDateTime = () => { 
    fetch(eventDateTimeAPI + {id} {
      method: 'GET'
    })
    .then(response => reponse.json())
    .then( 

    )

  }
*/


renderReadableDate = () => { 
    const dateObject = new Date(Date.parse()); 

    const dateReadable = dateObject.toDateString(); 

    console.log(dateReadable); 
  }

/*
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

*/ 




  render() {
      const { rows, 
            columns,  
            editingRows, 
            addedRows, 
            changedRows,
            deletingRows } = this.state;

    return (
      <div className="eventDashContainer">
        <Paper> 
          <Grid
          rows={rows} 
          columns={columns}
          getRowId={row => row.id}
            > 
            <EditingState
            editingRows={editingRows}
            onEditingRowsChange={this.changeEditingRows}
            changedRows={changedRows}
            onChangedRowsChange={this.changeChangedRows}
            addedRows={addedRows}
            onAddedRowsChange={this.changeAddedRows}
            onCommitChanges={this.commitChanges}
          />
          <Table 
            cellComponent={Cell}/>
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
