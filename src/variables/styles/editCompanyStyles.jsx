export default theme => ({
  container: {
    width: '%100',
    margin: '0 auto',
    backgroundColor: '#E4E4E4',
  },
  spaceLogoMainImageRow: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  datePicker: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 30,
    marginBottom: 30,
    marginLeft: theme.spacing.unit * 2,
  },
  selectLabel: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.typography.caption.color,
    marginBottom: theme.spacing.unit,
  },
  selectInput: {
    marginTop: 20,
    marginLeft: '12%',
    marginRight: '12%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  spaceLogoMainImageBlock: {
    width: '48%',
    minHeight: 200,
    border: '8px dashed #DDDDDD',
    fontFamily: 'Lato',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyCcontent: 'center',
    fontSize: '1.5em',
    color: '#BBBBBB',
  },

  spaceLogoImagePreview: {
    maxHeight: '200px',
    maxWidth: '100%',
  },
  logoInput: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    height: '100%',
  },
  logoInputSubheader: {
    fontSize: '0.9rem',
    marginTop: '5px'
  },
});




