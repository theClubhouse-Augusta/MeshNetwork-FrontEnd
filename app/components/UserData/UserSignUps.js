import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
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

export class UserSignUps extends React.PureComponent {
  state = {
    date: moment(),
    focused: false,
    users: [],
    msg: "",
    snack: false,
    userPage: 0,
    userRowsPerPage: 10,
  };

  componentDidMount() {
    this.loadInitalUsers();
  }

  loadInitalUsers = () => {
    const { date } = this.state;
    fetch(`http://localhost:8000/api/signups/${this.props.match.params.id}/${date.get('month') + 1}/${date.get('year')}/${date.get('date')}`)
      .then(response => response.json())
      .then(({ users, error }) => {
        if (users) {
          this.setState(() => ({ users }))
          this.setState(() => ({ error: "" }))
        }
      })
      .catch(error => {
        console.log(`error: ${error}`);
      })
  };

  onDateChange = date => {
    this.setState(() => ({ date }));

    if (date) {
      fetch(`http://localhost:8000/api/appearances/users/${this.props.match.params.id}/${date.get('month') + 1}/${date.get('year')}/${date.get('date')}`)
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

  onFocusChange = focused => {
    this.setState(() => ({ focused }));
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
          date={this.state.date}
          focused={this.state.focused}
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange}
        />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 5,
  },
  table: {
    minWidth: 700,
  },
});

const MyTable = withStyles(styles)(SimpleTable);
function SimpleTable(props) {
  const { classes } = props;

  const TODAY = moment().clone().startOf('day');
  function checkIfDateIsToday(momentDate) {
    return momentDate.isSame(TODAY, 'd');
  }

  const isDateSet = !!props.date;
  const isToday = props.date ? !!checkIfDateIsToday(props.date) : false;
  const noCheckIns = !!!props.users.length;
  return (
    <div className={classes.root}>
      <div className="spaceDashDataTitleGraph">

        {!isDateSet &&
          <p>Sign ups</p>
        }
        {(isDateSet && !noCheckIns && !isToday) &&
          <p>Sign ups for {props.date.format("dddd, MMMM Do YYYY")}</p>
        }
        {(isDateSet && noCheckIns && !isToday) &&
          <p>No sign ups for {props.date.format("dddd, MMMM Do YYYY")}</p>
        }
        {(isDateSet && isToday && !noCheckIns) &&
          <p> Sign ups for Today</p>
        }

        {(isDateSet && isToday && noCheckIns) &&
          <p> No sign ups today</p>
        }
      </div>
      <SingleDatePicker
        placeholder={`Pick a day`}
        date={props.date ? props.date : null} // momentPropTypes.momentObj or null
        onDateChange={date => { props.onDateChange(date) }} // PropTypes.func.isRequired
        focused={props.focused} // PropTypes.bool
        onFocusChange={({ focused }) => { props.onFocusChange(focused) }} // PropTypes.func.isRequired
        showClearDate
        //   numberOfMonths={numberOfMonths}
        showDefaultInputIcon
        isOutsideRange={() => false}
      />
      {!!props.users.length &&
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.users.slice(props.userPage * props.userRowsPerPage, props.userPage * props.userRowsPerPage + props.userRowsPerPage).map((user, key) => {
              return (
                <TableRow key={`ocuser${key}`}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
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
    </div>
  );
}