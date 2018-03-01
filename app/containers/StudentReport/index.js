/*
 *
 * StudentReport
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class StudentReport extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="StudentReport" meta={[ { name: 'description', content: 'Description of StudentReport' }]}/>

        //Remove this line and you can start writing your code here.
      </div>
    );
  }
}

StudentReport.contextTypes = {
  router: PropTypes.object
};
