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
    backgroundColor: 'black'
  },
  mainProfile: {
    width: '100%',
    maxWidth: 1000,
    margin: '0 auto',
    marginTop: 60,
    backgroundColor: '#FFFFFF'
  },
  profileHeader: {
    top: '10em',
    minHeight: 200,
    background: '#EEEEEE',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  avatar: {
    height: 200,
    width: 200
  },
  profileInfo: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column'
  },
  profileName: {
    fontSize: '3em',
    minWidth: 400,
    minHeight: 50
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
    width: '100%',
    background: '#eeeeee',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
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
    backgroundColor: '#111111',
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
  tagHeader: {
    textAlign: 'center',
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




