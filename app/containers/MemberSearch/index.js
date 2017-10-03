/*
 *
 * MemberSearch
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class MemberSearch extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="MemberSearch" meta={[ { name: 'description', content: 'Description of MemberSearch' }]}/>

        //Remove this line and you can start writing your code here.
      </div>
    );
  }
}

MemberSearch.contextTypes = {
  router: React.PropTypes.object
};
