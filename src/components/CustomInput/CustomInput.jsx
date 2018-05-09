import cx from "classnames";
import Check from "material-ui-icons/Check";
import Clear from "material-ui-icons/Clear";
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';
import PropTypes from "prop-types";
import React from "react";
import customInputStyle from "../../variables/styles/customInputStyle";

function CustomInput({
  classes,
  formControlProps,
  labelText,
  id,
  labelProps,
  inputProps,
  error,
  success,
  onChange,
  value,
  type,
}) {
  const marginTop = cx({
    [classes.marginTop]: labelText === undefined
  });
  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          root: marginTop,
          disabled: classes.disabled,
          underline: classes.underline,
          //: inkbarClasses
        }}
        type={type ? type : "text"}
        id={id}
        value={value}
        onChange={e => { onChange(e, id) } }
        {...inputProps}
      />
      {error ? (
        <Clear className={classes.feedback + " " + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + " " + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  );
}

CustomInput.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool
};

export default withStyles(customInputStyle)(CustomInput);
