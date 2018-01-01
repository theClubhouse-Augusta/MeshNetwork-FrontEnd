/*
 *
 * UserSignUp
 *
 */
import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import Select from 'react-select';

import Header from 'components/Header';

// styles
import StyleHelpers from '../../utils/StyleHelpers';
import './style.css';
import './styleM.css';

export default class UserSignUp extends React.Component {

  state = {
    name:"",
    email:"",
    password: "",
    bio: "",
    loadedTags: [],
    selectedTags: [],
    avatar: '',
    imagePreviewUrl: '',
    // foo
    msg:"",
    snack:false,
    focused: false,
  };

  path = this.props.location.pathname.split('/');
  spaceID = this.path[this.path.length - 1];

  componentDidMount() {
    this.loadSkills();
  }

  loadSkills = () => {
    fetch('http://localhost:8000/api/skills/all', {
      headers: { Authorization: `Bearer ${localStorage['token']}` },
    })
    .then(response => response.json())
    .then(json => {this.setState({ loadedTags:json })})
    .catch(error => {
      alert(`error in fetching data from server: ${error}`);
    });
  }

  selectTag = selectedTag => {
    this.setState({ selectedTags: selectedTag });
  }

  handleRequestClose = () => { this.setState({ snack: false, msg: "" }); };
  showSnack = (msg) => { this.setState({ snack: true, msg: msg }); };

