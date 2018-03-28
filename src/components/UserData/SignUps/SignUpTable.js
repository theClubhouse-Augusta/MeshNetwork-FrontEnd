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

import { tableStyle } from '../../../jss';
import '../style.css';
import '../styleM.css';

export default withStyles(tableStyle)(props => {
  const { classes } = props;
  function generateID() { return uuid() };
  return (
    <div>
      <div className="spaceDashDataTitleGraph">
        <p>Sign ups</p>
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
});
