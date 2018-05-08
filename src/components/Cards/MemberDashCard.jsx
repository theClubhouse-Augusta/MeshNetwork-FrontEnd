import Card, { CardActions, CardContent, CardHeader } from "material-ui/Card";
import Edit from "material-ui-icons/Edit";
import TextField from "material-ui/TextField";
import IconButton from "material-ui/IconButton";
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from "prop-types";
import React from "react";
import memberDashCardStyle from "../../variables/styles/memberDashCardStyle";


function MemberDashCard({
  classes,
  subtitle,
  title,
  description,
  footer,
  avatar,
  isCalendar,
  company,
  header,
  renderTag,
  tags,
}) {
  return (
    <Card className={classes.card}>
      <section className={classes.headerSection}>
        <div className={classes.editButton}>
          <Typography variant="display1" classes={{ display1: classes.display1 }}>
            {header}
          </Typography>
          <Tooltip id="tooltip-top" title="Edit profile" placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton aria-label="Edit" onClick={() => { this.props.history.push(`/account`); }}>
              <Edit className={classes.tableActionButtonIcon + " " + classes.edit} />
            </IconButton>
          </Tooltip>
        </div>
      </section>
      <section className={classes.contentSection}>
        <div>
          <CardHeader
            classes={{
              root: classes.cardHeader,
              avatar: (!!!company ? classes.cardAvatar : classes.companyAvatar),
            }}
            avatar={avatar ? (
              <img src={avatar} alt="..." className={classes.img} />
            ) : null}
          />
          <CardContent className={classes.textAlign}
          >
            {!!subtitle ?
              <Typography component="h6" className={classes.cardSubtitle}>
                {subtitle}
              </Typography>
              : null
            }
            {!!title ?
              <Typography component="h4" className={classes.cardTitle}>
                {title}{company ? "bar" : ""}
              </Typography>
              : null
            }
          </CardContent>
        </div>
        <div>
          <CardActions>
            <div className={classes.memberSearchTagSelect}>
              {tags.map((tag, i) => renderTag(tag, i))}
            </div>
          </CardActions>
        </div>
      </section>
    </Card>
  );
}

MemberDashCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  description: PropTypes.node,
  footer: PropTypes.node,
  avatar: PropTypes.string
};

export default withStyles(memberDashCardStyle)(MemberDashCard);
