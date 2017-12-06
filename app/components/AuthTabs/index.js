/**
*
* AuthTabs
*
*/
import React from 'react';
import { Redirect } from 'react-router-dom';  
import PropTypes from 'prop-types';
import Select from 'react-select';
import Tabs, { Tab } from 'material-ui/Tabs';  

import './style.css';
import './styleM.css';

function TabContainer(props) {
  return <div className="divContentWrapper">{props.children}</div> 
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default class AuthTabs extends React.PureComponent {

  constructor() {
    super();
    this.state = {
      selectedTab: {},
      email: '',
      password: '',
      value: 0, 
    };
  }

  handleChange = (event, value) => (
    this.setState({ value })
  )

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  render() {
    const login = this.props.login;
    const email = this.state.email;
    const password = this.state.password;
    const value = this.state.value; 
    return (
      <div className="authTabsContainer"> 
        {this.props.redirect}
      <Tabs value={value} onChange={this.handleChange} centered>
        <Tab label ="Login" className="tabTitle" />                
        <Tab label="Sign up" className="tabTitle"/>   
      </Tabs>

      {value === 0 && <TabContainer> 
        <div id="loginForm">

              <p className="userFormItem">
                <label htmlFor="email">email</label>
                <input
                  onChange={this.handleEmail}
                  type="email"
                  name=""
                  id="email"
                />
              </p>

              <p className="userFormItem">
                <label htmlFor="password">password</label>
                <input
                  onChange={this.handlePassword}
                  type="password"
                  name=""
                  id="password"
                />
              </p>

              <div id="rememberMe" className="userFormItem">
                { /* radio doot */ }
              </div>

              <div className="userFormSubmit">
                <button onClick={(e) => {this.props.login(e, email, password)}}>Submit </button> 
              </div>
            </div>

            <div className="forgotInfo">
              <a href="" className="userInfoLink">forgot email</a>
              <a href="" className="userInfoLink">forgot password </a>
            </div>   
      </TabContainer>  }
        {value === 1 && <TabContainer> <form id="signUpForm">
              <p className="userFormItem">
                <label htmlFor="name" className="userFormLabel">name</label>
                <input type="text" name="" id="name" />
              </p>

              <div className="userFormItem">
                <label htmlFor="homespace" className="userFormLabel"> your home space</label>
                <select>
                      <option value="">the Clubhou.se</option>
                      <option value=""> Spark Macon </option>
                      <option value=""> MakerVillage</option>
                      <option value=""> FourAthens</option>
                      <option value=""> Columbus Makes IT </option>
                  </select>   
              </div>

              <p className="userFormItem">
                <label
                  htmlFor="email"
                  className="userFormLabel"
                >
                  email
                </label>
                <input type="email" name="" id="email" />
              </p>

              <p className="userFormItem">
                <label htmlFor="password" className="userFormLabel">password</label>
                <input type="password" name="" id="password" />
              </p>

              <p className="userFormItem">
                <label htmlFor="confirmPassword" className="userFormLabel">confirm password</label>
                <input type="password" name="" id="confirmPassword" />
              </p>

              <div className="userFormSubmit">
                <button type="submit" >Submit </button>
              </div>
            </form>
            </TabContainer>}
    </div>   
    );
  }
}

AuthTabs.propTypes = {
  login: PropTypes.func.isRequired,
  redirect: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

