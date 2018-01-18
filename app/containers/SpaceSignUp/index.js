/*
 *
 * SpaceSignUp
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from 'components/Header';
import PropTypes from 'prop-types';

import {EditorState, convertToRaw} from 'draft-js';
import drafToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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
      userName:"",
      userEmail:"",
      userPassword:"",
      state:"",
      zipcode:"",
      email:"",
      website:"",
      phone_number:"",
      description:EditorState.createEmpty(),
      logo:"",
      logoPreview:"",
      msg:"",
      snack:false,
    }
  }

  handleRequestClose = () => { this.setState({ snack: false, msg: "" }); };
  showSnack = (msg) => { this.setState({ msg: msg }); };

  handleName = (event) => { this.setState({name:event.target.value.replace(/\s\s+/g, ' ') })};
  handleCity = (event) => { this.setState({city:event.target.value})};
  handleAddress = (event) => { this.setState({address:event.target.value.replace(/\s\s+/g, ' ') })};
  handleState = (event) => {this.setState({state:event.target.value})};
  handleZip = (event) => {this.setState({zipcode:event.target.value})};
  handleEmail = (event) => {this.setState({email:event.target.value})};
  handleWebsite = (event) => {this.setState({website:event.target.value})};
  // handlePassword = (event) => {this.setState({password:event.target.value})};
  handlePhone = (event) => {this.setState({phone_number:event.target.value})};
  handleDescription = (editorState) => {this.setState({description: editorState, editorState: editorState})};
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

  handleUserName = (event) => {this.setState({userName:event.target.value})};
  handleUserEmail = (event) => {this.setState({userEmail:event.target.value})};
  handleUserPassword = (event) => {this.setState({userPassword:event.target.value})};
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

  storeUser = spaceID => {
    let data = new FormData();
    let {
      userName,
      userEmail,
      userPassword,
      avatar
    } = this.state;

    data.append('name', userName.trim());
    data.append('email', userEmail.trim());
    data.append('password', userPassword.trim());
    data.append('spaceID', spaceID);
    data.append('avatar', avatar);
    data.append('organizer', true);

    fetch("http://innovationmesh.com/api/signUp", {
      method:'POST',
      body:data,
    })
    .then(response => response.json())
    .then(user => {
      if (user.error) {
        this.showSnack(user.error);
      } else {
        localStorage['token'] = user.token;
      }
    })
    .catch(error => {
      alert(`signUp ${error}`);
    })
  }

  storeSpace = () => {
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
      data.append('description', drafToHtml(convertToRaw(this.state.description.getCurrentContent())));
    data.append('logo', this.state.logo);

    fetch("http://innovationmesh.com/api/newspace", {
      method:'POST',
      body:data,
    })
    .then(response => response.json())
    .then(spaceID => {
      console.log('one');
      if(spaceID.error) {
        console.log('two');
        this.showSnack(spaceID.error);
      } else {
        this.storeUser(spaceID);
        this.showSnack("Thanks! We will review your workspace and be in contact soon.");
        setTimeout(() => {
          this.props.history.push(`/space/${spaceID}`)
        }, 2000);
      }
    })
  }

  renderLogoImage = () => {
    if(this.state.logo !== "")
    {
      return(
        <img src={this.state.logoPreview} className="spaceLogoImagePreview" alt="" />
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

  renderAvatarImage = () => {
    if(this.state.avatar !== "")
    {
      return(
        <img alt="" src={this.state.avatarPreview} className="spaceLogoImagePreview"/>
      )
    }
  }

  renderAvatarImageText = () => {
    if(this.state.avatarPreview === "" || this.state.avatarPreview === undefined || this.state.avatarPreview === null) {
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
      <div className="spaceSignUpcontainer">
        <Helmet title="SpaceSignUp" meta={[ { name: 'description', content: 'Description of SpaceSignUp' }]}/>

        <header>
          <Header backgroundColor="#FFFFFF"/>
          <div className="spaceSignUpBanner">
            <div className="homeHeaderContentTitle">Add your CoWorking Space</div>
            <div className="homeHeaderContentSubtitle">Join our Mesh Network of Innovation</div>
          </div>
        </header>

        <main className="spaceSignUpMain">
          <div className="spaceSignUpUser">
            <div className="spaceSignUpTitle">Create a Founder</div>
            <TextField label="Founder Full Name" value={this.state.userName} onChange={this.handleUserName} margin="normal"/>
            <TextField label="Founder E-mail" value={this.state.userEmail} onChange={this.handleUserEmail} margin="normal"/>
            <TextField type="password" label="Founder Password" value={this.state.userPassword} onChange={this.handleUserPassword} margin="normal"/>
            <div className="spaceLogoMainImageRow">
              <label htmlFor="avatar-image" className="spaceLogoMainImageBlock">
                {this.renderAvatarImageText()}
                {this.renderAvatarImage()}
              </label>
              <input type="file" onChange={this.handleAvatar} id="avatar-image" style={{display:'none'}}/>
            </div>
          </div>
          <div className="spaceSignUpContainer">
            <TextField label="Organization Name" value={this.state.name} onChange={this.handleName} margin="normal"/>
            <TextField label="City" value={this.state.city} onChange={this.handleCity} margin="normal"/>
            <TextField label="Address" value={this.state.address} onChange={this.handleAddress} margin="normal"/>
            <TextField label="State" value={this.state.state} onChange={this.handleState} margin="normal"/>
            <TextField label="ZIP" value={this.state.zipcode} onChange={this.handleZip} margin="normal"/>
            <TextField label=" Organization E-mail" value={this.state.email} onChange={this.handleEmail} margin="normal"/>
            <TextField label="Website" value={this.state.website} onChange={this.handleWebsite} margin="normal"/>
            <TextField label="Phone #" value={this.state.phone_number} onChange={this.handlePhone} margin="normal"/>
            <Editor
                editorState={this.state.description}
                toolbarClassName="home-toolbar"
                wrapperClassName="home-wrapper"
                editorClassName="rdw-editor-main"
                onEditorStateChange={this.handleDescription}
                placeholder="Describe your WorkSpace here in great detail. Be sure to include as much as can about the features of your space."
                toolbar={{
                  inline: { inDropdown: true },
                  fontSize:{ className: "toolbarHidden",},
                  fontFamily:{className: "toolbarHidden",},
                  list: { inDropdown: true, options: ['unordered', 'ordered'] },
                  textAlign: { inDropdown: true,  options: ['left', 'center', 'right'] },
                  link: { inDropdown: true },
                  remove:{className: "toolbarHidden",},
                  emoji: {className: "toolbarHidden",},
                  history: {className: "toolbarHidden",},
                }}
              />
            <div className="spaceLogoMainImageRow">
              <label htmlFor="logo-image" className="spaceLogoMainImageBlock">
                {this.renderLogoImageText()}
                {this.renderLogoImage()}
              </label>
              <input type="file" onChange={this.handleLogo} id="logo-image" style={{display:'none'}}/>
            </div>
            <FlatButton
              style={{backgroundColor:'#ff4d58', padding:'10px', marginTop:'15px', color:'#FFFFFF', fontWeight:'bold', paddingTop:'15px', paddingBottom:'15px'}}
              onClick={this.storeSpace}
            >
              Confirm New Space
            </FlatButton>
            <Link to={'/spaces'} style={{alignSelf:'center', width:'80%'}}><FlatButton style={{width:'100%', backgroundColor:'#FFFFFF', padding:'10px', marginTop:'30px', color:'#ff4d58', fontWeight:'bold', border:'1px solid #CCCCCC', paddingTop:'15px', paddingBottom:'15px'}} >Not a Founder? Join a WorkSpace instead!</FlatButton></Link>
          </div>
        </main>

        <footer className="homeFooterContainer">
          Copyright © 2018 theClubhou.se  • 540 Telfair Street  •  Tel: (706) 723-5782
        </footer>

        <Snackbar
          message={this.state.msg}
          autoHideDuration={3000}
        />
      </div>
    );
  }
}

SpaceSignUp.contextTypes = {
  router: PropTypes.object
};
