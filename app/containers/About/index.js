/*
 *
 * About
 *
 */
import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Header from "components/Header";

import FlatButton from "material-ui/Button";

import "./style.css";
import "./styleM.css";

export default class About extends React.PureComponent {
  render() {
    return (
      <div className="aboutContainer">
        <Helmet>
          <title>About</title>
          <meta name="description" content="Description of About" />
        </Helmet>

        <header>
          <Header space={this.props.spaceName} />
          <div className="aboutBanner">
            <h2 className="homeHeaderContentTitle">About the Mesh Network</h2>
            <h3 className="homeHeaderContentSubtitle">
              Learn more about the Collaborative Ecosystem
            </h3>
          </div>
        </header>

        <main className="aboutBlock">
          <h3 className="aboutMainTitle">
            The Mesh Network of Innovation connects organizers of collaborative
            incubators to help them succeed in growing and sustaining their
            communities.
          </h3>
          <div className="aboutMainContainer">
            <div className="aboutMainRow">
              <img
                alt=""
                className="aboutMainContent"
                src="http://h4z.it/Image/71722e_w-it-works-1.png"
              />
              <div className="aboutMainContent">
                <h4 className="aboutMainContentTitle">
                  What is a Collaborative Incubator?
                </h4>
                <p className="aboutContent">
                  Collaborative Incubators are community driven spaces to grow
                  innovation, learning, and venture creation. There are several
                  models with different focuses. These models include
                  Makerspaces, Coworking Spaces, Business Incubators.
                </p>
              </div>
            </div>
            <div className="aboutMainRow" id="aboutMainMiddleRow">
              <div className="aboutMainContent">
                <h4 className="aboutMainContentTitle">
                  Why do Entrepreneurs need Collaborative Incubators?
                </h4>
                <p className="aboutContent">
                  Most of our success is the result of the connections we have
                  to people and resources. The Mesh Network helps local
                  organizers grow larger communities, and helps connect
                  entrepreneurs to resources across a much larger network.
                </p>
              </div>
              <img
                alt=""
                className="aboutMainContent"
                src="http://h4z.it/Image/3f32a2_w-it-works-2.png"
              />
            </div>
            <div className="aboutMainRow">
              <img
                alt=""
                className="aboutMainContent"
                src="http://h4z.it/Image/6e6b2e_w-it-works-3.png"
              />
              <div className="aboutMainContent">
                <h4 className="aboutMainContentTitle">
                  How do economic developers benefit from the Mesh Network?
                </h4>
                <p className="aboutContent">
                  Collaborative Incubators in within the mesh network contribute
                  $20,000,000 per year in economic activity. On average, each
                  incubator is responsible for creating 30 new jobs per year in
                  their community.
                </p>
              </div>
            </div>
          </div>
          <div style={{ padding: "15px" }}>
            <h4 className="aboutMainContentTitle">
              How long does it take to build an Innovation Community?
            </h4>
            <p className="aboutContent">
              Depending on the scale of work effort it can take anywhere from 1
              month to 3 years to go from inception to sustainability. If you
              are doing this as a volunteer it might take longer.
            </p>
            <h4 className="aboutMainContentTitle">
              What should I do first to organize an Innovation Community?
            </h4>
            <p className="aboutContent">
              Traditional institutions have a build it and they will come
              approach. Successful organizations have shown repeatedly that
              building community through events before building a facility is
              the best approach to financial sustainability.
            </p>
          </div>
          <h3 className="aboutCallToAction">
            Ready to reach all of the people who matter most to your network?
          </h3>
          <Link to={"/newSpace"} style={{ marginTop: "15px" }}>
            <FlatButton
              style={{
                width: "100%",
                background: "#ff4d58",
                paddingTop: "15px",
                paddingBottom: "15px",
                color: "#FFFFFF",
                fontWeight: "bold"
              }}
            >
              Add Your Workspace Now
            </FlatButton>
          </Link>
        </main>

        <footer className="homeFooterContainer">
          Copyright © 2018 theClubhou.se • 540 Telfair Street • Tel: (706)
          723-5782
        </footer>
      </div>
    );
  }
}
