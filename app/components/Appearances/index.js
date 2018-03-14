import React from 'react';
import { SingleDatePicker } from 'react-dates';
import Table, {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableFooter
} from 'material-ui/Table';
import moment from 'moment';

import './style.css';
import './styleM.css';

export class UserAppearanceByMonthYearDay extends React.PureComponent {
  state = {
    date: moment(),
    focused: false,
    users: [],
  };

  getUsers = () => {
    fetch(`http://localhost:8000/api/users/${month}/${year}/${day}`)
      .then()
  }

  render() {
    const { focused } = this.state;
    return (
      <div>
        <SingleDatePicker
          placeholder={`Choose a day`}
          date={this.state.date} // momentPropTypes.momentObj or null
          onDateChange={date => { this.setState(() => ({ date })) }} // PropTypes.func.isRequired
          focused={focused} // PropTypes.bool
          onFocusChange={({ focused }) => this.setState(() => ({ focused }))} // PropTypes.func.isRequired
          showClearDate
          //   numberOfMonths={numberOfMonths}
          showDefaultInputIcon
        />
        <div className="spaceDashColumn">
          <div className="spaceDashDataTitleGraph">Members</div>
          {/* <Table>
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.spaceUsers.slice(this.state.userPage * this.state.userRowsPerPage, this.state.userPage * this.state.userRowsPerPage + this.state.userRowsPerPage).map((user, key) => {
                return (
                  <TableRow key={`user${key}`}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.title}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={6}
                  count={this.state.spaceUsers.length}
                  rowsPerPage={this.state.userRowsPerPage}
                  page={this.state.userPage}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  onChangePage={this.handleUserChangePage}
                  onChangeRowsPerPage={this.handleUserChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table> */}
        </div>

      </div>
    );
  }
}