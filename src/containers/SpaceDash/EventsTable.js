import React from 'react';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableFooter
} from 'material-ui/Table';

import tableStyle from "../../variables/styles/tableStyle";

import {
  RegularCard,
  ItemGrid
} from "../../components";


export default withStyles(tableStyle)(
  ({
    classes,
    spaceEvents,
    eventPage,
    eventRowsPerPage,
    title,
    changeMenu,
    editEventID,
    deleteEvent,
    handleEventChangeRowsPerPage,
    handleEventChangePage,
    headerColor,
    eventMetricsError,
  }) =>
    <ItemGrid xs={12} sm={12} md={6}>
      <RegularCard
        cardTitle={title}
        headerColor={headerColor}
        cardSubtitle={eventMetricsError ? eventMetricsError : null}
        content={!!spaceEvents.length &&
          <div className={classes.tableResponsive}>
            <Table className={classes.table}>
              <TableHead className={classes.roseTableHeader}>
                <TableRow>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                    Event Name
                  </TableCell>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                    Location
                  </TableCell>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                    Start Date
                  </TableCell>
                  <TableCell className={`${classes.tableCell} ${classes.tableHeadCell}`}>
                    Edit
                  </TableCell>
                  <TableCell className={`${classes.tableCell} ${classes.tableHeadCell}`}>
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {spaceEvents.slice(eventPage * eventRowsPerPage, eventPage * eventRowsPerPage + eventRowsPerPage).map((e, key) =>
                  <TableRow key={`eventSpace${key}`}>
                    <TableCell className={classes.tableCell}>
                      <a href={`/event/${e.id}`}>{e.title}</a>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {e.space.city}, {e.space.state}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {e.date}
                    </TableCell>
                    <TableCell
                      className={`${classes.tableCell} ${classes.button}`}
                      onClick={() => {
                        changeMenu('editEvent');
                        editEventID(e.id);
                      }}
                    >
                      <span style={{ fontWeight: 'bold' }}>Update</span>
                    </TableCell>
                    <TableCell
                      className={`${classes.tableCell} ${classes.button}`}
                      onClick={() => deleteEvent(e.id, key)}
                    >
                      <span style={{ fontWeight: 'bold' }}>Delete</span>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={6}
                    count={spaceEvents.length}
                    rowsPerPage={eventRowsPerPage}
                    page={eventPage}
                    backIconButtonProps={{
                      'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                      'aria-label': 'Next Page',
                    }}
                    onChangePage={handleEventChangePage}
                    onChangeRowsPerPage={handleEventChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        }
      />
    </ItemGrid>
);