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

        <main> 
          <div className="headingMediaBlock">
            <h1> Learning Portal</h1>
            <p>mesh's easy platform for premium training </p> 
          </div>   

          <div className="learningBodyContainer">
            
            <div className="learningListBlock"> 
              <h2 className="learningClassesTitle">Available Classes</h2>
            

            <div className="learningClassesList">

          <Card className="learningClassListing">
              <CardMedia className="learningClassImage" overlayContentStyle={{height: '40px', fontSize: '20px', lineHeight: '24px'}} overlay={<CardTitle style={{padding: '0 0 8px 8px'}} title="Location" />} >
                    
              </CardMedia>

                <div className="learningClassDescription"> <div className="learningClassContent">
                    <CardTitle className="learningClassName"> Learn x for things</CardTitle> 
                    <CardText className="learningClassBlurb"> a short description I'm thinking 140 or less bc that's a thing now</CardText>  
              </div> 

              <div className="learningClassCostBlock">
                <h4 className="learningClassCost"> $99 </h4>
                <RaisedButton className="learningRegisterButton ">Register</RaisedButton>
              </div> 
            </div> 
          </Card>


        <Card className="learningClassListing">
        <CardMedia className="learningClassImage" overlayContentStyle={{height: '40px', fontSize: '20px', lineHeight: '24px'}} overlay={<CardTitle style={{padding: '0 0 8px 8px'}} title="Location" />} >
                
          </CardMedia> 

            <div className="learningClassDescription"> <div className="learningClassContent">
                <CardTitle className="learningClassName"> Learn x for things</CardTitle> 
                <CardText className="learningClassBlurb"> a short description I'm thinking 140 or less bc that's a thing now</CardText>  
          </div> 

          <div className="learningClassCostBlock">
            <h4 className="learningClassCost"> $99 </h4>
            <RaisedButton className="learningRegisterButton ">Register</RaisedButton>
          </div> 
        </div> 
      </Card>

      <Card className="learningClassListing">
      <CardMedia className="learningClassImage" overlayContentStyle={{height: '40px',  lineHeight: '24px'}} overlay={<CardTitle style={{padding: '0 0 8px 8px'}} title="Location" />} >
              
        </CardMedia>

        <div className="learningClassDescription"> <div className="learningClassContent">
              <CardTitle className="learningClassName"> Learn x for things</CardTitle> 
              <CardText className="learningClassBlurb"> a short description I'm thinking 140 or less bc that's a thing now</CardText>  
        </div> 

        <div className="learningClassCostBlock">
          <h4 className="learningClassCost"> $99 </h4>
          <RaisedButton className="learningRegisterButton ">Register</RaisedButton>
        </div> 
      </div> 
    </Card>

              { /* Imagining this as a link-that-looks-like-a-button call to action*/}
              <div className="learningAllClassesBlock">                 
                <a href=""> <div className="learningAllClassesLink"> <h3>All classes</h3>
                </div></a>
              </div>
        </div>
        </div> 
        </div>  
        </main>   
              

        <Footer />
      </div>
    );
  }
}

LearningHome.contextTypes = {
  router: React.PropTypes.object
};
