import {
  Grid,
  Modal,
  Typography,
  withStyles
} from 'material-ui';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import modalStyles from '../../variables/styles/modalStyles';

class EditEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open ? props.open : false,
    }
  };
  render() {
    const {
      classes,
      event,
      updateEvent,
      handleClose,
    } = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.open}
      >
        <div className={`${classes.paper} ${classes.modal}`}>
          <span onClick={handleClose} className={classes.closeModal}>
            &Chi;
          </span>
          <Typography variant="title" id="modal-title" gutterBottom>
            Add event to your calendar
          </Typography>
          <Grid container justify="space-around">
            <button onClick={() => { updateEvent(event) }}>
              edit event
            </button>
          </Grid>
        </div>
      </Modal>
    );
  }
}

EditEventModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  event: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
};

export default withStyles(modalStyles)(EditEventModal);
