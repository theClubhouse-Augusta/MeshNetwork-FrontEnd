/**
*
* TagSelect
*
*/

import React from 'react';
import Chip from 'material-ui/Chip';

import './style.css';
import './styleM.css';

const styles = {
  chip: {
    margin: '10px 5px',
    padding: '10px',
    width: '80px', 

  }
};


export default class TagSelect extends React.PureComponent {
  render() {
    return (
      <div className="tagSelectContainer">
        <div className="tagWrapper">
          <Chip style={styles.chip}></Chip>
          <Chip style={styles.chip}></Chip>
          <Chip style={styles.chip}></Chip>
          <Chip style={styles.chip}></Chip>
          <Chip style={styles.chip}></Chip>
        </div>
      </div>
    );
  }
}

TagSelect.contextTypes = {
  router: React.PropTypes.object
};
