import React from 'react';
import moment from 'moment';
import uuid from "uuid/v4";
import { DateRangePicker } from 'react-dates';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableFooter
} from 'material-ui/Table';

import './style.css';
import './styleM.css';

export class UserAppearances extends React.PureComponent {
  state = {
    startDate: moment(),
    endDate: moment().add(1, 'd'),
    focusedInput: null,
    users: [],
    userPage: 0,
    userRowsPerPage: 10,
  };

  componentDidMount() {
    // this.loadInitalUsers();
  }

  // loadInitalUsers = () => {
  //   const { date } = this.state;
  //   fetch(`https://innovationmesh.com/api/appearances/users/${this.props.match.params.id}/${date.get('month') + 1}/${date.get('year')}/${date.get('date')}`)
  //     .then(response => response.json())
  //     .then(({ users, error }) => {
  //       if (users) {
  //         this.setState(() => ({ users }))
  //         this.setState(() => ({ error: "" }))
  //       }
  //     })
  //     .catch(error => {
  //       console.log(`error: ${error}`);
  //     })
  // };


  onDateChange = date => {
    this.setState(() => ({ date }));
    if (date) {
      fetch(`https://innovationmesh.com/api/appearances/users/${this.props.match.params.id}/${date.get('month') + 1}/${date.get('year')}/${date.get('date')}`)
        .then(response => response.json())
        .then(({ users, error }) => {
          if (users) {
            this.setState(() => ({ users }));
            this.setState(() => ({ error: "" }));
          } else if (error) {
            this.setState(() => ({ users: [] }));
          }
        })
        .catch(error => {
          console.log(`error: ${error}`);
        })
    } else {
      this.setState(() => ({ users: [] }));
    }
  };

  onDatesChange = (startDate, endDate) => {
    this.setState(() => ({ startDate, endDate }));
    if (startDate && endDate) {
      fetch(`https://innovationmesh.com/api/appearances/users/${this.props.match.params.id}/${startDate.get('month') + 1}/${startDate.get('year')}/${startDate.get('date')}/${endDate.get('month') + 1}/${endDate.get('year')}/${endDate.get('date')}`)
        .then(response => response.json())
        .then(({ users, error }) => {
          if (users) {
            this.setState(() => ({ users }));
            this.setState(() => ({ error: "" }));
          } else if (error) {
            this.setState(() => ({ users: [] }));
          }
        })
        .catch(error => {
          console.log(`error: ${error}`);
        })
    } else {
      this.setState(() => ({ users: [] }));
    }
  };

  onFocusChange = focusedInput => {
    this.setState(() => ({ focusedInput }));
  };

  handleUserChangePage = (event, page) => {
    this.setState({ userPage: page });
  };

  handleUserChangeRowsPerPage = event => {
    this.setState({ userRowsPerPage: event.target.value });
  };


  render() {
    return (
      <div>
        <MyTable
          users={this.state.users}
          userPage={this.state.userPage}
          userRowsPerPage={this.state.userRowsPerPage}
          handleUserChangePage={this.handleUserChangePage}
          handleUserChangeRowsPerPage={this.handleUserChangeRowsPerPage}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={this.onFocusChange}
        />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 700,
  },
});

const MyTable = withStyles(styles)(SimpleTable);
function SimpleTable(props) {
  const { classes } = props;
  function generateID() { return uuid() };
  return (
    <div className={classes.root}>
      <div className="spaceDashDataTitleGraph">
        <p>Check ins</p>
      </div>

      <DateRangePicker
        startDate={props.startDate} // momentPropTypes.momentObj or null,
        startDateId={generateID()} // PropTypes.string.isRequired,
        endDate={props.endDate} // momentPropTypes.momentObj or null,
        endDateId={generateID()} // PropTypes.string.isRequired,
        onDatesChange={({ startDate, endDate }) => { props.onDatesChange(startDate, endDate) }} // PropTypes.func.isRequired,
        focusedInput={props.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={focusedInput => props.onFocusChange(focusedInput)} // PropTypes.func.isRequired,
        isOutsideRange={() => false}
        showClearDates
        showDefaultInputIcon
      />
      {
        !!props.users.length &&
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.users.slice(props.userPage * props.userRowsPerPage, props.userPage * props.userRowsPerPage + props.userRowsPerPage).map((user, key) => {
              return (
                <TableRow key={`ocuser${key}`}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.occasion}</TableCell>
                  <TableCell>{moment(user.time.date).format('YYYY, h:mm a')}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={6}
                count={props.users.length}
                rowsPerPage={props.userRowsPerPage}
                page={props.userPage}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onChangePage={props.handleUserChangePage}
                onChangeRowsPerPage={props.handleUserChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      }
    </div >
  );
}