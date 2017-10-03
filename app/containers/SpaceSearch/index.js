/*
 *
 * SpaceSearch
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/header'; 

import './style.css';
import './styleM.css';

export default class SpaceSearch extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="SpaceSearch" meta={[ { name: 'description', content: 'Description of SpaceSearch' }]}/>

        //Remove this line and you can start writing your code here.
      </div>
    );
  }
}

SpaceSearch.contextTypes = {
  router: React.PropTypes.object
};
