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
  profileSpaceBlock: {
    marginTop: theme.spacing.unit,
  },
  profileSocialList: {
    width: '50%',
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
  },
  profileSkillsListTwo: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing.unit * 5
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


