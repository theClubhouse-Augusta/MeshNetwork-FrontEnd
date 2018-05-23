export default theme => ({
  container: {
    background: '#eeeeee'
  },
  mainProfile: {
    width: '100%',
  },
  profileWrapper: {
    width: '100%',
    marginTop: 60,
  },
  profileHeaderImg: {
    width: 200,
    height: 200,
    borderRadius: '50%'
  },
  display1: {
    color: theme.typography.headline.color,
  },
  headline: {
    color: theme.typography.display1.color,
    fontWeight: theme.typography.display1.fontWeight,
    paddingBottom: theme.spacing.unit,
    borderBottom: '1px solid black'
  },
  dashButtonContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    borderBottom: '1px solid black',
    paddingBottom: theme.spacing.unit,
  },
  dashButton: {
    marginTop: theme.spacing.unit,
    border: '1px solid black',
    borderRadius: 4,
    width: '50%',
    maxHeight: 36,
  },
  dashButtonTwo: {
    marginTop: theme.spacing.unit,
    border: '1px solid black',
    borderRadius: 4,
    width: '200%',
    maxHeight: 36,
  },
  fullWidth: {
    width: '100%',
  },
  companyLogo: {
    height: 100,
    width: 100
  },
  profileSpaceBlockOne: {
    marginTop: theme.spacing.unit,
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
  },
  profileSpaceBlockThree: {
    marginTop: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
  },
  hideMobile: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
  },
  hideDesktop: {
    marginTop: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
  },
  profileSpaceBloc: {
    marginTop: theme.spacing.unit,
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  flexColumnTwo: {
    marginTop: theme.spacing.unit,
    borderTop: '1px solid black',
    display: 'flex',
    flexDirection: 'column'
  },
  flexRow: {
    display: 'flex',
    // justifyContent: 'space-between',
    width: '100%',
  },
  profileSocialList: {
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  chipStyleThree: {
    // [theme.breakpoints.up('md')]: {
    background: '#a49d9d',
    color: '#fff',
    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    borderRadius: 5,
    "&:nth-child(1)": {
      marginLeft: 0,
    },
    "&:nth-child(4)": {
      marginRight: theme.spacing.unit * 2,
    }
    // },
  },
  verticalChip: {
    // [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing.unit,
    background: '#a49d9d',
    fontStyle: theme.typography.button.fontStyle,
    fontWeight: theme.typography.button.fontWeight,
    // fontWeight: theme.typography.button.fontWeight,
    color: '#fff',
    borderRadius: 5,
    marginTop: theme.spacing.unit,
    "&:nth-child(1)": {
      width: '125%',
      // marginLeft: -20
    },
    "&:nth-child(2)": {
      // marginLeft: 20
    },
    "&:nth-child(3)": {
      width: '125%',
    },
    "&:nth-child(4)": {
    },
  },
  chipStyle: {
    [theme.breakpoints.up('md')]: {
      color: "#fff",
      margin: "5px",
      borderRadius: "5px",
      fontWeight: theme.typography.button.fontWeight,
      fontSize: theme.typography.button.fontSize,
      width: '35%',
      height: 20,
      background: '#a49d9d',
      "&:nth-child(3)": {
        marginRight: theme.spacing.unit * 2,
      },
      "&:nth-child(4)": {
        marginRight: theme.spacing.unit * 2,
      }
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
  chipStyleTwo: {
    [theme.breakpoints.up('md')]: {
      color: "#fff",
      fontWeight: theme.typography.button.fontWeight,
      fontSize: theme.typography.button.fontSize,
      background: '#a49d9d',
      "&:nth-child(1)": {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
      },
      "&:nth-child(2)": {
        marginBottom: theme.spacing.unit,
      },
      "&:nth-child(3)": {
        marginRight: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit,
      },
      "&:nth-child(4)": {
        marginRight: theme.spacing.unit * 2,
      }
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
  profileIconStyle: {
    color: '#a49d9d',
    fontSize: '2em',
    marginTop: 8,
    marginLeft: 10,
    cursor: 'pointer',
  },
  profileSkillsList: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
    // marginLeft: 12,
  },
  profileSkillsListTwo: {
    display: 'flex',
    marginLeft: '10%',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
    },
  },
  '@keyframes profileFlicker': {
    '0%': {
      background: 'rgba(255, 255, 255, 0.5)'
    },
    '100%': {
      background: 'rgba(255, 255, 255, 0.1)'
    }
  },
});
