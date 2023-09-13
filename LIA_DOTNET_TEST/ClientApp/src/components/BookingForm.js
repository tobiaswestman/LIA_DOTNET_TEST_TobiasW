import React, { useContext } from "react";
import { AppContext } from "../Context";

const BookingForm = ({ day, startTime }) => {
    
    const {
        userName,
        setUserName,
        cancelBooking,
        setSelectedDay,
        setSelectedTimeSlot,
        selectedDay,
        selectedTimeSlot,
        handleFormSubmit
    } = useContext(AppContext);

    const handleAddBooking = (e, day, startTime) => {
        setSelectedDay(day);
        setSelectedTimeSlot(startTime);
    };

    return (
        <div>
            {selectedDay === day && selectedTimeSlot === startTime ? (
                <div className="booking-container">
                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <div className="button-group">
                            <button type="submit">Submit</button>
                            <button type="button" onClick={cancelBooking}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="booking-container">
                    <button className="button" onClick={(e) => handleAddBooking(e, day, startTime)}>Add booking</button>
                </div>
            )}
        </div>
    );
};

export default BookingForm;
