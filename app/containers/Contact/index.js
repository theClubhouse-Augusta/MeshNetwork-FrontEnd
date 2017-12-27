/*
 *
 * Contact
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header';
import Footer from 'components/Footer';
import MtextField from '../../components/CustomUi/MtextField'; 
import DefaultButton from '../../components/CustomUi/DefaultButton';
import Snackbar from 'material-ui/Snackbar';

import './style.css';
import './styleM.css';

export default class Contact extends React.PureComponent {
  render() {



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
                <label className="contactInputLabel">What's Your Name?*</label>
                <MtextField               
                  type="text"
                  name=""
                  id="contactName"
                />
             </p> 

              <p className="contactInputItem">
                  <label className="contactInputLabel">What Email Can We Reach You At? *</label>
                  <MtextField               
                    type="email"
                    name=""
                    id="contactEmail"
                  />
              </p> 
             
              <p className="contactInputItem">
                <label className="contactInputLabel">Tell Us a Bit About Your Organization*</label>
                <textarea   style={{margin: '1em 0', border: '2px solid #555555'}} cols="60" rows="6"/>
              </p> 

              <DefaultButton> Send My Message</DefaultButton>
          </div>


            <div className="contactInfo">

              <div className="contactInfoBlock">
                <h4 className="contactInfoTitle">Every Space Is Unique</h4>
                <p className="contactInfoDescription">
                  We know that no two communities are alike. They come in all different shapes and sizes, so we work to find the best solution.
                </p>
              </div>

              <div className="contactInfoBlock">
                <h4 className="contactInfoTitle">Talk With An Advisor</h4>
                <p className="contactInfoDescription">
                You won’t find cheesy salesmen here. Initial contact and advice is always with an experienced organizer with years of experience.

                </p>
              </div>

              <div className="contactInfoBlock">
                <h4 className="contactInfoTitle">
                  Location Doesn't Matter </h4>
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
