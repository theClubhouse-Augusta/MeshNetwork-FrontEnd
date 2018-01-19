/*
 *
 * UserProfile
 *
 */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from 'components/Header';

import Chip from 'material-ui/Chip';

import MailIcon from 'react-icons/lib/fa/envelope-o';
import FacebookIcon from 'react-icons/lib/fa/facebook-square';
import TwitterIcon from 'react-icons/lib/fa/twitter-square';
import LinkedInIcon from 'react-icons/lib/fa/linkedin-square';
import InstagramIcon from 'react-icons/lib/fa/instagram';
import GithubIcon from 'react-icons/lib/fa/github-square';
import BehanceIcon from 'react-icons/lib/fa/behance-square';
import DribbbleIcon from 'react-icons/lib/fa/dribbble';
import WebsiteIcon from 'react-icons/lib/fa/globe';

import './style.css';
import './styleM.css';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      space:'',
      skills:[],
      token:localStorage.getItem('token')
    }
  }

  componentWillMount() {
    this.getUser()
  }

  getUser = token => {
    fetch('https://innovationmesh.com/api/user/' + this.props.match.params.id, {
      method:'GET',
      headers: { Authorization: `Bearer ${localStorage['token']}` },
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        user:json.user,
        space:json.space,
        skills:json.skills,
      })
    }.bind(this))
  }

  renderTag = (skill, i) => {
    let chipStyle = {
      color:"#FFFFFF",
      margin:'5px',
    }

    let rand = Math.random() * (10 - 1) + 1;

    chipStyle.animation = 'profileFlicker '+ rand + 's ease alternate infinite';

    return(
      <Chip style={chipStyle} key={i} label={skill.name}/>
    )

  }

  render() {
    return (
      <div className="container">
        <Helmet title="UserProfile" meta={[{ name: 'description', content: 'Description of UserProfile' }]} />
        <header>
          <Header />
        </header>

        <main className="mainProfile">
          <div className="profileHeader">
            <img src={this.state.user.avatar} className="profileHeaderImg"/>
            <div className="profileHeaderTitle">{this.state.user.name}</div>
            <div className="profileSubTitle">{this.state.user.title}</div>
          </div>
          <div className="profileContact">
           <Link to={'/space/'+this.state.user.spaceID} className="profileSpaceBlock">
              {this.state.space.name}
            </Link>
            <div className="profileSocialList">
              <MailIcon className="profileIconStyle" />
              <FacebookIcon className="profileIconStyle" />
              <TwitterIcon className="profileIconStyle" />
              <LinkedInIcon className="profileIconStyle" />
              <InstagramIcon className="profileIconStyle" />
              <GithubIcon className="profileIconStyle" />
              <BehanceIcon className="profileIconStyle" />
              <DribbbleIcon className="profileIconStyle" />
              <WebsiteIcon className="profileIconStyle" />
            </div>
          </div>
          <div className="profileSkillsList">
            <div className="tagsBox">

              {this.state.skills.map((skill, i) => (
                this.renderTag(skill, i)
              ))}
            </div>
          </div>
        </main>

        <footer>

        </footer>

      </div>
    );
  }
}

UserProfile.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
