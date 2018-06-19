import React, { Component } from 'react';
import { withStyles } from "material-ui";
import reportStyles from '../../variables/styles/reportStyles';

class Reports extends Component {
  state = {
    hasSupportForDownloadAttr: false,
    verticals: [],
    logo: '',
    employeeCount: '',
    companyName: '',
    companyID: '',
    facebook: '',
    instagram: '',
    pinterest: '',
    twitter: '',
    youtube: '',
    linkedin: '',
    snapchat: '',
    discord: '',
    foundingDate: '',
    zipcode: '',
    city: '',
    state: '',
    address: '',
    email: '',
    description: '',
    url: '',
  };
  setRef = element => {
    if (element) {
      if (typeof element.download !== "undefined") {
        this.setState({ hasSupportForDownloadAttr: true });
      }
    }
  };
  // token = localStorage['token'];
  // componentDidMount() {
  //   this.loadUser(this.token);
  // };
  // getCompany = async companyID => {
  //   const response = await fetch(`http://localhost:8000/api/company/${companyID}`, {
  //     headers: { Authorization: `Bearer ${localStorage['token']}` }
  //   });
  //   const json = await response.json()
  //   const {
  //     company,
  //     verticals,
  //     error,
  //   } = json;
  //   if (company) {
  //     const {
  //       logo,
  //       employeeCount,
  //       id: companyID,
  //       name: companyName,
  //     } = company;
  //   }
  // };
  //
  //
  makeTextFile = text => {
    const textFile = `data:text/csv;charset=utf8,${encodeURI(text)}`
    return textFile;
  };
  render() {
    const tf = this.makeTextFile("id,name,salary,start_date,depti\r\n1,Rick,623.3,2012-1-1,IT\r\n2,Dan,515.2,2013-9-23,Operations\r\n3,Michelle,611,2014-11-15,IT\r\n4,Ryan,729,2014-5-11,HR\r\n5,Gary,843.25,2015-3-27,Finance\r\n6,Nina,578,2013-5-21,IT\r\n7,Simon,632.8,2013-7-30,Operations\r\n8,Guru,722.5,2014-06-17,Finance");
    return (
      <div>
        <a style={{ display: 'none' }} href="" ref={this.setRef}>hide</a>
        {this.state.hasSupportForDownloadAttr && 
          <a style={{ cursor: 'pointer', display: 'block' }} href={tf} download="woo.csv">pdf</a>
        }
        {!!this.state.hasSupportForDownloadAttr && 
          <a style={{ cursor: 'pointer', display: 'block' }} href={tf}>pdf</a>
        }
        reports
      </div>
    );
  }
}
export default withStyles(reportStyles)(Reports);