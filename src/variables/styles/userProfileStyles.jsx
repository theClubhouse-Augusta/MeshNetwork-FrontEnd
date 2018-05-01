// ##############################
// // // UserProfile styles
// #############################
import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont
} from "../../variables/styles";

const isDesktop = !!(window.innerWidth >= 700);
let mBottom, fSize;
if (isDesktop) {
  mBottom = 10;
  fSize = '2em';
} else {
  mBottom = 50;
  fSize = '1.5em';
}
const userProfileStyles = theme => {
  console.log('t', theme.typography.button.fontSize);
  return ({
    UPcontainer: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#eeeeee',
      justifyContent: 'space-between',
    },
    display2: {
      color: "rgba(19, 18, 18, 0.67)",
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.display1.fontSize,
      }
    },
    display1: {
      marginTop: theme.spacing.unit,
      marginLeft: theme.spacing.unit,
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.headline.fontSize,
        color: '#444',
      }
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

    tableActionButtonIcon: {
      width: "25px",
      height: "25px"
    },
    edit: {
      background: "rgb(218, 73, 83)",
      borderRadius: '50%',
      padding: 5,
      color: 'white',
      boxShadow: "none"
    },
    homeHeaderContentTitle: {
      fontFamily: "Lato, sans-serif",
      color: "#656060",
      fontSize: fSize,
      textAlign: 'center',
      fontWeight: '500',
      paddingTop: 0,
      marginBottom: mBottom,
    },
    mainProfile: {
      width: '100%',
      maxWidth: 960,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#eeeeee'
    },
    profileHeader: {
      minHeight: 200,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    editButton: {
      display: 'flex',
      margin: '0 auto',
      width: '95%',
      justifyContent: 'space-between',
    },
    headerSection: {
      width: '100%',
      color: 'hotpink',
    },
    memberSearchTagContainer: {
      width: '100%',
      textAlign: 'center',
      border: '1px solid hotpink'
    },
    memberSearchTagDiv: {
      width: '200%',
      display: 'inline-block',
      border: '1px solid black'
    },
    memberSearchTagSelect: {
      width: '100%',
      marginBottom: '15px',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    memberSearchBanner: {
      width: '100%',
      height: 200,
      background: '#2992CC',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#ffffff',
    },
    memberSearchHeaderTitle: {
      font: "300 46px/52px 'Lato', 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      color: '#ffffff',
    },
    memberSearchHeaderSubtitle: {
      fontFamily: "Noto Sans",
      color: '#cccccc',
      margin: '15px 0',
    },
    avatar: {
      boxSizing: 'border-box',
      height: 'auto',
      width: '100%',
      padding: 50,
    },
    profileInfo: {
      padding: 10,
      display: 'flex',
      flexDirection: 'column'
    },
    profileName: {
      fontSize: 32,
    },
    profileSkillsList: {
      width: '30%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: '15px',
      justifyContent: 'space-between',
      border: '1px solid black'
    },
    eventDetailSectionContent: {
      fontFamily: "Noto Sans",
    },
    eventDetailDates: {
      display: 'flex',
      flexDirection: 'column',
    },
    eventDetailsDateBlock: {
      display: 'flex',
      flexDirection: 'row',
      padding: '10px',
      background: '#eeeeee',
      borderRadius: '5px',
      marginBottom: '10px',
      fontFamily: 'Noto Sans',
    },
    profileTitle: {
      minWidth: 500,
      minHeight: 30,
      marginTop: 10
    },
    profileSpace: {
      minWidth: 500,
      minHeight: 30,
      marginTop: 10
    },
    profileSocial: {
      minWidth: 500,
      minHeight: 40,
      marginTop: 10
    },
    profileColumns: {
      background: '#CCCCCC',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'row'
    },
    profileColumnLeft: {
      width: '30%',
      minHeight: '100vh',
      background: '#BBBBBB',
      borderRight: '1px solid #DDDDDD'
    },
    profileTagCloud: {
      // width: '100%',
      color: '#111',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      // justifyContent: 'space-between'
    },
    EventTag: {
      cursor: 'pointer',
      height: 30,
      width: 70,
      backgroundColor: '#111111',
      margin: 10,
      borderRadius: 5,
      color: 'white',
      textAlign: 'center'
    },
    profileTag: {
      height: 30,
      width: 70,
      backgroundColor: '#eee',
      margin: 10,
      borderRadius: 5,
      color: 'white',
      textAlign: 'center'
    },
    profileMentorship: {
      minHeight: 200,
      width: '100%',
      background: '#999999'
    },
    profileEvents: {
      minHeight: 300,
      width: '100%',
      background: '#888888'
    },
    profileColumnRight: {
      display: 'flex',
      flexDirection: 'column',
      width: '70%'
    },
    profileBio: {
      width: '100%',
      minHeight: 500,
      background: '#777777'
    },
    bioHeader: {
      display: 'flex',
      justifyContent: 'center',
      minHeight: 40,
      background: '#666666',
      margin: 15
    },
    profileBioContent: {
      display: 'flex',
      minHeight: 600,
      background: '#666666',
      margin: 15
    },
    profileAttending: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: 300,
      background: '#555555'
    },
    profileAttendingHeader: {
      minHeight: 40,
      background: '#444444',
      margin: 15,
      textAlign: 'center'
    },
    profileAttendingContent: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: 200,
      background: '#444444',
      margin: 15
    },
    profileAttendingItem: {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      minHeight: 40,
      background: '#333333',
      margin: 10
    },
    '@keyframes profileFlicker': {
      '0%': {
        background: 'rgba(218, 73, 83, 0.9)',
      },
      '100%': {
        background: 'rgba(218, 73, 83, 0.5)',
      }
    }
    // },
  })
};
export default userProfileStyles;




