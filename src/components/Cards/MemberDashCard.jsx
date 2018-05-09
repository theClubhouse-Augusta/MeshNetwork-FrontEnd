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
  avatar,
  header,
  renderTag,
  tags,
  company,
  history,
}) {
  const updateUrl = company ? '/company' : '/account';
  return (
    <Card className={classes.card}>
      <section className={classes.headerSection}>
        <div className={classes.editButton}>
          <Typography variant="display1" classes={{ display1: classes.display12 }}>
            {header}
          </Typography>
          <Tooltip id="tooltip-top" title={company ? "Edit Company" : "Edit profile"} placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton aria-label="Edit" onClick={() => { history.push(updateUrl); }}>
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
              avatar: (classes.cardAvatar),
            }}
            avatar={avatar ? (
              <img src={avatar} alt="..." className={classes.img} />
            ) : null}
          />
          <CardContent className={classes.textAlign}>
            {!!subtitle ?
              <Typography component="h6" className={classes.cardSubtitle}>
                {subtitle}
              </Typography>
              : null
            }
            {!!title ?
              <Typography component="h4" className={classes.cardTitle}>
                {title}
              </Typography>
              : null
            }
          </CardContent>
        </div>
        <div>
          <CardActions>
            <div className={classes.memberSearchTagSelect}>
              {company ? (
                tags.map((tag, i) => renderTag(tag, i))
              ) : (
                tags.map((tag, i) => renderTag(tag, (i+1)))
              )
              }
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
  avatar: PropTypes.string
};

export default withStyles(memberDashCardStyle)(MemberDashCard);
