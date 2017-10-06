/*
 *
 * MemDash
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/header'; 

import './style.css';
import './styleM.css';

export default class MemDash extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="MemDash" meta={[ { name: 'description', content: 'Description of MemDash' }]}/>

        //Remove this line and you can start writing your code here.
      </div>
    );
  }
}

MemDash.contextTypes = {
  router: React.PropTypes.object
};
