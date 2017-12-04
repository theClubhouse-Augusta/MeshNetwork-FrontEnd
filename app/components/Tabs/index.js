/**
*
* Tabs
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select'; 

import './style.css';
import './styleM.css';

export default class ExampleTabs extends React.PureComponent {

  constructor() {
    super();
    this.state = {
      selectedTab: {},
      email: '',
      password: '',
    };
  }

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
    return (
      <Tabs
        selectedTab={
          (Object.keys(this.state.selectedTab).length === 0)
            ? undefined
            : this.state.selectedTab
        }
        onChangeTab={(selected) => this.setState({ selectedTab: selected })}
      >
        {this.props.redirect}
        <Tab name="first" title="Log in" className="tabTitle">

          <div className="tabContentWrapper">

            <form id="loginForm">

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
                <button>Submit </button> 
              </div>
            </form>

            <div className="forgotInfo">
              <a href="" className="userInfoLink">forgot email</a>
              <a href="" className="userInfoLink">forgot password </a>
            </div>
          </div>
        </Tab>

        <Tab name="second" title="Sign up">
          <div className="tabContentWrapper">
            <form id="signUpForm">
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
          </div>
        </Tab>
      </Tabs>
    );
  }
}

ExampleTabs.propTypes = {
  login: PropTypes.func.isRequired,
  redirect: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

function Tabs({ children, selectedTab, onChangeTab }) {
  const tabProps = [];
  const content = React.Children.map(children, (child) => {
    if (child.type === Tab) {
      const { title, name } = child.props;
      tabProps.push({ title, name });
      // first tab default
      if (selectedTab ? (selectedTab !== child.props.name) : (tabProps.length !== 1)) {
        return null;
      }
    }
    return child;
  });

  const finalSelectedTab = selectedTab ||
        (tabProps.length > 0 && tabProps[0].name);

  return (
    <div className="tabsContainer">
      <Tablist
        selectedTab={finalSelectedTab}
        onChangeTab={onChangeTab}
        tabs={tabProps}
      />
      <div className="tabsContent">
        {content}
      </div>
    </div>
  );
}

Tabs.propTypes = {
  children: PropTypes.array.isRequired,
  selectedTab: PropTypes.string,
  onChangeTab: PropTypes.func,
};

function Tablist({ tabs, selectedTab, onChangeTab }) {
  const linkClass = (selected) => {
    const c = 'tablistLink';
    return selected ? `${c} ${c}Selected` : c;
  };

  return (
    <nav >
      <ul className="tabList">
        {tabs.map(({ name, title }) => (
          <li aria-selected={name === selectedTab} role="tab" key={name} className="tabLink">
            <a
              role="presentation"
              className={linkClass(name === selectedTab)}
              onClick={() => onChangeTab(name)}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Tablist.propTypes = {
  tabs: PropTypes.array.isRequired,
  selectedTab: PropTypes.string,
  onChangeTab: PropTypes.func,
};

function Tab({ children }) {
  return (
    <div name="tabContent">
      {children}
    </div>
  );
}

Tab.propTypes = {
  children: PropTypes.object,
};
