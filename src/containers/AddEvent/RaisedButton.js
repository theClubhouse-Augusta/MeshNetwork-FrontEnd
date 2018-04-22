import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import React from 'react';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});
const RaisedButton = props =>
  <Button
    onClick={props.onSubmit}
    variant="raised"
    color="primary"
    className={props.classes.button}
    style={props.style}
  >
    {props.sponsor ? 'Confirm' : 'submit'}
  </Button>
export default withStyles(styles)(RaisedButton);
