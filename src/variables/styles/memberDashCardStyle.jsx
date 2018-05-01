// ##############################
// // // ProfileCard styles
// #############################

import { meshCard, boxShadow, grayColor, defaultFont } from "../../variables/styles";

const memberDashCardStyle = theme => ({
  card: {
    marginTop: "1.875rem",
    marginBottom: "1.875rem",
    textAlign: "center",
    ...meshCard,
    boxSizing: 'border-box',
    [theme.breakpoints.down('md')]: {
      marginTop: '0.9375rem',
    },
  },
  root: {
    overflow: 'visible'
  },
  cardHeader: {
    display: "inline-block",
    width: "100%",
    padding: "0px",
  },
  cardAvatar: {
    maxWidth: "130px",
    maxHeight: "130px",
    // margin: "-50px auto 0",
    // marginTop: 50,
    margin: '3% auto 0 auto',
    borderRadius: "50%",
    overflow: "hidden",
    ...boxShadow
  },
  companyAvatar: {
    maxWidth: "130px",
    maxHeight: "130px",
    margin: "0 auto 0",
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
    marginTop: "10px",
    marginBottom: "10px"
  },
  cardTitle: {
    ...defaultFont,
    fontSize: "1.3em",
    // marginTop: "10px",
    // marginBottom: "10px"
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

export default memberDashCardStyle;
