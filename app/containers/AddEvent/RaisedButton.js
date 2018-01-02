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
  <Button 
    onClick={props.onSubmit}
    raised 
    color="primary"  
    className={props.classes.button} 
    style={ props.style }
//      alignSelf: 'center',
  //    marginTop: 24,
    //  marginBottom: 64
    //}}
  >
    {props.sponsor ? 'Add new Sponsor' : 'submit'}
  </Button>

RaisedButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};
export default withStyles(styles)(RaisedButton);
