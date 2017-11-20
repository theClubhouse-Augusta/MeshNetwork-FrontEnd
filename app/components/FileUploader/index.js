/**
*
* FileUploader
*
*/

import React from 'react';

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
  router: React.PropTypes.object
};
