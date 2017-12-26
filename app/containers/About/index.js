/*
 *
 * About
 *
 */
import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header';
import Footer from 'components/Footer';

import './style.css';
import './styleM.css';

export default class About extends React.PureComponent {

  render() {
    return (
      <div className="container">
        <Helmet title="About" meta={[ { name: 'description', content: 'Description of About' }]}/>

        <Header/>

        <main>
          <div className="aboutBanner">
            About
          </div>

          <div className="aboutBlock">
            <div className="aboutTextHeader">
              What is the Mesh Network?
            </div>
            <div className="aboutContent">
              The Mesh Network of Innovation connects organizers of collaborative incubators to help them succeed in growing and sustaining their communities.
            </div>
            <div className="aboutTextHeader">
              What is a Collaborative Incubator?
            </div>
            <div className="aboutContent">
              Collaborative Incubators are community driven spaces to grow innovation, learning, and venture creation. There are several models with different focuses. These models include Makerspaces, Coworking Spaces, Business Incubators.
            </div>
            <div className="aboutTextHeader">
              Why do Entrepreneurs need Collaborative Incubators?
            </div>
            <div className="aboutContent">
              Most of our success is the result of the connections we have to people and resources. The Mesh Network helps local organizers grow larger communities, and helps connect entrepreneurs to resources across a much larger network.
            </div>
            <div className="aboutTextHeader">
              How do economic developers benefit from the Mesh Network?
            </div>
            <div className="aboutContent">
              Collaborative Incubators in within the mesh network contribute $20,000,000 per year in economic activity. On average, each incubator is responsible for creating 30 new jobs per year in their community.
            </div>
            <div className="aboutTextHeader">
              How long does it take to build an Innovation Community?
            </div>
            <div className="aboutContent">
              Depending on the scale of work effort it can take anywhere from 1 month to 3 years to go from inception to sustainability.  If you are doing this as a volunteer it might take longer.
            </div>
            <div className="aboutTextHeader">
              What should I do first to organize an Innovation Community?
            </div>
            <div className="aboutContent">
              Traditional institutions have a build it and they will come approach. Successful organizations have shown repeatedly that building community through events before building a facility is the best approach to financial sustainability.
            </div>

          </div>
          <div className="aboutButtons">
            <div className="aboutButtonText">Ready to Discover the Mesh Network?</div>
            <div className="aboutButtonsContainer">
              <button label="Sign Up"  style={{ marginLeft:'15px', width:'200px'}} /> {/* TODO */}
              <button label="Contact Us" style={{ marginLeft:'15px', width:'200px'}} /> { /* TODO */ }
            </div>
          </div>
        </main>

        <Footer/>

      </div>
    );
  }
}
