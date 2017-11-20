/*
 *
 * MemberAcct
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/header'; 

import './style.css';
import './styleM.css';

export default class MemberAcct extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="MemberAcct" meta={[ { name: 'description', content: 'Description of MemberAcct' }]}/>

        //Remove this line and you can start writing your code here.
      </div>
    );
  }
}
