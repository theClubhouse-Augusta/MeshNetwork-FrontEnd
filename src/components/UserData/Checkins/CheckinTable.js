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

export default withStyles(tableStyle)(
  ({
    classes,
    users,
    startDate,
    endDate,
    onDatesChange,
    focusedInput,
    onFocusChange,
    userPage,
    userRowsPerPage,
    handleUserChangePage,
    handleUserChangeRowsPerPage,

  }) => {
  function generateID() { return uuid() };
  return (
    <div>
      <div className="spaceDashDataTitleGraph">
        <p>Check ins</p>
      </div>

      <DateRangePicker
        startDate={startDate} // momentPropTypes.momentObj or null,
        startDateId={generateID()} // PropTypes.string.isRequired,
        endDate={endDate} // momentPropTypes.momentObj or null,
        endDateId={generateID()} // PropTypes.string.isRequired,
        onDatesChange={({ startDate, endDate }) => { onDatesChange(startDate, endDate) }} // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={focusedInput => onFocusChange(focusedInput)} // PropTypes.func.isRequired,
        isOutsideRange={() => false}
        showClearDates
        showDefaultInputIcon
      />
      {
        !!users.length &&
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
            {users.slice(userPage * userRowsPerPage, userPage * userRowsPerPage + userRowsPerPage).map((user, key) => 
              <TableRow key={`ocuser${key}`}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.occasion}</TableCell>
                <TableCell>{moment(user.time.date).format('YYYY, h:mm a')}</TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={6}
                count={users.length}
                rowsPerPage={userRowsPerPage}
                page={userPage}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onChangePage={handleUserChangePage}
                onChangeRowsPerPage={handleUserChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      }
    </div>
  );
});
