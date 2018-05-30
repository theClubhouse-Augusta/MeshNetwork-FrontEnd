// ##############################
// // // ChartCard styles
// #############################

import {
  card,
  cardHeader,
  defaultFont,
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  whiteCardHeader,
  cardActions,
  grayColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  primaryColor,
  roseColor
} from "../../variables/styles";

export default theme => ({
  root: {
    overflow: 'visible'
  },
  card,
  cardHeader: {
    ...cardHeader,
    padding: "0",
    minHeight: "160px",
    ...defaultFont
  },
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  whiteCardHeader,
  cardContent: {
    padding: "15px 20px"
  },
  cardTitle: {
    marginTop: "0",
    marginBottom: "5px",
    ...defaultFont,
    fontSize: "1.175em"
  },
  cardCategory: {
    marginBottom: "0",
    color: grayColor,
    ...defaultFont,
    fontSize: "0.9em"
  },
  cardActions: {
    ...cardActions,
    padding: "0!important"
  },
  cardStats: {
    lineHeight: "22px",
    color: grayColor,
    fontSize: "12px",
    display: "inline-block",
    margin: "0!important"
  },
  cardStatsIcon: {
    position: "relative",
    top: "4px",
    width: "16px",
    height: "16px"
  },
  warningCardStatsIcon: {
    color: warningColor
  },
  primaryCardStatsIcon: {
    color: primaryColor
  },
  dangerCardStatsIcon: {
    color: dangerColor
  },
  successCardStatsIcon: {
    color: successColor
  },
  infoCardStatsIcon: {
    color: infoColor
  },
  roseCardStatsIcon: {
    color: roseColor
  },
  grayCardStatsIcon: {
    color: grayColor
  },
  cardStatsLink: {
    color: primaryColor,
    textDecoration: "none",
    ...defaultFont
  }
});

