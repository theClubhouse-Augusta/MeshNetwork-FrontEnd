import React from 'react';
import { signOut } from './api/auth';
import BookingForm from '../../components/BookingForm';
import BookingModal from '../../components/BookingModal';
import NavBar from '../../components/NavBar';
import '../../css/style.css';

const BookingCreate = ({
  updateView,
  roomData,
  currentRoom,
  onMakeBooking,
  loadMyBookings,
  calendarDate,
  disableRecurring,
  setCalendarDate,
  onToggleRecurring,
  onShowBooking,
  selectedBooking,
  onCloseBooking,
  onDeleteBooking,
}) =>
  <div>
    {!!roomData &&
      !!currentRoom &&
      <div className="wrapper">
        <header className="header header__nav header--flex">
          <h1 className="header__heading header__heading--main">
            Company Name Here
          </h1>
          <NavBar
            updateView={updateView}
            signOut={signOut}
            loadMyBookings={loadMyBookings}
            user="austin.conder@outlook.com"
          />
        </header>
        <div className="wrapper__content">
          <BookingForm
            user="austin.conder@outlook.com"
            roomData={currentRoom}
            onMakeBooking={onMakeBooking}
            date={calendarDate}
            disableRecurring={disableRecurring}
            updateCalendar={setCalendarDate}
            onShowBooking={onShowBooking}
            onToggleRecurring={onToggleRecurring}
          />
        </div>
        <BookingModal
          selectedBooking={selectedBooking}
          onCloseBooking={onCloseBooking}
          onDeleteBooking={onDeleteBooking}
          roomData={roomData}
          user="austin.conder@outlook.com"
        />
      </div>
    }

  </div>

export default BookingCreate;