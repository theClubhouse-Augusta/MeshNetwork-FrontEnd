import Card, { CardActions, CardContent, CardHeader } from "material-ui/Card";
import TextField from "material-ui/TextField";
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from "prop-types";
import React from "react";
import calendarCardStyle from "../../variables/styles/calendarCardStyle";

function CalendarCard({
  classes,
  subtitle,
  title,
  description,
  footer,
  avatar,
  isCalendar,
  // ...rest
}) {
  return (
    <Card className={classes.card}>
      {!!subtitle ? (
        <Typography
          variant="headline"
          classes={{
            headline: classes.headline
          }}
          gutterBottom
        >Upcoming events</Typography>
      ) : null
      }
      {/* <CardHeader classes={{ root: classes.cardHeader, }} /> */}
      <CardContent className={classes.textAlign}>
        {footer}
      </CardContent>
      {/* <CardActions className={classes.textAlign + " " + classes.cardActions}>
        {footer}
      </CardActions> */}
    </Card>
  );
}

CalendarCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  description: PropTypes.node,
  footer: PropTypes.node,
  avatar: PropTypes.string
};

export default withStyles(calendarCardStyle)(CalendarCard);

          // {/* <Typography component="h6" className={classes.cardSubtitle}>
          //   {subtitle}
          // </Typography> */}