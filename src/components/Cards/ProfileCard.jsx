import Card, { CardActions, CardContent, CardHeader } from "material-ui/Card";
import TextField from "material-ui/TextField";
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from "prop-types";
import React from "react";
import profileCardStyle from "../../variables/styles/profileCardStyle";

function ProfileCard({
  classes,
  subtitle,
  title,
  description,
  footer,
  avatar,
  isCalendar,
  ...rest
}) {
  const renderDescription = () => {
    if (!!description && !!!isCalendar) {
      return (
        <Typography component="p" className={classes.cardDescription}>
          {description}
        </Typography>
      );
    } else if (!!!description && !!!isCalendar) {
      return (
        <input placeholder="add a bio!" type="text" style={{ borderBottom: '1px solid black' }} />
      );
    } else {
      return null;
    }
  };
  const renderTitle = () => {
    if (!!subtitle && !!!isCalendar) {
      return (
        <Typography component="p" className={classes.cardDescription}>
          {description}
        </Typography>
      );
    } else if (!!!subtitle && !!!isCalendar) {
      return (
        <input placeholder="add a job title" type="text" style={{ borderBottom: '1px solid black' }} />
      );
    } else {
      return null;
    }
  };
  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{
          root: classes.cardHeader,
          avatar: classes.cardAvatar
        }}
        avatar={avatar ? (
          <img src={avatar} alt="..." className={classes.img} />
        ) : null}
      />
      <CardContent className={classes.textAlign} {...rest}>
        {!!subtitle ? (
          <Typography component="h6" className={classes.cardSubtitle}>
            {subtitle}
          </Typography>
        ) : (
            <input placeholder="add a subtitle" type="text" style={{ borderBottom: '1px solid black' }} />
          )}
        {!!title ? (
          <Typography component="h4" className={classes.cardTitle}>
            {title}
          </Typography>
        ) : ((!!!title && !!!isCalendar) ? (
          <input placeholder="title" type="text" style={{ borderBottom: '1px solid black' }} />
        ) : (
            null
          ))}
        {renderDescription()}
      </CardContent>
      <CardActions className={classes.textAlign + " " + classes.cardActions}>
        {footer}
      </CardActions>
    </Card>
  );
}

ProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  description: PropTypes.node,
  footer: PropTypes.node,
  avatar: PropTypes.string
};

export default withStyles(profileCardStyle)(ProfileCard);
