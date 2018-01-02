/*
 *
 * UserSignUp
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import Select from 'react-select';

import './style.css';
import './styleM.css';

export default class UserSignUp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      email:"",
      password:"",
      phoneNumber:"",
      skills:[],
      avatar:"",
      avatarPreview:"",
      selectedOption: '',
      skills:[],
      msg:"",
      snack:false,
    }
  }

  componentWillMount() {
    this.getSkills();
  }

  handleRequestClose = () => { this.setState({ snack: false, msg: "" }); };
  showSnack = (msg) => { this.setState({ snack: true, msg: msg }); };

  handleName = (event) => {this.setState({name:event.target.name})};
  handleEmail = (event) => {this.setState({email:event.target.email})};
  handlePassword = (event) => {this.setState({password:event.target.password})};
  handleAvatar = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        avatar: file,
        avatarPreview: reader.result
      });
    }

    reader.readAsDataURL(file);
  };

  handleSkills = (selectedOption) => {
    this.setState({ selectedOption });
  }

  getSkills = () => {
    fetch("http://innovationmesh.com/api/skills/all", {
      method:'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        skills:json
      })
    }.bind(this))
  }

  renderAvatarImage = () => {
    if(this.state.logo !== "")
    {
      return(
        <img src={this.state.logoPreview} className="spaceLogoImagePreview"/>
      )
    }
  }

  renderAvatarImageText = () => {
    if(this.state.logoPreview === "" || this.state.logoPreview === undefined || this.state.logoPreview === null) {
      return(
        <span style={{display:'flex', flexDirection:'column', textAlign:'center'}}>
          Select an Avatar
          <span style={{fontSize:'0.9rem', marginTop:'5px'}}>For Best Size Use: 512 x 512</span>
        </span>
      )
    }
  }


  render() {
    return (
      <div className="container">
        <Helmet title="UserSignUp" meta={[ { name: 'description', content: 'Description of UserSignUp' }]}/>

        <header>
          <Header/>
        </header>

        <main className="spaceSignUpMain">
          <div className="spaceSignUpTitle">Join Our Mesh Network!</div>
          <div className="spaceSignUpContainer">
            <TextField label="Full Name" value={this.state.name} onChange={this.handleName} margin="normal"/>
            <TextField label="E-mail" value={this.state.email} onChange={this.handleEmail} margin="normal"/>
            <TextField label="Password" value={this.state.password} onChange={this.handlePassword} margin="normal"/>
            <Select
              name="addSkills"
              value={this.state.selectedOption.value}
              onChange={this.handleSkills}
              options={this.state.skills}
              removeSelected={false}
              multi={true}
              placeholder="Tell us about your Skills..."
            />
            <TextField label="Brief Description" value={this.state.description} onChange={this.handleDescription} margin="normal"/>
            <div className="spaceLogoMainImageRow">
              <label htmlFor="avatar-image" className="spaceLogoMainImageBlock">
                {this.renderAvatarImageText()}
                {this.renderAvatarImage()}
              </label>
              <input type="file" onChange={this.handleAvatar} id="avatar-image" style={{display:'none'}}/>
            </div>
            <FlatButton style={{backgroundColor:'#3399cc', padding:'10px', marginTop:'15px', color:'#FFFFFF', fontWeight:'bold'}} onClick={this.signUp}>Confirm Sign Up</FlatButton>
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

UserSignUp.contextTypes = {
  router: React.PropTypes.object
};
