import Grid from 'material-ui/Grid';
import { withStyles } from "material-ui/styles";
import React from "react";

const style = {
  grid: {
    padding: "0 15px !important"
  }
};

function ItemGrid({
  classes,
  children,
  removePadding,
  ...rest
}) {
  return (
    <Grid
      item
      className={removePadding ? "" : classes.grid}
      {...rest}
    >{children}</Grid>
  );
}

export default withStyles(style)(ItemGrid);
