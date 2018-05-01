// ##############################
// // // ProfileCard styles
// #############################

import { calCard, boxShadow, grayColor, defaultFont } from "../../variables/styles";

const calendarCardStyle = theme => ({
  card: {
    marginTop: "30px",
    textAlign: "center",
    ...calCard,
    boxSizing: 'border-box',
  },
  headline: {
    color: theme.typography.display1.color,
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.headline.fontSize,
      color: '#444',
    }
  },
  cardHeader: {
    display: "inline-block",
    width: "100%",
    padding: "0px"
  },
  cardAvatar: {
    maxWidth: "130px",
    maxHeight: "130px",
    margin: "-50px auto 0",
    borderRadius: "50%",
    overflow: "hidden",
    ...boxShadow
  },
  img: {
    width: "100%",
    height: "auto",
    verticalAlign: "middle",
    border: "0"
  },
  textAlign: {
    textAlign: "center"
  },
  cardSubtitle: {
    color: grayColor,
    ...defaultFont,
    fontSize: "1em",
    textTransform: "uppercase",
    //marginTop: "10px",
    marginBottom: "20px"
  },
  cardTitle: {
    ...defaultFont,
    fontSize: "1.3em",
    marginTop: "10px",
    marginBottom: "10px"
  },
  cardDescription: {
    ...defaultFont,
    padding: "15px 20px",
    margin: "0 0 10px"
  },
  cardActions: {
    height: "auto",
    display: "inline"
  }
});

export default calendarCardStyle;
