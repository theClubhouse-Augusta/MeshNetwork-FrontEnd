/*
 *
 * AdminDash
 *
 */

import React from 'react';
import PropTypes from 'prop-types'; 
import Helmet from 'react-helmet';
import Drawer from 'material-ui/Drawer';


import './style.css';
import './styleM.css';



export default class AdminDash extends React.PureComponent {
 
  render() {

    const drawer = (
      <Drawer 
        type="permanent" 
        >
        <h4> Yo </h4>      
      </Drawer> 
    )

    
    return (
      <div className="container">
        <Helmet title="AdminDash" meta={[ { name: 'description', content: 'Description of AdminDash' }]}/>

       <div>
      
       </div>
      </div>
    );
  }
}

AdminDash.contextTypes = {
  router: React.PropTypes.object
};
