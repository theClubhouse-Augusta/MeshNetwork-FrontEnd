import {
  homeHeaderContent,
  homeHeaderContentTitle,
} from "../../variables/styles";

const homeStyle = theme => ({
  homeHeaderContent,
  homeHeaderContentTitle,
  '@media (max-width: 425px)': {
    homeHeaderContent: {
      padding: 15,
      fontSize: '0.8em'
    },
    homeMainSectionTitle: {
      textAlign: 'center'
    },
    homeHeaderContentTitle: {
      textAlign: 'center',
      padding: '30px 0 0 0',
    },
  },
  '@media (max-width: 1024px) and (min-width: 426px)': {
    homeHeaderContentTitle: {
      textAlign: 'center'
    }
  },
  '@media (max-width: 1024px) and (min-width: 426px) and (orientation: portrait)': {
    homeHeaderContentTitle: {
      textAlign: 'center',
    }
  },
  homeHeaderContainer: {
    width: '100%',
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: 'linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(https://s3.us-east-2.amazonaws.com/suggestify/88b757_banner.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  homeSignButtons: {
    width: '100%',
    maxWidth: 600,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  spanStyle: {
    color: '#ff4d58'
  },
  spanStyleTwo: {
    marginLeft: 10,
    fontSize: '0.9em',
    fontStyle: 'italic'
  },
  homeHeaderContentSubtitle: {
    fontFamily: "Noto Sans",
    color: '#cccccc',
    margin: '1em 2em',
    fallbacks: [{
      margin: '30px 0'
    }],
    textAlign: 'center'
  },
  homeHeaderContentSearchBar: {
    width: '60%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  homeMainSection: {
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottom: '1px solid #dddddd'
  },
  homeMainSectionTwo: {
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottom: '1px solid #dddddd',
    background: "#EEEEEE",
  },
  homeMainSectionTitle: {
    fontFamily: 'HankenBook, sans-serif',
    color: '#222222',
    fontSize: '2em',
    paddingTop: 15,
    // textAlign: 'center'
  },
  homeMainSectionSubtitle: {
    color: '#888888',
    fontFamily: '"Noto Sans"',
    fontSize: '0.9em',
    marginTop: 15,
    [theme.breakpoints.down("md")]: {
      textAlign: 'center'
    }
  },

});
export default homeStyle;
