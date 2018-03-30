/*
 *
 * UserSignIn
 *
 */

import React from "react";
import Helmet from "react-helmet";
import Header from "../../components/Header";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/Button";
import Snackbar from "material-ui/Snackbar";
import { LinearProgress } from "material-ui/Progress";

import "./style.css";
import "./styleM.css";

export default class UserSignIn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      msg: "",
      snack: false,
      forgotPassword: false,
      isLoading: false,
      emailSent: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.user) {
      this.props.history.push("/memberSearch");
    }
  }

  handleRequestClose = () => {
    this.setState({ snack: false, msg: "" });
  };
  showSnack = msg => {
    this.setState({ snack: true, msg: msg });
  };

  handleEmail = event => {
    this.setState({ email: event.target.value });
  };
  handlePassword = event => {
    this.setState({ password: event.target.value });
  };

  signIn = () => {
    this.setState({
      isLoading: true
    });
    let data = new FormData();
    data.append("email", this.state.email);
    data.append("password", this.state.password);

    fetch("https://testbean2-env.us-east-1.elasticbeanstalk.com/api/login", {
      method: "POST",
      body: data
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          this.showSnack(json.error);
        } else if (json.token) {
          let mainToken = json.token;
          localStorage.setItem("token", mainToken);
          fetch("https://testbean2-env.us-east-1.elasticbeanstalk.com/api/user/auth", {
            method: "GET",
            headers: { Authorization: "Bearer " + mainToken }
          })
            .then(response => response.json())
            .then(json => {
              let mainUser = json.user;
              localStorage.setItem("user", JSON.stringify(mainUser));
              this.showSnack("Welcome back!");
              setTimeout(() => {
                this.props.history.goBack();
              }, 2000);
            });
        }
        this.setState({
          isLoading: false
        });
      });
  };

  onEnterPress = event => {
    if (event.key === "Enter") {
      this.signIn();
      event.preventDefault();
    }
  };

  resetPassword = () => this.setState({ forgotPassword: true });
  sendResetEmail = () => {
    let data = new FormData();
    data.append("email", this.state.email);
    fetch(`https://testbean2-env.us-east-1.elasticbeanstalk.com/api/forgotpassword`, {
      method: "POST",
      body: data
    })
      .then(response => response.json)
      .then(json => {
        this.setState({ emailSent: true });
      })
      .catch(error => {
      });
  };
  renderLoading = () => {
    if (this.state.isLoading) {
      return (
        <LinearProgress
          color="secondary"
          style={{
            width: "100%",
            position: "fixed",
            top: "0",
            left: "0",
            right: "0"
          }}
        />
      );
    }
  };

  render() {
    return (
      <div className="userSignIncontainer">
        <Helmet
          title="UserSignIn"
          meta={[{ name: "description", content: "Description of UserSignIn" }]}
        />

        <header style={{ background: "#FFFFFF" }}>
          {this.renderLoading()}
          <Header space={this.props.spaceName} />
          <div className="userSignUpBanner">
            <div className="homeHeaderContentTitle">
              Welcome Back, Fellow Coworker
            </div>
            <div className="homeHeaderContentSubtitle">
              Find out what you have been missing
            </div>
          </div>
        </header>

        <main className="userSignInMain">
          {!this.state.forgotPassword && (
            <React.Fragment>
              <TextField
                fullWidth
                margin="normal"
                style={{ maxWidth: "300px" }}
                label="E-mail"
                value={this.state.email}
                onChange={this.handleEmail}
              />
              <TextField
                fullWidth
                margin="normal"
                style={{ maxWidth: "300px" }}
                label="Password"
                value={this.state.password}
                onChange={this.handlePassword}
                type="password"
                onKeyPress={this.onEnterPress}
              />
              <FlatButton
                type="submit"
                style={{
                  width: "60%",
                  maxWidth: "300px",
                  backgroundColor: "#ff4d58",
                  margin: "30px 15px 15px 15px",
                  color: "#FFFFFF"
                }}
                onClick={this.signIn}
              >
                Sign In
              </FlatButton>
              <FlatButton
                style={{
                  width: "50%",
                  backgroundColor: "#fff",
                  margin: "15px",
                  color: "#000"
                }}
                onClick={this.resetPassword}
              >
                Forgot Password
              </FlatButton>
            </React.Fragment>
          )}
          {this.state.forgotPassword && (
            <React.Fragment>
              <TextField
                fullWidth
                margin="normal"
                style={{ maxWidth: "300px" }}
                label="E-mail"
                value={this.state.email}
                onChange={this.handleEmail}
              />
              <FlatButton
                style={{
                  width: "60%",
                  maxWidth: "300px",
                  backgroundColor: "#ff4d58",
                  margin: "30px 15px 15px 15px",
                  color: "#FFFFFF"
                }}
                onClick={this.sendResetEmail}
              >
                Reset Password
              </FlatButton>
              {this.state.emailSent && (
                <p>Check your email for you temporary password</p>
              )}
            </React.Fragment>
          )}
        </main>

        <footer className="homeFooterContainer">
          Copyright © 2018 theClubhou.se • 540 Telfair Street • Tel: (706)
          723-5782
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
