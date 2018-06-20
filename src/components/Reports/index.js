import React, { Component } from 'react';
import { withStyles } from "material-ui";
import reportStyles from '../../variables/styles/reportStyles';

class Reports extends Component {
  state = {
    hasSupportForDownloadAttr: false,
    verticals: [],
    id: '',
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
    companies: [],
    linkReady: false,
    columns: "name,email,address,city,state,zipcode,url,employeeCount,foundingDate\r\n",
  };
  token = localStorage['token'];
  setRef = element => {
    if (element) {
      if (typeof element.download !== "undefined") {
        this.setState({ hasSupportForDownloadAttr: true });
      }
    }
  };
  async componentDidMount() {
    const companies = await this.getCompanies();
    companies.forEach(async (companyId, index) => {
      const lastItem = companies.length === (index + 1);
      const currentCompany = await this.getCompany(companyId, lastItem);
      if (currentCompany) {
        console.log('001', this.state.columns);
        this.setState(() => ({
          columns: this.state.columns.concat(currentCompany),
        }), () => {
          console.log('002', this.state.columns);
        });
      }
    });
    this.setState(() => ({
      linkReady: true,
    }));
  };
  getCompany = async (companyID, lastItem) => {
    const response = await fetch(`http://localhost:8000/api/company/${companyID}`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    });
    const json = await response.json()
    const {
      company,
      error,
    } = json;
    if (company) {
      const {
        employeeCount,
        name: companyName,
        email,
        address,
        city,
        state,
        zipcode,
        foundingDate,
        url,
      } = company;
      if (!lastItem) {
        return `${companyName},${email},${address},${city},${state},${zipcode},${url},${employeeCount},${foundingDate}\r\n`;
      } else if (lastItem) {
        return `${companyName},${email},${address},${city},${state},${zipcode},${url},${employeeCount},${foundingDate}`;
      }
    } else if (error) {
      return false;
    }
  };

  getCompanies = async () => {
    const response = await fetch(`http://localhost:8000/api/companies`);
    const json = await response.json();
    return json.companyIds;
  };

  makeTextFile = text => {
    const textFile = `data:text/csv;charset=utf8,${encodeURI(text)}`
    return textFile;
  };
  render() {
    const tf = this.state.linkReady ? this.makeTextFile(this.state.columns) : false;
    return (
      <div>
        <a style={{ display: 'none' }} href="" ref={this.setRef}>hide</a>
        {(this.state.hasSupportForDownloadAttr && this.state.linkReady) &&
          <a style={{ cursor: 'pointer', display: 'block' }} href={tf} download="woo.csv">pdf</a>
        }
        {(!!!this.state.hasSupportForDownloadAttr && this.state.linkReady) &&
          <a style={{ cursor: 'pointer', display: 'block' }} href={tf}>pdf2</a>
        }
        reports
      </div>
    );
  }
}
export default withStyles(reportStyles)(Reports);