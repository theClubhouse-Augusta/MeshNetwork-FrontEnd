import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/Button';
export default class EmailInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      emailUpdated: props.emailUpdated,
      customer_id: props.id,
      error: false,
      focused: false,
    };
  }
  onChange = e => {
    let email = e.target.value;
    this.setState(() => ({ email }));
  };
  onBlur = e => {
    e.preventDefault();
    let data = new FormData();
    data.append('email', this.state.email);
    data.append('customer_id', this.state.customer_id);
    fetch(`http://localhost:8000/api/customer/email`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` },
      method: 'POST',
      body: data,
    })
      .then(response => response.json())
      .then(({ emailUpdated, error }) => {
        if (emailUpdated) {
          this.setState(() => ({
            emailUpdated,
            error: false
          }));
          this.setState(() => ({ focused: false }));
        } else if (error) {
          this.setState(() => ({ error }));
          this.setState(() => ({ focused: false }));
        }
      })
  };
  updateEmail = e => {
    e.preventDefault();
    this.setState(() => ({ emailUpdated: false }))
  };
  render() {
    const { emailUpdated } = this.state;
    return (
      !emailUpdated ?
        <div
          style={{ display: 'flex' }}
        >
          <TextField
            style={{ width: 150 }}
            value={this.state.email}
            label="Mesh Email"
            onChange={this.onChange}
            //            onBlur={this.onBlur}
            onFocus={() => { this.setState(() => ({ focused: true })) }}
            error={this.state.focused ? false : this.state.error}
            helperText={(!this.state.focused && this.state.error) ? `No mesh user with email: ${this.state.email}` : ''}

          />
          <FlatButton
            style={{
              background: '#ff4d58',
              //              marginLeft: 15,
              color: '#FFFFFF',
              alignSelf: 'center',
            }}
            onClick={this.onBlur}
          >Update</FlatButton>
        </div>
        :
        <div
          style={{ display: 'flex' }}
        >
          <p>{this.state.email}&nbsp;&nbsp;</p>

          <FlatButton
            style={{
              background: '#ff4d58',
              //              marginLeft: 15,
              color: '#FFFFFF',
              alignSelf: 'center',
            }}
            onClick={this.updateEmail}
          >Update</FlatButton>

        </div>
    );
  }
};