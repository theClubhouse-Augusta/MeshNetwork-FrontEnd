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

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';

import Logger from '../../utils/Logger';
import authenticate from '../../utils/Authenticate';
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

    async componentWillMount() {
        const authorized = await authenticate(localStorage['token'], this.props.history);
        if (!authorized.error) {
            this.setState({ loading: false });
        } else {
            this.props.history.push('/');
        }
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


    render() {
        return (
            this.state.loading
                ?
                <Spinner loading={this.state.loading} />
                :
                <div className="container">
                    <Helmet title="MemberAcct" meta={[{ name: 'description', content: 'Description of MemberAcct' }]} />
                    <Header />

                    <main>
                        <div className="acctBanner">
                            <h2> account settings </h2>
                        </div>

                        <div className="acctBody">
                            <div className="acctMainInfo">
                                <div className="acctWorkInfo"></div>
                                <div className="acctTagSelection"></div>
                                <div className="acctSocialMedia"></div>
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
                                    //checkPW 
                                    />

                                    <TextField
                                        //validatey 
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
