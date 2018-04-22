import cx from "classnames";
import Drawer from 'material-ui/Drawer';
import Hidden from 'material-ui/Hidden';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { withStyles } from "material-ui/styles";
import React from "react";
import { DashHeaderLinks } from "../";
import sidebarStyle from "../../variables/styles/sidebarStyle.jsx";

export default withStyles(sidebarStyle)(({
  classes,
  color,
  logo,
  image,
  routes,
  changeMenu,
  currentRoute,
  handleDrawerToggle,
  open,
  usingCRM,
  role,
  spaceName,
  history
}) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return currentRoute.indexOf(routeName) > -1 ? true : false;
  }
  const isOrganizer = role === 2;
  const dashRoutes = routes({ usingCRM, isOrganizer });
  const links = (
    <List className={classes.list}>
      {dashRoutes.map((prop, key) => {
        const listItemClasses = cx({
          [" " + classes[color]]: activeRoute(prop.path)
        });
        const whiteFontClasses = cx({
          [" " + classes.whiteFont]: activeRoute(prop.path)
        });
        return (
          <div
            onClick={() => changeMenu(prop.path)}
            className={classes.item}
            key={`sidebar${key}`}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                <prop.icon />
              </ListItemIcon>
              <ListItemText
                primary={prop.sidebarName}
                className={classes.itemText + whiteFontClasses}
                disableTypography={true}
              />
            </ListItem>
          </div>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a
        className={classes.logoLink}
        onClick={() => {
          history.push(`/space/${spaceName}`)
        }}
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {spaceName}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <DashHeaderLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
});

