import moment from 'moment';
import Key from '../../components/Key';
import React from 'react';
import BookingModal from '../../components/BookingModal';
import NavBar from '../../components/NavBar';
import Calendar from '../../components/Calendar';
import FilterElement from '../../components/FilterElement';
import RoomsList from '../../components/RoomsList';

const BookingMain = ({
  updateView,
  roomData,
  calendarDate,
  setCalendarDate,
  filterParams,
  filteredData,
  onToggleFeature,
  onShowBooking,
  setRoom,
  selectedBooking,
  onCloseBooking,
  onDeleteBooking,
}) =>
  <div>
    {!!roomData && (
      <div className="wrapper">
        <div className="header header__nav header--flex">
          <h1 className="header__heading header__heading--main">
            Company Name Here
           </h1>
          <NavBar updateView={updateView} />
        </div>
        <div className="wrapper__content">
          <div className="header__page">
            <h2 className="header__heading header__heading--sub">
              Book a room | {moment(calendarDate).format('MMMM Do YYYY')}
            </h2>
          </div>
          <div className="sidebar">
            <div className="sidebar__box">
              <Calendar setCalendarDate={setCalendarDate} />
            </div>
            <div className="sidebar__box">
              <FilterElement
                onToggleFeature={onToggleFeature}
                filterParams={filterParams}
              />
            </div>
            <div className="sidebar__box">
              <Key />
            </div>
          </div>
          <div className="content">
            <RoomsList
              rooms={filteredData}
              onShowBooking={onShowBooking}
              date={calendarDate}
              onSetRoom={setRoom}
            />
          </div>
        </div>
        <BookingModal
          selectedBooking={selectedBooking}
          onCloseBooking={onCloseBooking}
          onDeleteBooking={onDeleteBooking}
          roomData={roomData}
          user='austin.conder@outlook.com'
        />
      </div>
    )}
  </div>

export default BookingMain;