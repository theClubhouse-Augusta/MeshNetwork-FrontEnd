/*
 *
 * LogInSignUp
 *
 */
import React from 'react';
import PropTypes from 'prop-types'; // ES6
import Helmet from 'react-helmet';
import Header from 'components/Header';
import Footer from 'components/Footer';
import AuthTabs from 'components/AuthTabs';

import './style.css';
import './styleM.css';

export default class LogInSignUp extends React.PureComponent {
  render() {
    return (
      <div className="authContainer">
        <Helmet title="LogInSignUp" meta={[{ name: 'description', content: 'Description of LogInSignUp' }]} />
        <Header />
        <div className="authBanner" />

        <main className="authBody">
          <AuthTabs
            login={this.props.login}
            redirect={this.props.redirect}
          />
        </main>

        <Footer />

      </div>
    );
  }
}

LogInSignUp.propTypes = {
  login: PropTypes.func.isRequired,
  redirect: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};
