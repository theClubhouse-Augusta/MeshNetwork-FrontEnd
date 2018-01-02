/*
 *
 * UserSignIn
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

import './style.css';
import './styleM.css';

export default class UserSignIn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password:"",
      msg:"",
      snack:false,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user) {
      this.props.history.push('/memberSearch')
    }
  }

  handleRequestClose = () => { this.setState({ snack: false, msg: "" }); };
  showSnack = (msg) => { this.setState({ snack: true, msg: msg }); };

  handleEmail = (event) => {this.setState({email:event.target.value})};
  handlePassword = (event) => {this.setState({password:event.target.value})};

  signIn = () => {
    let data = new FormData();
    data.append('email', this.state.email);
    data.append('password', this.state.password);

    fetch("http://localhost:8000/api/login", {
      method:'POST',
      body:data
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if(json.error)
      {
        this.showSnack(json.error);
      }
      else if(json.token)
      {
        localStorage.setItem('token', json.token);
        this.showSnack('Welcome back!');
        setTimeout(() => { 
          this.props.history.push(`/user/${json.user.id}`)
        }, 2000);
      }
    }.bind(this));
  };

  render() {
    return (
      <div className="container">
        <Helmet title="UserSignIn" meta={[ { name: 'description', content: 'Description of UserSignIn' }]}/>

        <header>
          <Header/>
        </header>

        <main className="userSignInMain">
          <div className="userAuthContainer">
            <div className="userAuthHeader">Sign into the Mesh</div>
            <TextField style={{width:'100%', marginBottom:'10px'}} label="E-mail" value={this.state.email} onChange={this.handleEmail}/>
            <TextField style={{width:'100%', marginBottom:'10px'}} label="Password" value={this.state.password} onChange={this.handlePassword} type="password"/>
            <FlatButton style={{width:'80%', backgroundColor:"#3399cc", margin:'15px', color:'#FFFFFF'}} onClick={this.signIn}>Sign In</FlatButton>
          </div>
        </main>

        <Snackbar
          open={this.state.snack}
          message={this.state.msg}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />

      </div>
    );
  }
}

UserSignIn.contextTypes = {
  router: React.PropTypes.object
};
