import React from 'react';
import { signOut } from './api/auth';
import MyBookings from '../../components/MyBookings';
import NavBar from '../../components/NavBar';
import '../../css/style.css';

const BookingsUser = ({
  updateView,
  roomData,
  loadMyBookings,
  userBookings,
  onDeleteBooking,
}) =>
  <div>
    {!!roomData &&
      <div className="wrapper">
        <div className="header header__nav header--flex">
          <h1 className="header__heading header__heading--main">
            Company Name Here
          </h1>
          <NavBar
            updateView={updateView}
            signOut={signOut}
            loadMyBookings={loadMyBookings}
            user="austin.conder@outlook.com"
          />
        </div>
        <div className="wrapper__content--bookings">
          <div className="header__page">
            <h2 className="header__heading header__heading--sub">
              My Bookings
            </h2>
          </div>
          <MyBookings
            roomData={roomData}
            user="austin.conder@outlook.com"
            userBookings={userBookings}
            onDeleteBooking={onDeleteBooking}
          />
        </div>
      </div>
    }
  </div>

export default BookingsUser;