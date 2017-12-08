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

import Card, { CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Header from 'components/Header';
import Footer from 'components/Footer';
import './style.css';
import './styleM.css';

export default class Spaces extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="Spaces" meta={[ { name: 'description', content: 'Description of Spaces' }]}/>
        <Header />
        <div className="spacesBodyWrapper">
          <div className="spacesHeader">
            <span className="spacesTitle">PARTICIPATING SPACES</span>
          </div>

          <div className="spacesList">
            <div className="spaceListing">
              <Card>
                <CardMedia>
                  <img src={require('../../images/theClubhousePanel.jpg')} alt="" width="100%"/>
                </CardMedia>
                <h2 className="spaceNameHeader">theClubhou.se</h2>
                <CardContent className="spaceAddress"> 540 Telfair Street, Augusta GA 30901</CardContent>
                {/*<CardActions>
                  <FlatButton icon={<TiSocialAtCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialFacebookCircular className="socialIcon" />} />
                  <FlatButton icon={<TiSocialInstagramCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialTwitterCircular className="socialIcon"/>} />
                </CardActions>*/}
              </Card>
            </div>
            <div className="spaceListing">
              <Card>
                <CardMedia>
                  <img src={require('../../images/theClubhousePanel.jpg')} alt="" width="100%"/>
                </CardMedia>
                <h2 className="spaceNameHeader">theClubhou.se</h2>
                <CardContent className="spaceAddress"> 540 Telfair Street, Augusta GA 30901</CardContent>
                {/*<CardActions>
                  <FlatButton icon={<TiSocialAtCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialFacebookCircular className="socialIcon" />} />
                  <FlatButton icon={<TiSocialInstagramCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialTwitterCircular className="socialIcon"/>} />
                </CardActions>*/}
              </Card>
            </div>

            <div className="spaceListing">
              <Card>
                <CardMedia>
                  <img src={require('../../images/theClubhousePanel.jpg')} alt="" width="100%"/>
                </CardMedia>
                <h2 className="spaceNameHeader">theClubhou.se</h2>
                <CardContent className="spaceAddress"> 540 Telfair Street, Augusta GA 30901</CardContent>
                {/*<CardActions>
                  <FlatButton icon={<TiSocialAtCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialFacebookCircular className="socialIcon" />} />
                  <FlatButton icon={<TiSocialInstagramCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialTwitterCircular className="socialIcon"/>} />
                </CardActions>*/}
              </Card>
            </div>

            <div className="spaceListing">
              <Card>
                <CardMedia>
                  <img src={require('../../images/theClubhousePanel.jpg')} alt="" width="100%"/>
                </CardMedia>
                <h2 className="spaceNameHeader">theClubhou.se</h2>
                <CardContent className="spaceAddress"> 540 Telfair Street, Augusta GA 30901</CardContent>
                {/*<CardActions>
                  <FlatButton icon={<TiSocialAtCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialFacebookCircular className="socialIcon" />} />
                  <FlatButton icon={<TiSocialInstagramCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialTwitterCircular className="socialIcon"/>} />
                </CardActions>*/}
              </Card>
            </div>

            <div className="spaceListing">
              <Card>
                <CardMedia>
                  <img src={require('../../images/theClubhousePanel.jpg')} alt="" width="100%"/>
                </CardMedia>
                <h2 className="spaceNameHeader">theClubhou.se</h2>
                <CardContent className="spaceAddress"> 540 Telfair Street, Augusta GA 30901</CardContent>
                {/*<CardActions>
                  <FlatButton icon={<TiSocialAtCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialFacebookCircular className="socialIcon" />} />
                  <FlatButton icon={<TiSocialInstagramCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialTwitterCircular className="socialIcon"/>} />
                </CardActions>*/}
              </Card>
            </div>

            <div className="spaceListing">
              <Card>
                <CardMedia>
                  <img src={require('../../images/theClubhousePanel.jpg')} alt="" width="100%"/>
                </CardMedia>
                <h2 className="spaceNameHeader">theClubhou.se</h2>
                <CardContent className="spaceAddress"> 540 Telfair Street, Augusta GA 30901</CardContent>
                {/*<CardActions>
                  <FlatButton icon={<TiSocialAtCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialFacebookCircular className="socialIcon" />} />
                  <FlatButton icon={<TiSocialInstagramCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialTwitterCircular className="socialIcon"/>} />
                </CardActions>*/}
              </Card>
            </div>

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

