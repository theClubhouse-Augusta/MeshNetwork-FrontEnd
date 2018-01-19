import React from 'react';
import Helmet from 'react-helmet';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import Select from 'react-select';
import { injectStripe } from 'react-stripe-elements';
import CardSection from './CardSection';
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'react-icons/lib/md/expand-more';
import Header from '../../components/Header';

import StyleHelpers from '../../utils/StyleHelpers';
import Logger from '../../utils/Logger';

import './style.css';
import './styleM.css';

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
        loadedTags: [],
        loadedPlans: [],
        selectedTags: [],
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
        fetch(`http://localhost:8000/api/plans/${this.props.match.params.id}`, {
        })
            .then(response => response.json())
            .then(json => { this.setState({ loadedPlans: json.data }) })
            .catch(error => Logger(`front-end: CheckoutForm@loadPlans: ${error.message}`));
    }

    selectTag = selectedTag => {
        this.setState({ selectedTags: selectedTag });
    }

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
                        // setTimeout(() => {
                        //   this.props.history.push(`/user/${user.id}`)
                        // }, 2000);
                    }
                })
                .catch(error => Logger(`front-end: CheckoutForm@storeUser: ${error.message}`));
        });
        // However, this line of code will do the same thing:
        // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
    }

    storeFreeUser = e => {
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
        data.append('plan', plan);

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
            planFocused,
            plan,
            multiValue,
            options,
            loadedPlans,
    } = this.state;

        const Helper = new StyleHelpers();
        const marginTop = Helper.getLabelStyle(focused, selectedTags)[0];
        const color = Helper.getLabelStyle(focused, selectedTags)[1];


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
                            <label
                                style={{
                                    marginTop: marginTop,
                                    color: color,
                                }}
                                className={Helper.getLabelClassName(focused, selectedTags)}
                            >
                                Skills
                </label>

                            {!!loadedTags.length &&
                                <Select.Creatable
                                    placeholder={!focused && !!!selectedTags.length ? 'Skills' : ''}
                                    className={Helper.getSelectStyle(focused, selectedTags)}
                                    style={{ background: '#f8f8f8', border: 'none', boxShadow: 'none' }}
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
                                    multi
                                    className={Helper.getSelectStyle(focused, selectedTags)}
                                    options={options}
                                    style={{ background: '#f8f8f8', border: 'none', boxShadow: 'none' }}
                                    onChange={this.handleOnChange}
                                    value={multiValue}
                                    onFocus={this.onFocus}
                                    onBlur={this.onBlur}
                                />}


                            {this.props.pubkey &&
                                <React.Fragment>
                                    <label style={{ marginBottom: 12, }}>
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
                                {/* let amount = plan.amount.toString().splice(2, 0, '.'); */ }
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
                    onRequestClose={this.handleRequestClose}
                />
            </form>
        );
    }
}

export default injectStripe(CheckoutForm);
