/*
 *
 * MemberAcct
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Select from 'react-select';
import { Creatable } from 'react-select'; 

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';

import Logger from '../../utils/Logger';
import authenticate from '../../utils/Authenticate';
import './style.css';
import './styleM.css';
import 'react-select/dist/react-select.css';

export default class MemberAcct extends React.PureComponent {
    state = {
        name: '',
        website: '',
        title: '',
        avatar: '',
        avatarPreview: '', 
        imagePreviewUrl: '',
        email: '',
        emailConfirm: '',
        currentPassword: '',
        password: '',
        passwordConfirm: '',
        phoneNumber: '',
        //bio: '',
        selectedTag: '',
        selectedTags: [],
        loadedTags: [],
        value: 0,
        //company: '',
        //hireable: false,
        emailError: false,
        passwordError: false,
        snackBar: false,
        snackBarMessage: '',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        github: '',
        //dribble: '',
        behance: '',
        //
        angellist: '',
        loading: true,
    };

   /* async componentWillMount() {
        const authorized = await authenticate(localStorage['token'], this.props.history);
        if (!authorized.error) {
            this.setState({ loading: false });
        } else {
            this.props.history.push('/');
        }
    } */
    
    componentWillMount () { 
        this.getUserInfo(); 
    }

    handleInputChange = name => event => {
        this.setState({
            [name]: event.target.value,
        },
            //function() {
            //console.log(this.state); 
            //}
        );
    };

    handleAvatar = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({
                avatar: file,
                avatarPreview: reader.result,
            })
        }
        reader.readAsDataURL(file);
        console.log(this.state.avatarPreview);
    }

    renderAvatarPreview = () => {
        if (this.state.avatarPreview == '') {
            return (               
                <img src={this.state.avatar} className="acctProfilePicturePreview" height="200px" width="200px" />               
            )
        }
        else (this.state.avatar !== this.state.avatarPreview); {
            return (
                <img src={this.state.avatarPreview} className="acctProfilePicturePreview" height="200px" width="200px" />
            )
        }
    }

    confirmPassword = () => {
        if (this.state.password !== this.state.passwordConfirm) {
            this.setState({ passwordError: true })
        } else {
            this.setState({ passwordError: false });
        }
    }

    confirmEmail = () => {
        if (this.state.email !== this.state.emailConfirm) {
            this.setState({ emailError: true })
        } else {
            this.setState({ emailError: false });
        }
    }

  getUserInfo = () => {
        fetch('https://innovationmesh.com/api/user/' + this.props.match.params.id, {
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage['token']}` },
        })
            .then(function (response) {
                return response.json();
            
            })
            .then(function (json) {
                this.setState({
                    name: json.user.name,
                    website: json.user.website,
                    title: json.user.title,
                    avatar: json.user.avatar,
                    email: json.user.email,     
                    facebook: json.user.facebook,
                    twitter: json.user.twitter,
                    instagram: json.user.instagram,
                    linkedin: json.user.linkedin,
                    github: json.user.github,
                    behance: json.user.behance,
                    angellist: json.user.angellist,
                }, function() {
                    console.log(this.state); 
                })
            }.bind(this))
    }

    onUserInfoSubmit = e => {
        e.preventDefault();

        let data = new FormData();
        let { title, name, website } = this.state;
        data.append('title', title.trim());
        data.append('name', name.trim());
        data.append('website', website);
        data.append('avatar', this.state.avatar);

        fetch(`https://innovationmesh.com/api/updateUser`, {
            headers: { Authorization: `Bearer ${localStorage['token']}` },
            method: 'post',
            body: data,
        })
            .then(response => response.json())
            .then(json => {
                if (json.success) {
                    this.toggleSnackBar(json.success);
                } else {
                    this.toggleSnackBar(json.error);
                }
            })
            .catch(error => {
                this.toggleSnackBar(JSON.stringify(error));
            })
    }


    loadSkills = () => {
      fetch('https://innovationmesh.com/api/skills/all', {
        headers: { Authorization: `Bearer ${localStorage['token']}` },
      })
      .then(response => response.json())
      .then(json => this.setState({ loadedTags:json }))
      .catch(error => {
        alert(`error in fetching data from server: ${error}`);
      });
    }
  
    loadUserSkills = () => {
      fetch('https://innovationmesh.com/api/userskills', {
        headers: { Authorization: `Bearer ${localStorage['token']}` },
      })
      .then(response => response.json())
      .then(json => {this.setState({ selectedTags:json })})
      .catch(error => {
        alert(`error in fetching data from server: ${error}`);
      });
    }
  
  
  
  selectTag = selectedTag => {
    const selectedTags = selectedTag.slice(0, (selectedTag.length - 1));
    const selected = selectedTag.slice(-1)[0];
  
    const loaded = this.state.loadedTags.slice(1);
    const s = this.state.selectedTags.slice();
  
    if (!!selected.id) {
      this.setState({ selectedTags: selectedTag });
    } else {
      selected.value = selected.value.replace(/\s\s+/g, ' ').trim();
      selected.label = selected.label.replace(/\s\s+/g, ' ').trim();
      const duplicateLoaded = loaded.findIndex(tag => tag.label === selected.label);
      const duplicateSelected = s.findIndex(tag => tag.label === selected.label);
      if (duplicateLoaded === -1 && duplicateSelected === -1) {
        selectedTags.push(selected);
        this.setState({	selectedTags: selectedTags });
      } else {
        this.setState({	selectedTags: selectedTags });
      }
    }
    // else {
      // this.setState({ selectedTags: selectedTag });
    // }
  }

  onTagsSubmit = e => {
    e.preventDefault();
    let data = new FormData();
    let { selectedTags } = this.state;
    data.append('tags', JSON.stringify(selectedTags));
  
    fetch(`https://innovationmesh.com/api/updateUser`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` },
      method: 'post',
      body: data,
    })
    .then(response => response.json())
    .then(json => {
      if (json.success) {
        this.toggleSnackBar(json.success);
      } else {
        this.toggleSnackBar(json.error);
      }
    })
    .catch(error => {
      this.toggleSnackBar(JSON.stringify(error));
    })
  }

    render() {
        return (
            //this.state.loading
               // ?
                //<Spinner loading={this.state.loading} />
               // :
                <div className="container">
                    <Helmet title="MemberAcct" meta={[{ name: 'description', content: 'Description of MemberAcct' }]} />
                    <Header />

                    <main>
                        <div className="acctBanner">
                            <h2> account settings </h2>
                        </div>

                        <div className="acctBody">
                            <div className="acctMainInfo">
                                
                                <div className="acctProfileInfo">       
                                 <div className="acctProfileMain">
                                     <h3> Profile Information </h3> 
                                     
                                     <TextField
                                     label={'Name'}
                                     margin='normal'
                                     value={`${this.state.name}`}
                                     placeholder={`${this.state.name}`} onChange={this.handleInputChange('name')}
                                     />
                                     <TextField
                                     label={'Title'}
                                     margin='normal'
                                     value={`${this.state.title}`}
                                     placeholder={`${this.state.title}`} onChange={this.handleInputChange('title')}
                                         />
                                     <TextField
                                         label={'Website'}
                                         margin='normal'
                                         value={`${this.state.website}`}
                                         placeholder={`${this.state.website}`} onChange={this.handleInputChange('website')}
                                     />
                                     </div>

                                     <div className="acctProfilePicture">                                    
                                             {this.renderAvatarPreview()}                                   
                                         <div>
                                         <label style={{ display: 'flex', flexDirection: 'column' }}>
                                             <Button raised component="span" >
                                                 Upload
                                                 <input
                                                     onChange={this.handleAvatar}
                                                     type="file"
                                                     style={{ display: 'none' }}
                                                     accept="image/png, image/jpg, image/jpeg"
                                                 />
                                             </Button>
                                         </label>
                                     </div>
                                    </div>
                                </div>
                            
                        

                                <Divider />

                                <div className="acctSocialMediaWrapper">
                                     <h3> Social Media Handles</h3>
                                     <div className="acctSocialMedia">
                                     <TextField
                                     label={'Facebook'}
                                     margin='normal'
                                     value={`${this.state.facebook}`}
                                    placeholder={`${this.state.facebook}`}
                                     onChange={this.handleInputChange('facebook')}
                                    />
                                    <TextField
                                    label={'Twitter'}
                                    margin='normal'
                                    value={`${this.state.twitter}`}
                                   placeholder={`${this.state.twitter}`}
                                    onChange={this.handleInputChange('twitter')}
                                   />
                                   <TextField
                                   label={'Instagram'}
                                   margin='normal'
                                   value={`${this.state.instagram}`}
                                  placeholder={`${this.state.instagram}`}
                                   onChange={this.handleInputChange('instagram')}
                                  />
                                  <TextField
                                  label={'LinkedIn'}
                                  margin='normal'
                                  value={`${this.state.linkedin}`}
                                 placeholder={`${this.state.linkedin}`}
                                  onChange={this.handleInputChange('linkedin')}
                                 />
                                 <TextField
                                 label={'Github'}
                                 margin='normal'
                                 value={`${this.state.github}`}
                                placeholder={`${this.state.github}`}
                                 onChange={this.handleInputChange('github')}
                                />
                                <TextField
                                label={'Behance'}
                                margin='normal'
                                value={`${this.state.behance}`}
                               placeholder={`${this.state.behance}`}
                                onChange={this.handleInputChange('behance')}
                               />
                               <TextField
                               label={'AngelList'}
                               margin='normal'
                               value={`${this.state.angellist}`}
                              placeholder={`${this.state.angellist}`}
                               onChange={this.handleInputChange('angellist')}
                              />
                                </div>
                            </div>
                            </div>
                            <Divider />

                            <div className="acctTagSelection">
                            <h3 > Tags </h3> 
                            <div className="acctTagSelectWrapper" >
                              {!!this.state.loadedTags.length && [
                              <label key="skillLabel"> Skills and interests </label>,
                              <Select.Creatable 
                                key="skillSelect" 
                                multi 
                                options={this.state.loadedTags} 
                                onChange={this.state.selectTag} 
                                value={this.state.selectedTags} 
                              />
                              ]}
                            </div>         
                            <Button style={{ backgroundColor: '#00c355', padding: '10px', marginTop: '15px', color: '#FFFFFF', width: '40%' }}> Submit </Button>
                            </div>

                            <Divider />

                            <div className="acctManagement">
                                <h3 style={{ margin: '1em 0' }}> Account Management</h3>
                                <div className="acctChangePassForm">
                                    <h4> Change Password</h4>
                                    <TextField
                                        label={'Current Password'}
                                        margin='normal'
                                        type='password'
                                        style={{ maxWidth: '300px' }}
                                        onChange={this.handleInputChange('currentPassword')}
                                    />

                                    <TextField
                                        label={'New Password'}
                                        margin='normal'
                                        type='password'
                                        style={{ maxWidth: '300px' }}
                                        onChange={this.handleInputChange('password')}
                                    />

                                    <TextField
                                        label={'Confirm New Password'}
                                        margin='normal'
                                        type='password'
                                        style={{ maxWidth: '300px' }}
                                        onChange={this.handleInputChange('passwordConfirm')}
                                    />
                                    <Button style={{ backgroundColor: '#00c355', padding: '10px', marginTop: '15px', color: '#FFFFFF', width: '40%' }}> Update Password </Button>
                                </div>

                                <div className="acctChangeEmailForm">
                                    <h4>Change Email</h4>
                                    <TextField
                                        label={'New Email'}
                                        margin='normal'
                                        type='password'
                                        style={{ maxWidth: '300px' }}
                                        onChange={this.handleInputChange('email')}
                                    />
                                    <TextField
                                        label={'Confirm New Email'}
                                        margin='normal'
                                        type='password'
                                        style={{ maxWidth: '300px' }}
                                        onChange={this.handleInputChange('emailConfirm')}
                                    />
                                    <Button style={{ backgroundColor: '#00c355', padding: '10px', marginTop: '15px', color: '#FFFFFF', width: '40%' }}> Update Email </Button>
                                </div>

                                <Divider />
                                <div className="acctDeleteAcctForm">
                                    <h3>Delete Account</h3>

                                    <p style={{ margin: '2em 0' }}> some warnings about deleting accounts </p>

                                    <Button style={{ backgroundColor: '#ff4d58', padding: '10px', marginTop: '15px', color: '#FFFFFF', width: '50%' }}>Delete Account </Button>
                                </div>

                            </div>
                        </div>
                    </main>

                    <Footer />
                    <Snackbar
                        open={this.state.snackBar}
                        message={this.state.snackBarMessage}
                        autoHideDuration={4000}
                    />
                </div>
        );
    }
}
