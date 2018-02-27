import React from 'react';
import Helmet from 'react-helmet';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Checkbox from 'material-ui/Checkbox';
import { ListItemText } from 'material-ui/List';
import { LinearProgress } from 'material-ui/Progress';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';

import { injectStripe } from 'react-stripe-elements';
import CardSection from './CardSection';
import Header from '../../components/Header';


import './style.css';
import './styleM.css';


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

class CheckoutForm extends React.PureComponent {
    state = {
        token:localStorage.getItem('token'),
        user:JSON.parse(localStorage.getItem('user')),
        space: '',
        multi: true,
        options: [],
        value: undefined,
        name: "",
        email: "",
        password: "",
        bio: "",
        selectedTags: [],
        loadedTags: [],
        loadedPlans: [],
        avatar: '',
        imagePreviewUrl: '',
        msg: "",
        snack: false,
        focused: false,
        planFocused: false,
        plan: "free",
        isLoading:false,
        showPassword: false,
        passwordError:''
    };

    componentDidMount() {
      if(this.state.token && this.state.user) {
        this.props.history.push('/user/'+this.state.user.id);
      } else{
        this.getSpace();
        this.loadSkills();
        if (this.props.pubkey) {
            this.loadPlans();
        }
      }
    }

    handleMouseDownPassword = event => {
      event.preventDefault();
    };


    handleClickShowPasssword = () => {
      this.setState({ showPassword: !this.state.showPassword });
    };


