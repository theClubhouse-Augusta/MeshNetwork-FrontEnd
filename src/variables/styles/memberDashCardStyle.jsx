// ##############################
// // // ProfileCard styles
// #############################

import { meshCard, boxShadow, grayColor, defaultFont } from "../../variables/styles";

const memberDashCardStyle = theme => {

  console.log(theme.typography.display1.fontSize)
  return ({
    card: {
      [theme.breakpoints.up('md')]: {
        // marginTop: "1.875rem",
        // marginBottom: "1.875rem",
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        textAlign: "center",
        ...meshCard,
        boxSizing: 'border-box',
      },
      [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing.unit,
      },
    },
    contentSection: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    display1: {
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 2,
      marginLeft: theme.spacing.unit,
      [theme.breakpoints.down('md')]: {
        fontSize: '1.80rem',
      }
    },
    edit: {
      background: "rgb(218, 73, 83)",
      borderRadius: '50%',
      padding: 5,
      color: 'white',
      boxShadow: "none"
    },
    tableActionButtonIcon: {
      width: "25px",
      height: "25px"
    },
    tooltip: {
      padding: "10px 15px",
      minWidth: "130px",
      color: "#555555",
      lineHeight: "1.7em",
      background: "#FFFFFF",
      border: "none",
      borderRadius: "3px",
      boxShadow:
        "0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)",
      maxWidth: "200px",
      textAlign: "center",
      fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "400",
      textShadow: "none",
      textTransform: "none",
      letterSpacing: "normal",
      wordBreak: "normal",
      wordSpacing: "normal",
      wordWrap: "normal",
      whiteSpace: "normal",
      lineBreak: "auto"
    },
    editButton: {
      display: 'flex',
      margin: '0 auto',
      width: '95%',
      justifyContent: 'space-between',
    },
    memberSearchTagSelect: {
      margin: '0 auto',
      fontSize: theme.typography.button.fontSize,
      width: '85%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    headerSection: {
      marginBottom: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit,
    },
    root: {
      overflow: 'visible'
    },
    cardHeader: {
      padding: "0px",
    },
    cardAvatar: {
      marginLeft: theme.spacing.unit * 2,
      borderRadius: "50%",
      overflow: "hidden",
      ...boxShadow
    },
    companyAvatar: {
      margin: "0 auto 0",
      borderRadius: "50%",
      overflow: "hidden",
      ...boxShadow
    },
    img: {

      [theme.breakpoints.up('md')]: {
        width: 130,
        height: 130,
        verticalAlign: "middle",
        border: "0"
      },

      [theme.breakpoints.down('sm')]: {
        width: 90,
        height: 90,
        verticalAlign: "middle",
        border: "0"
      },
    },
    textAlign: {
      textAlign: "center"
    },
    cardSubtitle: {
      [theme.breakpoints.up('md')]: {
        color: grayColor,
        ...defaultFont,
        fontSize: "1rem",
        textTransform: "uppercase",
        marginTop: "10px",
        marginBottom: "10px",
      },
      [theme.breakpoints.down('md')]: {
        color: grayColor,
        ...defaultFont,
        fontSize: ".8rem",
        textTransform: "uppercase",
      },
    },
    cardTitle: {
      [theme.breakpoints.up('md')]: {
        ...defaultFont,
        fontSize: "1.3rem",
      },
      [theme.breakpoints.down('md')]: {
        ...defaultFont,
        fontSize: "1rem",
      },
    },
    cardDescription: {
      ...defaultFont,
      padding: "15px 20px",
      margin: "0 0 10px"
    },

  })
};

export default memberDashCardStyle;
