/*
 *
 * UserSignIn
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

import './style.css';
import './styleM.css';

export default class UserSignIn extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            msg: "",
            snack: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.user) {
            this.props.history.push('/memberSearch')
        }
    }

    handleRequestClose = () => { this.setState({ snack: false, msg: "" }); };
    showSnack = (msg) => { this.setState({ snack: true, msg: msg }); };

    handleEmail = (event) => { this.setState({ email: event.target.value }) };
    handlePassword = (event) => { this.setState({ password: event.target.value }) };

    signIn = () => {
        let _this = this;
        let data = new FormData();
        data.append('email', this.state.email);
        data.append('password', this.state.password);

        fetch("https://innovationmesh.com/api/login", {
            method: 'POST',
            body: data
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
              if (json.error) {
                  _this.showSnack(json.error);
              }
              else if (json.token) {
                let mainToken = json.token;
                localStorage.setItem('token', mainToken);
                fetch("https://innovationmesh.com/api/user/auth", {
                    method: 'GET',
                    headers: { "Authorization": "Bearer " + mainToken }
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                  let mainUser = json.user;
                  localStorage.setItem('user', JSON.stringify(mainUser));
                  fetch('http://challenges.innovationmesh.com/api/signIn', {
                    method:'POST',
                    body:data
                  })
                  .then(function(response) {
                    return response.json();
                  })
                  .then(function(json) {
                    if(json.error)
                    {
                      _this.showSnack(json.error);
                    }
                    else if(json.token)
                    {
                      localStorage.setItem('challengeToken', json.token);
                      //Add the next one here. Remove below and set it in the final promise.
                      _this.showSnack('Welcome back!');
                      setTimeout(() => {
                          _this.props.history.push(`/user/${mainUser.id}`)
                      }, 2000);
                    }
                  })
                })
              }
            }.bind(this));
    };
    render() {
        return (
            <div className="userSignIncontainer">
                <Helmet title="UserSignIn" meta={[{ name: 'description', content: 'Description of UserSignIn' }]} />

                <header style={{ background: '#FFFFFF' }}>
                    <Header />
                    <div className="userSignUpBanner">
                        <div className="homeHeaderContentTitle">Welcome Back, Fellow Coworker</div>
                        <div className="homeHeaderContentSubtitle">Find out what you have been missing</div>
                    </div>
                </header>

                <main className="userSignInMain">
                    <TextField style={{ width: '100%', marginBottom: '15px' }} label="E-mail" value={this.state.email} onChange={this.handleEmail} />
                    <TextField style={{ width: '100%', marginBottom: '15px' }} label="Password" value={this.state.password} onChange={this.handlePassword} type="password" />
                    <FlatButton style={{ width: '80%', backgroundColor: "#ff4d58", margin: '15px', color: '#FFFFFF' }} onClick={this.signIn}>Sign In</FlatButton>
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

UserSignIn.contextTypes = {
    router: PropTypes.object
};
