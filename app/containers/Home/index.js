/*
 *
 * Home
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/header';
import HomeBodyOne from 'components/homebodyone';
import HomeBodyTwo from 'components/homebodytwo';
import HomeBodyThree from 'components/homebodythree';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import './style.css';
import './styleM.css';


export default class Home extends React.PureComponent {

  static propTypes = { children: React.PropTypes.node,};
  static childContextTypes = { muiTheme: React.PropTypes.object };
  getChildContext() {var theme = getMuiTheme(); return { muiTheme: theme }};

  render() {
    return (
      <div className="container">
        <Helmet title="Home" meta={[ { name: 'description', content: 'Description of Home' }]}/>
          <Header />
          <div>
            <HomeBodyOne />
            <HomeBodyTwo />
            <HomeBodyThree />
          </div>
      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object
};
