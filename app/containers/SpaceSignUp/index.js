/*
 *
 * SpaceSignUp
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/Button';

import './style.css';
import './styleM.css';

export default class SpaceSignUp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      city:"",
      address:"",
      state:"",
      zipcode:"",
      email:"",
      website:"",
      phone_number:"",
      description:"",
      logo:"",
      logoPreview:""
    }
  }

  handleName = (event) => { this.setState({name:event.target.value})};
  handleCity = (event) => { this.setState({city:event.target.value})};
  handleAddress = (event) => { this.setState({address:event.target.value})};
  handleState = (event) => {this.setState({state:event.target.value})};
  handleZip = (event) => {this.setState({zipcode:event.target.value})};
  handleEmail = (event) => {this.setState({email:event.target.value})};
  handleWebsite = (event) => {this.setState({website:event.target.value})};
  handlePhone = (event) => {this.setState({phone_number:event.target.value})};
  handleDescription = (event) => {this.setState({description:event.target.value})};

  render() {
    return (
      <div className="container">
        <Helmet title="SpaceSignUp" meta={[ { name: 'description', content: 'Description of SpaceSignUp' }]}/>

        <header></header>

        <main>
          <div className="spaceSignUpTitle">Create a New Space</div>
          <div className="spaceSignUpMain">
            <TextField label="Organization Name" value={this.state.name} onChange={this.handleName} margin="normal"/>
            <TextField label="City" value={this.state.city} onChange={this.handleCity} margin="normal"/>
            <TextField label="Address" value={this.state.address} onChange={this.handleAddress} margin="normal"/>
            <TextField label="State" value={this.state.state} onChange={this.handleState} margin="normal"/>
            <TextField label="ZIP" value={this.state.zipcode} onChange={this.handleZip} margin="normal"/>
            <TextField label="E-mail" value={this.state.email} onChange={this.handleEmail} margin="normal"/>
            <TextField label="Phone #" value={this.state.phone_number} onChange={this.handlePhone} margin="normal"/>
            <TextField label="Brief Description" value={this.state.description} onChange={this.handleDescription} margin="normal"/>
          </div>
        </main>

        <footer></footer>
      </div>
    );
  }
}

SpaceSignUp.contextTypes = {
  router: React.PropTypes.object
};
