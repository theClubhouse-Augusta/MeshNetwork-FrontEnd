import React, { Component } from 'react';
import { withStyles } from "material-ui";
import reportStyles from '../../variables/styles/reportStyles';

class Reports extends Component {
  state = {
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
  token = localStorage['token'];
  componentDidMount() {
    this.loadUser(this.token);
  };
  getCompany = async companyID => {
    const response = await fetch(`http://localhost:8000/api/company/${companyID}`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    });
    const json = await response.json()
    const {
      company,
      verticals,
      error,
    } = json;
    if (company) {
      const {
        logo,
        employeeCount,
        id: companyID,
        name: companyName,
      } = company;
    }
  };
  render() {
    return (
      <div>foo</div>
    );
  }
}
export default withStyles(reportStyles)(Reports);