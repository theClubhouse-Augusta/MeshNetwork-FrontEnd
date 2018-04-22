import cx from "classnames";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";
import React from "react";
import buttonStyle from "../../variables/styles/buttonStyle";

function RegularButton({
  classes,
  color,
  round,
  children,
  fullWidth,
  disabled,
  ...rest
}) {
  const btnClasses = cx({
    [classes[color]]: color,
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled
  });
  return (
    <Button {...rest} className={classes.button + " " + btnClasses}>
      {children}
    </Button>
  );
}

RegularButton.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
    "white",
    "simple",
    "transparent"
  ]),
  round: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool
};

export default withStyles(buttonStyle)(RegularButton);
