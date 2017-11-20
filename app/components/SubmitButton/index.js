/**
*
* SubmitButton
*
*/

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import './style.css';
import './styleM.css';

export default class SubmitButton extends React.PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      open: false,     
    }
  }
  
 
  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <RaisedButton label="Submit" primary={true}   onClick={this.handleTouchTap}/>
                  <Snackbar
                    open={this.state.open}
                    message="Got it! Please check your email for confirmation"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                    />
      </div>
    );
  }
}
