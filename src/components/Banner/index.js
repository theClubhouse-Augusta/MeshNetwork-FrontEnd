/**
*
* Banner
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

import FlatButton from 'material-ui/Button';

export default class Banner extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('challengeToken'),
      app: this.props.app
    }
  }

  componentWillReceiveProps(app) {
    this.setState({
      app: app.app
    }, () => {
      this.forceUpdate();
    })
  }

  renderJoinButton = () => {
    if (!this.state.token) {
      return (
        <FlatButton style={{ background: '#32b6b6', color: '#FFFFFF', width: '100%', maxWidth: '200px' }}>Sign Up</FlatButton>
      )
    }
  }
  render() {
    return (
      <div className="challenges_bannerContainer">
        <div className="challenges_bannerWrapper">
          <div className="challenges_bannerInfo">
            <div className="challenges_bannerTitle">Discover your next favorite project.</div>
            <div className="challenges_bannerContent">
              Challenge Quest focuses on the best new challenges, every day. It is a place for impact-loving enthusiasts to innovate and make a difference in their local or global ecosystems.
            </div>
            {this.renderJoinButton()}
          </div>
          <div className="challenges_bannerGraphic">
            {/* <img 
              alt="" 
              className="challenges_bannerImg" 
              src=""
            /> */}
          </div>
        </div>
      </div>
    );
  }
}
