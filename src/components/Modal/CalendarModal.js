import {
  Grid,
  Modal,
  Typography,
  withStyles
} from 'material-ui';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Spinner from '../../components/Spinner';
import {
  AppleIcon,
  CalendarIcon,
  GmailIcon,
  OutlookIcon,
  YahooIcon
} from '../../variables/icons';
import modalStyles from '../../variables/styles/modalStyles';

class SimpleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open ? props.open : false,
      yahoo: '',
      gmail: '',
      apple: '',
      outlook: '',
      icsFile: '',
      hasSupportForDownloadAttr: false,
    }
  };
  componentDidMount() {
    this.getCalendarInvites();
  };
  getCalendarInvites = () => {
    const {
      title,
      description,
      start,
      end,
    } = this.props;
    let data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('start', start);
    data.append('end', end);
    fetch(`http://localhost:8000/api/calendarInvite`, {
      method: 'POST',
      body: data,
      headers: { Authorization: `Bearer ${localStorage['token']}` },
    })
      .then(response => response.json())
      .then(({
        yahoo,
        gmail,
        apple,
        outlook,
        icsFile,
      }) => {
        this.setState({
          yahoo,
          gmail,
          apple,
          outlook,
          icsFile,
        })
      })
  };
  setRef = element => {
    if (element) {
      if (typeof element.download !== "undefined") {
        this.setState({ hasSupportForDownloadAttr: true });
      }
    }
  };
  getLink = icon => {
    const {
      yahoo,
      gmail,
      apple,
      outlook,
      icsFile
    } = this.state;
    switch (icon) {
      case 'icsFile':
        return icsFile;
      case 'outlook':
        return outlook
      case 'gmail':
        return gmail
      case 'apple':
        return apple
      case 'yahoo':
        return yahoo
      default:
        break;
    }
  };
  renderIcon = icon => {
    switch (icon) {
      case 'icsFile':
        return (
          <CalendarIcon
            width="50"
            height="50"
          />
        );
      case 'outlook':
        return (
          <OutlookIcon
            width="50"
            height="50"
            fill="#0070C5"
          />
        );
      case 'gmail':
        return (
          <GmailIcon
            width="50"
            height="50"
            fill="#EA4335"
          />
        );
      case 'apple':
        return (
          <AppleIcon
            width="50"
            height="50"

          />
        );
      case 'yahoo':
        return (
          <YahooIcon
            width="50"
            height="50"
            fill="rgb(50, 79, 225)"
          />
        );
      default:
        break;
    }
  };
  renderLink = calendarType => {
    const { classes, title } = this.props;
    const { hasSupportForDownloadAttr } = this.state;
    const link = this.getLink(calendarType);
    const icon = this.renderIcon(calendarType);

    if (hasSupportForDownloadAttr) {
      return (
        <a
          href={link}
          className={classes.link}
          download={title}
        >
          {icon}
          <Typography variant="body1" align="center" className={classes.caption}>
            {calendarType}
          </Typography>
        </a>
      );
    } else {
      return (
        <a href={link} className={classes.link}>
          {icon}
          <Typography variant="body1" align="center" className={classes.caption}>
            {calendarType}
          </Typography>
        </a>
      );
    }
  };
  render() {
    const { classes } = this.props;
    const {
      yahoo,
      gmail,
      apple,
      outlook,
      icsFile,
    } = this.state;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.open}
        onClose={this.handleClose}
      >
        <div className={`${classes.paper} ${classes.modal}`}>
          <a style={{ display: 'none' }} href="" ref={this.setRef}>hide</a>
          <span className={classes.closeModal} onClick={this.props.handleClose}>
            &Chi;
          </span>
          <Typography variant="title" id="modal-title" gutterBottom>
            Add event to your calendar
          </Typography>
          <Grid container justify="space-around">
            {gmail ?
              this.renderLink('gmail')
              : (
                <Spinner loading={true} size={50} />
              )
            }
            {outlook ? this.renderLink('outlook')
              : (
                <Spinner loading={true} size={50} />
              )
            }
            {apple ?
              this.renderLink('apple')
              : (
                <Spinner loading={true} size={50} />
              )
            }
            {yahoo ?
              this.renderLink('yahoo')
              : (
                <Spinner loading={true} size={50} />
              )
            }
            {icsFile ? this.renderLink('icsFile')
              : (
                <Spinner loading={true} size={50} />
              )
            }
          </Grid>
        </div>
      </Modal>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withStyles(modalStyles)(SimpleModal);
