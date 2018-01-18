/*
 *
 * DataViz
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { AppearanceByMonthYear } from '../../components/DataViz/AppearanceByMonthYear'; 
// import { AllAppearances } from '../../components/DataViz/AllAppearances'; 

import './style.css';
import './styleM.css';

export default class DataViz extends React.PureComponent {
  render() {

    return (
      <div className="container">
        <Helmet title="DataViz" meta={[ { name: 'description', content: 'Description of DataViz' }]} />
        {/* <AllAppearances height={600} width={600} {...this.props}  /> */}
        <AppearanceByMonthYear {...this.props} />
      </div>
    );
  }
}

