import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Menu from "material-ui-icons/Menu";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';
import cx from "classnames";

import headerStyle from "../../variables/styles/headerStyle.jsx";

import DashHeaderLinks from "./DashHeaderLinks";

function DashHeader({
  classes,
  color,
  spaceName,
  handleDrawerToggle,
  history
}) {
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button 
            onClick={e => {
              e.preventDefault();
              history.push(`/space/${spaceName}`)
            }}
            className={classes.title}>
            {spaceName}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <DashHeaderLinks history={history}/>
        </Hidden>
        <Hidden mdUp>
          <IconButton
            className={classes.appResponsive}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

DashHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(headerStyle)(DashHeader);
