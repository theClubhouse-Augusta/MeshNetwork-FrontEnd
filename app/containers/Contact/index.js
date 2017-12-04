/*
 *
 * Contact
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Snackbar from 'material-ui/Snackbar';

import './style.css';
import './styleM.css';

export default class Contact extends React.PureComponent {
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
                <input type="text" />
              </div>
              <div className="contact_inputBox">
                <div className="contact_inputLabel">WHAT EMAIL CAN WE REACH YOU AT?*</div>
                <input type="text" />
              </div>
              <div className="contact_inputBox">
                <div className="contact_inputLabel">TELL US A BIT ABOUT YOUR ORGANIZTION</div>
                <input type="text" />
              </div>
              <button style={buttonContainer} >Send My Message</button>
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
