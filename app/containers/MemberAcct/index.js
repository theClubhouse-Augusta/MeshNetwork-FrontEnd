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
import FlatButton from 'material-ui/Button';
//import Select from 'react-select';
//import { Creatable } from 'react-select';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

import Header from '../../components/Header';
import Spinner from '../../components/Spinner';

import Logger from '../../utils/Logger';
import authenticate from '../../utils/Authenticate';
import './style.css';
import './styleM.css';
import 'react-select/dist/react-select.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default class MemberAcct extends React.PureComponent {
    state = {
        token: localStorage.getItem('token'),
        name: '',
        title: '',
        avatar: '',
        avatarPreview: '',
        email: '',
        password: '',
        passwordConfirm: '',
        phoneNumber: '',
        selectedTags: [],
        loadedTags: [],
        emailError: false,
        passwordError: false,
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        github: '',
        behance: '',
        loading: true,
        msg: "",
        snack: false,
    };

    /* async componentWillMount() {
         const authorized = await authenticate(localStorage['token'], this.props.history);
         if (!authorized.error) {
             this.setState({ loading: false });
         } else {
             this.props.history.push('/');
         }
     } */

    handleRequestClose = () => { this.setState({ snack: false, msg: "" }); };
    showSnack = (msg) => { this.setState({ snack: true, msg: msg }); };

    componentWillMount() {
        this.getUserInfo();
        this.loadSkills();
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

    handleSkillTags = event => {
        this.setState({ selectedTags: event.target.value });
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

    getUserInfo = () => {
        fetch('https://innovationmesh.com/api/getUser', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.state.token },
        })
            .then(function (response) {
                return response.json();

            })
            .then(function (json) {
                this.setState({
                    name: json.name,
                    title: json.title,
                    avatar: json.avatar,
                    email: json.email,
                    facebook: json.facebook,
                    twitter: json.twitter,
                    instagram: json.instagram,
                    linkedin: json.linkedin,
                    github: json.github,
                    behance: json.behance,
                }, function () {
                    console.log(this.state);
                })
            }.bind(this))
    }

    updateUser = e => {
        e.preventDefault();

        let data = new FormData();
        data.append('title', this.state.title);
        data.append('name', this.state.name);
        data.append('avatar', this.state.avatar);
        data.append('facebook', this.state.facebook);
        data.append('twitter', this.state.twitter);
        data.append('instagram', this.state.instagram);
        data.append('linkedin', this.state.linkedin);
        data.append('github', this.state.github);
        data.append('behance', this.state.behance);
        data.append('skills', JSON.stringify(this.state.selectedTags));
        data.append('password', this.state.password);
        data.append('passwordConfirm', this.state.passwordConfirm);

        fetch(`https://innovationmesh.com/api/updateUser`, {
            headers: { 'Authorization': 'Bearer ' + this.state.token },
            method: 'POST',
            body: data,
        })
            .then(response => response.json())
            .then(json => {
                if (json.success) {
                    this.showSnack(json.success);
                } else {
                    this.showSnack(json.error);
                }
            })
            .catch(error => {
                this.showSnack(JSON.stringify(error));
            })
    }


    loadSkills = () => {
        fetch('https://innovationmesh.com/api/skills/all', {
            headers: { Authorization: `Bearer ${localStorage['token']}` },
        })
            .then(response => response.json())
            .then(json => this.setState({ loadedTags: json }))
            .catch(error => {
                alert(`error in fetching data from server: ${error}`);
            });
    }

    loadUserSkills = () => {
        fetch('https://innovationmesh.com/api/userskills', {
            headers: { Authorization: `Bearer ${localStorage['token']}` },
        })
            .then(response => response.json())
            .then(json => { this.setState({ selectedTags: json }) })
            .catch(error => {
                alert(`error in fetching data from server: ${error}`);
            });
    }



    /*selectTag = selectedTag => {
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
    }*/

    /*onTagsSubmit = e => {
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
          this.showSnack(json.success);
        } else {
          this.showSnack(json.error);
        }
      })
      .catch(error => {
        this.showSnack(JSON.stringify(error));
      })
    }*/

    render() {
        return (
            //this.state.loading
            // ?
            //<Spinner loading={this.state.loading} />
            // :
            <div className="accountContainer">
                <Helmet title="MemberAcct" meta={[{ name: 'description', content: 'Description of MemberAcct' }]} />
                <header style={{ background: '#FFFFFF' }}>
                    <Header />
                    <div className="acctBanner">
                        <div className="homeHeaderContentTitle">Update Your Profile</div>
                        <div className="homeHeaderContentSubtitle">Let everyone know what you&#39;re all about.</div>
                    </div>
                </header>

                <main>

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
                                        label={'E-mail'}
                                        margin='normal'
                                        value={`${this.state.email}`}
                                        onChange={this.handleInputChange('email')}
                                    />
                                </div>

                                <div className="acctProfilePicture">
                                    {this.renderAvatarPreview()}
                                    <div>
                                        <label style={{ display: 'flex', flexDirection: 'column' }}>
                                            <FlatButton raised component="span" >
                                                Upload
                                                 <input
                                                    onChange={this.handleAvatar}
                                                    type="file"
                                                    style={{ display: 'none' }}
                                                    accept="image/png, image/jpg, image/jpeg"
                                                />
                                            </FlatButton>
                                        </label>
                                    </div>
                                </div>
                            </div>



                            <Divider />

                            <div className="acctSocialMediaWrapper">
                                <h3> Social Media</h3>
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
                                </div>
                            </div>
                        </div>
                        <Divider />

                        <div className="acctTagSelection">
                            <h3> Skills </h3>
                            <FormControl style={{ width: '50%' }}>
                                <InputLabel htmlFor="tags-select">Skills & Interests</InputLabel>
                                <Select
                                    style={{ width: '100%' }}
                                    multiple
                                    value={this.state.selectedTags}
                                    onChange={this.handleSkillTags}
                                    input={<Input id="tags-select" />}
                                    MenuProps={MenuProps}
                                >
                                    {this.state.loadedTags.map(tag => (
                                        <MenuItem
                                            key={tag.id}
                                            value={tag.label}
                                        >
                                            {tag.value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {/*<div className="acctTagSelectWrapper" >
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
                            </div>*/}
                            {/*<Button style={{ backgroundColor: '#00c355', padding: '10px', marginTop: '15px', color: '#FFFFFF', width: '40%' }}> Submit </Button>*/}
                        </div>

                        <Divider />

                        <div className="acctManagement">
                            <h3 style={{ margin: '1em 0' }}> Account Management</h3>
                            <div className="acctChangePassForm">
                                <h4> Change Password</h4>

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
                                <FlatButton
                                    style={{ backgroundColor: '#ff4d58', padding: '10px', marginTop: '15px', color: '#FFFFFF', fontWeight: 'bold' }}
                                    onClick={this.updateUser}>
                                    Update User
                                    </FlatButton>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="homeFooterContainer">
                    Copyright © 2018 theClubhou.se  • 540 Telfair Street  •  Tel: (706) 723-5782
                    </footer>
                <Snackbar
                    open={this.state.snack}
                    message={this.state.msg}
                    autoHideDuration={3000}
                    onClose={this.handleRequestClose}
                />
            </div>
        );
    }
}
