/**
*
* TimePicker
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

import './style.css';
import './styleM.css';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

const TimePickers = props => {
  const { classes } = props;
  if (!!props.startValue || props.endValue) {
    return (
      <div className={classes.container} noValidate>
        <TextField
          id="time"
          onChange={(e) => {props.selector(e, props.index)}}
          label={props.label}
          type="time"
          value={props.startValue ? props.startValue : props.endValue}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
      </div>
    );
  } else {
    return (
      <div className={classes.container} noValidate>
        <TextField
          id="time"
          onChange={(e) => {props.selector(e, props.index)}}
          label={props.label}
          type="time"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
      </div>
    );
  }
}

TimePickers.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  selector: PropTypes.func.isRequired,
  startValue: PropTypes.string,
  endValue: PropTypes.string,
  // multiday: PropTypes.bool.isRequired,
  index: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.bool.isRequired
  ])
};

export default withStyles(styles)(TimePickers);


