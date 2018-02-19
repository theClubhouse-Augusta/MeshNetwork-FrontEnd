/**
*
* DatePicker
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

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

const DatePicker = props => {
  const { classes } = props;
  if (!!props.value) {
    return (
      <div className={classes.container} noValidate>
        <TextField
          id="date"
          value={props.value}
          onChange={(e) => {props.selector(e, props.index)}}
          label={props.label}
          type="date"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    );
  } else {
    return (
      <div className={classes.container} noValidate>
        <TextField
          id="date"
          onChange={(e) => {props.selector(e, props.index)}}
          label={props.label}
          type="date"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    );
  }
}

DatePicker.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  selector: PropTypes.func.isRequired,
  value: PropTypes.string,
  index: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.bool.isRequired
  ])
};

export default withStyles(styles)(DatePicker);
