/*
 *
 * LearningHome
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header'; 
import Footer from 'components/Footer'; 
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';  

import './style.css';
import './styleM.css';

export default class LearningHome extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="LearningHome" meta={[ { name: 'description', content: 'Description of LearningHome' }]}/>
        <Header />
        <div className="learningBodyContainer"> 

      <div className="headingMediaBlock">
        <h1> Learning Portal</h1>
        <p>mesh's easy platform for premium training </p> 
        </div>   
          
        <div className="learningList"> 
          <h2 className="availableClasses">Available Classes</h2>
        </div>

        <div className="classesList">

        <div className="classesListing">
        <div className="classesImage"></div>
        <div className="classesLocation"></div>
        <div className="classesDescription">     <div className="classesInfo">
              <h3 className="classesName"> Learn x for things</h3>        
              <p className="classesBlurb"> a short description I'm thinking 140 or less bc that's a thing now</p>  
          </div> 
          <div className="classesCostBlock">
            <h4 className="classesCost"> $99 </h4>
            <button className="registerButton">Register</button>
          </div> 
        </div> 
      </div>

      <div className="classesListing">
      <div className="classesImage"></div>
      <div className="classesLocation"></div>
      <div className="classesDescription">     <div className="classesInfo">
            <h3 className="classesName"> Learn x for things</h3>        
            <p className="classesBlurb"> a short description I'm thinking 140 or less bc that's a thing now</p>  
        </div> 
        <div className="classesCostBlock">
          <h4 className="classesCost"> $99 </h4>
          <button className="registerButton">Register</button>
        </div> 
      </div> 
    </div>

    <div className="classesListing">
    <div className="classesImage"></div>
    <div className="classesLocation"></div>
    <div className="classesDescription">     <div className="classesInfo">
          <h3 className="classesName"> Learn x for things</h3>        
          <p className="classesBlurb"> a short description I'm thinking 140 or less bc that's a thing now</p>  
      </div> 
      <div className="classesCostBlock">
        <h4 className="classesCost"> $99 </h4>
        <button className="registerButton">Register</button>
      </div> 
    </div> 
  </div>

              { /* Imagining this as a link-that-looks-like-a-button call to action*/}
              <div className="allClasses">                 
                <a href=""> <div className="fullClassesLink"> <h3>All classes</h3>
                </div></a>
              </div>
        </div>
        </div>
        <Footer />
      </div>
    );
  }
}

LearningHome.contextTypes = {
  router: React.PropTypes.object
};
