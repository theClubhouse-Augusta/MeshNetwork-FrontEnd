import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const RaisedButton = props => 
  <Button raised color="primary" className={props.classes.button} style={{alignSelf: 'center'}}>
    add new sponsor
  </Button>

RaisedButton.propTypes = {
  classes: PropTypes.object.isRequired,
  AddNewSponsor: PropTypes.func.isRequired
};
export default withStyles(styles)(RaisedButton);
