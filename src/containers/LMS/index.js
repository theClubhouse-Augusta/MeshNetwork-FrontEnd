import FlatButton from "material-ui/Button";
import Card, { CardContent, CardMedia } from "material-ui/Card";
import Typography from "material-ui/Typography";
import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import authenticate from '../../utils/Authenticate';
import "./style.css";
import "./styleM.css";

export default class LMS extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      courses: []
    };
  };
  async componentDidMount() {
    let authorized;
    try {
      authorized = await authenticate(localStorage['token']);
    } finally {
      if (authorized === undefined) {
        this.setState(() => ({ loggedIn: false }));
      }
    }
    this.getCourses();
  };
  getCourses = () => {
    fetch(`http://localhost:8000/api/getCourses/0/6`)
      .then(response => response.json())
      .then(({ courses }) => {
        this.setState({ courses: courses.data });
      });
  };
  render() {
    return (
      <div className="container">
        <Helmet
          title="Home"
          meta={[{ name: "description", content: "Description of Home" }]}
        />
        <Header space={this.props.spaceName} />
        <header className="lmsHomeHeader">
          <div className="lmsHomeHeaderHeading">Let The Learning Begin</div>
          <div className="lmsHomeHeaderText">
            <p>
              Welcome to the resource & learning destination for all students!
            </p>
            <p>Powering courses across different skills and goals.</p>
          </div>
          {!this.state.loggedIn &&
            <Link to={"/spaces"} style={{ marginTop: "15px", width: "20%", maxWidth: "200px", minWidth: "150px" }}>
              <FlatButton style={{ background: "#6fc13e", color: "#FFFFFF", fontWeight: "Bold", width: "100%" }}>
                Join Now
              </FlatButton>
            </Link>
          }
        </header>

        <main className="lmsHomeMain">
          <div className="lmsHomeMainContainer">
            <div className="lmsHomeMainHeading">Latest Courses</div>
            <div className="lmsHomeMainList">
              {this.state.courses.map((course, index) => (
                <Link className="lmsHomeMainBlock" key={`LMSlmsMainBlock${index}`} to={'/LMS/Course/' + course.id}>
                  <Card style={{ height: '385px' }}>
                    <CardMedia
                      style={{ width: '100%', height: '240px', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                      image={course.courseImage}
                    />
                    <CardContent>
                      <Typography variant="headline" component="h2">
                        {course.courseName}
                      </Typography>
                      <Typography component="p">
                        {/*course.courseSummary*/}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <Link
              to={"/LMS/Courses"}
              style={{
                marginTop: "15px",
                width: "20%",
                maxWidth: "200px",
                minWidth: "150px"
              }}
            >
              <FlatButton
                style={{
                  background: "#6fc13e",
                  color: "#FFFFFF",
                  fontWeight: "Bold",
                  width: "100%"
                }}
              >
                View All Courses
              </FlatButton>
            </Link>
          </div>
          <div className="lmsHomeCallToAction">
            Get smart about your future. Join our learning community today!
          </div>
          <div className="lmsHomeBuzz">
            <div className="lmsHomeBuzzBlock">
              <div className="lmsHomeBuzzHeader">Chill Out and Learn</div>
              <div className="lmsHomeBuzzContent">
                Take courses during your lunch break, post workout, from home,
                whenever, wherever. Courses are conveniently available 24/7/365.
                #ClassOnTheCouch
              </div>
            </div>
            <div className="lmsHomeBuzzBlock">
              <div className="lmsHomeBuzzHeader">Fuel Your Future</div>
              <div className="lmsHomeBuzzContent">
                From coding to design to business, all of today’s in-demand
                skills are here. With more courses added daily, your resume will
                never look better.
              </div>
            </div>
            <div className="lmsHomeBuzzBlock">
              <div className="lmsHomeBuzzHeader">Stay Sharp</div>
              <div className="lmsHomeBuzzContent">
                All courses include LIFETIME access so you can always drop back
                in for a refresher.
              </div>
            </div>
            <div className="lmsHomeBuzzBlock">
              <div className="lmsHomeBuzzHeader">Don&#39;t Worry, Be Happy</div>
              <div className="lmsHomeBuzzContent">
                We're committed to providing the best online learning experience
                on the Web! If you experience an issue, contact us within 7 days
                and we'll be happy to help.
              </div>
            </div>
          </div>
          <div className="lmsJoinCallToAction">
            Still Have More Questions? Feel Free to Contact Us!
          </div>
        </main>
      </div>
    );
  }
}