    getSpace = () => {
        fetch('https://innovationmesh.com/api/workspace/' + this.props.match.params.id, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    space: json
                })
            });
    }

    loadSkills = () => {
        fetch('https://innovationmesh.com/api/skills/all', {
        })
            .then(response => response.json())
            .then(json => { this.setState({ loadedTags: json }) })
            .catch(error => {});
    }

    loadPlans = () => {
        fetch(`https://innovationmesh.com/api/plans/${this.props.match.params.id}`, {
        })
            .then(response => response.json())
            .then(json => this.setState({ loadedPlans: json.data ? json.data : json }))
            .catch(error => {})
    }

    selectPlan = (e, selected) => {
        e.preventDefault();
        // console.log('s', selected);
        this.setState({ plan: selected });
    }

    handleRequestClose = () => { this.setState({ snack: false, msg: "" }); };
    showSnack = (msg) => { this.setState({ snack: true, msg: msg }); };

    handleName = (event) => { this.setState({ name: event.target.value.replace(/\s\s+/g, ' ') }) };
    handleEmail = (event) => { this.setState({ email: event.target.value }) };
    handlePassword = (event) => {
      this.setState({ password: event.target.value }, () => {
        if(this.state.password.length < 6) {
          this.setState({
            passwordError:'Password Too Short'
          })
        } else {
          this.setState({
            passwordError:''
          })
        }
      })
    };
    handleBio = (event) => { this.setState({ bio: event.target.value }) };
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

    handleSkillTags = event => {
        this.setState({ selectedTags: event.target.value });
    };


    renderAvatarImage = () => {
        if (this.state.avatar !== "") {
            return (
                <img alt="avatarpreview" src={this.state.imagePreviewUrl} className="spaceLogoImagePreview" />
            )
        }
    }

    renderAvatarImageText = () => {
        if (this.state.imagePreviewUrl === "" || this.state.imagePreviewUrl === undefined || this.state.imagePreviewUrl === null) {
            return (
                <span style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                    Select a profile picture
                <span style={{ fontSize: '0.9rem', marginTop: '5px' }}>
                        For Best Size Use: 512 x 512
                </span>
                </span>
            )
        }
    }
    onFocus = () => this.setState({ focused: true });
    onBlur = () => this.setState({ focused: false });
    onFocusPlan = () => this.setState({ planFocused: true });
    onBlurPlan = () => this.setState({ planFocused: false });

    storeUser = e => {
        this.setState({
          isLoading:true
        })
        e.preventDefault();
        let data = new FormData();
        let {
            name,
            email,
            password,
            bio,
            selectedTags,
            avatar,
            plan
        } = this.state;
        this.props.stripe.createToken({ name: name }).then(({ token }) => {
            data.append('name', name.trim());
            if (selectedTags.length) {
                data.append('tags', selectedTags);
            }
            data.append('email', email.trim());
            data.append('password', password.trim());
            data.append('bio', bio);
            data.append('spaceID', this.state.space.id);
            data.append('avatar', avatar);
            if (token.id) {
                data.append('customerToken', token.id);
            }
            data.append('plan', plan);
            data.append('username', name);

            fetch("https://innovationmesh.com/api/signUp", {
                method: 'POST',
                body: data,
            })
            .then(response => response.json())
            .then(user => {
              if (user.error) {
                  this.showSnack(user.error);
              } else if (user.token) {
                localStorage.setItem('token', user.token);
                fetch("https://innovationmesh.com/api/user/auth", {
                    method: 'GET',
                    headers: { "Authorization": "Bearer " + user.token }
                })
                .then(response => response.json())
                .then(json => {
                  let mainUser = json.user;
                  localStorage.setItem('user', JSON.stringify(mainUser));
                  fetch('https://innovationmesh.com/api/signIn', {
                    method:'POST',
                    body:data
                  })
                  .then(response => response.json())
                  .then(json => {
                    if(json.error)
                    {
                      this.showSnack(json.error);
                    }
                    else if(json.token)
                    {
                      localStorage.setItem('token', json.token);
                      this.showSnack('Welcome to '+ this.state.space.name+'!');
                    setTimeout(() => {
                        this.props.history.push(`/user/${mainUser.id}`)
                    }, 2000);
                    }
                  })
                })
              }
              this.setState({
                isLoading:false
              })
            });
          })
        }

    storeFreeUser = e => {
      this.setState({
        isLoading:true
      })
        e.preventDefault();
        let data = new FormData();
        let {
            name,
            email,
            password,
            bio,
            selectedTags,
            avatar,
            plan
        } = this.state;

        data.append('name', name.trim());
        if (!!selectedTags.length) {
            data.append('tags', selectedTags);
        }
        data.append('email', email.trim());
        data.append('password', password.trim());
        data.append('bio', bio.trim());
        data.append('spaceID', this.state.space.id);
        data.append('avatar', avatar);
        data.append('plan', plan);
        data.append('username', name);


        fetch("https://innovationmesh.com/api/signUp", {
            method: 'POST',
            body: data,
        })
        .then(response => response.json())
        .then(json => {
          if (json.error) {
            this.showSnack(json.error);
          } else if (json.token) {
            let mainToken = json.token;
            localStorage.setItem('token', mainToken);
            fetch("https://innovationmesh.com/api/user/auth", {
              method: 'GET',
              headers: { "Authorization": "Bearer " + mainToken }
            })
            .then(response => response.json())
            .then(json => {
              let mainUser = json.user;
              localStorage.setItem('user', JSON.stringify(mainUser));
                this.showSnack('Welcome to '+ this.state.space.name+'!');
                setTimeout(() => {
                    this.props.history.push(`/user/${mainUser.id}`)
                }, 2000);
            })
          }
          this.setState({
            isLoading:false
          })
        });
      }

      renderLoading = () => {
        if(this.state.isLoading)
        {
          return(
            <LinearProgress color="accent" style={{ width:'100%', position:'fixed', top:'0', left:'0', right:'0'}}/>
          )
        }
      }

    render() {
        const {
            loadedTags,
            plan,
            loadedPlans,
    } = this.state;

        return (
            <form className="container" onSubmit={this.handleSubmit}>
                <Helmet title="SpaceSignUp" meta={[{ name: 'description', content: 'Description of SpaceSignUp' }]} />
                <header className="checkoutHeaderContainer">
                    {this.renderLoading()}
                    <Header headerTitle={this.state.space.name} space={this.props.spaceName} />
                    <div className="checkoutHeaderBanner">
                        <div className="homeHeaderContentTitle">Join {this.state.space.name}</div>
                        <div className="homeHeaderContentSubtitle">Find out what all the buzz is about</div>
                    </div>
                </header>

                <main className="userSignUpMain">
                    <div className="spaceSignUpMain">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img alt="" src={this.state.space.logo} height="auto" width="300px" />
                        </div>
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
                            <FormControl error={this.state.passwordError ? 'true' : ''}>
                              <InputLabel htmlFor="password">Password</InputLabel>
                              <Input
                                id="adornment-password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={this.handlePassword}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={this.handleClickShowPasssword}
                                      onMouseDown={this.handleMouseDownPassword}
                                    >
                                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                }
                              />
                              <FormHelperText id="password-helper-text">{this.state.passwordError}</FormHelperText>
                            </FormControl>

                            {/*<TextField label="Bio"
                                value={this.state.bio}
                                onChange={this.handleBio}
                                margin="normal"
                            />*/}


                            {!!loadedTags.length &&
                                <FormControl style={{ marginTop: 24 }}>
                                  <InputLabel htmlFor="tags-multiple">Skills & Interests</InputLabel>
                                  <Select
                                      multiple
                                      value={this.state.selectedTags}
                                      onChange={this.handleSkillTags}
                                      input={<Input id="tag-multiple" />}
                                      renderValue={selected => selected.join(', ')}
                                      MenuProps={MenuProps}
                                  >
                                      {loadedTags.map((tag, key) => (
                                          <MenuItem key={`${key}tag`} value={tag}>
                                              <Checkbox checked={(this.state.selectedTags.indexOf(tag) > -1)} />
                                              <ListItemText primary={tag} />
                                          </MenuItem>
                                      ))}
                                  </Select>
                              </FormControl>
                            }




                            {this.props.pubkey &&
                                <React.Fragment>
                                    <label style={{ marginBottom: 12, marginTop: '60px' }}>
                                        Select a Plan
                  </label>

                                    <FlatButton
                                        style={{ backgroundColor: "free" === this.state.plan ? 'grey' : '#3399cc', padding: '10px', marginTop: '15px', color: '#FFFFFF', fontWeight: 'bold' }}
                                        onClick={(e) => this.selectPlan(e, "free")}
                                    >
                                        Free tier
                    </FlatButton>
                                </React.Fragment>}

                            {!!loadedPlans.length && loadedPlans.map((plan, key) => {
                                let id = plan.id;
                                let amount = (plan.amount / 100).toFixed(2).toString();
                                return (
                                    <FlatButton
                                        key={`goo${key}`}
                                        style={{ backgroundColor: id === this.state.plan ? 'grey' : '#3399cc', padding: '10px', marginTop: '15px', color: '#FFFFFF', fontWeight: 'bold' }}
                                        onClick={(e) => this.selectPlan(e, id)}
                                    >
                                        {plan.name} - {amount}
                                    </FlatButton>
                                )
                            })}

                            {plan !== "free" && this.props.pubkey ? <CardSection /> : null}

                            <div className="spaceLogoMainImageRow">
                                <label htmlFor="avatar-image" className="spaceLogoMainImageBlock">
                                    {this.renderAvatarImageText()}
                                    {this.renderAvatarImage()}
                                </label>
                                <input type="file" onChange={this.handleAvatar} id="avatar-image" style={{ display: 'none' }} />
                            </div>
                            <FlatButton
                                style={{ backgroundColor: '#ff4d58', padding: '10px', marginTop: '15px', color: '#FFFFFF', fontWeight: 'bold' }}
                                onClick={plan === "free" ? this.storeFreeUser : this.storeUser}
                            >
                                Sign Up
                </FlatButton>
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
            </form>
        );
    }
}

export default injectStripe(CheckoutForm);
