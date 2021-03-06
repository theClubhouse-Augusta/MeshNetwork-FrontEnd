import React from "react";
import { withStyles } from "material-ui/styles";
import IconButton from "material-ui/IconButton";
import { SnackbarContent as Snack } from 'material-ui/Snackbar';
import Close from "material-ui-icons/Close";
import PropTypes from "prop-types";
import cx from "classnames";

import snackbarContentStyle from "../../variables/styles/snackbarContentStyle.jsx";

function SnackbarContent({
  classes,
  message,
  color,
  close,
  icon
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
      >
        <Close className={classes.close} />
      </IconButton>
    ];
  }
  return (
    <Snack
      message={
        <div>
          {icon !== undefined ? <icon className={classes.icon} /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
      }
      classes={{
        root: classes.root + " " + classes[color],
        message: classes.message
      }}
      action={action}
    />
  );
}

SnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
  close: PropTypes.bool,
  icon: PropTypes.func
};

export default withStyles(snackbarContentStyle)(SnackbarContent);
