/*
 *
 * Sponsors
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header'; 
import Footer from 'components/Footer'; 

import './style.css';
import './styleM.css';

export default class Sponsors extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="Sponsors" meta={[ { name: 'description', content: 'Description of Sponsors' }]}/>
        <Header />
        <div className="sponsorsBodyContainer"> 

        <div className="titleList"> 
          <h2>Our Sponsors</h2>
          <p className="aboutSponsorsText"> How much we love our sponsors </p>
        </div>

          <div className="sponsorList">
              <div className="sponsorListing">
                <div className="sponsorLogo"> 
                  <img src="https://placeholdit.co//i/150x150" />
                </div>

                <div className="sponsorTextBlock"> 
                  <h3> A company</h3>          
                  <p>what they do</p>   
                </div> 

              </div> 

              <div className="sponsorListing">
              <div className="sponsorLogo"> 
                <img src="https://placeholdit.co//i/150x150" />
              </div>

              <div className="sponsorTextBlock"> 
                <h3> A company</h3>          
                <p>what they do</p>   
              </div> 

            </div>

            <div className="sponsorListing">
            <div className="sponsorLogo"> 
              <img src="https://placeholdit.co//i/150x150" />
            </div>

            <div className="sponsorTextBlock"> 
              <h3> A company</h3>          
              <p>what they do</p>   
            </div> 

          </div>

               <div className="sponsorListing">
                <div className="sponsorLogo"> 
                  <img src="https://placeholdit.co//i/150x150" />
                </div>

                <div className="sponsorTextBlock"> 
                  <h3> A company</h3>          
                  <p>what they do</p>   
                </div> 

              </div>
              
              <div className="sponsorListing">
              <div className="sponsorLogo"> 
                <img src="https://placeholdit.co//i/150x150" />
              </div>

              <div className="sponsorTextBlock"> 
                <h3> A company</h3>          
                <p>what they do</p>   
              </div> 

            </div> 

            <div className="sponsorListing">
                <div className="sponsorLogo"> 
                  <img src="https://placeholdit.co//i/150x150" />
                </div>

                <div className="sponsorTextBlock"> 
                  <h3> A company</h3>          
                  <p>what they do</p>   
                </div> 

              </div>    

          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Sponsors.contextTypes = {
  router: React.PropTypes.object
};
