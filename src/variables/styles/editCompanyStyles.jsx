const editCompanyStyles = theme => ({
  container: {
    width: '%100',
    margin: '0 auto',
    backgroundColor: '#E4E4E4',
  },
  spaceLogoMainImageRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 15,
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
export default editCompanyStyles;




