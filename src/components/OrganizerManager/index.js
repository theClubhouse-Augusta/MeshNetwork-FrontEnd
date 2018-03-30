import React from 'react';
import OrganizerTable from './OrganizerTable';

export default class UserManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users,
      userPage: 0,
      userRowsPerPage: 10,
      error: '',
      roles: props.roles,
    };
  }

  handleUserChangePage = (event, userPage) => {
    this.setState(() => ({ userPage }));
  };

  handleUserChangeRowsPerPage = event => {
    this.setState(() => ({ userRowsPerPage: event.target.value }));
  };

  handleRoleChange = (event, key, user) => {
    let users = [...this.state.users];
    users[key].roleID = event.target.value;
    let data = new FormData();
    data.append('userID', user);
    data.append('roleID', event.target.value);
    this.setState(() => ({ users }), () => {
      fetch('https://testbean2-env.us-east-1.elasticbeanstalk.com/api/changeRole', {
        method: 'POST',
        body: data,
        headers: {
          'Authorization': 'Bearer ' + this.state.token
        }
      })
        .then(response => response.json())
        .then((json) => {
          this.showSnack('Role Updated');
        });
    })
  };

  render() {
    return (
      <div>
        <OrganizerTable
          users={this.state.users}
          roles={this.state.roles}
          userPage={this.state.userPage}
          userRowsPerPage={this.state.userRowsPerPage}
          handleUserChangePage={this.handleUserChangePage}
          handleUserChangeRowsPerPage={this.handleUserChangeRowsPerPage}
          handleRoleChange={this.handleRoleChange}
        />
      </div>
    );
  }
}

