/*
 *
 * About
 *
 */
import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from 'components/Header';

import FlatButton from 'material-ui/Button';

import './style.css';
import './styleM.css';

export default class About extends React.PureComponent {

    render() {
        return (
            <div className="container">
                <Helmet>
                    <title>About</title>
                    <Helmet title="About" meta={[{ name: 'description', content: 'About Page' }]} />
                </Helmet>
                <header>
                    <Header/>
                    <div className="aboutBanner">
                        <div className="homeHeaderContentTitle">About the Mesh Network</div>
                        <div className="homeHeaderContentSubtitle">Learn more about the Collaborative Ecosystem</div>
                    </div>
                </header>

                <main>

                    <div className="aboutBlock">

                        <div className="aboutMainTitle">
                            The Mesh Network of Innovation connects organizers of collaborative incubators to help them succeed in growing and sustaining their communities.
            </div>
                        <div className="aboutMainContainer">
                            <div className="aboutMainRow">
                                <img className="aboutMainContent" src="http://h4z.it/Image/71722e_w-it-works-1.png"/>
                                <div className="aboutMainContent">
                                    <div className="aboutMainContentTitle">What is a Collaborative Incubator?</div>
                                    Collaborative Incubators are community driven spaces to grow innovation, learning, and venture creation. There are several models with different focuses. These models include Makerspaces, Coworking Spaces, Business Incubators.
                </div>
                            </div>
                            <div className="aboutMainRow">
                                <div className="aboutMainContent">
                                    <div className="aboutMainContentTitle">Why do Entrepreneurs need Collaborative Incubators?</div>
                                    Most of our success is the result of the connections we have to people and resources. The Mesh Network helps local organizers grow larger communities, and helps connect entrepreneurs to resources across a much larger network.
                </div>
                                <img className="aboutMainContent" src="http://h4z.it/Image/3f32a2_w-it-works-2.png"/>
                            </div>
                            <div className="aboutMainRow">
                                <img className="aboutMainContent" src="http://h4z.it/Image/6e6b2e_w-it-works-3.png"/>
                                <div className="aboutMainContent">
                                    <div className="aboutMainContentTitle">How do economic developers benefit from the Mesh Network?</div>
                                    Collaborative Incubators in within the mesh network contribute $20,000,000 per year in economic activity. On average, each incubator is responsible for creating 30 new jobs per year in their community.
                </div>
                            </div>
                        </div>
                        <div style={{padding:'15px'}}>
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
                        <div className="aboutCallToAction">Ready to reach all of the people who matter most to your network?</div>
                        <Link to={'/newSpace'} style={{marginTop:'15px'}}><FlatButton style={{width:'100%', background:'#ff4d58', paddingTop:'15px', paddingBottom:'15px',color:'#FFFFFF', fontWeight:'bold'}}>Add Your Workspace Now</FlatButton></Link>

                    </div>
                </main>

                <footer className="homeFooterContainer">
                    Copyright © 2018 theClubhou.se  • 540 Telfair Street  •  Tel: (706) 723-5782
        </footer>

            </div>
        );
    }
}
