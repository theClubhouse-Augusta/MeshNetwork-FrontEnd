/*
 *
 * SpaceSignUp
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from 'components/Header';

import {EditorState, ContentState, convertFromHTML, convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
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
      password:"",
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
  showSnack = (msg) => { this.setState({ snack: true, msg: msg }); };

  handleName = (event) => { this.setState({name:event.target.value})};
  handleCity = (event) => { this.setState({city:event.target.value})};
  handlePassword = (event) => { this.setState({password:event.target.value})};
  handleAddress = (event) => { this.setState({address:event.target.value})};
  handleState = (event) => {this.setState({state:event.target.value})};
  handleZip = (event) => {this.setState({zipcode:event.target.value})};
  handleEmail = (event) => {this.setState({email:event.target.value})};
  handleWebsite = (event) => {this.setState({website:event.target.value})};
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

  storeSpace = () => {
    let _this = this;
    let data = new FormData();

    data.append('name', this.state.name);
    data.append('password', this.state.password);
    data.append('city', this.state.city);
    data.append('address', this.state.address);
    data.append('state', this.state.state);
    data.append('zipcode', this.state.zipcode);
    data.append('email', this.state.email);
    data.append('website', this.state.website);
    data.append('phone_number', this.state.phone_number);
    data.append('description', draftToHtml(convertToRaw(this.state.description.getCurrentContent())));
    data.append('logo', this.state.logo);

    fetch("http://innovationmesh.com/api/newspace", {
      method:'POST',
      body:data,
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if(json.error) {
        _this.showSnack(json.error);
      }
      else if(json.success){
        _this.showSnack(json.error);
      }
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
            <TextField label="Password" value={this.state.password} onChange={this.handlePassword} margin="normal" type="password"/>
            <TextField label="City" value={this.state.city} onChange={this.handleCity} margin="normal"/>
            <TextField label="Address" value={this.state.address} onChange={this.handleAddress} margin="normal"/>
            <TextField label="State" value={this.state.state} onChange={this.handleState} margin="normal"/>
            <TextField label="ZIP" value={this.state.zipcode} onChange={this.handleZip} margin="normal"/>
            <TextField label="E-mail" value={this.state.email} onChange={this.handleEmail} margin="normal"/>
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
