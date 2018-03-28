import React from 'react';
import Table, {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableFooter
} from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import './style.css';
import './styleM.css';

const styles = theme => ({
  root: {
    width: '50%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    maxWidth: 700,
  },
});

export default withStyles(styles)(props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className="spaceDashDataTitleGraph">
        <p>Mesh Users</p>
      </div>
      {
        !!props.users.length &&
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>E-mail</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Subscriber</TableCell>
              <TableCell></TableCell>
              <TableCell>Subscription Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.users.slice(props.userPage * props.userRowsPerPage, props.userPage * props.userRowsPerPage + props.userRowsPerPage).map((user, key) => {
              return (
                <TableRow key={`ocuser${key}`}>
                  {user.subscriptions.data.length ?
                    <React.Fragment>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{!!user.meshName ? user.meshName : null}</TableCell>
                      <TableCell>{!!user.meshEmail ? user.meshEmail :
                        null}</TableCell>
                      <TableCell>{!!user.subscriptions ? user.subscriptions.data[0].plan.name : null}</TableCell>
                      <TableCell>{!!user.subscriptions ? user.subscriptions.data[0].status : null}</TableCell>
                    </React.Fragment>
                    :
                    <React.Fragment>
                      <TableCell>{user.email}</TableCell>
                      <TableCell></TableCell>
                      <TableCell>{!!user.meshName ? user.meshName : null}</TableCell>
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
      }
    </div>
  );
})