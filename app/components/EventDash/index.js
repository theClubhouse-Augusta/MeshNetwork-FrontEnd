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

import Logger from '../../utils/Logger';

import './style.css';
import './styleM.css';

const getEventsAPI = 'https://innovationmesh.com/api/workevents/';
const eventUpdateAPI = 'https://innovationmesh.com/api/eventUpdate';
const eventDateTimeAPI = '';
const eventVerifyAPI = '';


const Cell = (props) => {
    if (props.column.name === 'status') {
        return <EventApproveCell {...props} />;
    }
    return <Table.Cell {...props} />;
};
Cell.propTypes = {
    column: PropTypes.shape({ name: PropTypes.string }).isRequired,
};



const EventApproveCell = ({ value }) => {
    if (value === 0) {
        // IconButtons have padding baked in
        return (<TableCell style={{ padding: '0' }}>
            <ApprovalButton />
        </TableCell>)
    }
    return (<TableCell style={{ padding: '0' }}>
        <RevokeApproveButton />
    </TableCell>
    )
}

const ApprovalButton = ({ onApproval }) => (
    <IconButton
        //onClick={onApproval}
        title="Approve Event" aria-label="approve event button" style={{ color: 'orange', margin: '0' }}>
        <QuestionAnswerIcon style={{ height: '.75em', width: '.75em' }} />
    </IconButton>
);
ApprovalButton.propTypes = {
    onExecute: PropTypes.func.isRequired,
}

/*const onApproval = () => {
  console.log('clicky')
}*/

const RevokeApproveButton = ({ onRevokeApproval }) => (
    <IconButton
        //onClick={onRevokeApproval}
        title="Revoke Approval"
        aria-label="revoke event approval button"
        style={{ color: 'green' }}>
        <DoneIcon />
    </IconButton>
);
RevokeApproveButton.propTypes = {
    onExecute: PropTypes.func.isRequired,
}

/*const onRevokeApproval = () => {

} */


export default class EventDash extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.users,
            columns: [
                { name: 'name', title: 'Name' },
                { email: 'email', title: 'E-mail' },
                { title: 'title', title: 'Title' },
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
      .catch(error => Logger(`front-end: EventDash@commitChanges: ${error.message}`));
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
                            cellComponent={Cell} />
                        <TableHeaderRow />
                        <TableEditRow />
                    </Grid>
                </Paper>
            </div>
        );
    }
}

EventDash.contextTypes = {
    router: PropTypes.object
};
