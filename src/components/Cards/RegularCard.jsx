import cx from "classnames";
import Card, { CardActions, CardContent, CardHeader } from "material-ui/Card";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";
import React from "react";
import regularCardStyle from "../../variables/styles/regularCardStyle";

function RegularCard({
  classes,
  headerColor,
  plainCard,
  cardTitle,
  cardTitleStyle,
  cardSubtitle,
  cardSubtitleStyle,
  content,
  footer,
  nullRoot,
  useMeshCard
}) {
  const plainCardClasses = cx({
    [" " + classes.cardPlain]: plainCard
  });
  const cardPlainHeaderClasses = cx({
    [" " + classes.cardPlainHeader]: plainCard
  });
  return (
    <Card className={!!!useMeshCard ? (classes.card + " " + plainCardClasses) : (classes.meshCard + " " + plainCardClasses)}>
      <CardHeader
        classes={{
          root: nullRoot ? '' : `${classes.cardHeader} ${classes[`${headerColor}CardHeader`]} ${cardPlainHeaderClasses}`,
          title: cardTitleStyle ? classes.cardTitleStyle : classes.cardTitle,
          subheader: cardSubtitleStyle ? classes.cardSubtitleStyle : classes.cardSubtitle
        }}
        title={cardTitle}
        subheader={cardSubtitle}
      />
      <CardContent>{content}</CardContent>
      {footer !== undefined ? (
        <CardActions className={classes.cardActions}>
          {footer}
        </CardActions>
      ) : null}
    </Card>
  );
}

RegularCard.defaultProps = {
  headerColor: "purple"
};

RegularCard.propTypes = {
  plainCard: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  headerColor: PropTypes.oneOf([
    "orange",
    "green",
    "red",
    "meshRed",
    "blue",
    "purple"
  ]),
  cardTitle: PropTypes.node,
  cardTitleStyle: PropTypes.bool,
  nullRoot: PropTypes.bool,
  cardSubtitle: PropTypes.node,
  cardSubtitleStyle: PropTypes.bool,
  content: PropTypes.node,
  footer: PropTypes.node
};

export default withStyles(regularCardStyle)(RegularCard);
