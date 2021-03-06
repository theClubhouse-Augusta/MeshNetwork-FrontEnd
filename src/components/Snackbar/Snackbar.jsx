import React from "react";
import { withStyles } from "material-ui/styles";
import { Snackbar as Snack } from 'material-ui/Snackbar';
import IconButton from "material-ui/IconButton";
import Close from "material-ui-icons/Close";
import PropTypes from "prop-types";
import cx from "classnames";
import snackbarContentStyle from "../../variables/styles/snackbarContentStyle.jsx";

function Snackbar({
  classes,
  message,
  color,
  close,
  icon,
  place,
  open,
  closeNotification,
}) {
  var action = [];
  const messageClasses = cx({
    [classes.iconMessage]: icon !== undefined
  });
  if (close !== undefined) {
    action = [
      <IconButton
        className={classes.iconButton}
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={() => closeNotification()}
      >
        <Close className={classes.close} />
      </IconButton>
    ];
  }
  return (
    <Snack
      anchorOrigin={{
        vertical: place.indexOf("t") === -1 ? "bottom" : "top",
        horizontal:
          place.indexOf("l") !== -1
            ? "left"
            : place.indexOf("c") !== -1 ? "center" : "right"
      }}
      open={open}
      message={
        <div>
          {icon !== undefined ? <icon className={classes.icon} /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
      }
      action={action}
      SnackbarContentProps={{
        classes: {
          root: classes.root + " " + classes[color],
          message: classes.message
        }
      }}
    />
  );
}

Snackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
  close: PropTypes.bool,
  icon: PropTypes.func,
  place: PropTypes.oneOf(["tl", "tr", "tc", "br", "bl", "bc"]),
  open: PropTypes.bool
};

export default withStyles(snackbarContentStyle)(Snackbar);
