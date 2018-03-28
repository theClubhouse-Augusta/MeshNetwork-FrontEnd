import React from 'react';
import moment from 'moment';
import uuid from "uuid/v4";
import { DateRangePicker } from 'react-dates';
import Table, {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableFooter
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import { tableStyle, CustomTableCell } from '../../../jss';
import '../style.css';
import '../styleM.css';


export default withStyles(tableStyle)(props => {
  const { classes } = props;
  function generateID() {
    return uuid()
  };
  return (
    <React.Fragment>
      <div className="spaceDashDataTitleGraph">
        <p>Customers</p>
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
      {!!props.users.length &&
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Name on Card</CustomTableCell>
                <CustomTableCell>Stripe E-mail</CustomTableCell>
                <CustomTableCell>Name</CustomTableCell>
                <CustomTableCell>Mesh email</CustomTableCell>
                <CustomTableCell>Subscription Plan</CustomTableCell>
                <CustomTableCell>Subscription Status</CustomTableCell>
                <CustomTableCell>Created on</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.users.slice(props.userPage * props.userRowsPerPage, props.userPage * props.userRowsPerPage + props.userRowsPerPage).map((user, key) => {
                return (
                  <TableRow key={`ocuser${key}`}>
                    {user.subscriptions.data.length && user.sources.data.length ?
                      <React.Fragment>
                        <TableCell>{!!user.sources ? user.sources.data[0].name : null}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{!!user.meshName ? user.meshName : null}</TableCell>
                        <TableCell>{!!user.meshEmail ? user.meshEmail : null}</TableCell>
                        <TableCell>{!!user.subscriptions ? user.subscriptions.data[0].plan.name : null}</TableCell>
                        <TableCell>{!!user.subscriptions ? user.subscriptions.data[0].status : null}</TableCell>
                        <TableCell>{!!user.subscriptions ? moment(user.subscriptions.data[0].start).format('YYYY MM DD') : null}</TableCell>
                      </React.Fragment>
                      :
                      <React.Fragment>
                        <TableCell>{!!user.sources ? user.sources.data[0].name : null}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{!!user.meshName ? user.meshName : null}</TableCell>
                        <TableCell>{!!user.meshEmail ? user.meshEmail : null}</TableCell>
                        <TableCell>Not enrolled</TableCell>
                        <TableCell>Not enrolled</TableCell>
                        <TableCell>Not enrolled</TableCell>
                      </React.Fragment>
                    }
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
        </Paper>
      }
    </React.Fragment>
  );
});
