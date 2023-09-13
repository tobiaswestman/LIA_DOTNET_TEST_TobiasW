import React, { useContext } from "react";
import { AppContext } from "../Context";

const BookingActions = ({ day, startTime }) => {
    
    const {
        handleRemoveBooking,
        handleMoveBooking,
        selectedBookingId,
        newDay,
        weekDays,
        newStartTime,
        setNewStartTime,
        timeSlots,
        timeSlotBooked,
        setNewDay,
        isMoving,
        setIsMoving,
        cancelMove
    } = useContext(AppContext);

    return (
        <div>
            {!isMoving && (
                <div className="button-group">
                    <button className="booker" onClick={() => {
                        setNewDay(day);
                        setNewStartTime(startTime);
                        setIsMoving(true);
                    }}>
                        Move
                    </button>
                    <button className="booker" onClick={() => handleRemoveBooking(selectedBookingId, day)}>Remove</button>
                </div>
            )}
            <div>
            {selectedBookingId && newDay && (
                <div>
                    <select value={newDay} onChange={(e) => setNewDay(e.target.value)}>
                        {weekDays.map((dayName, i) => (
                            <option key={i + 1} value={i + 1}>{dayName}</option>
                        ))}
                    </select>
                    <select value={newStartTime} onChange={(e) => setNewStartTime(e.target.value)}>
                        {timeSlots.map(({ startTime, endTime }) => (
                            <option key={startTime} value={startTime}>{startTime} - {endTime}</option>
                        ))}
                    </select>
                    <div className="button-group">
                        <button className="booker" onClick={() => handleMoveBooking(selectedBookingId)}>
                            Confirm Move
                        </button>
                        <button className="booker" type="button" onClick={cancelMove}>
                                    Cancel
                        </button>
                    </div>

                    {timeSlotBooked && (
                        <span className="warning-text"> The selected time slot is already booked! </span>
                    )}
                </div>
            )}
            </div>
        </div>
        
    );
};

export default BookingActions;