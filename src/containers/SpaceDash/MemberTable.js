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
    users,
    userPage,
    userRowsPerPage,
    title,
    handleUserChangeRowsPerPage,
    handleUserChangePage,
    headerColor
  }) =>
    <ItemGrid xs={12} sm={12} md={6}>
      <RegularCard
        cardTitle={title}
        headerColor={headerColor}
        //cardSubtitle="All the members of"
        content={!!users.length &&
          <div className={classes.tableResponsive}>
            <Table className={classes.table}>
              <TableHead className={classes.roseTableHeader}>
                <TableRow>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                    Full Name
                  </TableCell>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                    Email
                  </TableCell>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                    Title
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(userPage * userRowsPerPage, userPage * userRowsPerPage + userRowsPerPage).map((user, key) =>
                  <TableRow key={`user${key}`}>
                    <TableCell className={classes.tableCell}>
                      {user.name}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {user.email}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {user.title}
                    </TableCell>
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
          </div>
        }
      />
    </ItemGrid>
);