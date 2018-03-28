import React from "react";
import PropTypes from "prop-types";
import { withStyles } from 'material-ui/styles';
import List, { ListItem } from 'material-ui/List';

import footerStyle from "../../variables/styles/footerStyle";

function Footer({
  classes,
  history,
}) {
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                className={classes.block}
                onClick={() => history.push(`/`)}
              >Home</a>
            </ListItem>

            <ListItem className={classes.inlineBlock}>
              <a 
                className={classes.block}
                onClick={() => history.push(`/Challenges`)}
              >Challenges</a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a 
                className={classes.block}
                onClick={() => history.push(`/LMS`)}
              >LMS</a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a href="http://theclubhou.se" className={classes.a}>
              theClubhouse
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);
