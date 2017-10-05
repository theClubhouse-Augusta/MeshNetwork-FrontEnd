/*
 *
 * Contact
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header'; 
import Footer from 'components/Footer'; 

import './style.css';
import './styleM.css';

export default class Contact extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="Contact" meta={[ { name: 'description', content: 'Description of Contact' }]}/>
        <Header />
          
          <div className="randomMediaDiv">

          </div> 


          <div className="contactForm">
            <h2>Contact Us</h2> 
            <form> 

              <div> 
                <p className="contactInputBlock">
                  <label htmlFor="" className="contactFormLabel">Name</label>   
                  <input type="text" name="Name" id=""/>       
                </p>

                <p className="contactInputBlock">
                  <label htmlFor="" className="contactFormLabel">Email Address</label>
                  <input type="email" name="" id=""/>
                </p>            
                
                <div className="messageBlock"> 
                  <p className="contactInputBlock">
                    <label htmlFor="" className="contactFormLabel"> Subject </label>
                    <input type="text" name="Subject" id=""/>
                  </p>

                  <p className="contactInputBlock ">
                    <label htmlFor="" className="contactFormLabel">Message</label>              
                  </p>

                  <textarea rows="12" className="contactFormMessage"></textarea>
                  
                  <button className="formButton" type="submit">Submit</button>
                </div>

                </div>
            </form>
          </div>

          <div className="contact">
            
          </div>
       
        <Footer />
      </div>
    );
  }
}

Contact.contextTypes = {
  router: React.PropTypes.object
};
