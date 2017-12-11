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
      <div className="contactContainer">
        <Helmet title="Contact" meta={[ { name: 'description', content: 'Description of Contact' }]}/>
        <Header/>
        <header className="contactHeader">
          <div className="contactHeaderMain">
            <h2 className="contactHeaderTitle">Contact Us</h2>
          </div>
        </header>

        <main className="contactMain">
          <div className="contactMainSectionContainer">
            <h2 className="contactMainTitle">
              Let’s Mesh Together
            </h2>
            <p className="contactMainSubtitle">
              Fill the form below so we can learn more about your needs.
            </p>
          </div>

          <div className="contactBody">
            <div className="contactFormContainer">

              <p className="contactInputItem">
                <label className="contactInputLabel">WHAT’S YOUR NAME?*</label>
                <input type="text"  className="contactInputField"/>
             </p> 

              <p className="contactInputItem">
                  <label className="contactInputLabel">WHAT EMAIL CAN WE REACH YOU AT?*</label>
                  <input type="email"  className="contactInputField"/>
              </p> 
             
              <p className="contactInputItem">
                <label className="contactInputLabel">TELL US A BIT ABOUT YOUR ORGANIZATION*</label>
                <textarea   style={{margin: '1em 0 0 0'}}/>
              </p> 

              <button style={buttonContainer} >Send My Message</button>
          </div>


            <div className="contactInfo">

              <div className="contactInfoBlock">
                <h4 className="contactInfoTitle">EVERY SPACE IS UNIQUE</h4>
                <p className="contactInfoDescription">
                  We know that no two communities are alike. They come in all different shapes and sizes, so we work to find the best solution.
                </p>
              </div>

              <div className="contactInfoBlock">
                <h4 className="contactInfoTitle">TALK WITH AN ADVISOR</h4>
                <p className="contactInfoDescription">
                You won’t find cheesy salesmen here. Initial contact and advice is always with an experienced organizer with years of experience.

                </p>
              </div>

              <div className="contactInfoBlock">
                <h4 className="contactInfoTitle">
                  LOCATION DOESN’T MATTER </h4>
                <p className="contactInfoDescription">
                The Network is here to bridge the gap between cities to provide a country-wide community platform.
                </p>
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
