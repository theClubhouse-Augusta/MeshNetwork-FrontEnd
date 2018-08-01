import React from 'react'
import ReactModal from 'react-modal'
// import momentTimezone from 'moment-timezone'
import moment from 'moment';
import Button from './Button'
import { findRoomInfo } from '../helpers/bookingForm.js'

const BookingModal = ({
  selectedBooking,
  onDeleteBooking,
  onCloseBooking,
  roomData,
  user
}) => {
  const deleteBooking = () => {
    const roomID = selectedBooking.roomId
    const bookingID = selectedBooking._id
    onDeleteBooking(roomID, bookingID)
    onCloseBooking()
  }
  return (
    <ReactModal
      isOpen={!!selectedBooking}
      onRequestClose={onCloseBooking}
      ariaHideApp={true}
      shouldFocusAfterRender={true}
      shouldReturnFocusAfterClose={true}
      contentLabel="Booking"
      appElement={document.getElementById('app')}
      closeTimeoutMS={200}
      className='modal'
    >
      <h3 className="modal__title">Booking Details</h3>
      {!!selectedBooking && (
        <div className="modal__boday">
          <p className="modal__paragraph">
            {findRoomInfo(selectedBooking.roomId, roomData).name}{', Level '}
            {findRoomInfo(selectedBooking.roomId, roomData).floor}
          </p>
          <p className="modal__paragraph">
            {`${moment(selectedBooking['bookingStart']).format('h.mma')} to ${moment(selectedBooking['bookingEnd']).format('h.mma')}`}
            <br />
            <br />
            <span className="modal__paragraph">
              {`${moment(selectedBooking['bookingStart']).format('MMMM Do, YYYY')} to ${moment(selectedBooking['bookingEnd']).format('MMMM Do, YYYY')}`}
            </span>
          </p>
          <p className="modal__paragraph"><strong>Business Unit </strong>{selectedBooking['businessUnit']}</p>
          <p className="modal__paragraph"><strong>Purpose </strong>{selectedBooking['purpose']}</p>
          <p className="modal__paragraph"><strong>Description </strong>{selectedBooking['description']}</p>
        </div>
      )}
      <a href={`mailto:${user}`} className="button">
        Contact
      </a>
      <Button
        onClick={deleteBooking}
        text={`Delete`}
      />
      <Button
        className="button__close button--alternative"
        onClick={onCloseBooking}
        text={`Close`}
      />
    </ReactModal>
  )
}
export default BookingModal
