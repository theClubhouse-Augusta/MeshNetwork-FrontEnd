/*
 *
 * MemberAcct
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Tabs, { Tab } from 'material-ui/Tabs';
import Snackbar from 'material-ui/Snackbar';
import Select from 'react-select';

import MtextField from '../../components/CustomUi/MtextField';
import DefaultButton from '../../components/CustomUi/DefaultButton';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProfileSettings from '../../components/ProfileSettings';
import AccountSettings from '../../components/AccountSettings';
import SecurityNotifSettings from '../../components/SecurityNotifSettings';

import Logger from '../../utils/Logger';
import './style.css';
import './styleM.css';

export default class MemberAcct extends React.PureComponent {
    state = {
        // ProfileSettings: userInfoForm
        name: '',
        website: '',
        title: '',
        avatar: '',
        imagePreviewUrl: '',
        email: '',
        email2: '',
        currentPassword: '',
        password: '',
        password2: '',
        phoneNumber: '',
        bio: '',
        selectedTag: '',
        selectedTags: [],
        loadedTags: [],
        value: 0,
        company: '',
        hireable: false,
        emailError: false,
        passwordError: false,
        snackBar: false,
        snackBarMessage: '',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        github: '',
        dribble: '',
        behance: '',
        angellist: '',
    };

    componentDidMount() {
        this.loadSkills();
        this.loadUserSkills();
    }

    loadSkills = () => {
        fetch('http://localhost:8000/api/skills/all', {
            headers: { Authorization: `Bearer ${localStorage['token']}` },
        })
            .then(response => response.json())
            .then(json => this.setState({ loadedTags: json }))
            .catch(error => Logger(`front-end: MemberAcct@loadSkills: ${error.message}`));
    }

    loadUserSkills = () => {
        fetch('http://localhost:8000/api/userskills', {
            headers: { Authorization: `Bearer ${localStorage['token']}` },
        })
            .then(response => response.json())
            .then(json => { this.setState({ selectedTags: json }) })
            .catch(error => Logger(`front-end: MemberAcct@loadUserSkiils: ${error.message}`));
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };


    name = e => this.setState({ name: e.target.value.replace(/\s\s+/g, ' ') });
    title = e => this.setState({ title: e.target.value.replace(/\s\s+/g, ' ') });
    // workspace = e => this.setState({ workspace: e.target.value  });
    email = e => this.setState({ email: e.target.value.trim() });
    email2 = e => this.setState({ email2: e.target.value.trim() });
    currentPassword = e => this.setState({ currentPassword: e.target.value });
    password = e => this.setState({ password: e.target.value });
    password2 = e => this.setState({ password2: e.target.value });

    confirmPassword = () => {
        if (this.state.password !== this.state.password2) {
            this.setState({ passwordError: true })
        } else {
            this.setState({ passwordError: false });
        }
    }

    confirmEmail = () => {
        if (this.state.email !== this.state.email2) {
            this.setState({ emailError: true })
        } else {
            this.setState({ emailError: false });
        }
    }

    company = e => this.setState({ company: e.target.value.replace(/\s\s+/g, ' ') });
    website = e => this.setState({ website: e.target.value });
    phone = e => this.setState({ phoneNumber: e.target.value });
    bio = e => this.setState({ bio: e.target.value });
    hireable = e => this.setState({ hireable: !this.state.hireable });

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
                this.setState({ selectedTags: selectedTags });
            } else {
                this.setState({ selectedTags: selectedTags });
            }
        }
        // else {
        // this.setState({ selectedTags: selectedTag });
        // }
    }

    avatar = e => {
        e.preventDefault();
        let avatar = e.target.files[0];
        let reader = new FileReader();

        reader.onload = () => {
            this.setState({
                imagePreviewUrl: reader.result,
                avatar: avatar
            });
        };
        reader.readAsDataURL(avatar);
    }

    toggleHireable = () => this.setState({ hireable: !this.state.hireable });
    facebook = e => this.setState({ facebook: e.target.value });
    twitter = e => this.setState({ twitter: e.target.value });
    instagram = e => this.setState({ instagram: e.target.value });
    linkedin = e => this.setState({ linkedin: e.target.value });
    github = e => this.setState({ github: e.target.value });
    dribble = e => this.setState({ dribble: e.target.value });
    behance = e => this.setState({ behance: e.target.value });
    angellist = e => this.setState({ angellist: e.target.value });

    onUserInfoSubmit = e => {
        e.preventDefault();
        // if (this.state.passwordError && !this.state.emailError) {
        //   this.toggleSnackBar("Passwords do not match");
        //   return;
        // } else if (this.state.passwordError && this.state.emailError) {
        //   this.togglesnackbar("passwords and emails do not match");
        // } else if (!this.state.passwordError && this.state.emailError) {
        //   this.togglesnackbar("Emails do not match");
        // }
        let data = new FormData();
        let { title, name, website } = this.state;
        data.append('title', title.trim());
        data.append('name', name.trim());
        data.append('website', website);
        data.append('avatar', this.state.avatar);

        fetch(`http://localhost:8000/api/updateUser`, {
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

    onWorkInfoSubmit = e => {
        e.preventDefault();
        let data = new FormData();
        let { company, hireable } = this.state;
        data.append('company', company.trim());
        data.append('hireable', hireable);

        fetch(`http://localhost:8000/api/updateUser`, {
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

    onTagsSubmit = e => {
        e.preventDefault();
        let data = new FormData();
        let { selectedTags } = this.state;
        data.append('tags', JSON.stringify(selectedTags));

        fetch(`http://localhost:8000/api/updateUser`, {
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

    toggleSnackBar = (message) =>
        this.setState({
            snackBar: !this.state.snackBar,
            snackBarMessage: message
        });

    render() {
        return (
            <div className="container">
                <Helmet title="MemberAcct" meta={[{ name: 'description', content: 'Description of MemberAcct' }]} />
                <Header />

                <main>
                    <div className="acctBanner">
                        <h2> account settings </h2>
                    </div>

                    <div className="acctBody">
                        <Tabs
                            value={this.state.value}
                            style={{ maxWidth: '1000px', margin: '0 auto' }} onChange={this.handleChange}
                            centered
                        >
                            <Tab label="Profile"> </Tab>
                            <Tab label="Account"> </Tab>
                            {/* } <Tab label="Security & Notifications"> </Tab> */}
                        </Tabs>

                        {this.state.value === 0 &&
                            <ProfileSettings
                                // userInfo form
                                name={this.name}
                                title={this.title}
                                website={this.website}
                                avatar={this.avatar}
                                onUserInfoSubmit={this.onUserInfoSubmit}
                                onWorkInfoSubmit={this.onWorkInfoSubmit}
                                onTagsSubmit={this.onTagsSubmit}
                                bio={this.bio}
                                company={this.company}
                                toggleHireable={this.toggleHireable}
                                selectTag={this.selectTag}
                                facebook={this.facebook}
                                twitter={this.twitter}
                                instagram={this.instagram}
                                linkedin={this.linkedin}
                                github={this.github}
                                dribble={this.dribble}
                                behance={this.behance}
                                angellist={this.angellist}
                                // form values
                                Name={this.state.name}
                                Title={this.state.title}
                                Website={this.state.website}
                                //Bio={bio}
                                Company={this.state.company}
                                Facebook={this.state.facebook}
                                Twitter={this.state.twitter}
                                Instagram={this.state.instagram}
                                Linkedin={this.state.linkedin}
                                Github={this.state.github}
                                Dribble={this.state.dribble}
                                Behance={this.state.behance}
                                Angellist={this.state.angellist}
                                hireable={this.state.hireable}
                                imagePreviewUrl={this.state.imagePreviewUrl}
                                selectedTags={this.state.selectedTags}
                                loadedTags={this.state.loadedTags}
                            />}

                        {this.state.value === 1 &&
                            <AccountSettings
                                // functions
                                currentPassword={this.currentPassword}
                                password={this.password}
                                password2={this.password2}
                                email={this.email}
                                email2={this.email2}
                                confirmPassword={this.confirmPassword}
                                confirmEmail={this.confirmEmail}
                                // form values
                                CurrentPassword={this.state.currentPassword}
                                Password={this.state.password}
                                Password2={this.state.password2}
                                Email={this.state.email}
                                Email2={this.state.email2}
                                passwordError={this.state.passwordError}
                                emailError={this.state.emailError}
                            />}
                        {/* {value === 2 &&   <SecurityNotifSettings /> }  */}
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
