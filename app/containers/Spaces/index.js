/*
 *
 * Spaces
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header';
import {TiSocialAtCircular,   TiSocialFacebookCircular,
  TiSocialInstagramCircular,
  TiSocialTwitterCircular} from 'react-icons/lib/ti';
import Footer from 'components/Footer';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import './style.css';
import './styleM.css';

export default class Spaces extends React.PureComponent {

  static propTypes = { children: React.PropTypes.node,};
  static childContextTypes = { muiTheme: React.PropTypes.object };
  getChildContext() {var theme = getMuiTheme(); return { muiTheme: theme }};

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
              <Card>>
                <CardMedia>
                  <img src={require('../../images/theClubhousePanel.jpg')} alt="" />
                </CardMedia>
                <CardTitle title="theClubhou.se" subtitle="540 Telfair Street, Augusta GA 30901" />
                {/*<CardActions>
                  <FlatButton icon={<TiSocialAtCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialFacebookCircular className="socialIcon" />} />
                  <FlatButton icon={<TiSocialInstagramCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialTwitterCircular className="socialIcon"/>} />
                </CardActions>*/}
              </Card>
            </div>
            <div className="spaceListing">
              <Card>>
                <CardMedia>
                  <img src={require('../../images/theClubhousePanel.jpg')} alt="" />
                </CardMedia>
                <CardTitle title="theClubhou.se" subtitle="540 Telfair Street, Augusta GA 30901" />
                {/*<CardActions>
                  <FlatButton icon={<TiSocialAtCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialFacebookCircular className="socialIcon" />} />
                  <FlatButton icon={<TiSocialInstagramCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialTwitterCircular className="socialIcon"/>} />
                </CardActions>*/}
              </Card>
            </div>

            <div className="spaceListing">
              <Card>>
                <CardMedia>
                  <img src={require('../../images/theClubhousePanel.jpg')} alt="" />
                </CardMedia>
                <CardTitle title="theClubhou.se" subtitle="540 Telfair Street, Augusta GA 30901" />
                {/*<CardActions>
                  <FlatButton icon={<TiSocialAtCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialFacebookCircular className="socialIcon" />} />
                  <FlatButton icon={<TiSocialInstagramCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialTwitterCircular className="socialIcon"/>} />
                </CardActions>*/}
              </Card>
            </div>

            <div className="spaceListing">
              <Card>>
                <CardMedia>
                  <img src={require('../../images/theClubhousePanel.jpg')} alt="" />
                </CardMedia>
                <CardTitle title="theClubhou.se" subtitle="540 Telfair Street, Augusta GA 30901" />
                {/*<CardActions>
                  <FlatButton icon={<TiSocialAtCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialFacebookCircular className="socialIcon" />} />
                  <FlatButton icon={<TiSocialInstagramCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialTwitterCircular className="socialIcon"/>} />
                </CardActions>*/}
              </Card>
            </div>

            <div className="spaceListing">
              <Card>>
                <CardMedia>
                  <img src={require('../../images/theClubhousePanel.jpg')} alt="" />
                </CardMedia>
                <CardTitle title="theClubhou.se" subtitle="540 Telfair Street, Augusta GA 30901" />
                {/*<CardActions>
                  <FlatButton icon={<TiSocialAtCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialFacebookCircular className="socialIcon" />} />
                  <FlatButton icon={<TiSocialInstagramCircular className="socialIcon"/>} />
                  <FlatButton icon={<TiSocialTwitterCircular className="socialIcon"/>} />
                </CardActions>*/}
              </Card>
            </div>

            <div className="spaceListing">
              <Card>>
                <CardMedia>
                  <img src={require('../../images/theClubhousePanel.jpg')} alt="" />
                </CardMedia>
                <CardTitle title="theClubhou.se" subtitle="540 Telfair Street, Augusta GA 30901" />
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
            <RaisedButton label="Sign Up" backgroundColor="#26aae1" labelColor="#FFFFFF" style={{ marginLeft:'15px', width:'200px'}}/>
            <RaisedButton label="Contact Us" backgroundColor="#26aae1" labelColor="#FFFFFF" style={{ marginLeft:'15px', width:'200px'}}/>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Spaces.contextTypes = {
  router: React.PropTypes.object
};
