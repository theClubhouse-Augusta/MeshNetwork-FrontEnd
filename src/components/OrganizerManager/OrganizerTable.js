import React from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
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
    roles,
    userPage,
    userRowsPerPage,
    handleUserChangePage,
    handleUserChangeRowsPerPage,
    handleRoleChange,
  }) => {
    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="Member Roles"
            cardSubtitle="Set account privalages for select members and users"
            content={!!users.length &&
              <div className={classes.tableResponsive}>
                <Table className={classes.table}>
                  <TableHead className={classes.roseTableHeader}>
                    <TableRow>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                        Full Name
                      </TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                        E-mail
                      </TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                        Title
                      </TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                        Check-Ins</TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                        Role
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.slice(userPage * userRowsPerPage, userPage * userRowsPerPage + userRowsPerPage).map((user, key) =>
                      <TableRow key={`user${key}`}>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                          {user.name}
                        </TableCell>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                          {user.email}
                        </TableCell>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                          {user.title}
                        </TableCell>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                          {user.checkins}
                        </TableCell>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                          <FormControl>
                            <InputLabel htmlFor="user-role">Role</InputLabel>
                            <Select
                              value={users[key].roleID}
                              onChange={(event) => this.handleRoleChange(event, key, user.id)}
                              id='user-role'
                              inputProps={{
                                name: 'role',
                              }}
                            >
                              {roles.map((role, key) => (
                                <MenuItem
                                  key={`role${key}`}
                                  value={role.id}
                                >{role.name}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        colSpan={30}
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
      </Grid>
    )
  }
);