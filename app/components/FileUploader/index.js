/**
*
* FileUploader
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import './styleM.css';

export default class FileUploader extends React.PureComponent {
  render() {
    return (
      <div className="fileUploader">
        <div className="fileUploadInput">
          <input type="file" />
        </div>

        <div className="fileUploadViewer"></div> 
      </div>
    );
  }
}

FileUploader.contextTypes = {
  router: PropTypes.object
};
