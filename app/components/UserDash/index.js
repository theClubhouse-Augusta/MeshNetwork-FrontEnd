/**
*
* UserDash
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper'; 
import Moment from 'react-moment'; 
import { EditingState } from '@devexpress/dx-react-grid'; 
import { Grid, Table, TableHeaderRow,           
  TableEditRow, 
  TableEditColumn,   } from '@devexpress/dx-react-grid-material-ui';
import {
    TableCell,
    Button,
    IconButton,
    Input,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    Select,
  } from 'material-ui';
import BlockIcon from 'material-ui-icons/Block'; 
import ThumbDownIcon from 'material-ui-icons/ThumbDown'; 

/* 
TO DO 
  Row Generator 

  Role Editing Cell Render 
  Banning Mechanism 
  Dialog Warn for Banning 

  Commiting the Changes 
*/

import './style.css';
import './styleM.css';
import {ThumbUp} from 'material-ui-icons';

const Cell = (props) => { 
  if (props.column.name === 'ban') { 
    return <BanStatusCell {...props} />;
  } if (props.column.name === 'role') {
    return <RoleStatusCell  {...props}/>
  }
  return <Table.Cell {...props} />
}

const RoleStatusCell = ({ value }) => {
  if (value === 1) {
    return (<div style={{padding:'16px 8px'}}> Administrator </div>)
  } if (value === 2 ) {
    return (<div style={{color: 'teal', padding:'16px 8px' }}> Space Admin</div>)
  } return (<div style={{color: 'orange',      padding:'16px 8px' }}> Member </div> )
}

const RoleEditSelect = ({ value, onValueChange }) => (
   <TableCell> 
    <Select 
      value={value}
      onChange={event => onValueChange(event.target.value)}
      input={
        <Input />
      }
      >
      {roleValues.map(item => (
        <MenuItem key={item} value={item}>{item}</MenuItem>
      ))}
    </Select>
   </TableCell>
)

/* const onValueChange - 
label change = role id value change */

const BanStatusCell = ( { value } ) => {
  if (value === 0) {
      return ( <TableCell style={{padding: '0'}}>
                <BanButton />
               </TableCell>)
  } return ( <TableCell style={{padding: '0'}} disabled>
                <BlockIcon />
              </TableCell> )
}

const BanButton = ({ onBanExecute }) => (
  <IconButton onClick={onBanExecute} title="Ban User" aria-label="ban user button" style={{color: 'gray'}}>
    <ThumbDownIcon  style={{height: '.75em', width: '.75em'}}/>
  </IconButton> 
) 

/* onBanExecute = () => {this.setState({ban: 1}); function() {console.log('banned')}} */


const userUpdateAPI = 'http://www.innovationmesh.com/api/updateUser'; 


export default class UserDash extends React.PureComponent {
  constructor(props) { 
    super(props); 

    this.state = {
      rows: [
        { id: 1, role: 1, name: 'Bob', lastName: 'Brown', age: 21, ban: 0 },
        { id: 2, role: 2, name: 'John', lastName: 'Smith', age: 35, ban: 1 },
        { id: 3, role: 3, name: 'Mike', lastName: 'Mitchel', age: 28, ban: 0 },
      ],
      columns: [
        { name: 'role', title: 'Role' },
        { name: 'name', title: 'Name' },
        { name: 'lastName', title: 'Last Name' },
        { name: 'age', title: 'Age' },
        { name: 'ban', title: 'Ban Status'}
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
//created_at => readable date format

componentWillReceiveProps(users) {
  this.setState({rows: this.props.users})    
}

  render() {
    const { rows, 
            columns,  
            editingRows, 
            addedRows, 
            changedRows,
            deletingRows } = this.state;

    return (
      <div className="userDashContainer">
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
          <Table cellComponent={Cell}/>
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn
            showAddCommand
            showEditCommand
            showDeleteCommand
            allowEditing={!editingRows.length}
          />
          </Grid>

          <Dialog>
          {/* are you sure you want to ban this user */ }
          </Dialog>

        </Paper>
      </div>
    );
  }
}


UserDash.contextTypes = {
  router: PropTypes.object
};
