/*
 *
 * SpaceSignUp
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from 'components/Header';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

import './style.css';
import './styleM.css';

export default class SpaceSignUp extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      name:"",
      city:"",
      address:"",
      state:"",
      zipcode:"",
      email:"",
      website:"",
      phone_number:"",
      description:"",
      logo:"",
      logoPreview:"",
      msg:"",
      snack:false,
    }
  }

  handleRequestClose = () => { this.setState({ snack: false, msg: "" }); };
  showSnack = (msg) => { this.setState({ snack: true, msg: msg }); };

  handleName = (event) => { this.setState({name:event.target.value.replace(/\s\s+/g, ' ') })};
  handleCity = (event) => { this.setState({city:event.target.value})};
  handleAddress = (event) => { this.setState({address:event.target.value.replace(/\s\s+/g, ' ') })};
  handleState = (event) => {this.setState({state:event.target.value})};
  handleZip = (event) => {this.setState({zipcode:event.target.value})};
  handleEmail = (event) => {this.setState({email:event.target.value})};
  handleWebsite = (event) => {this.setState({website:event.target.value})};
  handlePhone = (event) => {this.setState({phone_number:event.target.value})};
  handleDescription = (event) => {this.setState({description:event.target.value})};
  handleLogo = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        logo: file,
        logoPreview: reader.result
      });
    }

    reader.readAsDataURL(file);
  };

  storeSpace = () => {
    let _this = this;
    let data = new FormData();
    let {
      name,
      city,
      address,
      state,
      zipcode,
      email,
      website,
      phone_number,
    } = this.state;

    data.append('name', name.trim());
    data.append('city', city.trim());
    data.append('address', address.trim());
    data.append('state', state.trim());
    data.append('zipcode', zipcode.trim());
    data.append('email', email.trim());
    data.append('website', website.trim());
    data.append('phone_number', phone_number.trim());
    data.append('description', this.state.description);
    data.append('logo', this.state.logo);

    fetch("http://localhost:8000/api/newspace", {
      method:'POST',
      body:data,
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(spaceID) {
      if(spaceID.error) {
        _this.showSnack(spaceID.error);
      }
        _this.showSnack("Workspace created successfully!");
        setTimeout(() => { 
          this.props.history.push(`/space/${spaceID}`)
        }, 2000);
    }.bind(this))
  }

  renderLogoImage = () => {
    if(this.state.logo !== "")
    {
      return(
        <img src={this.state.logoPreview} className="spaceLogoImagePreview"/>
      )
    }
  }

  renderLogoImageText = () => {
    if(this.state.logoPreview === "" || this.state.logoPreview === undefined || this.state.logoPreview === null) {
      return(
        <span style={{display:'flex', flexDirection:'column', textAlign:'center'}}>
          Select a Logo
          <span style={{fontSize:'0.9rem', marginTop:'5px'}}>For Best Size Use: 512 x 512</span>
        </span>
      )
    }
  }

  render() {
    return (
      <div className="container">
        <Helmet title="SpaceSignUp" meta={[ { name: 'description', content: 'Description of SpaceSignUp' }]}/>

        <header>
          <Header/>
        </header>

        <main className="spaceSignUpMain">
          <div className="spaceSignUpTitle">Create a New WorkSpace</div>
          <div className="spaceSignUpContainer">
            <TextField label="Organization Name" value={this.state.name} onChange={this.handleName} margin="normal"/>
            <TextField label="City" value={this.state.city} onChange={this.handleCity} margin="normal"/>
            <TextField label="Address" value={this.state.address} onChange={this.handleAddress} margin="normal"/>
            <TextField label="State" value={this.state.state} onChange={this.handleState} margin="normal"/>
            <TextField label="ZIP" value={this.state.zipcode} onChange={this.handleZip} margin="normal"/>
            <TextField label="E-mail" value={this.state.email} onChange={this.handleEmail} margin="normal"/>
            <TextField label="Website" value={this.state.website} onChange={this.handleWebsite} margin="normal"/>
            <TextField label="Phone #" value={this.state.phone_number} onChange={this.handlePhone} margin="normal"/>
            <TextField label="Brief Description" value={this.state.description} onChange={this.handleDescription} margin="normal"/>
            <div className="spaceLogoMainImageRow">
              <label htmlFor="logo-image" className="spaceLogoMainImageBlock">
                {this.renderLogoImageText()}
                {this.renderLogoImage()}
              </label>
              <input type="file" onChange={this.handleLogo} id="logo-image" style={{display:'none'}}/>
            </div>
            <FlatButton style={{backgroundColor:'#3399cc', padding:'10px', marginTop:'15px', color:'#FFFFFF', fontWeight:'bold'}} onClick={this.storeSpace}>Confirm New Space</FlatButton>
            <Link to={'/spaces'} style={{alignSelf:'center', width:'80%'}}><FlatButton style={{width:'100%', backgroundColor:'#BBBBBB', padding:'10px', marginTop:'30px', color:'#FFFFFF', fontWeight:'bold'}} >Not a Founder? Join a WorkSpace instead!</FlatButton></Link>
          </div>
        </main>

        <footer></footer>
        <Snackbar
          open={this.state.snack}
          message={this.state.msg}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

SpaceSignUp.contextTypes = {
  router: React.PropTypes.object
};
