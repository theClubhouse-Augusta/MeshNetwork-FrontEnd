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

const userProfileStyles = theme => ({
  UPcontainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#eeeeee',
    // background: '#4dffea',
    justifyContent: 'space-between',
    // maxWidth: '100vw',
  },
  mainProfile: {
    width: '100%',
    maxWidth: 1000,
    margin: '0 auto',
    // marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    //  margin-top: 20px;
    // minHeight: 'calc(100vh - 255px)',
    backgroundColor: '#eeeeee'
    // background: '#4dffea',
  },
  profileHeader: {
    // top: '10em',
    minHeight: 200,
    //    background: '#4dffea',
    //  background: '#EEEEEE',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerSection: {
    width: '100%',
    color: 'hotpink',
    // border: '10px solid black',
  },
  memberSearchBanner: {
    width: '100%',
    height: 200,
    // background: "linear-gradient(to right, #a1d3b0, #f6f1d3)",
    // background: '#293f50',
    // background: "linear-gradient(60deg, #ff4d58, #e53935)",
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
    // background: #293f50,
    // fontFamily: "Lato, sans-serif",
    color: '#ffffff',
    // fontSize: '2em'
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
  grid: {
    // padding: 15,
  },
  profileInfo: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column'
  },
  profileName: {
    fontSize: 32,
    // minWidth: 400,
    // minHeight: 50
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
  }

});
export default userProfileStyles;




