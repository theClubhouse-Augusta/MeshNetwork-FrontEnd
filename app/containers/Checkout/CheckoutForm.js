import React from 'react';
import Helmet from 'react-helmet';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { injectStripe } from 'react-stripe-elements';
import CardSection from './CardSection';
import Header from '../../components/Header';
import { FormControl } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import { ListItemText } from 'material-ui/List';

import Logger from '../../utils/Logger';

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


class CheckoutForm extends React.Component {
    state = {
        space: '',
        multi: true,
        multiValue: [],
        options: [],
        value: undefined,
        name: "",
        email: "",
        password: "",
        bio: "",
        selectedTags: new Set(),
        loadedTags: [],
        loadedPlans: [],
        avatar: '',
        imagePreviewUrl: '',
        msg: "",
        snack: false,
        focused: false,
        planFocused: false,
        plan: "free"
    };

    componentDidMount() {
        this.getSpace();
        this.loadSkills();
        if (this.props.pubkey) {
            this.loadPlans();
        }
    }

    getSpace = () => {
        fetch('https://innovationmesh.com/api/workspace/' + this.props.match.params.id, {
            method: 'GET'
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                this.setState({
                    space: json
                })
            }.bind(this));
    }

    loadSkills = () => {
        fetch('https://innovationmesh.com/api/skills/all', {
        })
            .then(response => response.json())
            .then(json => { this.setState({ loadedTags: json }) })
            .catch(error => Logger(`front-end: CheckoutForm@Loadskills: ${error.message}`));
    }

    loadPlans = () => {
        fetch(`https://innovationmesh.com/api/plans/${this.props.match.params.id}`, {
        })
            .then(response => response.json())
            .then(json => { this.setState({ loadedPlans: json.data }) })
            .catch(error => Logger(`front-end: CheckoutForm@loadPlans: ${error.message}`));
    }

    /*handleSkillTags = event => {
        this.setState({ selectedTags: event.target.value });
    };*/

    selectPlan = (e, selected) => {
        e.preventDefault();
        console.log('s', selected);
        this.setState({ plan: selected });
    }

    handleOnChange = (value) => {
        let { options } = this.state;
        console.log('o', options);
        const { multi } = this.state;
        if (multi) {
            this.setState({ multiValue: value });
        } else {
            this.setState({ value });
        }
    }

    handleRequestClose = () => { this.setState({ snack: false, msg: "" }); };
    showSnack = (msg) => { this.setState({ snack: true, msg: msg }); };

    handleName = (event) => { this.setState({ name: event.target.value.replace(/\s\s+/g, ' ') }) };
    handleEmail = (event) => { this.setState({ email: event.target.value }) };
    handlePassword = (event) => { this.setState({ password: event.target.value }) };
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
        this.setState({ selectedTags: new Set(event.target.value) });
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
        e.preventDefault();
        let data = new FormData();
        let {
      name,
            email,
            password,
            bio,
            selectedTags,
            avatar,
            multiValue,
            plan
    } = this.state;
        this.props.stripe.createToken({ name: name }).then(({ token }) => {
            data.append('name', name.trim());
            if (selectedTags.length) {
                data.append('tags', JSON.stringify(selectedTags));
            } else {
                data.append('tags', JSON.stringify(multiValue));
            }
            data.append('email', email.trim());
            data.append('password', password.trim());
            data.append('bio', bio.trim());
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
                    } else {
                        localStorage['token'] = user.token;
                        this.showSnack("Account created successfully!");
                        fetch('http://houseofhackers.me:81/signUp/', {
                            method: 'POST',
                            body: data
                        })

                        fetch('http://challenges.innovationmesh.com/api/signUp', {
                            method: 'POST',
                            body: data
                        })
                    }
                    // setTimeout(() => {
                    //   this.props.history.push(`/user/${user.id}`)
                    // }, 2000);
                })
                .catch(error => Logger(`front-end: CheckoutForm@storeUser: ${error.message}`));
        });
        // However, this line of code will do the same thing:
        // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
    }

    storeFreeUser = e => {
        e.preventDefault();
        let _this = this;
        let data = new FormData();
        let {
      name,
            email,
            password,
            bio,
            selectedTags,
            avatar,
            multiValue,
            plan
    } = this.state;
        data.append('name', name.trim());
        data.append('tags', JSON.stringify(selectedTags));
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
            .then(user => {
                if (user.error) {
                    this.showSnack(user.error);
                } else if(user.token){
                    /*fetch('http://houseofhackers.me:81/signUp/', {
                        method: 'POST',
                        body: data
                    })

                    fetch('http://challenges.innovationmesh.com/api/signUp', {
                        method: 'POST',
                        body: data
                    })*/
                    localStorage.setItem('token', user.token);
                    fetch("https://innovationmesh.com/api/getUser", {
                        method: 'GET',
                        headers: { "Authorization": "Bearer " + user.token }
                    })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (json) {
                        localStorage.setItem('user', JSON.stringify(json.user));
                        _this.showSnack("Account created successfully!");
                        setTimeout(() => {
                            _this.props.history.push(`/user/${json.user.id}`)
                        }, 2000);
                    })

                }
            })
            .catch(error => Logger(`front-end: CheckoutForm@storeFreeUser: ${error.message}`));

        // However, this line of code will do the same thing:
        // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
    }

    render() {
        let {
            selectedTags,
            loadedTags,
            focused,
            plan,
            multiValue,
            options,
            loadedPlans,
    } = this.state;

        return (
            <form className="container" onSubmit={this.handleSubmit}>
                <Helmet title="SpaceSignUp" meta={[{ name: 'description', content: 'Description of SpaceSignUp' }]} />
                <header className="checkoutHeaderContainer">
                    <Header headerTitle={this.state.space.name} />
                    <div className="checkoutHeaderBanner">
                        <div className="homeHeaderContentTitle">Join {this.state.space.name}</div>
                        <div className="homeHeaderContentSubtitle">Find out what all the buzz is about</div>
                    </div>
                </header>

                <main className="userSignUpMain">
                    <div className="spaceSignUpMain">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src={this.state.space.logo} height="auto" width="300px" />
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

                            {loadedTags &&
                                <FormControl style={{ marginTop: 24 }}>
                                    <InputLabel htmlFor="tags-multiple">Skills & Interests</InputLabel>
                                    <Select
                                        multiple
                                        value={[...this.state.selectedTags]}
                                        onChange={this.handleSkillTags}
                                        input={<Input id="tag-multiple" />}
                                        renderValue={selected => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {loadedTags.map(tag => (
                                            <MenuItem key={tag} value={tag}>
                                                <Checkbox checked={this.state.selectedTags.has(tag)} />
                                                <ListItemText primary={tag} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            }


                            {/*<FormControl>
                                <InputLabel htmlFor="tags-select">Skills & Interests</InputLabel>
                                <Select
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
                            </FormControl>*/}


                            {this.props.pubkey &&
                                <React.Fragment>
                                    <label style={{ marginBottom: 12, marginTop: '20px' }}>
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
