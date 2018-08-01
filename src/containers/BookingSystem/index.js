import moment from 'moment';
import React, { Component } from 'react';
import { signIn, signOut, signUp } from './api/auth';
import { deleteBooking, makeBooking, updateStateRoom } from './api/booking';
import { listRooms } from '../../api/rooms';
import { getDecodedToken } from '.../../api/token';
import BookingMain from '../BookingMain';
import BookingCreate from '../BookingCreate';
import BookingsUser from '../BookingsUser';
import '../../css/style.css';
import {
  filterParams,
  onFilterByFeature,
  onFilterByFloor
} from '../../helpers/filters';

class BookingSystem extends Component {
  state = {
    currentView: 'bookings',
    decodedToken: getDecodedToken(), // retrieves the token from local storage if valid, else will be null
    roomData: null,
    userBookings: null,
    calendarDate: new Date(),
    selectedBooking: null,
    filterParams: filterParams,
    floorParam: 'all',
    filteredData: null,
    checked: null,
    currentRoom: null,
    error: null,
    disableRecurring: true
  };

  updateView = view => {
    this.setState({ view })
  }

  // Pass supplied first name, lastname, email & password to the signUp function, returns the user's token
  onSignUp = ({ firstName, lastName, email, password }) => {
    signUp({ firstName, lastName, email, password }).then(decodedToken => {
      this.setState({ decodedToken })
    })
  }

  // Pass supplied email & password to the signIn function, returns the users token
  onSignIn = ({ email, password }) => {
    signIn({ email, password }).then(decodedToken => {
      this.setState({ decodedToken })
    })
  }

  // Removes the current token from local storage
  onSignOut = () => {
    signOut()
    this.setState({ decodedToken: null })
  }

  setCalendarDate = calendarDate => {
    this.setState({ calendarDate })
  }

  onShowBooking = selectedBooking => {
    this.setState(() => ({ selectedBooking }))
  }

  onCloseBooking = () => {
    this.setState(() => ({ selectedBooking: null }))
  }

  // Makes a booking by updating the database and the React state
  onMakeBooking = ({ startDate, endDate, businessUnit, purpose, roomId, recurringData }) => {
    const bookingData = { startDate, endDate, businessUnit, purpose, roomId }
    const existingBookings = this.state.currentRoom.bookings

    // Check if there is a clash and, if not, save the new booking to the database
    try {
      makeBooking(
        { startDate, endDate, businessUnit, purpose, roomId, recurringData },
        existingBookings
      )
        .then(updatedRoom => {
          // If the new booking is successfully saved to the database
          alert(`${updatedRoom.name} successfully booked.`)
          updateStateRoom(this, updatedRoom, this.loadMyBookings)
        })
    } catch (err) {
      // If there is a booking clash and the booking could not be saved
      alert(
        'Your booking could not be saved. Please ensure it does not clash with an existing booking and that it is a valid time in the future.'
      )
    }
  }

  // Deletes a booking from the database and updates the React state
  onDeleteBooking = (roomId, bookingId) => {
    deleteBooking(roomId, bookingId)
      .then(updatedRoom => {
        alert('Booking successfully deleted')
        updateStateRoom(
          this,
          updatedRoom,
          this.loadMyBookings,
        )
      })
  }

  setRoom = id => {
    const room = this.state.roomData.find(room => room._id === id)
    this.setState({ currentRoom: room })
  }

  // setting the feature filter parameters
  onToggleFeature = feature => {
    // Get the filter parameters
    let filterParams = this.state.filterParams
    // Find the filter parameter that matches the the passed parameter
    let featureParam = filterParams.find(param => param.name === feature)
    // Toggle the value of the parameter, eg if false, set to true
    featureParam.value = !featureParam.value
    // Set state with the updated filter parameters
    this.setState({ filterParams: filterParams })
  }


  // changing the boolean value for the display attribute for the recurring date input
  onToggleRecurring = (value) => {
    let disableRecurring
    if (value === 'none') {
      disableRecurring = true
    } else {
      disableRecurring = false
    }
    this.setState({ disableRecurring: disableRecurring })
  }

