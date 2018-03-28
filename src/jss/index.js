import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';

export function tableStyle(theme) {
  return ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });
};
// export function tableStyle(theme) {
//   return ({
//     paper: {
//       root: {
//         width: '100%',
//         marginTop: theme.spacing.unit * 3,
//         overflowX: 'auto',
//       },
//     },
//     table: {
//       root: {
//       },
//       table: {
//         minWidth: 700,
//       },
//     },
//   });
// };

export function checkinTablestyle(theme) {
  return ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 5,
    },
    table: {
      minWidth: 700,
    },
  });
}



const CustomTableCell = withStyles(theme => ({
  head: {
    width: 10,
    backgroundColor: '#546576',
    color: theme.palette.common.white,
    fontSize: 16,
  },
  body: {
    fontSize: 24,
  },
}))(TableCell);

export { CustomTableCell };