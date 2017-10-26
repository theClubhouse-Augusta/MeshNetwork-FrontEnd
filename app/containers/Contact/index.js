/*
 *
 * Contact
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header';
import Footer from 'components/Footer';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

import './style.css';
import './styleM.css';

export default class Contact extends React.PureComponent {

  static propTypes = { children: React.PropTypes.node,};
  static childContextTypes = { muiTheme: React.PropTypes.object };
  getChildContext() {var theme = getMuiTheme(); return { muiTheme: theme }};

  render() {

    const buttonContainer = {
      marginTop:'10px',
      width:'100%',
      fontSize:'1.4em',
      height:'60px',
      alignSelf:'center',
      textTransform:'uppercase',
      fontWeight:'bold',
      color:'#FFFFFF',
      backgroundColor:'#26aae1'
    };

    return (
      <div className="contact_container">
        <Helmet title="Contact" meta={[ { name: 'description', content: 'Description of Contact' }]}/>
        <Header/>
        <header className="contact_headerContactStyle">
          <div className="contact_headerMain">
            <div className="contact_headerTitle">Contact Us</div>
          </div>
        </header>
        <main className="contact_mainStyle">
          <div className="contact_sectionContainer">
            <div className="contact_mainTitle">
              Let’s Mesh Together
            </div>
            <div className="contact_mainSubtitle">
              Fill the form below so we can learn more about your needs.
            </div>
          </div>

          <div className="contact_contactRow">
            <div className="contact_contactContainer">
              <div className="contact_inputBox">
                <div className="contact_inputLabel">WHAT’S YOUR NAME?*</div>
                <TextField hintText="Full Name (First & Last)" fullWidth={true} onChange={this.handleName}/>
              </div>
              <div className="contact_inputBox">
                <div className="contact_inputLabel">WHAT EMAIL CAN WE REACH YOU AT?*</div>
                <TextField hintText="i.e. hello@meshnetwork.com" fullWidth={true} onChange={this.handleEmail}/>
              </div>
              <div className="contact_inputBox">
                <div className="contact_inputLabel">TELL US A BIT ABOUT YOUR ORGANIZTION</div>
                <TextField hintText="What are you looking to build? What is the deadline? Do you have a specific budget range?" multiLine={true} fullWidth={true} onChange={this.handleContent}/>
              </div>
              <FlatButton style={buttonContainer} >Send My Message</FlatButton>
            </div>
            <div className="contact_contactInfo">
              <div className="contact_contactBlock">
                <div className="contact_skillTitle">EVERY SPACE IS UNIQUE</div>
                <br/>
                <div className="contact_mainSubtitle">
                  We know that no two communities are alike. They come in all different shapes and sizes, so we work to find the best solution.
                </div>
              </div>
              <div className="contact_contactBlock">
                <div className="contact_skillTitle">TALK WITH AN ADVISOR</div>
                <br/>
                <div className="contact_mainSubtitle">
                  You won’t find cheesy salesmen here. Initial contact and advice is always with an experienced organizer with years of experience.
                </div>
              </div>
              <div className="contact_contactBlock">
                <div className="contact_skillTitle">LOCATION DOESN’T MATTER</div>
                <br/>
                <div className="contact_mainSubtitle">
                  The Network is here to bridge the gap between cities to provide a country-wide community platform.
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer/>
      </div>
    );
  }
}

Contact.contextTypes = {
  router: React.PropTypes.object
};
