import React from 'react';

import SignUpTable from './SignUpTable';
import '../style.css';
import '../styleM.css';

export class SignUps extends React.PureComponent {
  state = {
    startDate: null,
    endDate: null,
    focusedInput: null,
    users: [],
    userPage: 0,
    userRowsPerPage: 10,
  };

  onDateChange = date => {
    this.setState(() => ({ date }));

    if (date) {
      fetch(`http://localhost:8000/api/signups/${this.props.match.params.id}/${date.get('month') + 1}/${date.get('year')}/${date.get('date')}`)
        .then(response => response.json())
        .then(({ users, error }) => {
          if (users) {
            this.setState(() => ({ users }));
            this.setState(() => ({ error: "" }));
          } else if (error) {
            this.setState(() => ({ users: [] }));
          }
        })
        .catch(error => {
        })
    } else {
      this.setState(() => ({ users: [] }));
    }
  };

  onDatesChange = (startDate, endDate) => {
    this.setState(() => ({ startDate, endDate }));
    if (startDate && endDate) {
      fetch(`http://localhost:8000/api/signups/${this.props.match.params.id}/${startDate.get('month') + 1}/${startDate.get('year')}/${startDate.get('date')}/${endDate.get('month') + 1}/${endDate.get('year')}/${endDate.get('date')}`)
        .then(response => response.json())
        .then(({ users, error }) => {
          if (users) {
            this.setState(() => ({ users }));
            this.setState(() => ({ error: "" }));
          } else if (error) {
            this.setState(() => ({ users: [] }));
          }
        })
        .catch(error => {
        })
    } else {
      this.setState(() => ({ users: [] }));
    }
  };
  onFocusChange = focusedInput => {
    this.setState(() => ({ focusedInput }));
  };

  handleUserChangePage = (event, page) => {
    this.setState({ userPage: page });
  };

  handleUserChangeRowsPerPage = event => {
    this.setState({ userRowsPerPage: event.target.value });
  };



  render() {
    return (
      <div>
        <SignUpTable
          users={this.state.users}
          userPage={this.state.userPage}
          userRowsPerPage={this.state.userRowsPerPage}
          handleUserChangePage={this.handleUserChangePage}
          handleUserChangeRowsPerPage={this.handleUserChangeRowsPerPage}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={this.onFocusChange}
        />
      </div>
    );
  }
}
