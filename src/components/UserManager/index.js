import React from 'react';
import CustomerUserTable from './CustomerUserTable';

export default class UserManager extends React.Component {
  state = {
    users: [],
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
      .then(users => {
        this.setState(() => ({ users }));
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
        <CustomerUserTable
          users={this.state.users}
          userPage={this.state.userPage}
          userRowsPerPage={this.state.userRowsPerPage}
          handleUserChangePage={this.handleUserChangePage}
          handleUserChangeRowsPerPage={this.handleUserChangeRowsPerPage}
        />
      </div>
    );
  }
}

