import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Zoom from 'material-ui/transitions/Zoom';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import EditIcon from 'material-ui-icons/ModeEdit';
import UpIcon from 'material-ui-icons/KeyboardArrowUp';
import green from 'material-ui/colors/green';
import { Grid } from 'material-ui';

function TabContainer(props) {
  const { children, dir } = props;

  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    position: 'relative',
    minHeight: 100,
  },
  flexContainer: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      marginLeft: '2rem',
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
    },
  },
  centered: {
    justifyContent: 'center'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
  },
});

class BookingCard extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };

    const fabs = [
      {
        color: 'primary',
        className: classes.fab,
        icon: <AddIcon />,
      },
      {
        color: 'secondary',
        className: classes.fab,
        icon: <EditIcon />,
      },
      {
        color: 'inherit',
        className: classNames(classes.fab, classes.fabGreen),
        icon: <UpIcon />,
      },
    ];

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            classes={{
              flexContainer: classes.flexContainer,
              centered: classes.centered,
            }}
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Mentor" />
            <Tab label="Meeting Room" />
            <Tab label="Studio" />
          </Tabs>
        </AppBar>
        {/* <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>Item One</TabContainer>
          <TabContainer dir={theme.direction}>Item Two</TabContainer>
          <TabContainer dir={theme.direction}>Item Three</TabContainer>
          </SwipeableViews>
        {fabs.map((fab, index) => (
          <Zoom
            key={fab.color}
            in={this.state.value === index}
            timeout={transitionDuration}
            style={{
              transitionDelay: this.state.value === index ? transitionDuration.exit : 0,
            }}
            unmountOnExit
          >
            <Button variant="fab" className={fab.className} color={fab.color}>
              {fab.icon}
            </Button>
          </Zoom>
        ))} */}
      </div>
    );
  }
}

BookingCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(BookingCard);

        // import React from 'react';
        // import PropTypes from 'prop-types';
        // import Grid from 'material-ui/Grid';
// import {withStyles} from 'material-ui/styles';
        // import AppBar from 'material-ui/AppBar';
// import Tabs, {Tab} from 'material-ui/Tabs';
        // // import bookingCardStyle from "variables/styles/bookingCardStyle";

// const styles = theme => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     width: '100%',
//     position: 'relative',
//     minHeight: 200,
//   },
// });

// class BookingCard extends React.Component {
//   state = {
//     value: 0,
//   };

//   handleChange = (event, value) => {
//     this.setState({ value });
//   };

//   handleChangeIndex = index => {
//     this.setState({ value: index });
//   };

//   render() {
//     const { classes } = this.props;
//     return (
//       <div className={classes.root}>
//         <AppBar position="static" color="default">
//           <Tabs
//             value={this.state.value}
//             onChange={this.handleChange}
//             indicatorColor="primary"
//             textColor="primary"
//             fullWidth
//           >
//             <Grid container justify="space-around"
//               style={{
//                 width: '100%',
//               }}
//             >
//               <Grid item>
//                 <Tab label="Item One" />
//               </Grid>

//               <Grid item>
//                 <Tab label="Item Two" />

//               </Grid>
//               <Grid item>
//                 <Tab label="Item Three" />

//               </Grid>

//             </Grid>
//           </Tabs>
//         </AppBar>
//       </div>
//     );
//   }
// }

// BookingCard.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

// export default withStyles(styles, { withTheme: true })(BookingCard)

