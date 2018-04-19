import React from 'react';
import CustomerUserTable from './CustomerUserTable';

export default class UserManager extends React.Component {
  state = {
    customers: [],
    userPage: 0,
    userRowsPerPage: 10,
    error: ''
  };

  componentDidMount() {
    this.loadInitalUsers();
  }

  loadInitalUsers = () => {
    fetch(`http://localhost:8000/api/customers`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    })
      .then(response => response.json())
      .then(({ customers }) => {
        this.setState(() => ({ customers }));
      });
  };

  handleUserChangePage = (event, userPage) => {
    this.setState(() => ({ userPage }));
  };

  handleUserChangeRowsPerPage = event => {
    this.setState(() => ({ userRowsPerPage: event.target.value }));
  };


  render() {
    return (
      <div>
        {!!this.state.customers.length &&
          <CustomerUserTable
            users={this.state.customers}
            userPage={this.state.userPage}
            userRowsPerPage={this.state.userRowsPerPage}
            handleUserChangePage={this.handleUserChangePage}
            handleUserChangeRowsPerPage={this.handleUserChangeRowsPerPage}
          />
        }
      </div>
    );
  }
}

