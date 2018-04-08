import React from 'react';
import CheckinTable from './CheckinTable';
import '../style.css';
import '../styleM.css';

export class Checkins extends React.PureComponent {
  state = {
    // startDate: moment(),
    // endDate: moment().add(1, 'd'),
    startDate: null,
    endDate: null,
    focusedInput: null,
    users: [],
    userPage: 0,
    userRowsPerPage: 10,
  };

  componentDidMount() {
    // this.loadInitalUsers();
  }

  // loadInitalUsers = () => {
  //   const { date } = this.state;
  //   fetch(`http://localhost:8000/api/appearances/users/${this.props.match.params.id}/${date.get('month') + 1}/${date.get('year')}/${date.get('date')}`)
  //     .then(response => response.json())
  //     .then(({ users, error }) => {
  //       if (users) {
  //         this.setState(() => ({ users }))
  //         this.setState(() => ({ error: "" }))
  //       }
  //     })
  //     .catch(error => {
  //     })
  // };


  onDateChange = date => {
    this.setState(() => ({ date }));
    if (date) {
      fetch(`http://localhost:8000/api/appearances/users/${this.props.match.params.id}/${date.get('month') + 1}/${date.get('year')}/${date.get('date')}`)
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
      fetch(`http://localhost:8000/api/appearances/users/${this.props.match.params.id}/${startDate.get('month') + 1}/${startDate.get('year')}/${startDate.get('date')}/${endDate.get('month') + 1}/${endDate.get('year')}/${endDate.get('date')}`)
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
        <CheckinTable
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
