const modalStyles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 60,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  modal: {
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
  },
  link: {
    display: 'flex',
    flexDirection: 'column',
  },
  caption: {
    marginTop: theme.spacing.unit,
  },
  closeModal: {
    display: 'flex',
    flexDirection: 'row-reverse',
    '&,&:hover': {
      cursor: 'pointer',
    }
  },
});
export default modalStyles;
