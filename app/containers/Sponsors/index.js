/*
 *
 * Sponsors
 *
 */
import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header'; 
import Footer from 'components/Footer'; 
import Card, { CardMedia, CardContent } from 'material-ui/Card'; 

import './style.css';
import './styleM.css';

export default class Sponsors extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="Sponsors" meta={[ { name: 'description', content: 'Description of Sponsors' }]}/>
        <Header />

        <main> 
        <div className="sponsorBanner"> 
          <h2>Our Sponsors</h2>
          <p> How much we love our sponsors </p>
        </div>


        <div className="sponsorBody">       
          <div className="sponsorList">

            <Card className="sponsorListing">
              <CardMedia className="sponsorLogo"> 
                <img src="https://placeholdit.co//i/150x150" />
              </CardMedia>

              <div className="sponsorTextBlock"> 
                <h2> A company</h2>          
                <CardContent>what they do</CardContent>   
              </div> 
            </Card> 

      </div>
    </div>
  </main>

        <Footer />
      </div>
    );
  }
}
