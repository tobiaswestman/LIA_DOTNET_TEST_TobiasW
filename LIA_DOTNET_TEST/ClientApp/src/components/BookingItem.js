import React, { useContext } from "react";
import BookingActions from "./BookingActions";
import { AppContext } from "../Context";

const BookingItem = ({ booking, startTime, day }) => {

    const {
        selectedBookingId,
        selectedDay,
        setSelectedDay,
        setSelectedBookingId,
        setNewDay,
        setTimeSlotBooked,
        setIsMoving
    } = useContext(AppContext);

    return (
        <div>
            <button
                className="booker"
                onClick={() => {
                    setNewDay(null);
                    setTimeSlotBooked(false);
                    setIsMoving(false);

                    if (selectedBookingId === booking.id) {
                        setSelectedBookingId(null);
                        setNewDay(null);
                        setTimeSlotBooked(false);  
                    } else {
                        setSelectedBookingId(booking.id);
                        setSelectedDay(day);
                    }
                }}
            >
                <span className="username">{booking.user.name}</span>
            </button >

            {selectedBookingId === booking.id && (
                <BookingActions
                    startTime={startTime}
                    day={selectedDay}
                />
            )}
        </div>
    );
};

export default BookingItem;