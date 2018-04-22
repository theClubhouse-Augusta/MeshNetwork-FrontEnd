import IconButton from "material-ui/IconButton";
import { withStyles } from 'material-ui/styles';
import PropTypes from "prop-types";
import React from "react";
import iconButtonStyle from "../../variables/styles/iconButtonStyle";

function IconCustomButton({
  classes,
  color,
  children,
  customClass,
  ...rest
}) {
  return (
    <IconButton
      {...rest}
      className={
        classes.button +
        (color ? " " + classes[color] : "") +
        (customClass ? " " + customClass : "")
      }
    >
      {children}
    </IconButton>
  );
}

IconCustomButton.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
    "white",
    "simple"
  ]),
  customClass: PropTypes.string,
  disabled: PropTypes.bool
};

export default withStyles(iconButtonStyle)(IconCustomButton);
