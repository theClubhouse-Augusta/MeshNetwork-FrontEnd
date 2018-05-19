export default theme => ({
  UPcontainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    justifyContent: 'space-between',
  },
  display2: {
    color: "rgba(19, 18, 18, 0.67)",

    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing.unit,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.display1.fontSize,
      marginBottom: theme.spacing.unit * 2,
    }
  },
  display1: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.headline.fontSize,
      color: '#444',
    }
  },
  bookingType: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.headline.fontSize,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.headline.fontSize,
      color: '#444',
    }
  },
  onHover: {
    cursor: 'pointer',
  },
  homeFooterContainer: {
    background: '#261e1e',
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#bbbbbb',
    fontFamily: "Noto Sans",
    fontsize: '0.8em',
    [theme.breakpoints.down("md")]: {
      padding: '15px',
      textAlign: 'center'
    },
  },

  mainProfile: {
    width: '100%',
    maxWidth: 960,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#eeeeee'
  },
  chipStyle: {
    [theme.breakpoints.up('md')]: {
      color: "#fff",
      margin: "5px",
      borderRadius: "5px",
      // width: 120,
      // height: 70,
      width: 50,
      height: 40,
      background: "rgb(218, 73, 83)",
    },
    [theme.breakpoints.down('sm')]: {
      color: "#fff",
      margin: "5px",
      borderRadius: "5px",
      width: 60,
      height: 35,
      background: "rgb(218, 73, 83)",
    }
  },
  company: {
    [theme.breakpoints.up('md')]: {
      color: "#fff",
      margin: "5px",
      borderRadius: "5px",
      width: 120,
      height: 70,
      background: "rgb(218, 73, 83)",
    },
    [theme.breakpoints.down('sm')]: {
      color: "#fff",
      margin: "5px",
      borderRadius: "5px",
      width: 60,
      height: 35,
      background: "rgb(218, 73, 83)",
    }
  },
  memberSearchTagDiv: {
    width: '200%',
    display: 'inline-block',
    border: '1px solid black'
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
  profileAttending: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 300,
    background: '#555555'
  },
  profileAttendingHeader: {
    fontSize: theme.typography.headline.fontSize,
    minHeight: 40,
    background: '#ddd',
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
    margin: 10,
    color: 'white',
  },
  '@keyframes profileFlicker': {
    '0%': {
      background: 'rgba(218, 73, 83, 0.9)',
    },
    '100%': {
      background: 'rgba(218, 73, 83, 0.5)',
    }
  }
});




