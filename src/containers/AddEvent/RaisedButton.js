import React from 'react';
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
  <Button 
    onClick={props.onSubmit}
    variant="raised" 
    color="primary"  
    className={props.classes.button} 
    style={ props.style }
//      alignSelf: 'center',
  //    marginTop: 24,
    //  marginBottom: 64
    //}}
  >
    {props.sponsor ? 'Confirm' : 'submit'}
  </Button>

export default withStyles(styles)(RaisedButton);
