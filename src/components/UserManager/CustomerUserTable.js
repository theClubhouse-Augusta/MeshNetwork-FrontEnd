import React from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Table, {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableFooter
} from 'material-ui/Table';
import Spinner from '../../components/Spinner';
import tableStyle from "../../variables/styles/tableStyle";

import { RegularCard, ItemGrid } from "../";

import EmailInput from './EmailInput';
// import { tableStyle, CustomTableCell } from '../../jss';
import './style.css';
import './styleM.css';

export default withStyles(tableStyle)(
  ({
    classes,
    users,
    userPage,
    userRowsPerPage,
    handleUserChangePage,
    handleUserChangeRowsPerPage,
  }) => {
    function renderEmailInput(user, key) {
      if (user.updated) {
        return (
          <EmailInput
            key={key}
            email={user.meshEmail}
            id={user.id}
            emailUpdated
          />
        );
      } else if (user.meshEmail) {
        return user.meshEmail;
      } else {
        return (
          <EmailInput
            key={`${key}Two`}
            email=''
            id={user.id}
            emailUpdated={false}
          />
        );
      }
    }
    return (
      !!!users.length ? 
        <Spinner loading={this.state.loading} />
        :
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="Stripe Users"
            cardSubtitle="Connect your old stripe customers to the MeshNetwork"
            content={!!users.length &&
              <div className={classes.tableResponsive}>
                <Table className={classes.table}>
                  <TableHead className={classes.roseTableHeader}>
                    <TableRow>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                        Name on Card
                      </TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                        stripe email
                      </TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                        mesh name
                      </TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                        mesh email
                      </TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                        plan
                      </TableCell>
                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                        status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.slice(userPage * userRowsPerPage, userPage * userRowsPerPage + userRowsPerPage).map((user, key) => {
                      return (
                        <TableRow key={`ocuser${key}`}>
                          {user.subscriptions.data.length ?
                            <React.Fragment>
                              <TableCell className={classes.tableCell}>
                                {!!user.sources.data[0] !== undefined ? user.sources.data[0].name : null}
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                {user.email}
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                {!!user.meshName ? user.meshName : null}
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                {renderEmailInput(user, `ocuseremailInput${key}`)}
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                {!!user.subscriptions ? user.subscriptions.data[0].plan.name : null}
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                {!!user.subscriptions ? user.subscriptions.data[0].status : null}
                              </TableCell>
                            </React.Fragment>
                            :
                            <React.Fragment>
                              <TableCell className={classes.tableCell}>
                                {!!user.sources.data[0] !== undefined ? user.sources.data[0].name : null}
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                {user.email}
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                {!!user.meshName ? user.meshName : null}
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                {renderEmailInput(user, `ocuseremailInput2${key}`)}
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                Not enrolled
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                Not enrolled
                              </TableCell>
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
    );
  });
