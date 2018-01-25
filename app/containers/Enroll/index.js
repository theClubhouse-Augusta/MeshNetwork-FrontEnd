/*
 *
 * Enroll
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import {StripeProvider, Elements, injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement, PaymentRequestButtonElement} from 'react-stripe-elements';

import Header from 'components/Header';
import Payment from 'components/LMSPayment';

import './style.css';
import './styleM.css';

export default class Enroll extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      course:"",
      token:localStorage.getItem('lmsToken'),
      app:this.props.app,
    }
  }

  componentWillMount() {
    this.getCourse(this.props.match.params.id)
  }

  componentWillReceiveProps(app) {
    this.setState({
      app:app.app
    }, function() {
      this.forceUpdate();
    })
  }

  getCourse = (id) => {
    fetch("https://houseofhackers.me:81/showCourse/"+id+"/", {
      method:'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        course:json.course,
      })
    }.bind(this))
  }

  storeEnroll = () => {
    let _this = this;
    fetch("https://houseofhackers.me:81/enrollCourse/" + this.props.courseID + "/", {
      method:'POST',
      body:data,
      headers: { 'Authorization': 'JWT ' + this.state.token}
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if(json.error) {
        _this.showSnack(json.error);
      }
      else if(json.detail) {
        _this.props.app.signOut();
        _this.props.app.handleAuth();
      }
      else if(json.success) {
        _this.showSnack(json.success);
      }
    })
  }

  renderPrice = () => {
    if(this.state.course.coursePrice === 0)
    {
      return(
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
    if(this.state.course.coursePrice === 0)
    {
      return(
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
    if(this.state.course.coursePrice !== 0)
    {
      return(
        <div>
          <div className="lmsEnrollSummaryHeader">Pay with Card</div>
          <Elements>
            <Payment courseID={this.props.match.params.id} app={this.state.app}/>
          </Elements>
        </div>
      )
    } else {
      return(
        <FlatButton onClick={this.storeEnroll}>Confirm Enroll</FlatButton>
      )
    }
  }

  render() {
    return (
      <StripeProvider apiKey="pk_test_Xl0AkJX5jhmxX712FNAYwWNg">
        <div className="container">
          <Helmet title="Enroll" meta={[ { name: 'description', content: 'Description of Enroll' }]}/>

          <header>
            <Header />
          </header>

          <main className="lmsEnrollMain">
            <div className="lmsEnrollContainer">
              <div className="lmsEnrollContent">
                <div className="lmsEnrollSummary">
                <div className="lmsEnrollSummaryHeader">Order Summary</div>
                  <div className="lmsEnrollSummaryMain">
                    <div className="lmsEnrollCourse">
                      <div className="lmsEnrollCourseImageContainer">
                        <img src={'https://houseofhackers.me/media/' + this.state.course.courseImage} className="lmsEnrollCourseImage"/>
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
        </div>
      </StripeProvider>
    );
  }
}