  handleName = (event) => { this.setState({name:event.target.value.replace(/\s\s+/g, ' ') })};
  handleEmail = (event) => {this.setState({email:event.target.value})};
  handlePassword = (event) => {this.setState({password:event.target.value})};
  handleBio = (event) => {this.setState({bio:event.target.value})};
  handleAvatar = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        avatar: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file);
  };

  storeUser = () => {
    let data = new FormData();
    let {
      name,
      email,
      password,
      bio,
      selectedTags,
      avatar
    } = this.state;

    data.append('name', name.trim());
    data.append('tags', JSON.stringify(selectedTags));
    data.append('email', email.trim());
    data.append('password', password.trim());
    data.append('bio', bio.trim());
    data.append('spaceID', this.spaceID);
    data.append('avatar', avatar);

    fetch("http://localhost:8000/api/signUp", {
      method:'POST',
      body:data,
    })
    .then(response => response.json())
    .then(user => {
      if (user.error) {
        this.showSnack(user.error);
      }
        localStorage['token'] = user.token;
        this.showSnack("Account created successfully!");
        setTimeout(() => {
          this.props.history.push(`/user/${user.id}`)
        }, 2000);
    })
    .catch(error => {
      alert(`signUp ${error}`);
    })
  }

  renderAvatarImage = () => {
    if(this.state.avatar !== "")
    {
      return(
        <img src={this.state.imagePreviewUrl} className="spaceLogoImagePreview"/>
      )
    }
  }

  renderAvatarImageText = () => {
    if (this.state.imagePreviewUrl === "" || this.state.imagePreviewUrl === undefined || this.state.imagePreviewUrl === null) {
      return(
        <span style={{display:'flex', flexDirection:'column', textAlign:'center'}}>
          Select a profile picture
          <span style={{fontSize:'0.9rem', marginTop:'5px'}}>
            For Best Size Use: 512 x 512
          </span>
        </span>
      )
    }
  }
  onFocus = () => this.setState({ focused: true });
  onBlur = () => this.setState({ focused: false });

  render() {
    const { selectedTags, loadedTags, focused } = this.state;
    const Helper = new StyleHelpers;
    const marginTop = Helper.getLabelStyle(focused, selectedTags)[0];
    const color = Helper.getLabelStyle(focused, selectedTags)[1];
    return (
      <div className="container">
        <Helmet title="SpaceSignUp" meta={[ { name: 'description', content: 'Description of SpaceSignUp' }]}/>
        <Header/>

        <main className="spaceSignUpMain">
          <div className="spaceSignUpTitle">Join Our Mesh Network!</div>
          <div className="spaceSignUpContainer">
            <TextField 
              label="Full Name" 
              value={this.state.name} 
              onChange={this.handleName} 
              margin="normal"
            />
            <TextField 
              type="email" 
              label="Email" 
              value={this.state.email} 
              onChange={this.handleEmail} 
              margin="normal"
            />
            <TextField 
              type="password" 
              label="Password" 
              value={this.state.password} 
              onChange={this.handlePassword} 
              margin="normal"
            />
            <TextField label="Bio" 
              value={this.state.bio} 
              onChange={this.handleBio}
              margin="normal"
            />
            <label 
              style={{
                marginTop: marginTop,
                color: color,
              }}
              //className={StyleHelpers.getC(focused, selectedTags)} 
              className={Helper.getLabelClassName(focused, selectedTags)}
            >
              Skills
            </label>

              {/* //: !focused && !!!selectedTags.length
              : false
              ? "MyInputLabel-animated-9 MyInputLabel-formControl-6 MyInputLabel-root-5 MyInputLabel-root-11" 
              : true
              ? "MyInputLabel-animated-9 MyInputLabel-shrink-8 MyInputLabel-focused-122 MyInputLabel-formControl-62 MyInputLabel-root-112"
              : "MyInputLabel-animated-9 MyInputLabel-formControl-6 MyInputLabel-root-5 MyInputLabel-root-11" */}
            {!!loadedTags.length && 
            <Select.Creatable 
              placeholder={!focused && !!!selectedTags.length ? 'Skills' : ''} 
              className={Helper.getSelectStyle(focused, selectedTags)}
              style={{background: '#f8f8f8', border: 'none', boxShadow: 'none'}}
              multi 
              options={loadedTags} 
              onChange={this.selectTag} 
              value={selectedTags} 
              onFocus={this.onFocus} 
              onBlur={this.onBlur}
            />}

            {!!!loadedTags.length && 
            <Select.Creatable 
              placeholder={!focused && !!!selectedTags.length ? 'Skills' : ''} 
              className={Helper.getSelectStyle(focused, selectedTags)}
              multi 
              style={{background: '#f8f8f8', border: 'none', boxShadow: 'none'}}
              options={selectedTags} 
              onChange={this.selectTag}
              onFocus={this.onFocus} 
              onBlur={this.onBlur}
              value={selectedTags} 
            />}
            {/* <MySelect /> */}
            <div className="spaceLogoMainImageRow">
              <label htmlFor="logo-image" className="spaceLogoMainImageBlock">
                {this.renderAvatarImageText()}
                {this.renderAvatarImage()}
              </label>
              <input type="file" onChange={this.handleAvatar} id="logo-image" style={{display:'none'}}/>
            </div>
            <FlatButton 
              style={{backgroundColor:'#3399cc', padding:'10px', marginTop:'15px', color:'#FFFFFF', fontWeight:'bold'}} 
              onClick={this.storeUser}
            >
               Sign Up
            </FlatButton>
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

            //   className={(focused && !!!selectedTags.length)
            //   ? "MyInputLabel-animated-9 MyInputLabel-shrink-8 MyInputLabel-focused-12 MyInputLabel-formControl-62 MyInputLabel-root-112"
            //   : !focused && !!selectedTags.length
            //   ? "MyInputLabel-animated-9 MyInputLabel-shrink-8 MyInputLabel-focused-122 MyInputLabel-formControl-62 MyInputLabel-root-112"
            //   //: "MyInputLabel-animated-9 MyInputLabel-formControl-6 MyInputLabel-root-5 MyInputLabel-root-11" 
            //  // : focused || !!!selectedTags.length 
            //  : focused && !!!selectedTags.length
            //   ? "MyInputLabel-animated-9 MyInputLabel-formControl-6 MyInputLabel-root-5 MyInputLabel-root-11"
            //   //? "MyInputLabel-animated-9 MyInputLabel-formControl-6 MyInputLabel-root-5 MyInputLabel-root-11"
            //   : !!!selectedTags.length 
            //   ? "MyInputLabel-animated-9 MyInputLabel-shrink-8 MyInputLabel-focused-122 MyInputLabel-formControl-62 MyInputLabel-root-112"
            //   : "MyInputLabel-animated-9 MyInputLabel-formControl-6 MyInputLabel-root-5 MyInputLabel-root-11"
            //   } 
// UserSignUp.contextTypes = {
//   router: React.PropTypes.object
// };

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     names:"",
  //     email:"",
  //     password:"",
  //     phoneNumber:"",
  //     skills:[],
  //     avatar:"",
  //     avatarPreview:"",
  //     msg:"",
  //     snack:false,
  //   }
  // }

  // showSnack = (msg) => { this.setState({ snack: true, msg: msg }); };

  // handleNames = (event) => {this.setState({name:event.target.name})};
  // handleEmail = (event) => {this.setState({email:event.target.email})};
  // handlePassword = (event) => {this.setState({password:event.target.password})};
  // handleAvatar = (event) => {
  //   event.preventDefault();
  //   let reader = new FileReader();
  //   let file = event.target.files[0];

  //   reader.onloadend = () => {
  //     this.setState({
  //       avatar: file,
  //       avatarPreview: reader.result
  //     });
  //   }

  //   reader.readAsDataURL(file);
  // };

  // selectTag = selectedTag => {
  //   const copy = selectedTag.slice(-1)[0];
  //   if (copy !== undefined) {
  //     copy.value = copy.value.replace(/\s\s+/g, ' ').trim();
  //     copy.label = copy.label.replace(/\s\s+/g, ' ').trim();
  //     this.setState({ selectedTags: selectedTag });
  //   } else {
  //     this.setState({ selectedTags: selectedTag });
  //   }
  // }

  // renderAvatarImage = () => {
  //   if(this.state.logo !== "")
  //   {
  //     return(
  //       <img src={this.state.logoPreview} className="spaceLogoImagePreview"/>
  //     )
  //   }
  // }

  // renderAvatarImageText = () => {
  //   if(this.state.logoPreview === "" || this.state.logoPreview === undefined || this.state.logoPreview === null) {
  //     return(
  //       <span style={{display:'flex', flexDirection:'column', textAlign:'center'}}>
  //         Select an Avatar
  //         <span style={{fontSize:'0.9rem', marginTop:'5px'}}>For Best Size Use: 512 x 512</span>
  //       </span>
  //     )
  //   }
  // }


//   render() {
//     return (
//       <div className="container">
//         <Helmet title="UserSignUp" meta={[ { name: 'description', content: 'Description of UserSignUp' }]}/>

//         <header>
//           <Header/>
//         </header>

//         <main className="spaceSignUpMain">
//           <div className="spaceSignUpTitle">Join Our Mesh Network!</div>
//           <div className="spaceSignUpContainer">
//             <TextField label="name" value={this.state.names} onChange={this.handleNames} margin="normal"/>
//             <TextField label="E-mail" value={this.state.email} onChange={this.handleEmail} margin="normal"/>
//             <TextField label="Password" value={this.state.password} onChange={this.handlePassword} margin="normal"/>
//             <TextField label="Brief Description" value={this.state.description} onChange={this.handleDescription} margin="normal"/>
//             <div className="spaceLogoMainImageRow">
//               <label htmlFor="logo-image" className="spaceLogoMainImageBlock">
//                 {this.renderAvatarImageText()}
//                 {this.renderAvatarImage()}
//               </label>
//               <input type="file" onChange={this.handleLogo} id="logo-image" style={{display:'none'}}/>
//             </div>
//             <FlatButton 
//               style={{backgroundColor:'#3399cc', padding:'10px', marginTop:'15px', color:'#FFFFFF', fontWeight:'bold'}} 
//               //onClick={this.storeSpace}
//             >
//               Confirm Sign Up
//             </FlatButton>
//           </div>
//         </main>

//         <footer></footer>
//         <Snackbar
//           open={this.state.snack}
//           message={this.state.msg}
//           autoHideDuration={3000}
//         />
//       </div>
//     );
//   }
// }