  onSetFloorParam = value => {
    this.setState({ floorParam: value })
  }
  // get today's bookings for all rooms
  oneSetCurrentDateBookings = () => {
    const currentDate = moment().format('DD-MM-YYYY')
    // const roomData = this.state.roomData
    const roomData = this.state.roomData
    // array to collect todays bookings
    let todaysBookings = []
    // loop through all rooms
    roomData.forEach(room => {
      // loop through all bookings for that room
      room.bookings.forEach(booking => {
        const bookingStart = moment(booking.bookingStart).format('DD-MM-YYYY')
        if (bookingStart === currentDate) {
          todaysBookings.push(booking)
        }
      })
    })
  }

  loadMyBookings = () => {
    let userBookings = []
    const userId = this.state.decodedToken.sub
    // Loop through all the rooms
    this.state.roomData.forEach(room => {
      // Loop through all the bookings in 'room'
      room.bookings.forEach(booking => {
        if (booking.user === userId) {
          // Push all bookings where the current userId is equal to the booking's userId into myBookings
          booking.roomId = room._id
          userBookings.push(booking)
        }
      })
    })
    this.setState({ userBookings });
  };

  render() {
    const {
      currentRoom,
      userBookings,
      roomData,
      calendarDate,
      selectedBooking,
      filterParams,
      floorParam,
      disableRecurring,
    } = this.state

    let filteredData = []
    const featureParams = this.state.filterParams
    //const date = this.state.currentDate

    if (!!roomData) {

      filteredData = onFilterByFloor(floorParam, roomData);
      // Send the previously filtered data along with the feature params
      filteredData = onFilterByFeature(featureParams, filteredData);
    }

    // const requireAuth = render => () =>
    //   signedIn ? render() : <Redirect to="/" />

    return (
      <div id="app" className="App">
        <BookingMain
          updateView={this.updateView}
          roomData={roomData}
          loadMyBookings={this.loadMyBookings}
          calendarDate={calendarDate}
          setCalendarDate={this.setCalendarDate}
          filterParams={filterParams}
          floorParam={floorParam}
          filteredData={filteredData}
          onToggleFeature={this.onToggleFeature}
          onShowBooking={this.onShowBooking}
          setRoom={this.setRoom}
          selectedBooking={selectedBooking}
          onCloseBooking={this.onCloseBooking}
          onDeleteBooking={this.onDeleteBooking}
        />
        <BookingCreate
          updateView={this.updateView}
          roomData={roomData}
          currentRoom={currentRoom}
          onMakeBooking={this.onMakeBooking}
          loadMyBookings={this.loadMyBookings}
          calendarDate={calendarDate}
          disableRecurring={disableRecurring}
          setCalendarDate={this.setCalendarDate}
          onToggleRecurring={this.onToggleRecurring}
          onShowBooking={this.onShowBooking}
          selectedBooking={selectedBooking}
          onCloseBooking={this.onCloseBooking}
          onDeleteBooking={this.onDeleteBooking}
        />
        <BookingsUser
          updateView={this.updateView}
          roomData={roomData}
          loadMyBookings={this.loadMyBookings}
          userBookings={userBookings}
          onDeleteBooking={this.onDeleteBooking}
        />

      </div>
    )
  }

  load() {
    const { decodedToken } = this.state;
    const signedIn = !!decodedToken;

    if (signedIn) {
      // display loading page
      this.setState({ loading: true })
      // load all of the rooms from the database
      listRooms()
        .then(rooms => {
          this.setState({ roomData: rooms })
          // load the current user's bookings
          this.loadMyBookings()
          // the state's current room defaults to first room
          const room = this.state.roomData[0]
          this.setRoom(room._id)
          // toggle loading page off
          this.setState({ loading: false })
        })
        .catch(error => {
          console.error('Error loading room data', error)
          this.setState({ error })
        })
    }
  }

  // When the App first renders
  componentDidMount() {
    this.load();
  };

  // When state changes
  componentDidUpdate(prevProps, prevState) {
    // If just signed in, signed up, or signed out,
    // then the token will have changed
    if (this.state.decodedToken !== prevState.decodedToken) {
      this.load();
    }
  };

}

export default BookingSystem;
