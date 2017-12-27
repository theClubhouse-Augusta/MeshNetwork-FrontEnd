/*
 *
 * Spaces
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import {
  TiSocialAtCircular,   
  TiSocialFacebookCircular,
  TiSocialInstagramCircular,
  TiSocialTwitterCircular
} from 'react-icons/lib/ti';

import Card, { CardMedia, CardContent, CardHeader } from 'material-ui/Card';
import Header from 'components/Header';
import Footer from 'components/Footer';

import './style.css';
import './styleM.css';

const API = ''; 

export default class Spaces extends React.PureComponent {
  state ={
    spaceCards: '', 
  }

  componentDidMount () {
    this.getSpaces();
  }

  getSpaces= () => {
    fetch(API)
    .then((response) => { 
      return response.json(); 
  }).then(data => {
    let spaceCards = data.response.map((spaceCard) => {
      return (  
        <div className="spaceListing">
          <Card key={'spaceCard' + spaceCard.spaceId}>
            <CardMedia>
              <img src={require({spaceCard.img})} alt="" width="100%"/>
            </CardMedia>
            <CardHeader className="spaceNameHeader" title={spaceCard.spaceName} style={cardHeaderStyle} /> 
            <CardContent className="spaceAddress"> {spaceCard.address} </CardContent>
            </Card>
          </div>
      )
    })
    this.setState({spaceCards: spaceCards}); 
    console.log('and the state is:', this.state.pictures);
  })
}

  render() {
    const cardHeaderStyle ={
      padding: '15px 15px 0 15px'
    }
    /* this is temp until I get to theming :) */ 
    return (
      <div className="container">
        <Helmet title="Spaces" meta={[ { name: 'description', content: 'Description of Spaces' }]}/>
        <Header />
        <div className="spacesBodyWrapper">
          <div className="spacesHeader">
            <span className="spacesTitle">PARTICIPATING SPACES</span>
          </div>

          <div className="spacesList">
           {this.state.spaceCards}

          </div>
        </div>
        <div className="aboutButtons">
          <div className="aboutButtonText">Ready to Discover the Mesh Network?</div>
          <div className="aboutButtonsContainer">
            <button label="Sign Up" style={{ marginLeft:'15px', width:'200px'}}/>
            <button label="Contact Us" style={{ marginLeft:'15px', width:'200px'}}/>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

/*<CardActions>
                  <FlatButton icon={<TiSocialAtCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialFacebookCircular className="socialIcon" />} />
                  <FlatButton icon={<TiSocialInstagramCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialTwitterCircular className="socialIcon"/>} />
                </CardActions>*/