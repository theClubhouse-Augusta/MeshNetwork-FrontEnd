/*
 *
 * Enroll
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import {
  StripeProvider,
  Elements,
  // injectStripe, 
  // CardNumberElement, 
  // CardExpiryElement, 
  // CardCVCElement, 
  // PostalCodeElement, 
  // PaymentRequestButtonElement
} from 'react-stripe-elements';
import FlatButton from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

import Header from '../../components/Header';
import Payment from '../../components/LMSPayment';

import './style.css';
import './styleM.css';

export default class Enroll extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      course: "",
      token: localStorage.getItem('lmsToken'),
      app: this.props.app,
      msg: "",
      snack: false,
    }
  }

  handleRequestClose = () => { this.setState({ snack: false, msg: "" }); };
  showSnack = (msg) => { this.setState({ snack: true, msg: msg }); };

  componentDidMount() {
    this.getCourse(this.props.match.params.id)
  }

  componentWillReceiveProps(app) {
    this.setState({
      app: app.app
    }, () => {
      this.forceUpdate();
    })
  }

  getCourse = (id) => {
    fetch(`https://innovationmesh.com/showCourse/${id}/`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          course: json.course,
        })
      })
  }

  storeEnroll = () => {
    fetch(`https://innovationmesh.com/api/enrollCourse/${this.props.match.params.id}/`, {
      method: 'POST',
      headers: { 'Authorization': 'JWT ' + this.state.token }
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          this.showSnack(json.error);
        }
        else if (json.detail) {
          //this.props.app.signOut();
        }
        else if (json.success) {
          this.showSnack(json.success);
        }
      })
  }

  renderPrice = () => {
    if (this.state.course.coursePrice === 0) {
      return (
        <div className="lmsEnrollCoursePrice">
          FREE
        </div>
      )
    }
    else {
      return (
        <div className="lmsEnrollCoursePrice">
          ${this.state.course.coursePrice}
        </div>
      )
    }
  }

  renderTotal = () => {
    if (this.state.course.coursePrice === 0) {
      return (
        <div className="lmsEnrollTotalPrice">
          FREE
        </div>
      )
    }
    else {
      return (
        <div className="lmsEnrollTotalPrice">
          ${this.state.course.coursePrice}
        </div>
      )
    }
  }

  renderPayment = () => {
    if (this.state.course.coursePrice !== 0) {
      return (
        <div>
          <div className="lmsEnrollSummaryHeader">Pay with Card</div>
          <Elements>
            <Payment courseID={this.props.match.params.id} app={this.state.app} />
          </Elements>
        </div>
      )
    } else {
      return (
        <FlatButton onClick={this.storeEnroll} style={{ background: "#6fc13e", color: '#FFFFFF', fontWeight: 'Bold', width: '100%' }}>Confirm Enroll</FlatButton>
      )
    }
  }

  render() {
    return (
      <StripeProvider apiKey="pk_test_Xl0AkJX5jhmxX712FNAYwWNg">
        <div className="container">
          <Helmet title="Enroll" meta={[{ name: 'description', content: 'Description of Enroll' }]} />

          <header>
            <Header space={this.props.spaceName} />
          </header>

          <main className="lmsEnrollMain">
            <div className="lmsEnrollContainer">
              <div className="lmsEnrollContent">
                <div className="lmsEnrollSummary">
                  <div className="lmsEnrollSummaryHeader">Order Summary</div>
                  <div className="lmsEnrollSummaryMain">
                    <div className="lmsEnrollCourse">
                      <div className="lmsEnrollCourseImageContainer">
                        <img alt="" src={this.state.course.courseImage} className="lmsEnrollCourseImage" />
                      </div>
                      <div className="lmsEnrollCourseName">{this.state.course.courseName}</div>
                      {this.renderPrice()}
                    </div>
                    <div className="lmsEnrollCourseCode"></div>
                    <div className="lmsEnrollSummaryFinal">
                      <div className="lmsEnrollSummaryTotalHeader"></div>
                      <div className="lmsEnrollSummaryTotalMain">
                        <div className="lmsEnrollTotalText">Total</div>
                        {this.renderTotal()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lmsEnrollPayment">
                  {this.renderPayment()}
                </div>
              </div>
            </div>
          </main>
          <Snackbar
            open={this.state.snack}
            message={this.state.msg}
            autoHideDuration={3000}
            onClose={this.handleRequestClose}
          />
        </div>
      </StripeProvider>
    );
  }
}
