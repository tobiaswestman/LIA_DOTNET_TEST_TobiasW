import React from "react";
import BookingItem from "./BookingItem";
import BookingForm from "./BookingForm";

const TimeSlot = ({ day, startTime, endTime, booking }) => {

    return (
        <div className="booking-item">
            <span className="time-slot">
                {startTime} - {endTime}
            </span>

            {booking ? (
                <BookingItem
                    booking={booking}
                    startTime={startTime}
                    day={day}
                />
            ) : (
                <BookingForm
                    day={day}
                    startTime={startTime}
                />
            )}
        </div>
    );
};

export default TimeSlot;