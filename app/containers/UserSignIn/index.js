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
import { LinearProgress } from 'material-ui/Progress';

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
            forgotPassword: false,
            isLoading:false,
            emailSent: false,
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
      this.setState({
        isLoading:true
      })
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
                    let newData = new FormData();
                    newData.append('username', _this.state.email);
                    newData.append('password', _this.state.password);
                    fetch('https://lms.innovationmesh.com/signIn/', {
                    method:'POST',
                    body:newData
                    })
                    .then(function(response) {
                    return response.json();
                    })
                    .then(function(json) {
                        if(json.non_field_errors)
                        {
                            _this.showSnack("Invalid Credentials");
                        }
                        else if(json.token)
                        {
                            localStorage.setItem('lmsToken', json.token);
                            fetch('https://lms.innovationmesh.com/getUser/', {
                            method:'GET',
                            headers: {'Authorization' : 'JWT ' + json.token}
                            })
                            .then(function(response) {
                            return response.json();
                            })
                            .then(function(json) {
                            localStorage.setItem('lmsUser', JSON.stringify(json.user));
                            _this.showSnack('Welcome back!');
                            setTimeout(() => {
                                _this.props.history.push(`/user/${mainUser.id}`)
                            }, 2000);
                            })
                        }
                    })
                })
              }
              _this.setState({
                isLoading:false
              })
            }.bind(this));
    };

    resetPassword = () => this.setState({ forgotPassword: true });
    sendResetEmail = () => {
        let data = new FormData();
        data.append('email', this.state.email);
        fetch(`https://innovationmesh.com/api/forgotpassword`, {
            method: 'POST',
            body: data
        })
        .then(response => response.json)
        .then(json => {
            this.setState({ emailSent: true }, () => {
                console.log(JSON.stringify(json));
                // if (json.success)
                //     this.showSnack('Check your email for your temporary password.');
                // else     
                //     this.showSnack(json)    
            });
        })
        .catch(error => {
            console.log(error);
        })
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
        return (
            <div className="userSignIncontainer">
                <Helmet title="UserSignIn" meta={[{ name: 'description', content: 'Description of UserSignIn' }]} />

                <header style={{ background: '#FFFFFF' }}>
                  {this.renderLoading()}
                  <Header />
                  <div className="userSignUpBanner">
                      <div className="homeHeaderContentTitle">Welcome Back, Fellow Coworker</div>
                      <div className="homeHeaderContentSubtitle">Find out what you have been missing</div>
                  </div>
                </header>

                <main className="userSignInMain">
                    {!this.state.forgotPassword &&
                        <React.Fragment>
                            <TextField style={{ width: '50%', marginBottom: '15px' }} label="E-mail" value={this.state.email} onChange={this.handleEmail} />
                            <TextField style={{ width: '50%', marginBottom: '15px' }} label="Password" value={this.state.password} onChange={this.handlePassword} type="password" />
                            <FlatButton style={{ width: '50%', backgroundColor: "#ff4d58", margin: '15px', color: '#FFFFFF' }} onClick={this.signIn}>Sign In</FlatButton>
                            <FlatButton style={{ width: '50%', backgroundColor: "#fff", margin: '15px', color: '#000' }} onClick={this.resetPassword}>Forgot Password</FlatButton>
                        </React.Fragment>
                    }
                    {this.state.forgotPassword &&
                        <React.Fragment>
                            <TextField style={{ width: '50%', marginBottom: '15px' }} label="E-mail" value={this.state.email} onChange={this.handleEmail} />
                            <FlatButton style={{ width: '50%', backgroundColor: "#ff4d58", margin: '15px', color: '#FFFFFF' }} onClick={this.sendResetEmail}>Reset Password</FlatButton>
                            {this.state.emailSent && <p>Check your email for you temporary password</p>}
                        </React.Fragment>
                    }
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
